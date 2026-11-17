# Prince Achar — Next.js Storefront

This app is the production storefront for princeachar.com and replaces the
previous Shopify Liquid theme. Shopify is still the system of record for
products, carts, checkout and customer accounts; this app renders them.

## Architecture

| Concern | Implementation |
| --- | --- |
| Product / collection data | Shopify Storefront API (`src/lib/shopify.ts`) |
| Cart | Shopify Cart API + client cache (`src/components/CartProvider.tsx`) |
| Checkout | Hand-off to Shopify `checkoutUrl` |
| Customer accounts | Shopify **Customer Account API** (OAuth 2.0 + PKCE) |
| Admin panel | Firebase Auth + Firestore (`/admin`) |
| Media | Cloudinary (`/api/admin/upload`) |

Two identity systems exist on purpose and do not overlap:

- **Customers** authenticate with Shopify at `/account/login` and are tracked by
  the `__customer_session` cookie.
- **Staff** authenticate with Firebase at `/admin/login`.

## Routes

Public / indexable

- `/` home
- `/achar` pickle collection
- `/murabba` murabba + chutney collection
- `/products/[handle]` product detail (SSG)
- `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`

Non-indexed (`robots: noindex`, disallowed in `robots.txt`)

- `/cart`, `/cart/[cartId]`
- `/account`, `/account/login`, `/account/orders`, `/account/orders/[id]`, `/account/addresses`
- `/search`
- `/admin`, `/admin/login`

API

- `GET  /api/auth/login` → redirects to Shopify authorize endpoint
- `GET  /api/auth/callback` → exchanges code, sets session cookie
- `POST /api/auth/refresh` → refreshes access token
- `POST /api/auth/logout` → clears session
- `GET  /api/auth/check` → `{ loggedIn: boolean }` (always 200)
- `GET  /api/account/me`, `PATCH /api/account/me`
- `GET  /api/account/orders`, `GET /api/account/orders/[id]`
- `GET|POST|PUT|PATCH|DELETE /api/account/addresses`

## Required environment variables

See `.env.example`. The ones that break production if missing:

- `NEXT_PUBLIC_SITE_URL` — must be `https://princeachar.com` (drives canonicals,
  sitemap, robots and JSON-LD). Wrong value = wrong canonicals in Search Console.
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
- `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional, adds the Search Console meta tag)
- `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional; default to
  `GTM-NXXBQ7LC` / `G-30ZQMK56KN`). GTM is the only analytics loader — GA4 runs
  as a tag inside the container.

## Shopify setup for customer login

1. Shopify admin → **Settings → Customer accounts** → enable *new* customer accounts.
2. **Settings → Apps and sales channels → Develop apps** → create an app.
3. Add the Customer Account API scopes: `openid`, `email`,
   `customer-account-api:full`.
4. Set the callback URL to **exactly**:

   ```
   https://princeachar.com/api/auth/callback
   ```

   The redirect URI sent during the OAuth flow is derived from the request
   origin, so preview deployments will use their own origin and will be rejected
   unless that origin is also registered.
5. Copy the client ID into `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`.

If login fails, the redirect to `/account/login?error=...` shows a specific
message; server-side cause is logged via `console.error` in
`/api/auth/login` and `/api/auth/callback` (visible in Vercel runtime logs).

## SEO surface

- `src/app/sitemap.ts` — public pages + every product handle
- `src/app/robots.ts` — disallows admin/account/api/cart/search, points at sitemap
- `src/lib/jsonld.ts` — `Product`, `BreadcrumbList`, `ItemList`
- `src/app/layout.tsx` — `Organization`, `WebSite` (+SearchAction), `GroceryStore`
- Canonicals are self-referencing and absolute on every indexable page
- Every page renders exactly one `<h1>`
- `public/llms.txt` — plain-language facts for LLM crawlers

## Build & deploy

```bash
npm run build   # must pass before deploying
```

Deploys to Vercel. Build-time failures are almost always TypeScript errors or a
missing environment variable — run `npm run build` locally first.
