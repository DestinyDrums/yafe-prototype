import Link from 'next/link';

const steps = [
  { num: '1', title: 'Initiate Return', desc: 'Contact us via WhatsApp within 7 days of delivery. Share your order number and reason for return.' },
  { num: '2', title: 'Pack It Up', desc: 'Place the item in its original packaging with tags attached. We\'ll send a courier to pick it up.' },
  { num: '3', title: 'Get Your Refund', desc: 'Once we receive and inspect the item, your refund is processed within 3-5 business days.' },
];

const policies = [
  { icon: '✓', text: 'Free returns within 7 days of delivery' },
  { icon: '✓', text: 'Items must be unworn with original tags attached' },
  { icon: '✓', text: 'Free pickup from your delivery address (Lagos)' },
  { icon: '✓', text: 'Refund to original payment method' },
  { icon: '✕', text: 'Intimates and swimwear are final sale' },
  { icon: '✕', text: 'Items altered or washed cannot be returned' },
  { icon: '✕', text: 'Sale items are exchange only' },
];

const exchangeSteps = [
  'Contact us via WhatsApp with your order number',
  'Tell us the size or colour you\'d like instead',
  'We\'ll arrange pickup and send the replacement — no extra shipping cost',
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Policy</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Returns & Exchanges</h1>
        </div>

        {/* AI Sizing Note */}
        <div className="bg-yafe-terracotta/5 border border-yafe-terracotta/15 rounded-2xl p-6 mb-10 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">📐</span>
          <div>
            <h3 className="text-sm font-semibold text-yafe-navy mb-1">Did you know?</h3>
            <p className="text-sm text-yafe-navy/70 font-light leading-relaxed">
              YAFE customers who use our AI sizing tool have a <span className="font-semibold text-yafe-terracotta">60% lower return rate</span>. Take the quiz before your next purchase for a better fit.
            </p>
            <Link href="/size-guide" className="inline-block mt-3 text-xs font-medium tracking-widest uppercase text-yafe-terracotta hover:underline">
              Try AI Sizing →
            </Link>
          </div>
        </div>

        {/* How Returns Work */}
        <h2 className="font-serif text-2xl text-yafe-navy mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl border border-yafe-navy/10 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-yafe-navy text-white flex items-center justify-center font-serif text-lg mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-serif text-base text-yafe-navy mb-2">{step.title}</h3>
              <p className="text-sm text-yafe-navy/70 font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Return Policy Details */}
        <h2 className="font-serif text-2xl text-yafe-navy mb-6">Return Policy</h2>
        <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6 mb-14">
          <div className="space-y-3">
            {policies.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  p.icon === '✓' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {p.icon}
                </span>
                <span className="text-sm text-yafe-navy/80">{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exchanges */}
        <h2 className="font-serif text-2xl text-yafe-navy mb-6">Exchanges</h2>
        <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6 mb-14">
          <p className="text-sm text-yafe-navy/70 font-light leading-relaxed mb-5">
            Need a different size or colour? Exchanges are free and easy. Here&apos;s how:
          </p>
          <ol className="space-y-3">
            {exchangeSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yafe-cream flex items-center justify-center text-xs font-bold text-yafe-terracotta flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-yafe-navy/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact */}
        <div className="bg-green-50 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-3">💬</p>
          <h3 className="font-serif text-xl text-yafe-navy mb-2">Start a Return or Exchange</h3>
          <p className="text-sm text-yafe-navy/60 mb-5 font-light">Our team responds within 30 minutes during business hours.</p>
          <button className="bg-green-600 text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-green-700 transition-colors cursor-pointer">
            Chat on WhatsApp
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link href="/shipping" className="text-xs font-medium tracking-widest uppercase text-yafe-terracotta hover:underline">
            ← Shipping Information
          </Link>
        </div>
      </div>
    </main>
  );
}
