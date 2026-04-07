'use client';

import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { getProductImage, heroImage, artisanHeroImage } from '@/data/images';
import { useApp } from '@/context/AppContext';

const bestSellers = products.slice(0, 4);

export default function Home() {
  const { openQuiz } = useApp();
  return (
    <div className="flex flex-col">
      {/* ─── Hero Section — Full-Bleed Image ─── */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/7] bg-gray-200 overflow-hidden">
        <img
          src={heroImage}
          className="w-full h-full object-cover object-top"
          alt="Fashion model in elegant warm tone attire"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-[#1A1A2E]/20 to-transparent flex flex-col justify-end p-6 pb-10 sm:p-12 sm:pb-16 lg:p-20 lg:pb-20">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-yafe-cream mb-3 leading-tight font-medium drop-shadow-md">
            Elevated essentials<br />for the woman<br />going places.
          </h2>
          <p className="text-yafe-cream/90 font-sans text-sm sm:text-base mb-8 max-w-md font-light tracking-wide drop-shadow-sm">
            Tailored for the boardroom, the client call, and the elevator where you pretend not to notice your reflection. Premium fabrics. Clean cuts. Made by women who get it — because we're going places too.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-yafe-terracotta text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors shadow-lg shadow-yafe-navy/20"
            >
              Shop The Drop
            </Link>
            <button
              onClick={openQuiz}
              className="border border-white/40 text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
            >
              Find My Fit
            </button>
          </div>
        </div>
      </section>

      {/* ─── New Arrivals Grid ─── */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 sm:mb-10">
            <h3 className="font-serif text-3xl sm:text-4xl text-yafe-navy">New Arrivals</h3>
            <Link
              href="/shop"
              className="text-xs font-medium tracking-widest uppercase border-b border-yafe-navy pb-1 hover:text-yafe-terracotta hover:border-yafe-terracotta transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {bestSellers.map((product, i) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                  <img
                    src={getProductImage(product.id)}
                    className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                    alt={product.name}
                  />
                  {i === 0 && (
                    <div className="absolute top-3 left-3 bg-yafe-cream/95 backdrop-blur text-yafe-navy text-[9px] font-semibold px-2.5 py-1 uppercase tracking-widest shadow-sm">
                      Runs Small - Size Up
                    </div>
                  )}
                  {i === 2 && (
                    <div className="absolute top-3 left-3 bg-yafe-navy/95 backdrop-blur text-yafe-cream text-[9px] font-semibold px-2.5 py-1 uppercase tracking-widest shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>
                <h4 className="font-sans font-medium text-sm text-yafe-navy tracking-wide mb-1 group-hover:text-yafe-terracotta transition-colors">
                  {product.name}
                </h4>
                <p className="font-sans text-sm text-yafe-navy/70">
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Meet the Founder ─── */}
      <section className="py-16 px-6 bg-yafe-gray-100 border-y border-yafe-navy/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
              Behind The Brand
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Meet the Founder</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-56 aspect-[3/4] rounded-t-[100px] overflow-hidden mb-8 shadow-xl shadow-yafe-navy/5 relative">
              <img
                src={artisanHeroImage}
                className="w-full h-full object-cover"
                alt="Tolani — Founder of YAFE"
              />
              <div className="absolute inset-0 bg-yafe-navy/10 mix-blend-multiply" />
            </div>

            <h4 className="font-serif text-2xl mb-3 text-yafe-navy">Hey, I&apos;m Tolani.</h4>
            <p className="text-center text-sm text-yafe-navy/80 leading-relaxed mb-10 px-2 font-light max-w-lg">
              Founder, creative director, and the girl who used to screenshot outfits she couldn&apos;t afford. I started YAFE because I believed Nigerian women deserved better than &ldquo;pick two: quality, style, or price.&rdquo; So we said — why not all three? Still figuring things out. Still overdressed for most occasions. Still here for it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── YAFE Insiders — Community Hub ─── */}
      <section className="py-16 bg-yafe-navy text-yafe-cream relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yafe-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="px-5 sm:px-8 mb-8 relative z-10 max-w-7xl mx-auto">
          <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
            YAFE. Insiders
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl mb-3 font-medium">The Community Hub</h3>
          <p className="text-sm text-yafe-cream/70 font-light max-w-md">
            Vote on upcoming designs, influence colorways, and get early access to our limited drops.
          </p>
        </div>

        {/* Countdown Bar */}
        <div className="px-5 sm:px-8 mb-10 relative z-10 max-w-7xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between backdrop-blur-sm max-w-lg">
            <div className="text-xs font-medium tracking-widest uppercase text-yafe-cream/80">Next Drop In</div>
            <div className="flex gap-2.5 items-center">
              {[
                { val: '02', label: 'Days' },
                { val: '14', label: 'Hrs' },
                { val: '59', label: 'Min' },
              ].map((t, i) => (
                <div key={t.label} className="flex items-center gap-2.5">
                  {i > 0 && <div className="text-yafe-gold font-serif text-lg -mt-4">:</div>}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center font-serif text-xl text-yafe-gold shadow-inner">
                      {t.val}
                    </div>
                    <div className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">{t.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vote Cards */}
        <div className="flex overflow-x-auto gap-5 px-5 sm:px-8 pb-8 snap-x snap-mandatory hide-scrollbar relative z-10 max-w-7xl mx-auto">
          {[
            {
              title: 'Aso-Oke Inspired Weave',
              desc: 'Should we bring this textured woven pattern to our signature trench coat for the rainy season?',
              img: '/products/aso_oke.jpeg',
              trending: true,
            },
            {
              title: 'Midnight Indigo Dye',
              desc: 'Thinking of introducing a deep indigo wash for the staple Victoria wide-leg trousers. Thoughts?',
              img: '/products/midnight_indigo.jpeg',
              trending: false,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="min-w-[85%] sm:min-w-[300px] snap-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={card.img}
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-200"
                  alt={card.title}
                />
                {card.trending && (
                  <div className="absolute top-3 right-3 bg-yafe-navy/80 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1 border border-white/10">
                    <span className="text-yafe-terracotta text-xs">🔥</span>
                    <span className="text-[10px] font-medium">Trending</span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-serif text-lg mb-2">{card.title}</h4>
                <p className="text-sm text-white/60 font-light mb-6 flex-1">{card.desc}</p>
                <Link
                  href="/insiders"
                  className={`w-full py-3.5 border text-xs tracking-widest uppercase font-semibold flex justify-center items-center gap-2 transition-colors ${
                    card.trending
                      ? 'border-yafe-gold text-yafe-gold hover:bg-yafe-gold hover:text-yafe-navy'
                      : 'border-white/20 text-white/50 hover:border-yafe-gold hover:text-yafe-gold'
                  }`}
                >
                  Vote Yes ✓
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
