'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getProductImage } from '@/data/images';

const steps = ['Shipping', 'Payment', 'Review'];

function formatNaira(amount: number) {
  return '₦' + amount.toLocaleString();
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useApp();
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'card' | 'pod'>('transfer');

  const deliveryCost = deliveryOption === 'express' ? 5000 : 2500;
  const subtotal = cartTotal;
  const total = subtotal + deliveryCost;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center px-5 py-4 z-50">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : history.back()}
          className="mr-4 p-1 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h2 className="font-serif text-lg font-bold mx-auto pr-9 text-yafe-navy">Secure Checkout</h2>
      </div>

      <div className="p-6 pb-20 max-w-md mx-auto w-full">
        {/* Step Indicator */}
        <div className="relative flex justify-between items-center mb-14 mt-2 px-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-200 -z-10" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-yafe-navy -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((label, i) => {
            const stepNum = i + 1;
            const isActive = step >= stepNum;
            return (
              <div key={label} className="flex flex-col items-center gap-2 bg-white px-2 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ring-4 ring-white transition-colors ${
                  isActive ? 'bg-yafe-navy text-white shadow-md' : 'border-2 border-gray-200 bg-white text-gray-400'
                }`}>
                  {step > stepNum ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : stepNum}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest absolute -bottom-6 ${
                  isActive ? 'text-yafe-navy' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Cart Items Preview */}
        <div className="space-y-3 mb-10">
          {cartItems.length === 0 && (
            <div className="bg-yafe-cream/50 border border-yafe-navy/5 p-6 rounded-xl text-center">
              <p className="text-sm text-yafe-navy/60 mb-3">Your cart is empty</p>
              <Link href="/shop" className="text-xs text-yafe-terracotta underline font-medium">Browse Shop</Link>
            </div>
          )}
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="relative bg-yafe-cream/50 border border-yafe-navy/5 py-3.5 px-4 rounded-xl flex gap-3.5 items-center">
              <img src={item.image || getProductImage(item.id)} className="w-14 h-[70px] object-cover rounded-lg flex-shrink-0" alt={item.name} />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-serif text-sm leading-[18px] text-yafe-navy">{item.name}</h4>
                  <p className="text-[10px] leading-3 text-yafe-navy/50 font-medium tracking-[0.06em] uppercase">Size: {item.size}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center rounded-[20px] border border-yafe-navy/10">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-[26px] h-[26px] flex items-center justify-center text-xs text-yafe-navy hover:bg-black/5 rounded-full cursor-pointer">&minus;</button>
                    <span className="w-[18px] text-center text-[11px] font-medium text-yafe-navy">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-[26px] h-[26px] flex items-center justify-center text-xs text-yafe-navy hover:bg-black/5 rounded-full cursor-pointer">+</button>
                  </div>
                  <p className="text-[13px] font-semibold text-yafe-navy">{formatNaira(item.price * item.quantity)}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id, item.size)} className="absolute top-3 right-3.5 p-1 hover:bg-black/5 rounded-full text-yafe-navy/40 cursor-pointer">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-2xl mb-6 text-yafe-navy">Shipping Details</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-7">
              {[
                { id: 'fname', label: 'Full Name', type: 'text', value: 'Chioma Adebayo' },
                { id: 'email', label: 'Email Address', type: 'email', value: 'chioma.a@example.com' },
                { id: 'phone', label: 'Phone Number', type: 'tel', value: '+234 803 123 4567' },
                { id: 'address', label: 'Street Address', type: 'text', value: '14 Admiralty Way, Lekki Phase 1' },
              ].map((field) => (
                <div key={field.id} className="relative">
                  <input
                    type={field.type}
                    id={field.id}
                    className="peer w-full border-b border-gray-300 py-2.5 bg-transparent text-sm text-yafe-navy focus:outline-none focus:border-yafe-terracotta placeholder-transparent transition-colors"
                    placeholder={field.label}
                    defaultValue={field.value}
                  />
                  <label
                    htmlFor={field.id}
                    className="absolute left-0 -top-3.5 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-yafe-terracotta"
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              {/* Delivery Method */}
              <div className="pt-6">
                <h4 className="text-xs font-bold tracking-widest uppercase text-yafe-navy mb-4">Delivery Method</h4>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors relative overflow-hidden ${
                    deliveryOption === 'standard' ? 'border-yafe-terracotta bg-yafe-terracotta/5' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    {deliveryOption === 'standard' && <div className="absolute left-0 top-0 w-1 h-full bg-yafe-terracotta" />}
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === 'standard' ? 'border-yafe-terracotta' : 'border-gray-300'
                      }`}>
                        {deliveryOption === 'standard' && <div className="w-2.5 h-2.5 bg-yafe-terracotta rounded-full" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-yafe-navy">Standard Delivery</div>
                        <div className="text-xs text-gray-500 mt-0.5">2-3 Business Days</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-yafe-navy">₦2,500</div>
                    <input type="radio" name="delivery" value="standard" checked={deliveryOption === 'standard'} onChange={() => setDeliveryOption('standard')} className="hidden" />
                  </label>

                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    deliveryOption === 'express' ? 'border-yafe-terracotta bg-yafe-terracotta/5' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === 'express' ? 'border-yafe-terracotta' : 'border-gray-300'
                      }`}>
                        {deliveryOption === 'express' && <div className="w-2.5 h-2.5 bg-yafe-terracotta rounded-full" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-yafe-navy">Same Day VIP Courier</div>
                        <div className="text-xs text-gray-500 mt-0.5">Order before 12pm</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-yafe-navy">₦5,000</div>
                    <input type="radio" name="delivery" value="express" checked={deliveryOption === 'express'} onChange={() => setDeliveryOption('express')} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-yafe-terracotta text-white py-4 mt-10 text-sm font-medium tracking-widest uppercase flex justify-center items-center gap-3 hover:bg-[#A95A2F] transition-all shadow-xl shadow-yafe-terracotta/20 cursor-pointer"
              >
                Continue to Payment
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-2xl mb-6 text-yafe-navy">Payment Method</h3>
            <div className="space-y-3 mb-8">
              {[
                { id: 'transfer', label: 'Bank Transfer', desc: 'Pay directly to our account' },
                { id: 'card', label: 'Card Payment', desc: 'Visa, Mastercard, Verve' },
                { id: 'pod', label: 'Pay on Delivery', desc: 'Lagos only, +₦500 fee' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                  className={`w-full flex items-center gap-4 p-4 border rounded-lg text-left transition-colors cursor-pointer ${
                    paymentMethod === method.id ? 'border-yafe-terracotta bg-yafe-terracotta/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === method.id ? 'border-yafe-terracotta' : 'border-gray-300'
                  }`}>
                    {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-yafe-terracotta rounded-full" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-yafe-navy">{method.label}</div>
                    <div className="text-xs text-gray-500">{method.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-yafe-cream/50 rounded-xl p-5 mb-8 border border-yafe-navy/5">
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Delivery</span><span>{formatNaira(deliveryCost)}</span></div>
              <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-yafe-navy/10"><span>Total</span><span>{formatNaira(total)}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-4 border border-gray-200 text-yafe-navy text-sm font-medium tracking-widest uppercase cursor-pointer hover:bg-gray-50 transition">
                Back
              </button>
              <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-yafe-terracotta text-white text-sm font-medium tracking-widest uppercase cursor-pointer hover:bg-[#A95A2F] transition shadow-xl shadow-yafe-terracotta/20">
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            className="text-center pt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.15 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </motion.div>
            <h2 className="font-serif text-2xl text-yafe-navy mb-2">Order Confirmed!</h2>
            <p className="text-xs text-gray-400 mb-1">Order number</p>
            <p className="text-lg font-bold text-yafe-terracotta mb-6">#YAFE-2024-0847</p>
            <p className="text-sm text-yafe-navy/70 mb-2 font-light">Your order will be delivered in 2-3 business days</p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 rounded-lg mb-8">
              <span>📱</span>
              <span className="text-xs text-green-600 font-medium">We&apos;ll send tracking updates via email and WhatsApp</span>
            </div>

            <div className="flex gap-3 mt-6">
              <Link href="/rate-fit" className="flex-1 py-4 border border-gray-200 text-yafe-navy text-sm font-medium tracking-widest uppercase text-center hover:bg-gray-50 transition">
                Rate Fit
              </Link>
              <Link href="/shop" className="flex-1 py-4 bg-yafe-terracotta text-white text-sm font-medium tracking-widest uppercase text-center hover:bg-[#A95A2F] transition">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        )}

        {/* Security badge */}
        <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mt-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
          <span>Secure SSL Encrypted Checkout</span>
        </div>
      </div>
    </div>
  );
}
