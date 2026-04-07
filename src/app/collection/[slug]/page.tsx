'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { getProductImage, collectionHeroImages } from '@/data/images';

const collections: Record<string, { name: string; tagline: string; description: string; products: number[] }> = {
  'power-moves': {
    name: 'Power Moves',
    tagline: 'Command Every Room',
    description: 'Structured silhouettes and bold cuts designed for the woman who leads. From boardroom presentations to evening networking — this collection moves with your ambition.',
    products: [0, 1, 2, 3],
  },
  'weekend-edit': {
    name: 'The Weekend Edit',
    tagline: 'Off-Duty Elegance',
    description: 'Relaxed fits and breathable fabrics for when the weekend calls. Still unmistakably YAFE — just with the volume turned down.',
    products: [4, 5, 6, 7],
  },
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = collections[slug];

  if (!collection) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-2xl text-yafe-navy mb-2">Collection not found</h1>
        <p className="text-yafe-gray-400 mb-6 font-light">This collection doesn&apos;t exist yet.</p>
        <Link href="/shop" className="bg-yafe-terracotta text-white px-8 py-3 text-sm font-medium tracking-widest uppercase">
          Browse Shop
        </Link>
      </div>
    );
  }

  const collectionProducts = collection.products.map((i) => products[i]);

  return (
    <main className="min-h-screen bg-yafe-cream">
      {/* Hero */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/7] overflow-hidden">
        <img src={collectionHeroImages[slug] || collectionHeroImages['power-moves']} className="w-full h-full object-cover object-top" alt={collection.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-[#1A1A2E]/30 to-transparent flex flex-col justify-end p-6 sm:p-12 lg:p-20 pb-10 sm:pb-16">
          <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Limited Drop</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-yafe-cream font-medium leading-tight mb-3">
            {collection.name}
          </h1>
          <p className="text-yafe-cream/90 text-sm sm:text-base font-light tracking-wide max-w-md mb-8">
            {collection.tagline}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest uppercase text-yafe-cream/70">Drop ends in</span>
            <div className="flex gap-2">
              {['02', '14', '59'].map((val, i) => (
                <div key={i} className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center font-serif text-lg text-yafe-gold">
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-xl sm:text-2xl text-yafe-navy leading-relaxed italic">
            &ldquo;{collection.description}&rdquo;
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="px-5 sm:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-yafe-navy">The Collection</h2>
            <span className="text-xs font-medium tracking-widest uppercase text-yafe-navy/50">{collectionProducts.length} Pieces</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {collectionProducts.map((product, i) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                  <img
                    src={getProductImage(product.id)}
                    className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                    alt={product.name}
                  />
                  <div className="absolute bottom-3 left-3 bg-yafe-cream/95 backdrop-blur text-yafe-navy text-[9px] font-semibold px-2.5 py-1 uppercase tracking-widest shadow-sm">
                    Your size: M
                  </div>
                </div>
                <h3 className="font-sans font-medium text-sm text-yafe-navy tracking-wide mb-1 group-hover:text-yafe-terracotta transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-yafe-navy/70">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insiders CTA */}
      <section className="py-14 px-6 bg-yafe-navy text-center">
        <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">YAFE Insiders</span>
        <h3 className="font-serif text-2xl text-white mb-3">Want first access to every drop?</h3>
        <p className="text-sm text-white/60 mb-8 font-light max-w-sm mx-auto">Insiders shop 24 hours early and vote on upcoming designs.</p>
        <Link href="/insiders" className="border border-yafe-gold text-yafe-gold px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-yafe-gold hover:text-yafe-navy transition-colors">
          Join Insiders
        </Link>
      </section>
    </main>
  );
}
