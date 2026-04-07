'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DELIVERY_FEE = 2500;

function formatPrice(amount: number): string {
  return `\u20A6${amount.toLocaleString('en-NG')}`;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useApp();

  const total = cartTotal + (cartItems.length > 0 ? DELIVERY_FEE : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-yafe-navy/45"
            onClick={onClose}
          />
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full flex-col shadow-2xl sm:w-[420px] bg-yafe-cream"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yafe-navy/10 px-5 py-4">
              <h2 className="font-serif text-lg font-semibold tracking-tight text-yafe-navy">
                Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5 text-yafe-navy cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 && (
                <div className="mt-16 text-center">
                  <p className="text-3xl mb-4">🛍️</p>
                  <p className="font-serif text-lg text-yafe-navy mb-2">Your cart is empty</p>
                  <p className="text-sm text-yafe-navy/50 font-light mb-6">Discover something you love</p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-block bg-yafe-terracotta text-white px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors"
                  >
                    Browse Shop
                  </Link>
                </div>
              )}
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div key={`${item.id}-${item.size}`} layout initial={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }} className="mb-5 flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-yafe-gray-200" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium leading-tight text-yafe-navy">{item.name}</p>
                        <div className="mt-1">
                          <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-yafe-gold/15 text-yafe-gold">
                            ✨ Size: {item.size} (AI)
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-0 rounded-full border border-yafe-navy/10">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-sm hover:bg-black/5 text-yafe-navy cursor-pointer">&minus;</button>
                          <span className="w-6 text-center text-xs font-medium text-yafe-navy">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-sm hover:bg-black/5 text-yafe-navy cursor-pointer">+</button>
                        </div>
                        <p className="text-sm font-semibold text-yafe-navy">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/5 text-yafe-navy/40 cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-yafe-navy/10 px-5 pb-5 pt-4">
                <div className="space-y-1.5 text-sm text-yafe-navy">
                  <div className="flex justify-between"><span className="opacity-60">Subtotal</span><span className="font-medium">{formatPrice(cartTotal)}</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Delivery (Lagos)</span><span className="font-medium">{formatPrice(DELIVERY_FEE)}</span></div>
                  <div className="flex justify-between border-t border-yafe-navy/10 pt-2 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>

                <div className="mt-4 flex gap-3 rounded-xl p-3.5 bg-yafe-gold/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#C4A265" stroke="none" className="mt-0.5 flex-shrink-0">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <p className="text-xs leading-relaxed text-yafe-navy/75">
                    Your order supports female artisans and keeps 70% of revenue in Nigeria.
                  </p>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-4 flex w-full items-center justify-center py-3.5 text-sm font-medium tracking-widest uppercase text-white bg-yafe-terracotta hover:bg-[#A95A2F] transition-colors"
                >
                  CHECKOUT — {formatPrice(total)}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
