'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { insidersVoteImages } from '@/data/images';

const DROP_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

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

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 bg-white/10 rounded-lg overflow-hidden shadow-inner">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-yafe-gold"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[8px] uppercase tracking-widest text-white/40 mt-1.5">{label}</span>
    </div>
  );
}

type NecklineOption = 'vneck' | 'mandarin';

export default function InsidersPage() {
  const [necklineVote, setNecklineVote] = useState<NecklineOption | null>(null);
  const [necklineVotes, setNecklineVotes] = useState({ vneck: 45, mandarin: 55 });
  const [totalNecklineVotes, setTotalNecklineVotes] = useState(127);
  const [colorVote, setColorVote] = useState<string | null>(null);
  const [colorOptions, setColorOptions] = useState([
    { label: 'Earth Tones', percentage: 62 },
    { label: 'Monochrome', percentage: 24 },
    { label: 'Bold Colors', percentage: 14 },
  ]);
  const [copied, setCopied] = useState(false);

  const handleNecklineVote = (option: NecklineOption) => {
    if (necklineVote === option) return;
    const hadPrev = necklineVote !== null;
    setNecklineVote(option);
    setNecklineVotes((prev) => {
      const other: NecklineOption = option === 'vneck' ? 'mandarin' : 'vneck';
      const nv = { ...prev, [option]: prev[option] + 1, [other]: hadPrev ? prev[other] - 1 : prev[other] };
      const t = nv.vneck + nv.mandarin;
      return { vneck: Math.round((nv.vneck / t) * 100), mandarin: Math.round((nv.mandarin / t) * 100) };
    });
    if (!hadPrev) setTotalNecklineVotes((p) => p + 1);
  };

  const handleColorVote = (label: string) => {
    if (colorVote === label) return;
    const hadPrev = colorVote !== null;
    setColorVote(label);
    setColorOptions((prev) => {
      const u = prev.map((o) => {
        if (o.label === label) return { ...o, percentage: o.percentage + 2 };
        if (hadPrev && o.label === colorVote) return { ...o, percentage: o.percentage - 2 };
        return o;
      });
      const t = u.reduce((s, o) => s + o.percentage, 0);
      return u.map((o) => ({ ...o, percentage: Math.round((o.percentage / t) * 100) }));
    });
  };

  const handleCopy = () => { navigator.clipboard.writeText('YAFE-ADE2024'); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const countdown = useCountdown(DROP_DATE);

  return (
    <main className="min-h-screen">
      {/* ─── Hero Section — Dark, Editorial ─── */}
      <section className="relative w-full bg-yafe-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yafe-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yafe-terracotta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white">YAFE Insiders</h1>
            <span className="rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-yafe-gold border border-yafe-gold/30 bg-yafe-gold/5">
              Member
            </span>
          </div>

          {/* Early Access Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔥</span>
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-yafe-coral text-white">Early Access</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2 leading-tight">
              &ldquo;Power Moves&rdquo; Collection drops in 3 days
            </h2>
            <p className="text-sm text-yafe-gold mb-6 font-light">You shop 24hrs early!</p>

            <div className="flex gap-3 mb-8 items-start">
              <FlipDigit value={countdown.days} label="Days" />
              <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
              <FlipDigit value={countdown.hours} label="Hrs" />
              <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
              <FlipDigit value={countdown.minutes} label="Min" />
              <span className="text-yafe-gold font-serif text-lg mt-3.5">:</span>
              <FlipDigit value={countdown.seconds} label="Sec" />
            </div>

            <Link
              href="/collection/power-moves"
              className="inline-block bg-yafe-terracotta text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors"
            >
              Preview Collection
            </Link>
          </div>

          {/* Your Perks — Horizontal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '⚡', label: 'Early drop access' },
              { icon: '🗳️', label: 'Vote on styles' },
              { icon: '💎', label: 'Member-only discounts' },
              { icon: '✨', label: 'Exclusive styling tips' },
            ].map((perk) => (
              <div key={perk.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <span className="text-xl block mb-2">{perk.icon}</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/70">{perk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vote Section — Cream Background ─── */}
      <section className="bg-yafe-cream py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Your Voice Matters</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-yafe-navy font-medium">Vote on the Next Drop</h2>
            <p className="text-sm text-yafe-navy/60 font-light mt-3 max-w-md mx-auto">Which neckline for our next blouse? The community decides.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto mb-6">
            {(['vneck', 'mandarin'] as NecklineOption[]).map((opt) => {
              const isVoted = necklineVote === opt;
              const label = opt === 'vneck' ? 'V-Neck' : 'Mandarin';
              return (
                <div key={opt} className="flex flex-col overflow-hidden">
                  {/* Image area */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-yafe-gray-100">
                    <img
                      src={insidersVoteImages[opt]}
                      className={`w-full h-full object-cover transition-all duration-200 ${isVoted ? '' : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'}`}
                      alt={label}
                    />
                    {isVoted && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-yafe-terracotta rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="bg-white p-4 border border-yafe-navy/10 border-t-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-lg text-yafe-navy">{label}</span>
                      <span className="text-sm font-semibold text-yafe-gold">{necklineVotes[opt]}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-yafe-navy/10 mb-3">
                      <div className="h-full rounded-full bg-yafe-terracotta transition-all duration-200" style={{ width: `${necklineVotes[opt]}%` }} />
                    </div>
                    <button
                      onClick={() => handleNecklineVote(opt)}
                      className={`w-full py-3 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer ${
                        isVoted
                          ? 'bg-yafe-navy text-white'
                          : 'border border-yafe-navy/20 text-yafe-navy hover:bg-yafe-navy hover:text-white'
                      }`}
                    >
                      {isVoted ? 'Voted ✓' : 'Cast Vote'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-yafe-navy/40 tracking-wide">{totalNecklineVotes} Insiders voted</p>
        </div>
      </section>

      {/* ─── Style Polls — Light Section ─── */}
      <section className="bg-white py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-yafe-terracotta text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Community Poll</span>
            <h2 className="font-serif text-3xl text-yafe-navy font-medium">What colour palette for next month?</h2>
          </div>

          <div className="space-y-5">
            {colorOptions.map((option) => {
              const isVoted = colorVote === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleColorVote(option.label)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isVoted ? 'border-yafe-terracotta' : 'border-yafe-navy/20 group-hover:border-yafe-navy/40'
                      }`}>
                        {isVoted && <span className="w-2 h-2 rounded-full bg-yafe-terracotta" />}
                      </span>
                      <span className={`text-sm font-medium transition-colors ${isVoted ? 'text-yafe-terracotta' : 'text-yafe-navy'}`}>
                        {option.label}
                      </span>
                    </div>
                    <span className="font-serif text-lg text-yafe-gold">{option.percentage}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-yafe-navy/5 ml-7" style={{ width: 'calc(100% - 28px)' }}>
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${option.percentage}%`,
                        backgroundColor: isVoted ? '#C4703F' : '#C4A265',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Referral Section — Dark ─── */}
      <section className="bg-yafe-navy py-16 sm:py-20 px-5 sm:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-yafe-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-lg mx-auto text-center relative z-10">
          <span className="text-yafe-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Refer & Earn</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3 font-medium">Give ₦3,000. Get ₦3,000.</h2>
          <p className="text-sm text-white/60 mb-8 font-light max-w-sm mx-auto">
            Share your code with friends. When they shop, you both save. It&apos;s that simple.
          </p>

          {/* Code Box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 backdrop-blur-sm">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">Your Referral Code</p>
            <div className="flex items-center justify-center gap-4">
              <span className="font-mono text-2xl font-bold tracking-widest text-yafe-gold">YAFE-ADE2024</span>
              <button
                onClick={handleCopy}
                className="text-xs font-medium tracking-widest uppercase text-white border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <button className="bg-yafe-terracotta text-white px-10 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer mb-6">
            Share With Friends
          </button>

          <div className="flex justify-center items-center gap-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="font-serif text-2xl text-yafe-gold">3</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40">Friends Joined</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="font-serif text-2xl text-yafe-gold">₦9,000</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40">Credits Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-yafe-cream py-16 px-6 text-center">
        <h2 className="font-serif text-3xl text-yafe-navy mb-4 font-medium">Explore the latest drop</h2>
        <p className="text-sm text-yafe-navy/60 mb-8 font-light">Your early access starts now.</p>
        <Link
          href="/collection/power-moves"
          className="inline-block bg-yafe-terracotta text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors shadow-lg shadow-yafe-terracotta/20"
        >
          Shop Power Moves
        </Link>
      </section>
    </main>
  );
}
