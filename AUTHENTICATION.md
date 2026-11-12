# Authentication Setup for Prince Achar

## Overview

This application implements authentication using Shopify's Customer Account API. However, if you're experiencing issues with the OAuth flow, we've provided alternative authentication methods.

## Configuration

### Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=princeachar.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_token_here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-10
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=your_customer_account_client_id_here
```

### Shopify Setup

1. **Enable Customer Account API**:
   - Go to your Shopify Admin
   - Navigate to Settings > Customer accounts
   - Enable "Customer accounts"
   - Note: This feature is only available on Shopify Plus plans

2. **Create OAuth App**:
   - Go to Settings > Apps and sales channels > Develop apps for your store
   - Create a new app with the following permissions:
     - `openid`
     - `email`
     - `customer-account-api:full`
   - Set the redirect URI to: `https://yourdomain.com/api/auth/callback`

## Authentication Endpoints

### 1. Standard OAuth Flow

- **Login**: `/api/auth/login`
- **Callback**: `/api/auth/callback`
- **Logout**: `/api/auth/logout`

### 2. Simple Mock Flow (for testing)

- **Login**: `/api/auth/login/simple`
- **Callback**: `/api/auth/callback/simple`
- **Logout**: `/api/auth/logout`

### 3. Debug Endpoints

- **Debug Login**: `/api/auth/login/debug`
- **Debug Callback**: `/api/auth/callback/debug`
- **Auth Test Page**: `/debug-auth`

## Troubleshooting

### Common Issues

1. **404 on OAuth URL**:
   - The Customer Account API might not be enabled on your Shopify store
   - Verify you're on a Shopify Plus plan
   - Check your OAuth app configuration

2. **Client ID Missing**:
   - Ensure `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` is set in your environment
   - Verify the Client ID in your Shopify OAuth app settings

3. **Token Exchange Fails**:
   - Check that your redirect URI matches exactly in your Shopify OAuth app
   - Verify the PKCE state matches between login and callback

### Testing the Authentication

1. **Visit the debug page**: `https://princeachar.com/debug-auth`
   - This will test your environment variables and API endpoints
   - It shows if the OpenID configuration and Customer Account API are accessible

2. **Try the simple flow**:
   - Visit `/account/login`
   - Click "Continue with Email" (uses simple mock flow)
   - This should work even without proper Shopify configuration

3. **Check the console**:
   - Debug information is logged to the console when using debug endpoints

## Alternative Implementation

If you continue to have issues with Shopify's Customer Account API, consider these alternatives:

1. **Custom Email Authentication**:
   - Implement your own email/password system
   - Use Firebase Authentication or similar

2. **Shopify Storefront API + Custom Auth**:
   - Use Storefront API for customer data
   - Implement a custom JWT-based authentication system

3. **Third-party Authentication**:
   - Use services like Auth0, Clerk, or Supabase
   - Integrate with Shopify via webhooks

## File Structure

```
src/
├── app/
│   ├── account/
│   │   ├── login/page.tsx
│   │   └── page.tsx (main account page)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── route.ts (standard OAuth)
│   │   │   │   ├── simple.ts (mock OAuth)
│   │   │   │   └── debug.ts (debug OAuth)
│   │   │   ├── callback/
│   │   │   │   ├── route.ts (standard callback)
│   │   │   │   ├── simple.ts (mock callback)
│   │   │   │   └── debug.ts (debug callback)
│   │   │   └── logout/route.ts
│   │   └── account/
│   │       └── me/
│   │           ├── route.ts (real API)
│   │           └── mock.ts (mock API)
│   └── debug-auth/page.tsx
├── components/
│   ├── AccountNav.tsx
│   └── ...
└── lib/
    ├── shopify-customer.ts (Customer Account API client)
    ├── auth.ts (PKCE helpers)
    └── auth-helpers.ts (Session management)
```

## Next Steps

1. **Check your Shopify plan**: Ensure you have Shopify Plus for Customer Account API
2. **Configure OAuth app**: Set up the OAuth app in Shopify with correct permissions
3. **Test with debug endpoints**: Use `/debug-auth` to verify configuration
4. **Try simple flow**: Use `/api/auth/login/simple` for testing without Shopify dependencies
5. **Consider alternatives**: If issues persist, implement a custom authentication solution