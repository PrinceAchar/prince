# Prince Achar — princeachar.com

Production storefront for **Prince Achar**, Khari Baoli, Old Delhi (est. 1980).
This Next.js app replaces the old Shopify Liquid theme: Shopify still owns
products, carts, checkout and customer accounts, and this app renders them.

- **Live domain:** https://princeachar.com
- **Hosting:** Vercel
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind · Shopify Storefront
  API + Customer Account API · Firebase (staff admin) · Cloudinary (media)

---

## 1. What is where

| Concern | Implementation |
| --- | --- |
| Product / collection data | Shopify Storefront API — `src/lib/shopify.ts` |
| Cart | Shopify Cart API + local cache — `src/components/CartProvider.tsx` |
| Checkout | Hand-off to Shopify `checkoutUrl` |
| Customer login & account | Shopify **Customer Account API** (OAuth 2.0 + PKCE) |
| Storefront copy (hero, banners, FAQ…) | Firestore `siteContent/main`, edited in `/admin` |
| Staff login | Firebase Auth — `/admin/login` |
| Image uploads | Signed Cloudinary uploads — `/api/admin/upload` |
| Analytics | Vercel Analytics + Speed Insights + Google Tag Manager → GA4 |
| Error boundaries | `src/app/error.tsx`, `src/app/global-error.tsx` |

Two separate identity systems exist on purpose:

- **Customers** sign in with Shopify at `/account/login` (cookie
  `__customer_session`).
- **Staff** sign in with Firebase at `/admin/login`.

---

## 2. Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build                # must pass before deploying
npm start                    # serve the production build
```

> `npm run build` is the gate. Vercel runs it on every push; if it fails
> locally it will fail there too. Almost every failure is either a TypeScript
> error or a missing environment variable.

---

## 3. Environment variables

Copy `.env.example` → `.env.local` for local work, and set the same keys in
**Vercel → Project → Settings → Environment Variables** for production.

### Required for the site to function

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Must be `https://princeachar.com`.** Drives canonicals, sitemap, robots and JSON-LD. |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `princeachar.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Storefront API access token |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | e.g. `2024-10` |
| `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` | Customer Account API client ID (customer login) |

### Required for the admin panel / content editing

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase web config |
| `FIREBASE_PROJECT_ID` | Admin SDK (server) — verifies admin ID tokens |
| `FIREBASE_CLIENT_EMAIL` | Admin SDK service account |
| `FIREBASE_PRIVATE_KEY` | Admin SDK private key (paste with literal `\n`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset |
| `CLOUDINARY_API_KEY` | Server-side signing for uploads |
| `CLOUDINARY_API_SECRET` | Server-side signing for uploads |

### Optional

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Adds the Search Console verification meta tag |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (defaults to `GTM-NXXBQ7LC`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID used inside GTM (defaults to `G-30ZQMK56KN`) |

If the Firebase **admin** keys are missing, the storefront still works and falls
back to the copy baked into `src/lib/content-defaults.ts`. The `/admin` panel
and its image uploads will not work.

---

## 4. Editing the website (no code)

1. Go to `https://princeachar.com/admin/login` and sign in with an allowlisted
   staff Google account.
2. Edit any section — homepage hero, banners, story, FAQ, contact details,
   shipping text, footer, theme.
3. **Save / Publish.** Changes are written to Firestore and reach visitors
   within ~60 seconds (the storefront revalidates content every minute) without
   a redeploy.

Admin access is restricted by an email allowlist in
`src/lib/admin-emails.ts` — add a staff email there and redeploy to grant access.

Product names, prices, photos, stock and variants are **not** edited here; they
live in Shopify admin and appear on the site automatically.

---

## 5. Shopify setup for customer login

1. Shopify admin → **Settings → Customer accounts** → enable *new* customer
   accounts.
2. **Settings → Apps and sales channels → Develop apps** → create an app.
3. Scopes: `openid`, `email`, `customer-account-api:full`.
4. Callback URL must be **exactly**:

   ```
   https://princeachar.com/api/auth/callback
   ```

   The redirect URI is derived from the request origin, so preview deployments
   need their own origin registered too.
5. Copy the client ID into `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`.

If login fails the user is sent to `/account/login?error=...` with a readable
message; the underlying cause is logged by `/api/auth/login` and
`/api/auth/callback` and visible in Vercel runtime logs.

---

## 6. Routes

**Indexable:** `/` · `/achar` · `/murabba` · `/products/[handle]` ·
`/contact` · `/faq` · `/shipping` · `/returns` · `/privacy`

**No-index (also disallowed in `robots.txt`):** `/cart`, `/cart/[cartId]`,
`/account*`, `/search`, `/admin*`

**API:** `/api/auth/{login,callback,refresh,logout,check}`,
`/api/account/{me,orders,addresses}`, `/api/admin/upload`

---

## 7. SEO & monitoring surface

- `src/app/sitemap.ts` — all public pages + every product handle
- `src/app/robots.ts` — disallow list + sitemap pointer
- `src/lib/jsonld.ts` — `Product`, `Offer`, `BreadcrumbList`, `ItemList`
- `src/app/layout.tsx` — `Organization`, `WebSite` (+ SearchAction), `GroceryStore`
- `src/app/opengraph-image.tsx` / `twitter-image.tsx` — branded 1200×630 card
- `src/app/products/[handle]/opengraph-image.tsx` — per-product social card
- `src/app/manifest.ts` — PWA manifest
- `public/llms.txt` — plain-language facts for LLM crawlers
- Vercel Analytics + Speed Insights are mounted in the root layout

### Google Tag Manager & GA4

The site loads **one** tag manager container (`GTM-NXXBQ7LC`) and nothing else.
GA4 (`G-30ZQMK56KN`) runs as a tag *inside* that container — never add a second
GA4 tag or a direct `gtag.js` snippet, or page views will be counted twice.

What the storefront pushes to `window.dataLayer` (`src/lib/analytics.ts`):

| Event | When |
| --- | --- |
| `page_view` | Every client-side route change (the container covers the first load) |
| `view_item` | Product page opened |
| `add_to_cart` | Item added (and quantity increased) |
| `remove_from_cart` | Item removed (and quantity decreased) |
| `begin_checkout` | Checkout clicked; navigation is delayed 250 ms so the tag fires |

`item_id` is the **product handle** (e.g. `amla-pickle`), so the events join in
GA4 ecommerce reports. GA4 traffic and conversions therefore come from the GTM
container, not from a hard-coded script.

Inside the GTM container, configure:

1. **GA4 Configuration** tag with measurement ID `G-30ZQMK56KN`, trigger *All
   Pages*. (This is already present in `GTM-NXXBQ7LC` and is sending the first
   page view.)
2. **Record client-side navigations** — pick **one** of these, never both, or
   every App Router navigation is counted twice:
   - **Option A (simplest):** in the GA4 Configuration tag, open *Advanced
     Settings → Page changes based on browser history events* and tick it. GTM
     then sends a page view on every history change.
   - **Option B:** create a **GA4 Event** tag with event name `page_view`,
     triggered by the custom event `page_view`, sending `page_path`,
     `page_location` and `page_title`. This consumes the data layer push the
     site already makes on each navigation.
3. **GA4 Event** tags for `view_item`, `add_to_cart`, `remove_from_cart` and
   `begin_checkout`, each with *Send Ecommerce data* enabled and the data layer
   selected as the source.
4. Publish the container. Until it is published, nothing reaches GA4.

Purchases happen on Shopify's checkout domain, outside this site. To record
`purchase` and checkout-step events in the same GA4 property, connect GA4 in
Shopify admin (Google & YouTube channel / Shopify's Google Analytics 4
integration). That integration only covers checkout, so it does not duplicate
storefront page views.

The CSP in `next.config.ts` already allows the GTM/GA4 hosts, so no header
change is needed when adding tags.

Every indexable page has exactly one `<h1>`, a self-referencing absolute
canonical, Open Graph + Twitter tags, and a `#main-content` skip link target.

---

## 8. Security headers

Configured in `next.config.ts` for every route: HSTS (2 years, preload),
`Content-Security-Policy`, `X-Frame-Options: DENY`, `nosniff`,
`Referrer-Policy`, `Permissions-Policy`, and `X-Powered-By` disabled.

The CSP allows inline scripts because Next.js inlines the RSC payload; moving to
nonces would require middleware. All other directives are limited to the
origins actually used (Shopify, Firebase, Cloudinary, Vercel, Google Tag
Manager / Google Analytics).

---

## 9. Deploying

Deploys happen from `main` on Vercel. Before pushing:

```bash
npm run build
```

Post-deploy smoke test:

1. `/` loads with hero and products
2. `/products/amla-pickle` shows price, add-to-cart, correct `<title>`
3. Add to cart → drawer opens → **Checkout** reaches Shopify
4. `/account/login` completes the Shopify round-trip
5. `/admin/login` → edit a label → save → see it live within a minute
6. `/sitemap.xml` and `/robots.txt` reference `https://princeachar.com`

---

## 10. Manual checklist (things a developer must do in external dashboards)

- [ ] Set every environment variable in Vercel (section 3), especially
      `NEXT_PUBLIC_SITE_URL=https://princeachar.com`.
- [ ] Register the Shopify callback `https://princeachar.com/api/auth/callback`.
- [ ] Add the production domain in **Vercel → Domains** and point DNS.
- [ ] Enable **Web Analytics** and **Speed Insights** for the project in Vercel.
- [ ] In **Google Tag Manager** (`GTM-NXXBQ7LC`): keep the GA4 configuration
      tag for `G-30ZQMK56KN`, turn on history-change page views (or add the
      `page_view` event tag — not both), add the ecommerce event tags listed in
      section 7, then **Publish**.
- [ ] In **Shopify admin**, connect the same GA4 property so `purchase` events
      from checkout are recorded.
- [ ] Verify the domain in **Google Search Console** (DNS or the
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` token), then submit
      `https://princeachar.com/sitemap.xml`.
- [ ] Create the Firebase project, enable Google sign-in, create the
      `siteContent` Firestore document path, and generate a service account
      for the admin SDK.
- [ ] Create the Cloudinary account/unsigned + signed upload presets.
- [ ] Confirm the `ADMIN_EMAILS` allowlist contains the store owner's address.
