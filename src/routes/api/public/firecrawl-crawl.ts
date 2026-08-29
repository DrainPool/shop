import { createFileRoute } from "@tanstack/react-router";

const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const Route = createFileRoute("/api/public/firecrawl-crawl")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["FIRECRAWL_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "FIRECRAWL_API_KEY saknas" }, { status: 500 });
        }
        const body = await request.json().catch(() => ({}));
        const url = body.url || "https://www.roffi.se";
        const limit = Math.min(body.limit || 20, 50);
        const maxChars = Math.min(body.maxChars || 1500, 5000);

        // Start crawl
        const startRes = await fetch(`${FIRECRAWL_V2}/crawl`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            limit,
            scrapeOptions: { formats: ["markdown"] },
          }),
        });
        const startData = await startRes.json();
        if (!startRes.ok || !startData.id) {
          return Response.json(
            { error: `Crawl kunde inte startas [${startRes.status}]: ${JSON.stringify(startData)}` },
            { status: 502 },
          );
        }

        // Poll until done (max ~4 min)
        const jobId = startData.id;
        let statusData: any = null;
        for (let i = 0; i < 48; i++) {
          await sleep(5000);
          const pollRes = await fetch(`${FIRECRAWL_V2}/crawl/${jobId}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          statusData = await pollRes.json();
          if (!pollRes.ok) {
            return Response.json(
              { error: `Poll misslyckades [${pollRes.status}]: ${JSON.stringify(statusData)}` },
              { status: 502 },
            );
          }
          if (statusData.status === "completed" || statusData.status === "failed") break;
        }

        if (!statusData || statusData.status !== "completed") {
          return Response.json(
            { error: `Crawl slutfördes inte i tid`, status: statusData?.status, jobId },
            { status: 504 },
          );
        }

        const pages = (statusData.data || []).map((p: any) => ({
          url: p.metadata?.sourceURL,
          title: p.metadata?.title,
          markdown: typeof p.markdown === "string" ? p.markdown.slice(0, maxChars) : null,
        }));

        return Response.json({
          success: true,
          total: statusData.total,
          creditsUsed: statusData.creditsUsed,
          pages,
        });
      },
    },
  },
});
