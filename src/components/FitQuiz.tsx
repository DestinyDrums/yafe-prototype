'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type FitProfileData = {
  baseSize: string;
  bottomSize: string;
  height: string;
  fitPreference: string;
  problemAreas: string[];
  styleContext: string;
};

interface FitQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: FitProfileData) => void;
}

const COLORS = {
  cream: '#FDF6F0',
  navy: '#1a1a2e',
  terracotta: '#C4703F',
  gold: '#C4A265',
  white: '#FFFFFF',
};

const TOTAL_STEPS = 6;

const US_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const UK_SIZES = ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'];

const BOTTOM_US_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const BOTTOM_NUM_SIZES = ['24', '26', '28', '30', '32', '34'];

const FIT_OPTIONS = [
  { value: 'fitted', label: 'Fitted', description: 'Defined silhouette' },
  { value: 'regular', label: 'Regular', description: 'Comfortable, not tight' },
  { value: 'relaxed', label: 'Relaxed', description: 'Room to breathe' },
];

const PROBLEM_AREAS = [
  'Shoulders often too tight or loose',
  'Bust area doesn\'t fit right',
  'Waist gaps or pulls',
  'Hip area too snug',
  'None of these',
];

const STYLE_OPTIONS = [
  { value: 'corporate', label: 'Corporate formal', description: 'Suits, structured pieces' },
  { value: 'smart-casual', label: 'Smart casual', description: 'Blouses, tailored trousers' },
  { value: 'creative', label: 'Creative / flexible', description: 'Mix of everything' },
];

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

export default function FitQuiz({ isOpen, onClose, onComplete }: FitQuizProps) {
  const [step, setStep] = useState(0);
  const [baseSize, setBaseSize] = useState('');
  const [bottomSize, setBottomSize] = useState('');
  const [fitPreference, setFitPreference] = useState('');
  const [problemAreas, setProblemAreas] = useState<string[]>([]);
  const [height, setHeight] = useState('');
  const [styleContext, setStyleContext] = useState('');

  const reset = () => {
    setStep(0);
    setBaseSize('');
    setBottomSize('');
    setHeight('');
    setFitPreference('');
    setProblemAreas([]);
    setStyleContext('');
  };

  const handleProblemToggle = (area: string) => {
    if (area === 'None of these') {
      setProblemAreas((prev) => prev.includes('None of these') ? [] : ['None of these']);
    } else {
      setProblemAreas((prev) => {
        const without = prev.filter((a) => a !== 'None of these');
        return without.includes(area) ? without.filter((a) => a !== area) : [...without, area];
      });
    }
  };

  const handleComplete = () => {
    onComplete({ baseSize, bottomSize, height, fitPreference, problemAreas, styleContext });
    onClose();
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 1: return baseSize !== '';
      case 2: return bottomSize !== '';
      case 3: return height !== '';
      case 4: return fitPreference !== '';
      case 5: return problemAreas.length > 0;
      case 6: return styleContext !== '';
      default: return true;
    }
  };

  const ProgressBar = ({ current }: { current: number }) => (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex-1 h-1 rounded-full bg-yafe-gray-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-yafe-terracotta"
          initial={{ width: 0 }}
          animate={{ width: `${(current / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs text-yafe-gray-400 whitespace-nowrap font-medium">
        {current} of {TOTAL_STEPS}
      </span>
    </div>
  );

  if (!isOpen) return null;

  const SizeButton = ({ size, selected, onClick }: { size: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="cursor-pointer transition-all"
      style={{
        padding: '10px 18px',
        borderRadius: 100,
        border: `1.5px solid ${selected ? COLORS.terracotta : '#ddd'}`,
        background: selected ? COLORS.terracotta : COLORS.white,
        color: selected ? COLORS.white : COLORS.navy,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {size}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-yafe-navy/55 backdrop-blur-[4px]"
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-[520px] max-h-[90vh] overflow-hidden shadow-[0_24px_80px_rgba(26,26,46,0.18)] mx-4"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 text-yafe-gray-400 hover:text-yafe-navy transition text-xl cursor-pointer bg-transparent border-none p-1"
            >
              ✕
            </button>

            <div className="p-8 pt-9 overflow-y-auto max-h-[90vh]">
              <AnimatePresence mode="wait">

                {/* ── Step 0: Intro ── */}
                {step === 0 && (
                  <motion.div key="step-0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-yafe-cream flex items-center justify-center mx-auto mb-5 text-3xl">📐</div>
                    <h2 className="font-serif text-2xl text-yafe-navy mb-2">Let&apos;s find your perfect fit</h2>
                    <p className="text-sm text-yafe-gray-400 mb-7">5 quick questions. No measuring tape needed.</p>
                    <button
                      onClick={() => setStep(1)}
                      className="bg-yafe-terracotta text-white px-12 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer mb-3"
                    >
                      Let&apos;s Go
                    </button>
                    <p className="text-xs text-yafe-gray-300">Takes under 60 seconds</p>
                  </motion.div>
                )}

                {/* ── Step 1: Top Size ── */}
                {step === 1 && (
                  <motion.div key="step-1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={1} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">What size do you usually wear in tops?</h3>

                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400 mb-2">US / Letter Sizes</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {US_SIZES.map((s) => <SizeButton key={s} size={s} selected={baseSize === s} onClick={() => setBaseSize(s)} />)}
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400 mb-2">UK Sizes</p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {UK_SIZES.map((s) => <SizeButton key={s} size={s} selected={baseSize === s} onClick={() => setBaseSize(s)} />)}
                    </div>

                    <NavButtons onBack={() => setStep(0)} onNext={() => setStep(2)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 2: Bottom Size ── */}
                {step === 2 && (
                  <motion.div key="step-2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={2} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">What size do you usually wear in bottoms?</h3>

                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400 mb-2">US / Letter Sizes</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {BOTTOM_US_SIZES.map((s) => <SizeButton key={s} size={s} selected={bottomSize === s} onClick={() => setBottomSize(s)} />)}
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-yafe-gray-400 mb-2">Waist (inches)</p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {BOTTOM_NUM_SIZES.map((s) => <SizeButton key={s} size={s} selected={bottomSize === s} onClick={() => setBottomSize(s)} />)}
                    </div>

                    <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 3: Height ── */}
                {step === 3 && (
                  <motion.div key="step-3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={3} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">What&apos;s your height?</h3>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {["Under 5'2\"", "5'2\" – 5'4\"", "5'5\" – 5'7\"", "5'8\" – 5'10\"", "5'11\"+"].map((h) => (
                        <button
                          key={h}
                          onClick={() => setHeight(h)}
                          className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                            height === h
                              ? 'border-yafe-terracotta bg-yafe-cream text-yafe-navy'
                              : 'border-yafe-navy/10 bg-white text-yafe-navy hover:border-yafe-navy/20'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>

                    <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 4: Fit Preference ── */}
                {step === 4 && (
                  <motion.div key="step-4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={4} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">How do you like your work clothes to fit?</h3>

                    <div className="flex flex-col gap-2.5 mb-7">
                      {FIT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setFitPreference(opt.value)}
                          className={`flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            fitPreference === opt.value
                              ? 'border-yafe-terracotta bg-yafe-cream'
                              : 'border-yafe-navy/10 bg-white hover:border-yafe-navy/20'
                          }`}
                        >
                          <span className="text-base font-bold text-yafe-navy mb-0.5">{opt.label}</span>
                          <span className="text-xs text-yafe-gray-400">{opt.description}</span>
                        </button>
                      ))}
                    </div>

                    <NavButtons onBack={() => setStep(3)} onNext={() => setStep(5)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 5: Problem Areas ── */}
                {step === 5 && (
                  <motion.div key="step-5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={5} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">Do any of these fit issues sound familiar?</h3>

                    <div className="flex flex-col gap-2 mb-7">
                      {PROBLEM_AREAS.map((area) => {
                        const selected = problemAreas.includes(area);
                        return (
                          <button
                            key={area}
                            onClick={() => handleProblemToggle(area)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left text-sm font-medium text-yafe-navy transition-all cursor-pointer ${
                              selected
                                ? 'border-yafe-terracotta bg-yafe-cream'
                                : 'border-yafe-navy/10 bg-white hover:border-yafe-navy/20'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 text-xs ${
                              selected ? 'border-yafe-terracotta bg-yafe-terracotta text-white' : 'border-yafe-gray-300'
                            }`}>
                              {selected ? '✓' : ''}
                            </span>
                            {area}
                          </button>
                        );
                      })}
                    </div>

                    <NavButtons onBack={() => setStep(4)} onNext={() => setStep(6)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 6: Style Context ── */}
                {step === 6 && (
                  <motion.div key="step-6" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <ProgressBar current={6} />
                    <h3 className="font-serif text-xl text-yafe-navy mb-5">What&apos;s your typical work dress code?</h3>

                    <div className="flex flex-col gap-2.5 mb-7">
                      {STYLE_OPTIONS.map((opt) => {
                        const selected = styleContext === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setStyleContext(opt.value)}
                            className={`flex items-center gap-3.5 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                              selected
                                ? 'border-yafe-terracotta bg-yafe-cream'
                                : 'border-yafe-navy/10 bg-white hover:border-yafe-navy/20'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              selected ? 'border-yafe-terracotta' : 'border-yafe-gray-300'
                            }`}>
                              {selected && <span className="w-2.5 h-2.5 rounded-full bg-yafe-terracotta" />}
                            </span>
                            <div>
                              <span className="block text-sm font-semibold text-yafe-navy">{opt.label}</span>
                              <span className="text-xs text-yafe-gray-400">{opt.description}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <NavButtons onBack={() => setStep(5)} onNext={() => setStep(7)} disabled={!canAdvance()} />
                  </motion.div>
                )}

                {/* ── Step 7: Profile Complete ── */}
                {step === 7 && (
                  <motion.div key="step-7" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 text-2xl text-green-600">✓</div>
                    <h2 className="font-serif text-2xl text-yafe-navy mb-5">Your Fit Profile is Ready!</h2>

                    {/* Summary */}
                    <div className="bg-yafe-cream rounded-xl p-5 text-left mb-7">
                      <SummaryRow label="Top size" value={baseSize} />
                      <SummaryRow label="Bottom size" value={bottomSize} />
                      <SummaryRow label="Height" value={height} />
                      <SummaryRow label="Fit preference" value={FIT_OPTIONS.find((o) => o.value === fitPreference)?.label ?? fitPreference} />
                      <SummaryRow
                        label="Watch areas"
                        value={problemAreas.includes('None of these') ? 'None' : problemAreas.join(', ')}
                        last
                      />
                    </div>

                    <button
                      onClick={handleComplete}
                      className="w-full bg-yafe-terracotta text-white py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-[#A95A2F] transition-colors cursor-pointer mb-3"
                    >
                      Start Shopping
                    </button>
                    <button
                      onClick={reset}
                      className="text-sm text-yafe-terracotta font-medium underline underline-offset-2 cursor-pointer bg-transparent border-none p-1"
                    >
                      Retake Quiz
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Helper Components ── */

function NavButtons({ onBack, onNext, disabled }: { onBack: () => void; onNext: () => void; disabled: boolean }) {
  return (
    <div className="flex justify-between">
      <button
        onClick={onBack}
        className="border border-yafe-navy/15 px-6 py-2.5 text-sm font-medium text-yafe-gray-500 cursor-pointer hover:bg-yafe-navy/5 transition bg-transparent"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={disabled}
        className={`px-8 py-2.5 text-sm font-semibold text-white transition-all cursor-pointer border-none ${
          disabled ? 'bg-yafe-gray-300 opacity-60 cursor-not-allowed' : 'bg-yafe-terracotta hover:bg-[#A95A2F]'
        }`}
      >
        Next
      </button>
    </div>
  );
}

function SummaryRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between items-start py-2.5 gap-4 ${last ? '' : 'border-b border-yafe-navy/10'}`}>
      <span className="text-xs text-yafe-gray-400 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-yafe-navy text-right">{value}</span>
    </div>
  );
}
