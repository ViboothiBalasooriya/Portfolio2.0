import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#0a0a0a] text-[#e0e0e0]"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* ── Left-most Strip (Metadata) ────────────────────────── */}
      <div className="hidden md:flex flex-col justify-end w-[15%] relative pb-10 pl-8">
        <div className="text-[10px] md:text-sm leading-tight tracking-tight opacity-50 text-[#e0e0e0]">
          Los-Angeles<br />
          est.2026
        </div>
      </div>

      {/* ── Middle Block (Portrait) ────────────────────────── */}
      <div className="w-full md:w-[35%] bg-[#151515] relative flex flex-col justify-end min-h-[50vh] md:min-h-screen">
        
        {/* Mobile-only metadata */}
        <div className="md:hidden absolute bottom-6 left-6 text-xs leading-tight tracking-tight opacity-50 z-20 text-[#e0e0e0]">
          Los-Angeles<br />
          est.2026
        </div>

        {/* Main Portrait Image - Fitted to column */}
        <div className="absolute inset-0 w-full h-full flex justify-center items-end">
          <img
            src="/assets/about_new_portrait.png"
            alt="Viboothi Balasooriya"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* ── Right Column (Text in the dark space) ────────────────────── */}
      <div className="w-full md:w-[50%] bg-[#0a0a0a] relative flex items-center justify-center p-8 md:p-16 min-h-[50vh] md:min-h-screen">
        
        {/* Paragraph Text (Moved completely into the right column) */}
        <div className="w-full max-w-2xl z-20">
          <div className="text-lg md:text-[1.35rem] leading-[1.8] tracking-tight text-justify text-[#d4d4d4]">
            After motion comes a pause - not rest, but recovery. The shoulders still hold the shape of effort, even as the gaze settles. This isn't nothing as absence. It's nothing as everything unnecessary, removed.
          </div>
        </div>

      </div>

      {/* ── Massive Handwritten Accent Word ("not.") ─────────────── */}
      <div className="absolute bottom-6 left-[50%] md:left-[50%] -translate-x-1/2 md:-translate-x-1/2 z-30 pointer-events-none">
        <span 
          className="text-[#ffffff] text-[8rem] md:text-[15rem] leading-none tracking-tighter opacity-90"
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
        >
          not.
        </span>
      </div>

    </section>
  );
};

export default AboutMe;
