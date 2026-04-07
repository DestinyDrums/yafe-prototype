'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

type Category = 'tops' | 'trousers' | 'dresses';

const sizeData: Record<Category, { headers: string[]; rows: string[][] }> = {
  tops: {
    headers: ['Size', 'UK', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)'],
    rows: [
      ['XS', '6', '78-82', '60-64', '86-90'],
      ['S', '8', '82-86', '64-68', '90-94'],
      ['M', '10', '86-90', '68-72', '94-98'],
      ['L', '12', '90-96', '72-78', '98-104'],
      ['XL', '14', '96-102', '78-84', '104-110'],
      ['XXL', '16', '102-108', '84-90', '110-116'],
    ],
  },
  trousers: {
    headers: ['Size', 'UK', 'Waist (cm)', 'Hip (cm)', 'Inseam (cm)'],
    rows: [
      ['XS', '6', '60-64', '86-90', '76'],
      ['S', '8', '64-68', '90-94', '76'],
      ['M', '10', '68-72', '94-98', '78'],
      ['L', '12', '72-78', '98-104', '78'],
      ['XL', '14', '78-84', '104-110', '79'],
      ['XXL', '16', '84-90', '110-116', '79'],
    ],
  },
  dresses: {
    headers: ['Size', 'UK', 'Bust (cm)', 'Waist (cm)', 'Length (cm)'],
    rows: [
      ['XS', '6', '78-82', '60-64', '105'],
      ['S', '8', '82-86', '64-68', '107'],
      ['M', '10', '86-90', '68-72', '109'],
      ['L', '12', '90-96', '72-78', '111'],
      ['XL', '14', '96-102', '78-84', '113'],
      ['XXL', '16', '102-108', '84-90', '115'],
    ],
  },
};

const tips = [
  { icon: '📏', title: 'Measure over undergarments', desc: 'For the most accurate fit, measure yourself in the undergarments you plan to wear.' },
  { icon: '🪞', title: 'Use a mirror', desc: 'Ensure the tape measure sits level around your body for accurate readings.' },
  { icon: '📐', title: 'Between sizes?', desc: 'If you\'re between two sizes, we recommend sizing up for comfort — especially in structured pieces like blazers.' },
  { icon: '🤖', title: 'Try AI Sizing', desc: 'Our Fit Quiz uses your body shape and preferences to recommend the perfect size for each product.' },
];

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('tops');
  const { fitProfile, openQuiz } = useApp();
  const data = sizeData[activeCategory];

  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Fit Reference</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Size Guide</h1>
        </div>

        {/* AI Sizing CTA */}
        {!fitProfile.isComplete && (
          <div className="bg-yafe-navy rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-1">
              <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">AI-Powered</span>
              <h3 className="font-serif text-xl text-white mb-2">Get personalised size recommendations</h3>
              <p className="text-sm text-white/60 font-light">Take our 60-second Fit Quiz and never guess your size again.</p>
            </div>
            <button onClick={openQuiz} className="bg-yafe-terracotta text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer flex-shrink-0">
              Find My Fit
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {(['tops', 'trousers', 'dresses'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-yafe-navy text-yafe-cream'
                  : 'border border-yafe-navy/20 text-yafe-navy hover:border-yafe-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Size Table */}
        <div className="bg-white rounded-2xl border border-yafe-navy/10 overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yafe-navy/10">
                  {data.headers.map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => {
                  const isRecommended = fitProfile.isComplete && row[0] === fitProfile.baseSize;
                  return (
                    <tr key={i} className={`border-b border-yafe-navy/5 last:border-0 ${isRecommended ? 'bg-yafe-terracotta/5' : ''}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-semibold text-yafe-navy' : 'text-yafe-navy/70'}`}>
                          {cell}
                          {j === 0 && isRecommended && (
                            <span className="ml-2 text-[9px] font-bold tracking-widest uppercase text-yafe-terracotta bg-yafe-terracotta/10 px-2 py-0.5 rounded-full">
                              Your Size
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Tips */}
        <h2 className="font-serif text-2xl text-yafe-navy mb-6">How to Measure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-2xl border border-yafe-navy/10 p-5">
              <div className="text-2xl mb-3">{tip.icon}</div>
              <h3 className="font-serif text-base text-yafe-navy mb-1">{tip.title}</h3>
              <p className="text-sm text-yafe-navy/70 font-light leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
