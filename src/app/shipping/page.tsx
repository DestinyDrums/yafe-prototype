import Link from 'next/link';

const shippingOptions = [
  { method: 'Standard Delivery', time: '2-3 Business Days', price: '₦2,500', areas: 'Lagos, Abuja, Port Harcourt', details: 'Tracked delivery via GIG Logistics or DHL. You\'ll receive WhatsApp updates at every stage.' },
  { method: 'Same Day VIP Courier', time: 'Same Day (Order before 12pm)', price: '₦5,000', areas: 'Lagos only', details: 'Personal courier delivery straight to your door. Available Monday-Saturday.' },
  { method: 'Nationwide Delivery', time: '5-7 Business Days', price: '₦4,000', areas: 'All 36 states', details: 'We deliver to every state in Nigeria. Tracking provided via SMS and WhatsApp.' },
];

const faqs = [
  { q: 'Can I track my order?', a: 'Yes! You\'ll receive tracking updates via WhatsApp and SMS as soon as your order ships. You can also track from your account page.' },
  { q: 'Do you ship internationally?', a: 'Not yet — but we\'re working on it! Currently we deliver across all 36 states in Nigeria.' },
  { q: 'What if I\'m not home during delivery?', a: 'Our courier will attempt delivery twice. After that, your order will be held at the nearest pickup point for 7 days.' },
  { q: 'Can I change my delivery address after ordering?', a: 'Yes, as long as the order hasn\'t been shipped yet. Contact us via WhatsApp and we\'ll update it immediately.' },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Delivery</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Shipping Information</h1>
        </div>

        {/* Shipping Options */}
        <div className="space-y-4 mb-14">
          {shippingOptions.map((opt) => (
            <div key={opt.method} className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-serif text-lg text-yafe-navy">{opt.method}</h3>
                  <p className="text-xs text-yafe-terracotta font-medium mt-0.5">{opt.time}</p>
                </div>
                <span className="font-serif text-xl text-yafe-navy">{opt.price}</span>
              </div>
              <p className="text-sm text-yafe-navy/70 font-light leading-relaxed mb-2">{opt.details}</p>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400">Coverage: {opt.areas}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl text-yafe-navy mb-6">Frequently Asked</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-yafe-navy/10 p-6">
                <h3 className="text-sm font-semibold text-yafe-navy mb-2">{faq.q}</h3>
                <p className="text-sm text-yafe-navy/70 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-green-50 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-3">💬</p>
          <h3 className="font-serif text-xl text-yafe-navy mb-2">Need Help?</h3>
          <p className="text-sm text-yafe-navy/60 mb-5 font-light">Our team responds within 30 minutes during business hours.</p>
          <button className="bg-green-600 text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-green-700 transition-colors cursor-pointer">
            Chat on WhatsApp
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link href="/returns" className="text-xs font-medium tracking-widest uppercase text-yafe-terracotta hover:underline">
            View Returns Policy →
          </Link>
        </div>
      </div>
    </main>
  );
}
