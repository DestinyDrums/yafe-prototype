'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Shared drop date — 3 days from first load
const DROP_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function FlipDigit({ value, size = 'lg' }: { value: number; size?: 'sm' | 'lg' }) {
  const display = String(value).padStart(2, '0');
  const dims = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
  const text = size === 'sm' ? 'text-xl' : 'text-2xl';
  return (
    <div className="relative overflow-hidden">
      <div className={`${dims} bg-white/10 rounded-lg shadow-inner`}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ transform: 'translateY(-16px)', opacity: 0 }}
            animate={{ transform: 'translateY(0px)', opacity: 1 }}
            exit={{ transform: 'translateY(16px)', opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className={`absolute inset-0 flex items-center justify-center font-serif ${text} text-yafe-gold`}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Full countdown with labels — used on /insiders */
export function CountdownFull() {
  const countdown = useCountdown(DROP_DATE);
  return (
    <div className="flex gap-3 items-start">
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.days} />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Days</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.hours} />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Hrs</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.minutes} />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Min</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.seconds} />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Sec</span>
      </div>
    </div>
  );
}

/** Compact countdown — used on homepage bar */
export function CountdownCompact() {
  const countdown = useCountdown(DROP_DATE);
  return (
    <div className="flex gap-2.5 items-start">
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.days} size="sm" />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Days</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-2">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.hours} size="sm" />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Hrs</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-2">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.minutes} size="sm" />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Min</span>
      </div>
      <span className="text-yafe-gold font-serif text-lg mt-2">:</span>
      <div className="flex flex-col items-center">
        <FlipDigit value={countdown.seconds} size="sm" />
        <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">Sec</span>
      </div>
    </div>
  );
}
