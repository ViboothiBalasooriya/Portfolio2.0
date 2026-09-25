import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#0a0a0a] text-[#e0e0e0]"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* ── Signature Image with Red Blend Hack (z-30 Overlay) ─────────────── */}
      <div 
        className="absolute -bottom-[5%] md:-bottom-[10%] -left-[40%] md:-left-[25%] pointer-events-none select-none z-30"
        style={{ 
          mixBlendMode: 'screen',
          transform: 'rotate(-12deg)',
          width: 'clamp(400px, 40vw, 900px)'
        }}
      >
        <img src="/assets/signature.jpg" alt="Viboothi Signature" style={{ width: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#FF0000', mixBlendMode: 'multiply' }} />
      </div>
      
      {/* ── Massive Thin Background Text (Global z-10) ──────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-10">
        <span 
          className="text-white opacity-[0.04] whitespace-nowrap"
          style={{ 
            fontFamily: 'var(--font-inter)', 
            fontWeight: 700, // Made bolder as requested
            fontSize: 'clamp(70px, 12vw, 200px)',
            letterSpacing: '-0.05em',
            userSelect: 'none'
          }}
        >
          VIBOOTHI
        </span>
      </div>

      {/* ── Left-most Strip (Metadata) (z-20) ──────────────────────── */}
      <div className="hidden md:flex flex-col justify-end w-[15%] relative pb-10 pl-8 z-20 pointer-events-none">
        <div className="text-[10px] md:text-sm leading-tight tracking-tight opacity-50 text-[#e0e0e0]">
          Los-Angeles<br />
          est.2026
        </div>
      </div>

      {/* ── Middle Block (Portrait) ────────────────────────── */}
      <div className="w-full md:w-[35%] relative flex flex-col justify-end min-h-[50vh] md:min-h-screen">
        
        {/* Ash Background Layer (Global z-0, rendering below text) */}
        <div className="absolute inset-0 bg-[#151515] z-0"></div>

        {/* Mobile-only metadata (z-20) */}
        <div className="md:hidden absolute bottom-6 left-6 text-xs leading-tight tracking-tight opacity-50 z-20 text-[#e0e0e0] pointer-events-none">
          Los-Angeles<br />
          est.2026
        </div>

        {/* Main Portrait Image (Global z-20, rendering above text) */}
        <div className="absolute inset-0 w-full h-full flex justify-center items-end z-20 pointer-events-none">
          <img
            src="/assets/about_new_portrait.png"
            alt="Viboothi Balasooriya"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ── Right Column (Text in the dark space) ────────────────────── */}
      <div className="w-full md:w-[50%] relative flex items-center justify-center p-8 md:p-16 min-h-[50vh] md:min-h-screen">
        
        {/* Black Background Layer (Global z-0) */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>

        {/* Paragraph Text Content (Global z-60) */}
        <div className="w-full max-w-2xl z-60 relative flex flex-col gap-6">
          <div className="text-sm md:text-base leading-[1.8] tracking-tight text-justify text-[#d4d4d4]">
            After motion comes a pause - not rest, but recovery. The shoulders still hold the shape of effort, even as the gaze settles. This isn't nothing as absence. It's nothing as everything unnecessary, removed.
          </div>
        </div>

      </div>

      {/* ── Massive Red Section Heading ("about") (z-50 Overlay, Cut off) ─────────────── */}
      <div className="absolute top-[20%] md:top-[30%] -right-[15%] md:-right-[10%] z-50 pointer-events-none select-none">
        <h2 
          style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontWeight: 800, 
            fontSize: 'clamp(50px, 12vw, 200px)',
            color: '#FF0000',
            lineHeight: 0.8,
            letterSpacing: '-0.04em',
            opacity: 0.4
          }}
        >
          about
        </h2>
      </div>

    </section>
  );
};

export default AboutMe;
