# Bygger Taggat-butiken som Node-server för linsochlager.net/shop
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
ARG VITE_SHOPIFY_STOREFRONT_TOKEN=""
ARG VITE_DEMO_MODE=0
# Huvudsajtens Supabase (samma projekt som linsochlager.net) — används för
# kontakt-formulärets edge-function och nyhetsbrevs-insert.
ARG VITE_SUPABASE_URL="https://vpvzqdcvlershkzpvqle.supabase.co"
ARG VITE_SUPABASE_PUBLISHABLE_KEY=""
ENV VITE_BASE_PATH=/shop
ENV NITRO_PRESET=node-server
ENV VITE_SHOPIFY_STOREFRONT_TOKEN=$VITE_SHOPIFY_STOREFRONT_TOKEN
ENV VITE_DEMO_MODE=$VITE_DEMO_MODE
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
RUN bun run build && (test -d .output || mv dist .output)

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV PORT=3000 HOST=0.0.0.0
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
