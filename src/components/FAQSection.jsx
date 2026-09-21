import React, { useState, useEffect } from 'react';
import { client } from '../client';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── hand-drawn accent ───────────────────────────────────── */
const RedCurveArrow = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 90 70" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 60 C 28 28, 62 14, 82 16 M 70 8 L 82 16 L 74 28" />
  </svg>
);

/* ─── tech stack tag ──────────────────────────────────────── */
const TechTag = ({ label }) => (
  <span
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
    className="inline-block text-[10px] font-medium tracking-[0.15em] uppercase text-[#888] border border-[#1e1e1e] bg-[#0e0e0e] px-3 py-1.5"
  >
    {label}
  </span>
);

/* ─── FAQ data ────────────────────────────────────────────── */
const DEFAULT_FAQ_ITEMS = [
  {
    id: '01',
    question: 'HOW DO YOU WORK?',
    content: (
      <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#888] text-sm leading-relaxed tracking-wide">
        Vibe coding at the speed of thought, leveraging AI models for high-agency, hyper-rapid prototypes.
        We skip the bloat and go straight to pixel-perfect execution — from first idea to shipped product,
        faster than most teams write a PRD.
      </p>
    )
  },
  {
    id: '02',
    question: "WHAT'S THE TECH?",
    content: (
      <div className="flex flex-col gap-4">
        <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#888] text-sm leading-relaxed tracking-wide">
          A bleeding-edge stack chosen for raw speed and extreme quality:
        </p>
        <div className="flex flex-wrap gap-2">
          {['NEXT.JS', 'REACT', 'VITE', 'GSAP', 'FRAMER MOTION', 'TAILWIND CSS', 'GEMINI API', 'VERCEL AI SDK', 'TYPESCRIPT', 'THREE.JS'].map(t => (
            <TechTag key={t} label={t} />
          ))}
        </div>
      </div>
    )
  },
  {
    id: '03',
    question: 'DO YOU TAKE ON IMPOSSIBLE DEADLINES?',
    content: (
      <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#888] text-sm leading-relaxed tracking-wide">
        Only if the vibe is right. The more chaotic the scope, the harder we lock in.
        Building the unbuildable is the entire point.
      </p>
    )
  }
];

/* ─── accordion item ──────────────────────────────────────── */
const FaqItem = ({ item, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="relative group"
  >
    {/* hover red glow */}
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none"
      style={{ boxShadow: '0 0 40px rgba(255,255,255,0.08)' }} />

    <div
      onClick={onToggle}
      className="relative cursor-pointer border border-[#ffffff] bg-[#0a0a0a] transition-colors duration-300 group-hover:bg-[#0d0909]"
      style={{
        // chamfered top-left + bottom-right corners
        clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
      }}
    >
      {/* noise layer on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* question row */}
      <button
        className="relative z-10 w-full flex items-center justify-between gap-6 px-6 py-5 md:px-8 md:py-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-5 min-w-0">
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="shrink-0 text-xs font-bold tracking-[0.25em] text-[#ffffff]"
          >
            {item.id} /
          </span>
          <span
            style={{ fontFamily: "'Syne', sans-serif" }}
            className={`font-bold uppercase tracking-tight transition-colors duration-200 text-base md:text-xl ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}
          >
            {item.question}
          </span>
        </div>

        {/* toggle icon */}
        <div className="shrink-0 w-8 h-8 border border-[#ffffff]/40 flex items-center justify-center group-hover:border-[#ffffff] transition-colors duration-200">
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-4 h-4 text-[#ffffff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>

      {/* expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="relative z-10 px-6 pb-6 md:px-8 md:pb-8 pt-0 pl-[4.25rem] md:pl-[4.75rem]">
              {item.content}
              <div className="w-8 h-[2px] bg-[#ffffff] mt-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

/* ─── main component ──────────────────────────────────────── */
const FAQSection = () => {
  const [openId, setOpenId] = useState('01');
  const [faqItems, setFaqItems] = useState(DEFAULT_FAQ_ITEMS);

  useEffect(() => {
    client.fetch('*[_type == "faq"] | order(order asc)').then((data) => {
      if (data && data.length > 0) {
        const formatted = data.map((f, i) => ({
          id: `0${i + 1}`,
          question: f.question,
          content: (
            <div className="flex flex-col gap-4">
              <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#888] text-sm leading-relaxed tracking-wide">
                {f.answer}
              </p>
              {f.tags && f.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <TechTag key={t} label={t} />
                  ))}
                </div>
              )}
            </div>
          )
        }));
        setFaqItems(formatted);
      }
    });
  }, []);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section id="faq-specs" className="relative w-full min-h-screen flex items-center justify-center bg-[#000000] overflow-hidden" style={{ padding: '8vw 0' }}>

      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#ffffff] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#ffffff] rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />

      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* ── content wrapper ────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-24 w-full">

          {/* LEFT COLUMN — heading ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:w-1/2 z-20"
          >
            <div className="mb-6 relative">
              <h2
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg"
              >
                HAVE <br className="hidden lg:block" />
                QUESTIONS?
              </h2>
              <div className="relative inline-block mt-2">
                <h2
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.9] tracking-tight text-[#ffffff]"
                >
                  WE HAVE <br className="hidden lg:block" />
                  ANSWERS.
                </h2>
                {/* hand-drawn accent arrow */}
                <RedCurveArrow className="absolute -top-6 -right-12 lg:-top-12 lg:-right-16 w-16 h-12 lg:w-20 lg:h-14 opacity-70 pointer-events-none transform rotate-12" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — accordion list ──────────────────── */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-4 w-full lg:w-1/2 z-10"
          >
            {faqItems.map(item => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
