# Driftsätta Taggat under linsochlager.net/shop

1. Klona repot på Ubuntu-servern och bygg: `docker build -f deploy/Dockerfile -t taggat-shop .`
2. Lägg till i docker-compose (samma nätverk som `linsochlager`, t.ex. `nginxpm_default`):
   ```yaml
   taggat-shop:
     image: taggat-shop
     restart: unless-stopped
     env_file: .env.shop   # VITE_SHOPIFY_STOREFRONT_TOKEN, SUPABASE_*, UNSPLASH_ACCESS_KEY, LOVABLE_API_KEY m.fl.
     networks: [nginxpm_default]
   ```
3. Klistra in `deploy/nginx-shop.conf` i linsochlager.net-blocket före `location /`, kör `nginx -t && nginx -s reload`.
4. Länka "Butik" i linsochlager.net-menyn till `/shop/`.

Obs: `VITE_*`-variabler bakas in vid bygget – sätt dem som build-args/ENV innan `bun run build`.
Lovable-förhandsvisningen påverkas inte (ingen VITE_BASE_PATH = roten).
