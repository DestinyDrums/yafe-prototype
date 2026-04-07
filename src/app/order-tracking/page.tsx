'use client';

import Link from 'next/link';

const trackingSteps = [
  { label: 'Order Confirmed', time: 'Mar 28, 2:15 PM', done: true },
  { label: 'Being Prepared', time: 'Mar 28, 4:30 PM', done: true },
  { label: 'Shipped', time: 'Mar 29, 9:00 AM', done: true },
  { label: 'Out for Delivery', time: 'Mar 30, 10:45 AM', done: true },
  { label: 'Delivered', time: 'Mar 30, 2:20 PM', done: false },
];

export default function OrderTrackingPage() {
  return (
    <main className="min-h-screen bg-yafe-cream">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block">Order Status</span>
          <h1 className="font-serif text-3xl text-yafe-navy font-medium">Track Your Order</h1>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-yafe-navy">#YAFE-2024-0847</p>
              <p className="text-xs text-yafe-gray-400 mt-0.5">Placed March 28, 2024</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-yafe-terracotta bg-yafe-terracotta/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-yafe-terracotta animate-pulse" />
              In Transit
            </span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-yafe-cream rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=100&q=80"
              className="w-14 h-14 rounded-lg object-cover"
              alt="Product"
            />
            <div>
              <p className="font-serif text-sm text-yafe-navy font-medium">The Ikoyi Linen Wrap</p>
              <p className="text-xs text-yafe-navy/50 mt-0.5">Size: M · Qty: 1</p>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6 mb-8">
          <h2 className="font-serif text-xl text-yafe-navy mb-6">Delivery Progress</h2>

          <div className="relative">
            {trackingSteps.map((step, i) => {
              const isLast = i === trackingSteps.length - 1;
              return (
                <div key={step.label} className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                      step.done
                        ? 'bg-yafe-terracotta border-yafe-terracotta'
                        : 'bg-white border-yafe-navy/20'
                    }`}>
                      {step.done && (
                        <svg className="w-full h-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 flex-1 mt-1 ${step.done ? 'bg-yafe-terracotta' : 'bg-yafe-navy/10'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="-mt-0.5">
                    <p className={`text-sm font-semibold ${step.done ? 'text-yafe-navy' : 'text-yafe-navy/40'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${step.done ? 'text-yafe-gray-400' : 'text-yafe-navy/25'}`}>
                      {step.done ? step.time : 'Estimated: ' + step.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl border border-yafe-navy/10 p-6 mb-8">
          <h2 className="font-serif text-xl text-yafe-navy mb-4">Delivery Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-yafe-gray-400">Delivery to</span>
              <span className="text-yafe-navy font-medium text-right">14 Admiralty Way, Lekki Phase 1, Lagos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yafe-gray-400">Method</span>
              <span className="text-yafe-navy font-medium">Standard (2-3 days)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yafe-gray-400">Courier</span>
              <span className="text-yafe-navy font-medium">GIG Logistics</span>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-green-50 rounded-2xl p-6 text-center mb-8">
          <p className="text-2xl mb-2">📱</p>
          <p className="text-sm text-green-700 font-medium mb-1">Get updates via WhatsApp</p>
          <p className="text-xs text-green-600/70 mb-4 font-light">Real-time notifications when your order moves</p>
          <button className="bg-green-600 text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-green-700 transition-colors cursor-pointer">
            Enable WhatsApp Updates
          </button>
        </div>

        <div className="flex gap-3">
          <Link href="/rate-fit" className="flex-1 py-3.5 border border-yafe-navy/15 text-yafe-navy text-xs font-medium tracking-widest uppercase text-center hover:bg-yafe-navy/5 transition">
            Rate Fit
          </Link>
          <Link href="/shop" className="flex-1 py-3.5 bg-yafe-terracotta text-white text-xs font-medium tracking-widest uppercase text-center hover:bg-[#A95A2F] transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
