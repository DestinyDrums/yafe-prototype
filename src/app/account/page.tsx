'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function AccountPage() {
  const { fitProfile, openQuiz, cartItems } = useApp();

  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">My Account</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Welcome Back</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fit Profile Card */}
            <section className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl text-yafe-navy">Your Fit Profile</h2>
                <button onClick={openQuiz} className="text-xs font-medium tracking-widest uppercase text-yafe-terracotta hover:underline cursor-pointer">
                  {fitProfile.isComplete ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>

              {fitProfile.isComplete ? (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Top Size', value: fitProfile.baseSize },
                    { label: 'Bottom Size', value: fitProfile.bottomSize },
                    { label: 'Fit Preference', value: fitProfile.fitPreference },
                    { label: 'Style', value: fitProfile.styleContext },
                  ].map((item) => (
                    <div key={item.label} className="bg-yafe-cream rounded-xl p-4">
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400 mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-yafe-navy capitalize">{item.value || '—'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-yafe-cream rounded-xl p-6 text-center">
                  <p className="text-3xl mb-3">📐</p>
                  <p className="text-sm text-yafe-navy/70 mb-4 font-light">Complete your fit profile for AI-powered size recommendations on every product.</p>
                  <button onClick={openQuiz} className="bg-yafe-terracotta text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer">
                    Find My Fit
                  </button>
                </div>
              )}
            </section>

            {/* Order History — Empty State for Fresh Users */}
            <section className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
              <h2 className="font-serif text-xl text-yafe-navy mb-5">Order History</h2>
              <div className="text-center py-10">
                <p className="text-3xl mb-3">📦</p>
                <p className="font-serif text-lg text-yafe-navy mb-2">No orders yet</p>
                <p className="text-sm text-yafe-navy/50 font-light mb-6">Your order history will appear here once you make your first purchase.</p>
                <Link href="/shop" className="text-xs font-medium tracking-widest uppercase text-yafe-terracotta hover:underline">
                  Start Shopping →
                </Link>
              </div>
            </section>

            {/* Current Cart Summary */}
            {cartItems.length > 0 && (
              <section className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
                <h2 className="font-serif text-xl text-yafe-navy mb-5">In Your Cart</h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center justify-between py-3 border-b border-yafe-navy/5 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-yafe-navy">{item.name}</p>
                        <p className="text-xs text-yafe-gray-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-yafe-navy">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <Link href="/checkout" className="block mt-4 w-full py-3 bg-yafe-terracotta text-white text-xs font-medium tracking-widest uppercase text-center hover:bg-[#A95A2F] transition-colors">
                  Proceed to Checkout
                </Link>
              </section>
            )}
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
              <h3 className="font-serif text-lg text-yafe-navy mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'My Wishlist', href: '/wishlist', icon: '♡' },
                  { label: 'Size Guide', href: '/size-guide', icon: '📏' },
                  { label: 'Shipping Info', href: '/shipping', icon: '📦' },
                  { label: 'Returns', href: '/returns', icon: '↩️' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-3 text-sm text-yafe-navy hover:text-yafe-terracotta transition-colors">
                      <span className="text-base">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insiders Badge */}
            <div className="bg-yafe-navy rounded-2xl p-6 text-center">
              <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">YAFE Insiders</span>
              <p className="font-serif text-lg text-white mb-3">Join the Community</p>
              <p className="text-xs text-white/60 font-light mb-4">Vote on designs, get early access, and earn rewards.</p>
              <Link href="/insiders" className="inline-block text-xs font-medium tracking-widest uppercase text-yafe-gold border border-yafe-gold/30 px-5 py-2 hover:bg-yafe-gold/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
