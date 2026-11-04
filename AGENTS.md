<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Validate all Shopify cart line inputs with the shared Zod schemas before Storefront API mutations, because customization data is customer-controlled.
- Upload generated product media to Shopify with AI-visualization alt text; preserve existing photos and identify generated images separately from customer submissions.
- Use Shopify as the only runtime product/cart source; load complete catalog views with cursor pagination and render product galleries exclusively from Shopify media so Admin changes match the preview.
- Keep assortment search and category selection in validated URL parameters and filter the complete Shopify catalog through the shared catalogSearch helper, so searches remain shareable and combine consistently with existing filters.
- Store customer engraving photos in a private Cloud bucket, expose reads only through HMAC-authorized capability links, and attach those links to Shopify cart lines; guest uploads create server-generated paths and validate file size, MIME and signatures so customer photos never become public catalog media.

- Subpath hosting: the shop can be served under a path prefix via build-time `VITE_BASE_PATH` (router basepath + Vite base); reference files in `public/` through `withBase()` from `src/lib/basePath.ts` so they resolve under the prefix. Why: production lives at linsochlager.net/shop behind Nginx (see `deploy/`).
- Vite maps the managed SHOPIFY_STOREFRONT_ACCESS_TOKEN to the public Storefront build variable when no explicit VITE_SHOPIFY_STOREFRONT_TOKEN is set; never expose the Admin token. This keeps credentials out of source while supporting managed preview and external builds.
