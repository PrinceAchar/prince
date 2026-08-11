const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-10";

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json?access_token=${SHOPIFY_STOREFRONT_TOKEN}`;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join("\n"));
  }

  return json.data;
}

export async function shopifyFetchClient<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join("\n"));
  }

  return json.data;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export interface ProductData {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface CollectionData {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
}

export interface CollectionByHandleData {
  collectionByHandle: {
    id: string;
    title: string;
    handle: string;
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  } | null;
}

export function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  if (currencyCode === "INR") {
    return `\u20B9${num.toFixed(0)}`;
  }
  return `${currencyCode} ${num.toFixed(2)}`;
}

export function getProductSize(product: ShopifyProduct): string {
  const variant = product.variants.edges[0];
  if (variant) {
    const sizeOption = variant.node.selectedOptions.find((o) => o.name === "Size");
    if (sizeOption) return sizeOption.value;
  }
  return "";
}

// Cart API types and functions

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: {
          node: {
            url: string;
            altText: string | null;
          };
        }[];
      };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartResponse {
  cartCreate: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartQueryResponse {
  cart: Cart;
}

export async function createCart(variantId: string, quantity: number = 1): Promise<Cart> {
  const { CREATE_CART_MUTATION } = await import("./queries");
  const data = await shopifyFetchClient<CartResponse>(CREATE_CART_MUTATION, {
    input: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("\n"));
  }

  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const { CART_LINES_ADD_MUTATION } = await import("./queries");
  const data = await shopifyFetchClient<CartLinesAddResponse>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join("\n"));
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const { CART_LINES_UPDATE_MUTATION } = await import("./queries");
  const data = await shopifyFetchClient<CartLinesUpdateResponse>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join("\n"));
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartItem(cartId: string, lineId: string): Promise<Cart> {
  const { CART_LINES_REMOVE_MUTATION } = await import("./queries");
  const data = await shopifyFetchClient<CartLinesRemoveResponse>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join("\n"));
  }

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { CART_QUERY } = await import("./queries");
  const data = await shopifyFetchClient<CartQueryResponse>(CART_QUERY, { cartId });
  return data.cart;
}
