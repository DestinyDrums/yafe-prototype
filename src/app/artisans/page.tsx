'use client';

import Link from 'next/link';
import { artisanImages } from '@/data/images';

const artisans = [
  { name: 'Blessing Okafor', role: 'Master Tailor — Blazers & Structured Pieces', years: 6, quote: 'Every piece I make, I imagine the woman wearing it to her dream job.', img: artisanImages[0] },
  { name: 'Amara Eze', role: 'Lead Seamstress — Dresses & Skirts', years: 8, quote: 'Fabric has a language. I listen before I cut.', img: artisanImages[1] },
  { name: 'Funke Adeyemi', role: 'Pattern Specialist — Trousers', years: 5, quote: 'A perfect fit is when a woman forgets she is wearing it.', img: artisanImages[2] },
  { name: 'Ngozi Uche', role: 'Finishing Expert — Hems & Detailing', years: 4, quote: 'The details nobody sees are the ones that matter the most.', img: artisanImages[3] },
  { name: 'Yetunde Balogun', role: 'Quality Lead — Inspection', years: 7, quote: 'I do not let anything leave this studio unless I would wear it myself.', img: artisanImages[4] },
];

const stats = [
  { value: '100%', label: 'Women Workforce' },
  { value: '5+', label: 'Talented Artisans' },
  { value: '70%', label: 'Revenue Stays Local' },
];

const impacts = [
  { icon: '💰', title: '₦2.4M+ paid to local artisans', desc: 'Fair wages that support families, fund education, and grow communities across Lagos.' },
  { icon: '🧵', title: '500+ garments crafted by hand', desc: 'Each piece is measured, cut, sewn, and finished by skilled hands — never mass-produced.' },
  { icon: '♻️', title: 'Zero waste: offcuts become accessories', desc: 'Leftover fabric is transformed into scrunchies, pocket squares, and packaging.' },
];

export default function ArtisansPage() {
  return (
    <main className="min-h-screen bg-yafe-cream">
      {/* Hero Quote */}
      <section className="w-full py-20 md:py-28 px-6 bg-yafe-cream border-b border-yafe-navy/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-4xl leading-relaxed italic text-yafe-navy">
            &ldquo;Every stitch tells a story of skill, care, and women lifting women&rdquo;
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl md:text-5xl font-bold text-yafe-terracotta">{stat.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest font-semibold text-yafe-navy">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Makers */}
      <section className="w-full py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Our Heritage</span>
            <h2 className="font-serif text-3xl md:text-4xl text-yafe-navy font-medium">Meet the Makers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan) => (
              <div
                key={artisan.name}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(26,26,46,0.06)] hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                {/* Portrait */}
                <div className="h-56 overflow-hidden relative">
                  <img src={artisan.img} className="w-full h-full object-cover" alt={artisan.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1 text-center">
                  <h3 className="font-serif text-xl text-yafe-navy">{artisan.name}</h3>
                  <p className="text-xs text-yafe-terracotta mt-1">{artisan.role}</p>
                  <p className="text-[10px] font-bold text-yafe-gold uppercase tracking-widest mt-1">{artisan.years} years experience</p>
                  <p className="mt-4 text-sm italic text-yafe-navy/70 leading-relaxed font-light flex-1">
                    &ldquo;{artisan.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Impact */}
      <section className="w-full py-16 md:py-24 px-6 bg-yafe-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Sustainability</span>
            <h2 className="font-serif text-3xl md:text-4xl text-yafe-navy font-medium">Your Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(26,26,46,0.05)]">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg text-yafe-navy mb-2">{item.title}</h3>
                <p className="text-sm text-yafe-navy/70 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 md:py-28 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-yafe-navy mb-8 font-medium">
          Start Building Your Wardrobe
        </h2>
        <Link
          href="/shop"
          className="inline-block bg-yafe-terracotta text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors shadow-lg shadow-yafe-terracotta/20"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}
