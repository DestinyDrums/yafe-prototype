'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { products, formatPrice } from '@/data/products';
import { getProductImage, getProductGallery, artisanHeroImage } from '@/data/images';
import { useApp } from '@/context/AppContext';

const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
const recommendedSize = 'M';

const mockReviews = [
  { name: 'Chioma A.', rating: 5, comment: 'Fit was perfect! The AI sizing nailed it. I usually struggle between M and L but this was spot on.' },
  { name: 'Adaeze O.', rating: 5, comment: 'Beautiful quality fabric and the artisan finish is noticeable. Wearing this to every meeting now.' },
  { name: 'Funke B.', rating: 4, comment: 'Love the design. Delivery was fast. Only giving 4 stars because I wish there were more colours.' },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 20 20" fill={star <= rating ? '#C4A265' : '#E8E0D8'}>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 13.77l-4.94 2.93L6 11.21l-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

// Images are now loaded from centralized image map

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useApp();
  const product = products.find((p) => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState(recommendedSize);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [showWhySizeModal, setShowWhySizeModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-2xl text-yafe-navy mb-2">Product not found</h1>
        <p className="text-yafe-gray-400 mb-6 font-light">Sorry, we couldn&apos;t find that product.</p>
        <Link href="/shop" className="bg-yafe-terracotta text-white px-8 py-3 text-sm font-medium tracking-widest uppercase">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, size: selectedSize, sizeConfidence: 94, image: product.image });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="relative pb-24">
      {/* Back + Wishlist floating buttons */}
      <div className="fixed top-0 w-full z-40 flex justify-between items-center p-4 bg-gradient-to-b from-yafe-cream/90 to-transparent pointer-events-none lg:hidden">
        <Link
          href="/shop"
          className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-yafe-navy/5 pointer-events-auto hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-yafe-navy/5 pointer-events-auto hover:bg-white transition-colors text-yafe-navy hover:text-yafe-terracotta cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {/* Two-column layout on desktop */}
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-10">
        {/* Image */}
        <div className="w-full aspect-[3/4] lg:aspect-auto lg:sticky lg:top-20 lg:h-[calc(100vh-120px)] bg-gray-200 relative overflow-hidden">
          <img
            src={getProductImage(product.id)}
            className="w-full h-full object-cover"
            alt={product.name}
          />
          {/* Image dots */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-yafe-navy" />
            <div className="w-1.5 h-1.5 rounded-full bg-yafe-navy/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-yafe-navy/30" />
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-8 pb-6 bg-yafe-cream rounded-t-3xl -mt-6 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] lg:mt-0 lg:rounded-none lg:shadow-none lg:pt-0">
          {/* Breadcrumb - desktop */}
          <nav className="hidden lg:flex text-xs text-yafe-gray-400 mb-6 tracking-wide">
            <Link href="/" className="hover:text-yafe-navy transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-yafe-navy transition">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-yafe-navy">{product.name}</span>
          </nav>

          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-yafe-gray-400 mb-2">{product.category}</p>
              <h2 className="font-serif text-3xl text-yafe-navy leading-tight">{product.name}</h2>
            </div>
            <span className="font-sans font-medium text-lg text-yafe-navy mt-1">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-sm text-yafe-navy/70 mb-8 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-yafe-navy">Select Size</span>
              <button
                onClick={() => setShowWhySizeModal(true)}
                className="text-xs text-yafe-navy/60 underline decoration-yafe-navy/30 underline-offset-4 hover:text-yafe-navy transition-colors cursor-pointer"
              >
                Size Guide
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {allSizes.map((size) => {
                const isAvailable = product.sizes.includes(size);
                const isRecommended = size === recommendedSize;
                const isSelected = size === selectedSize;
                return (
                  <button
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    className={`flex-none w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer relative ${
                      !isAvailable
                        ? 'border border-yafe-navy/10 bg-yafe-navy/5 text-yafe-navy/30 line-through cursor-not-allowed'
                        : isSelected
                          ? 'border border-yafe-navy bg-yafe-navy text-yafe-cream shadow-md scale-105'
                          : 'border border-yafe-navy/20 bg-transparent text-yafe-navy hover:border-yafe-navy'
                    }`}
                  >
                    {size}
                    {isRecommended && !isSelected && isAvailable && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-yafe-terracotta rounded-full border-2 border-yafe-cream shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fit Note */}
            <div className="mt-4 flex items-start gap-2 bg-yafe-terracotta/5 p-3 border border-yafe-terracotta/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yafe-terracotta mt-0.5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              <p className="text-xs text-yafe-navy/80 leading-relaxed">
                <span className="font-medium text-yafe-terracotta">Fit Note:</span> {product.sizeInsight}
              </p>
            </div>
          </div>

          {/* Accordion sections */}
          <div className="border-t border-yafe-navy/10">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full py-4 flex justify-between items-center cursor-pointer"
            >
              <span className="text-sm font-medium tracking-wide uppercase">Details &amp; Care</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${detailsOpen ? 'rotate-45' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            {detailsOpen && (
              <div className="pb-4 text-sm text-yafe-navy/70 space-y-3 font-light">
                <p>70% Cotton, 25% Polyester, 5% Elastane. Machine wash cold, hang dry.</p>
              </div>
            )}

            <button
              onClick={() => setShippingOpen(!shippingOpen)}
              className="w-full py-4 border-t border-yafe-navy/10 flex justify-between items-center cursor-pointer"
            >
              <span className="text-sm font-medium tracking-wide uppercase">Shipping &amp; Returns</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${shippingOpen ? 'rotate-45' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            {shippingOpen && (
              <div className="pb-4 text-sm text-yafe-navy/70 space-y-2 font-light">
                <p>Standard delivery: 2-3 business days (Lagos) — ₦2,500</p>
                <p>Same day VIP: Order before 12pm — ₦5,000</p>
                <p>Free returns within 7 days.</p>
              </div>
            )}
          </div>

          {/* Artisan Section */}
          <div className="mt-10 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-yafe-terracotta mb-4 block">Made By</span>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-yafe-gray-100 overflow-hidden flex-shrink-0">
                <img src={artisanHeroImage} className="w-full h-full object-cover" alt={product.artisanName} />
              </div>
              <div>
                <h4 className="font-serif text-base text-yafe-navy">{product.artisanName}</h4>
                <p className="text-xs text-yafe-navy/60">{product.artisanYears} years of experience</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 border-t border-yafe-navy/10 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-serif text-xl text-yafe-navy">Reviews</h3>
              <StarRating rating={5} size={16} />
              <span className="text-xs text-yafe-navy/50">4.8 (23)</span>
            </div>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.name} className="bg-white rounded-xl p-4 border border-yafe-navy/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-yafe-navy text-sm">{review.name}</span>
                    <StarRating rating={review.rating} size={12} />
                  </div>
                  <p className="text-sm text-yafe-navy/70 leading-relaxed font-light">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-yafe-cream/95 backdrop-blur-md border-t border-yafe-navy/10 p-5 z-50 pb-8">
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 text-sm font-medium tracking-widest uppercase flex justify-center items-center gap-3 transition-all shadow-lg shadow-yafe-navy/10 cursor-pointer ${
            addedToCart
              ? 'bg-green-600 text-white'
              : 'bg-yafe-navy text-yafe-cream hover:bg-[#2A2A4E]'
          }`}
        >
          {addedToCart ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Added to Bag!
            </>
          ) : (
            <>Add to Bag <span className="w-px h-4 bg-yafe-cream/30" /> {formatPrice(product.price)}</>
          )}
        </button>
      </div>

      {/* Why This Size Modal */}
      {showWhySizeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={() => setShowWhySizeModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-yafe-navy">Why Size {recommendedSize}?</h3>
              <button onClick={() => setShowWhySizeModal(false)} className="text-yafe-gray-400 hover:text-yafe-navy transition cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <div className="space-y-3 text-sm text-yafe-navy/70 font-light">
              <p>Based on your fit profile, we matched your measurements against this garment&apos;s specific cut and fabric stretch.</p>
              <div className="bg-yafe-cream rounded-lg p-3 space-y-2">
                <div className="flex justify-between"><span>Confidence</span><span className="font-semibold text-yafe-terracotta">94%</span></div>
                <div className="flex justify-between"><span>Fit preference</span><span className="font-medium text-yafe-navy">Regular</span></div>
                <div className="flex justify-between"><span>Based on</span><span className="font-medium text-yafe-navy">Your quiz answers</span></div>
              </div>
              <p className="text-xs text-yafe-gray-400">{product.sizeInsight}</p>
            </div>
            <button onClick={() => setShowWhySizeModal(false)} className="mt-5 w-full py-3 bg-yafe-terracotta text-white font-medium hover:bg-yafe-coral transition cursor-pointer text-sm tracking-widest uppercase">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
