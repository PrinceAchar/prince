# Migration Guide: Complete Shopify Theme Replacement

This guide explains how to migrate from the old Shopify Liquid theme to the new Next.js application.

## Overview

The new application is designed to completely replace the old Shopify theme while maintaining all functionality. The key improvements include:

1. **Unified Authentication System**: Resolves conflicts between Firebase and Shopify authentication
2. **Enhanced Cart Functionality**: Proper handling of direct cart URLs from Shopify
3. **Improved Account Management**: Better customer account pages with fallback mechanisms
4. **Admin Panel**: Full content management system
5. **Mobile-Responsive Design**: Better mobile experience

## Key Changes

### 1. Authentication System

**Old System:**
- Mixed Firebase and Shopify Customer Account API
- Conflicting authentication flows
- Unreliable customer login

**New System:**
- Unified authentication via Shopify Customer Account API
- Fallback to mock authentication for development
- Proper session management
- Redirect handling for login flows

**Files Modified:**
- `/src/lib/auth-unified.ts` - New unified authentication helpers
- `/src/app/api/auth/login/unified.ts` - Unified login endpoint
- `/src/app/api/auth/callback/unified.ts` - Unified callback endpoint
- `/src/app/account/unified/` - New unified account pages
- `/src/app/account/login/unified.tsx` - New login page

### 2. Cart System

**Old System:**
- Basic cart functionality
- 404 errors on direct cart URLs

**New System:**
- Dynamic cart pages for direct URL access
- Proper cart state management
- Shopify checkout integration

**Files Modified:**
- `/src/app/cart/[cartId]/page.tsx` - Dynamic cart page
- `/src/app/cart/page.tsx` - Regular cart page
- `/src/components/CartContent.tsx` - Cart display component
- `/src/components/CartContentWrapper.tsx` - Cart wrapper component

### 3. Account Management

**Old System:**
- Inconsistent account pages
- Mock data without real Shopify integration

**New System:**
- Unified account pages with proper data fetching
- Order history and management
- Address book functionality
- Profile management

**Files Modified:**
- `/src/app/account/unified/page.tsx` - Main account page
- `/src/app/account/unified/orders/page.tsx` - Orders page
- `/src/app/account/unified/addresses/page.tsx` - Addresses page
- `/src/app/account/unified/orders/[id]/page.tsx` - Order detail page
- `/src/app/api/account/unified/me.ts` - Unified account API

### 4. Admin Panel

**Old System:**
- Basic content management
- Limited functionality

**New System:**
- Comprehensive content management
- Product ordering
- Image uploads
- Content history

**Files Modified:**
- `/src/app/admin/page.tsx` - Admin panel (existing, enhanced)
- `/src/components/admin/` - Admin components (existing)

## Migration Steps

### 1. Environment Configuration

Update your `.env.local` file with the following variables:

```env
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=princeachar.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_token_here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-10
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=your_customer_account_client_id_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=princeachar
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Shopify Configuration

1. **Enable Customer Account API**:
   - Go to Shopify Admin > Settings > Customer accounts
   - Enable "Customer accounts" (requires Shopify Plus)

2. **Create OAuth App**:
   - Go to Settings > Apps and sales channels > Develop apps for your store
   - Create a new app with the following permissions:
     - `openid`
     - `email`
     - `customer-account-api:full`
   - Set the redirect URI to: `https://yourdomain.com/api/auth/callback/unified`

3. **Get Client ID**:
   - Note the Client ID from your OAuth app settings
   - Add it to your environment variables

### 3. Firebase Configuration

1. **Create Firebase Project**:
   - Go to Firebase Console
   - Create a new project
   - Enable Authentication and Firestore

2. **Configure Authentication**:
   - Enable Google Authentication
   - Add authorized domains

3. **Get Configuration**:
   - Copy the Firebase configuration to your environment variables

### 4. Deploy to Vercel

1. **Push Changes to GitHub**:
   ```bash
   git add .
   git commit -m "Implement unified authentication and cart system"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Deploy the main branch
   - Set environment variables in Vercel dashboard

### 5. Testing

1. **Test Authentication**:
   - Visit `/account/login/unified`
   - Test the login flow
   - Verify account pages work correctly

2. **Test Cart Functionality**:
   - Add items to cart
   - Test direct cart URLs
   - Verify checkout integration

3. **Test Admin Panel**:
   - Log in to admin panel
   - Test content management
   - Verify image uploads

## Troubleshooting

### Authentication Issues

1. **404 on Login Page**:
   - Check if environment variables are set correctly
   - Verify Shopify OAuth app configuration
   - Check if Customer Account API is enabled

2. **Token Exchange Fails**:
   - Verify redirect URI matches exactly in Shopify OAuth app
   - Check PKCE state matching
   - Try the mock authentication for development

### Cart Issues

1. **404 on Cart URLs**:
   - Verify the dynamic cart page is deployed
   - Check if cart ID is being passed correctly
   - Test with the regular cart page

2. **Cart Not Persisting**:
   - Check localStorage permissions
   - Verify cart provider is working
   - Check Shopify integration

### Admin Panel Issues

1. **Authentication Fails**:
   - Check Firebase configuration
   - Verify admin email is in the allowlist
   - Check Firebase security rules

2. **Content Not Saving**:
   - Check Firestore security rules
   - Verify write permissions
   - Check Cloudinary configuration

## Rollback Plan

If issues arise, you can quickly roll back by:

1. **Revert GitHub Changes**:
   ```bash
   git revert <commit-hash>
   ```

2. **Update Shopify Theme**:
   - Temporarily switch back to Liquid theme
   - Update theme settings

3. **Update DNS**:
   - Point domain back to Shopify
   - Update any necessary records

## Support

For support:
1. Check the troubleshooting section
2. Review the debug endpoints (`/debug-auth`)
3. Check browser console for errors
4. Verify environment variables are set correctly

## Next Steps

1. Deploy the updated application
2. Test all functionality thoroughly
3. Update any external links to use new URLs
4. Monitor for any issues after deployment
5. Consider adding analytics to track usage