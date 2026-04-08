import Link from 'next/link';
import { aboutHeroImage } from '@/data/images';

const values = [
  { icon: '🌍', title: 'Locally Made', desc: 'Every YAFE piece is crafted by talented women artisans in Lagos. We believe in keeping production local, supporting communities, and celebrating Nigerian craftsmanship.' },
  { icon: '📐', title: 'AI-Sized for You', desc: 'Our proprietary sizing algorithm learns your body shape and preferences to recommend the perfect fit — so you never have to guess again.' },
  { icon: '💰', title: 'Accessible Luxury', desc: 'Premium quality workwear at ₦30-40k. We cut out middlemen and excessive markups to bring you pieces that look and feel expensive without the price tag.' },
  { icon: '♻️', title: 'Zero Waste', desc: 'Offcut fabrics are transformed into accessories. We design with sustainability in mind, from fabric selection to packaging.' },
];

const timeline = [
  { year: '2025', event: 'YAFE was born from a simple frustration — why can\'t professional Nigerian women find quality workwear at fair prices?' },
  { year: '2026 Q1', event: 'First collection launched with 5 artisans in Surulere. Sold out in 72 hours.' },
  { year: '2026 Q2', event: 'AI sizing engine launched. Returns dropped by 60%.' },
  { year: '2026 Q3', event: 'YAFE Insiders community grew to 2,000+ members. Community-voted designs became our best sellers.' },
  { year: 'Now', event: 'Expanding our artisan network and building the future of accessible African fashion.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-yafe-cream">
      {/* Hero */}
      <section className="relative w-full aspect-[16/9] sm:aspect-[16/6] overflow-hidden">
        <img
          src={aboutHeroImage}
          className="w-full h-full object-cover"
          alt="YAFE workshop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-[#1A1A2E]/30 to-transparent flex flex-col justify-end p-6 sm:p-12 lg:p-20">
          <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-yafe-cream font-medium leading-tight max-w-xl">
            For Women that Show Up<br />and Stand Out.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Our Mission</span>
          <p className="font-serif text-2xl sm:text-3xl text-yafe-navy leading-relaxed italic">
            &ldquo;To make every young professional Nigerian woman feel powerful in what she wears — without breaking the bank.&rdquo;
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">The Gap</span>
            <h2 className="font-serif text-3xl text-yafe-navy font-medium">Why YAFE Exists</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-yafe-cream rounded-2xl p-8">
              <p className="font-serif text-4xl text-yafe-terracotta mb-3">₦5-10k</p>
              <p className="text-xs font-bold tracking-widest uppercase text-yafe-navy mb-2">Fast Fashion</p>
              <p className="text-sm text-yafe-navy/60 font-light">Cheap but looks it. Falls apart after 3 washes. Not office-appropriate.</p>
            </div>
            <div className="bg-yafe-navy rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase text-yafe-gold bg-yafe-gold/20 px-2 py-1 rounded-full">YAFE</div>
              <p className="font-serif text-4xl text-yafe-gold mb-3">₦30-40k</p>
              <p className="text-xs font-bold tracking-widest uppercase text-white mb-2">The Sweet Spot</p>
              <p className="text-sm text-white/70 font-light">Premium quality, perfect fit, made by local artisans. Boardroom-ready.</p>
            </div>
            <div className="bg-yafe-cream rounded-2xl p-8">
              <p className="font-serif text-4xl text-yafe-terracotta mb-3">₦80k+</p>
              <p className="text-xs font-bold tracking-widest uppercase text-yafe-navy mb-2">IG RTW Brands</p>
              <p className="text-sm text-yafe-navy/60 font-light">Beautiful but unaffordable for most. Same quality, 2-3x the price.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">What We Stand For</span>
            <h2 className="font-serif text-3xl text-yafe-navy font-medium">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-yafe-navy/10 p-8">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl text-yafe-navy mb-2">{v.title}</h3>
                <p className="text-sm text-yafe-navy/70 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-yafe-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Our Journey</span>
            <h2 className="font-serif text-3xl text-yafe-navy font-medium">The YAFE Timeline</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-yafe-terracotta flex-shrink-0 mt-1" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-yafe-terracotta/20 mt-1" />}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-yafe-terracotta mb-1">{t.year}</p>
                  <p className="text-sm text-yafe-navy/80 leading-relaxed font-light">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-serif text-3xl text-yafe-navy mb-4 font-medium">Start Building Your Wardrobe</h2>
        <p className="text-sm text-yafe-navy/60 mb-8 font-light max-w-md mx-auto">Join thousands of women who chose quality, fit, and purpose.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="bg-yafe-terracotta text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors">
            Shop Now
          </Link>
          <Link href="/artisans" className="border border-yafe-navy/20 text-yafe-navy px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-yafe-navy hover:text-white transition-colors">
            Meet Our Artisans
          </Link>
        </div>
      </section>
    </main>
  );
}
