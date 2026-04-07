'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import CartDrawer from './CartDrawer';
import FitQuiz from './FitQuiz';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collection/power-moves' },
  { label: 'Insiders', href: '/insiders' },
  { label: 'Our Artisans', href: '/artisans' },
  { label: 'About', href: '/about' },
  { label: 'My Account', href: '/account' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { cartCount, isQuizOpen, openQuiz, closeQuiz, updateFitProfile } = useApp();

  const handleQuizComplete = (profile: { baseSize: string; bottomSize: string; fitPreference: string; problemAreas: string[]; styleContext: string }) => {
    updateFitProfile({
      baseSize: profile.baseSize,
      bottomSize: profile.bottomSize,
      fitPreference: profile.fitPreference as 'fitted' | 'regular' | 'relaxed',
      problemAreas: profile.problemAreas,
      styleContext: profile.styleContext,
    });
    router.push('/shop');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-yafe-cream/95 backdrop-blur-md border-b border-yafe-navy/5 transition-all duration-300">
        <div className="flex items-center justify-between px-5 py-4">
          {/* Left — Hamburger */}
          <button
            className="p-2 -ml-2 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Center — Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-widest text-yafe-navy"
          >
            YAFE.
          </Link>

          {/* Right — Search + Cart */}
          <div className="flex gap-4 items-center">
            <button
              onClick={openQuiz}
              className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Find My Fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="p-1 -mr-1 relative hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-0.5 w-2 h-2 bg-yafe-terracotta rounded-full border border-yafe-cream" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        {mobileOpen && (
          <div className="border-t border-yafe-navy/5 px-5 pb-8 pt-6 bg-yafe-cream/95 backdrop-blur-md">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-widest uppercase text-yafe-navy hover:text-yafe-terracotta transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openQuiz();
                  }}
                  className="bg-yafe-terracotta text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer"
                >
                  Find My Fit
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Fit Quiz Modal */}
      <FitQuiz
        isOpen={isQuizOpen}
        onClose={closeQuiz}
        onComplete={handleQuizComplete}
      />
    </>
  );
}
