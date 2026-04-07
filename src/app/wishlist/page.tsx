'use client';

import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { getProductImage } from '@/data/images';
import { useApp } from '@/context/AppContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, fitProfile } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.has(p.id));
  const userSize = fitProfile.isComplete ? fitProfile.baseSize : null;

  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Saved Items</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">
            My Wishlist
            <span className="text-yafe-gray-400 font-sans text-lg ml-3">({wishlistProducts.length})</span>
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">♡</p>
            <h3 className="font-serif text-2xl text-yafe-navy mb-3">Your wishlist is empty</h3>
            <p className="text-sm text-yafe-navy/60 font-light mb-8 max-w-sm mx-auto">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link href="/shop" className="bg-yafe-terracotta text-white px-10 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors">
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                  <Link href={`/shop/${product.id}`}>
                    <img
                      src={getProductImage(product.id)}
                      className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                      alt={product.name}
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-yafe-navy/5 hover:bg-white transition-colors cursor-pointer z-10"
                    aria-label="Remove from wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C4703F" className="w-4 h-4">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </button>
                  {userSize && (
                    <div className="absolute bottom-3 left-3 bg-yafe-cream/95 backdrop-blur text-yafe-navy text-[9px] font-semibold px-2.5 py-1 uppercase tracking-widest shadow-sm">
                      Your size: {userSize}
                    </div>
                  )}
                </div>
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-sans font-medium text-sm text-yafe-navy tracking-wide mb-1 group-hover:text-yafe-terracotta transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-sans text-sm text-yafe-navy/70 mb-3">{formatPrice(product.price)}</p>
                <Link
                  href={`/shop/${product.id}`}
                  className="w-full py-2.5 bg-yafe-navy text-yafe-cream text-xs font-medium tracking-widest uppercase text-center hover:bg-[#2A2A4E] transition-colors"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
