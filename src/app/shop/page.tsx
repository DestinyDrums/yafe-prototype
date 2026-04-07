'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories, formatPrice, getProductsByCategory } from '@/data/products';
import { getProductImage } from '@/data/images';
import { useApp } from '@/context/AppContext';

type SortOption = 'newest' | 'price-asc' | 'price-desc';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const { wishlist, toggleWishlist: globalToggleWishlist, fitProfile } = useApp();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === 'All'
        ? [...products]
        : getProductsByCategory(selectedCategory as (typeof categories)[number]);

    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return filtered;
  }, [selectedCategory, sortBy]);

  const userSize = fitProfile.isComplete ? fitProfile.baseSize : null;

  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-14">
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">
            Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">
            Shop All
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-yafe-navy text-yafe-cream'
                    : 'border border-yafe-navy/20 text-yafe-navy hover:border-yafe-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="ml-auto border border-yafe-navy/20 bg-transparent px-4 py-2 text-xs font-medium tracking-widest uppercase focus:outline-none focus:border-yafe-terracotta cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredAndSortedProducts.map((product, i) => (
            <div key={product.id} className="group relative flex flex-col">
              {/* Image */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                <Link href={`/shop/${product.id}`}>
                  <img
                    src={getProductImage(product.id)}
                    className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                    alt={product.name}
                  />
                </Link>

                {/* Wishlist Heart */}
                <button
                  onClick={() => globalToggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-yafe-navy/5 hover:bg-white transition-colors cursor-pointer z-10"
                  aria-label={wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlist.has(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C4703F" className="w-4 h-4">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yafe-navy">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  )}
                </button>

                {/* AI Size Badge — only show if fit profile is complete */}
                {userSize && (
                  <div className="absolute bottom-3 left-3 bg-yafe-cream/95 backdrop-blur text-yafe-navy text-[9px] font-semibold px-2.5 py-1 uppercase tracking-widest shadow-sm flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-yafe-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z" />
                    </svg>
                    Your size: {userSize}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <Link href={`/shop/${product.id}`}>
                <h3 className="font-sans font-medium text-sm text-yafe-navy tracking-wide mb-1 group-hover:text-yafe-terracotta transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="font-sans text-sm text-yafe-navy/70">
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-yafe-gray-400 font-light">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
