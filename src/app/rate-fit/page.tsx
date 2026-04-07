'use client';

import { useState } from 'react';
import Link from 'next/link';

const fitOptions = [
  { id: 'perfect', label: 'Perfect!', icon: '★' },
  { id: 'good', label: 'Good, minor tweaks', icon: '👍' },
  { id: 'okay', label: 'Okay, not ideal', icon: '🤔' },
  { id: 'different', label: 'Would size differently', icon: '↕️' },
];

export default function RateFitPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-yafe-cream flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-12 text-center shadow-[0_4px_24px_rgba(26,26,46,0.06)]">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="font-serif text-2xl text-yafe-navy mb-4">Thank You!</h2>
          <p className="text-sm text-yafe-navy/70 leading-relaxed mb-8 font-light">
            Your feedback improves AI recommendations for everyone in the YAFE community.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-yafe-terracotta text-white px-10 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yafe-cream flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(26,26,46,0.06)]">
        <h1 className="font-serif text-2xl text-yafe-navy text-center mb-8">How Did It Fit?</h1>

        {/* Product Reference */}
        <div className="flex items-center gap-4 p-4 bg-yafe-cream rounded-xl mb-8">
          <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=100&q=80" className="w-14 h-14 rounded-lg object-cover" alt="Product" />
          <div>
            <p className="font-serif text-sm text-yafe-navy font-medium">Classic Tailored Blazer</p>
            <p className="text-xs text-yafe-navy/50 mt-0.5">Size: M</p>
          </div>
        </div>

        <p className="font-medium text-yafe-navy text-sm mb-4">Was your size recommendation accurate?</p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {fitOptions.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`p-5 border-2 rounded-xl text-center transition-colors cursor-pointer ${
                  isSelected ? 'border-yafe-terracotta bg-yafe-terracotta/5' : 'border-yafe-navy/10 hover:border-yafe-navy/20'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="text-xs font-medium text-yafe-navy">{option.label}</div>
              </button>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-xs font-medium tracking-widest uppercase text-yafe-navy mb-2">
            Fit Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Sleeves were slightly long, waist was perfect..."
            rows={3}
            className="w-full p-3 border border-yafe-navy/10 rounded-xl text-sm focus:outline-none focus:border-yafe-terracotta resize-none font-sans"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full py-4 text-sm font-medium tracking-widest uppercase transition-colors cursor-pointer ${
            selected
              ? 'bg-yafe-terracotta text-white hover:bg-[#A95A2F] shadow-xl shadow-yafe-terracotta/20'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
