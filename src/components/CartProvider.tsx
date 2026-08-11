"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import {
  createCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  type Cart,
  type CartLine,
} from "@/lib/shopify";

export interface CartItem {
  lineId: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  checkoutUrl: string;
  addItem: (variantId: string, productTitle: string, variantTitle: string, price: string, currencyCode: string, image: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: string;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function mapCartToItems(cart: Cart): CartItem[] {
  return cart.lines.edges.map((edge) => {
    const line = edge.node;
    const variant = line.merchandise;
    const image = variant.product.images.edges[0]?.node;
    return {
      lineId: line.id,
      variantId: variant.id,
      productTitle: variant.product.title,
      variantTitle: variant.title,
      price: variant.price.amount,
      currencyCode: variant.price.currencyCode,
      image: image?.url || "/logo.jpeg",
      quantity: line.quantity,
    };
  });
}

function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("shopify_cart_id");
}

function setCartId(cartId: string | null) {
  if (typeof window === "undefined") return;
  if (cartId) {
    localStorage.setItem("shopify_cart_id", cartId);
  } else {
    localStorage.removeItem("shopify_cart_id");
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartIdState] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = getCartId();
    if (savedCartId) {
      setCartIdState(savedCartId);
      getCart(savedCartId)
        .then((cart) => {
          if (cart) {
            setItems(mapCartToItems(cart));
            setCheckoutUrl(cart.checkoutUrl);
          } else {
            setCartId(null);
            setCartIdState(null);
          }
        })
        .catch(() => {
          setCartId(null);
          setCartIdState(null);
        });
    }
  }, []);

  const syncCart = useCallback(async (cart: Cart) => {
    setItems(mapCartToItems(cart));
    setCheckoutUrl(cart.checkoutUrl);
    setCartIdState(cart.id);
    setCartId(cart.id);
  }, []);

  const addItem = useCallback(
    async (variantId: string, productTitle: string, variantTitle: string, price: string, currencyCode: string, image: string) => {
      setIsLoading(true);
      try {
        if (!cartId) {
          const cart = await createCart(variantId, 1);
          await syncCart(cart);
        } else {
          // Check if item already in cart
          const existing = items.find((i) => i.variantId === variantId);
          if (existing) {
            const cart = await updateCartItem(cartId, existing.lineId, existing.quantity + 1);
            await syncCart(cart);
          } else {
            const cart = await addToCart(cartId, variantId, 1);
            await syncCart(cart);
          }
        }
      } catch (err) {
        console.error("Failed to add to cart:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, items, syncCart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const cart = await removeCartItem(cartId, lineId);
        await syncCart(cart);
      } catch (err) {
        console.error("Failed to remove from cart:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, syncCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        if (quantity <= 0) {
          const cart = await removeCartItem(cartId, lineId);
          await syncCart(cart);
        } else {
          const cart = await updateCartItem(cartId, lineId, quantity);
          await syncCart(cart);
        }
      } catch (err) {
        console.error("Failed to update cart:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, syncCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setCartIdState(null);
    setCartId(null);
    setCheckoutUrl("");
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items
    .reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0)
    .toFixed(0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        checkoutUrl,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
