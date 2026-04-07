'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';

// ─── Fit Profile Types ───────────────────────────────────────────────────────

export interface FitProfile {
  baseSize: string | null;
  bottomSize: string | null;
  height: string | null;
  fitPreference: 'fitted' | 'regular' | 'relaxed' | null;
  problemAreas: string[];
  styleContext: string | null;
  isComplete: boolean;
}

const defaultFitProfile: FitProfile = {
  baseSize: null,
  bottomSize: null,
  height: null,
  fitPreference: null,
  problemAreas: [],
  styleContext: null,
  isComplete: false,
};

// ─── Cart Types ──────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  sizeConfidence: number;
  image: string;
  quantity: number;
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

type WishlistSet = string[];

// ─── localStorage helpers ────────────────────────────────────────────────────

const STORAGE_KEYS = {
  fitProfile: 'yafe_fit_profile',
  cart: 'yafe_cart',
  wishlist: 'yafe_wishlist',
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

// ─── Context Value Type ──────────────────────────────────────────────────────

interface AppContextValue {
  // Fit Profile
  fitProfile: FitProfile;
  setFitProfile: React.Dispatch<React.SetStateAction<FitProfile>>;
  updateFitProfile: (updates: Partial<FitProfile>) => void;
  resetFitProfile: () => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: Set<string>;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Quiz
  quizStep: number;
  setQuizStep: React.Dispatch<React.SetStateAction<number>>;
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // ── Fit Profile State (persisted) ─────────────────────────────────────────

  const [fitProfile, setFitProfile] = useState<FitProfile>(defaultFitProfile);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFitProfile(loadFromStorage(STORAGE_KEYS.fitProfile, defaultFitProfile));
    setCartItems(loadFromStorage(STORAGE_KEYS.cart, []));
    const storedWishlist = loadFromStorage<string[]>(STORAGE_KEYS.wishlist, []);
    setWishlistState(new Set(storedWishlist));
    setHydrated(true);
  }, []);

  // Persist fit profile
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.fitProfile, fitProfile);
  }, [fitProfile, hydrated]);

  const updateFitProfile = useCallback((updates: Partial<FitProfile>) => {
    setFitProfile((prev) => {
      const next = { ...prev, ...updates };
      next.isComplete =
        next.baseSize !== null &&
        next.bottomSize !== null &&
        next.height !== null &&
        next.fitPreference !== null &&
        next.styleContext !== null;
      return next;
    });
  }, []);

  const resetFitProfile = useCallback(() => {
    setFitProfile(defaultFitProfile);
  }, []);

  // ── Cart State (persisted, starts empty) ──────────────────────────────────

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Persist cart
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.cart, cartItems);
  }, [cartItems, hydrated]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === item.id && ci.size === item.size);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id && ci.size === item.size
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setCartItems((prev) => prev.filter((ci) => !(ci.id === id && ci.size === size)));
  }, []);

  const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((ci) => !(ci.id === id && ci.size === size)));
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.id === id && ci.size === size ? { ...ci, quantity } : ci
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // ── Wishlist State (persisted, starts empty) ──────────────────────────────

  const [wishlistState, setWishlistState] = useState<Set<string>>(new Set());

  // Persist wishlist
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.wishlist, Array.from(wishlistState));
  }, [wishlistState, hydrated]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistState((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return wishlistState.has(productId);
  }, [wishlistState]);

  // ── Quiz State ───────────────────────────────────────────────────────────

  const [quizStep, setQuizStep] = useState<number>(0);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const openQuiz = useCallback(() => {
    setQuizStep(0);
    setIsQuizOpen(true);
  }, []);

  const closeQuiz = useCallback(() => {
    setIsQuizOpen(false);
  }, []);

  // ── Memoized Context Value ───────────────────────────────────────────────

  const value = useMemo<AppContextValue>(
    () => ({
      fitProfile,
      setFitProfile,
      updateFitProfile,
      resetFitProfile,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      wishlist: wishlistState,
      toggleWishlist,
      isWishlisted,
      quizStep,
      setQuizStep,
      isQuizOpen,
      openQuiz,
      closeQuiz,
    }),
    [
      fitProfile,
      updateFitProfile,
      resetFitProfile,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      wishlistState,
      toggleWishlist,
      isWishlisted,
      quizStep,
      isQuizOpen,
      openQuiz,
      closeQuiz,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
