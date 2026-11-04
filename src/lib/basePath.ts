// Butiken kan köras under en delväg (t.ex. /shop på linsochlager.net).
// Sätts vid bygge med VITE_BASE_PATH=/shop. Tom = roten (Lovable-förhandsvisning).
const raw = (import.meta.env["VITE_BASE_PATH"] as string | undefined) || "";
export const BASE_PATH = raw.replace(/\/+$/, "");

/** Prefixar en absolut sökväg till en fil i public/ med butikens delväg. */
export const withBase = (path: string) => (path.startsWith("/") ? `${BASE_PATH}${path}` : path);
