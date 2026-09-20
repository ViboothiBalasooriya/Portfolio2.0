import React from 'react';
/* ─── hand-drawn SVG accents ─────────────────────────────── */
const UpArrow = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="#ff1919" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 5 15 L 10 10 L 15 15 M 5 10 L 10 5 L 15 10" />
  </svg>
);

const RedScribbleUnderline = () => (
  <svg viewBox="0 0 600 12" preserveAspectRatio="none" fill="none" stroke="#ff1919" strokeWidth="1.5" strokeLinecap="round" className="absolute left-0 -bottom-2 w-full h-3 opacity-90">
    <path d="M 2 8 C 80 2, 200 10, 320 4 C 440 -2, 530 8, 598 4" />
    <path d="M 50 10 C 200 6, 400 12, 550 8" strokeWidth="1" opacity="0.5"/>
  </svg>
);

/* ─── stat block ──────────────────────────────────────────── */
const StatBlock = ({ label, value, sub }) => (
  <div className="flex flex-col gap-1">
    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] font-bold tracking-[0.2em] text-[#ff1919] uppercase">
      {label}
    </span>
    <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tighter">
      {value}
    </span>
    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs font-medium tracking-widest text-[#aaaaaa] uppercase mt-1">
      {sub}
    </span>
  </div>
);

/* ─── badge chip ──────────────────────────────────────────── */
const Chip = ({ label }) => (
  <span
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
    className="inline-block text-[10px] font-medium tracking-[0.1em] uppercase text-[#666666] border border-[#222] px-3 py-1.5"
  >
    {label}
  </span>
);

/* ─── component ───────────────────────────────────────────── */
const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
      style={{ padding: '8vw 0' }}
    >
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#ff1919] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#ff1919] rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
      
      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* ── content wrapper ────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 w-full">
          
          {/* LEFT COLUMN — text + stats */}
          <div className="vibe-reveal-left flex flex-col gap-14 z-20">
            {/* ── heading ──────────────────────────────────────── */}
            <div className="mb-6">
              <h2
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-lg"
              >
                I AM A <br />
                <span className="text-[#ff1919]">VIBE</span> <br />
                <span className="text-[#ff1919]">CODER</span>
              </h2>
              <div className="relative inline-block mt-2">
                <h2
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-white"
                >
                  BUILDING THE<br/>UNBUILDABLE
                </h2>
                <RedScribbleUnderline />
              </div>
            </div>

            {/* ── stats row ────────────────────────────────────── */}
            <div className="flex flex-row items-end gap-12 md:gap-16 mt-4">
              <StatBlock label="[ THE ORIGIN ]" value="3+" sub="YEARS IN THE TRENCHES" />
              <StatBlock label="[ CURRENT STATUS ]" value="100%" sub="HIGH-AGENCY EXECUTION" />
            </div>

            {/* ── micro tags & coords ──────────────────────────── */}
            <div className="flex flex-col gap-4 mt-8 lg:mt-12">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="w-2 h-4 border-l-2 border-t-2 border-[#ff1919] opacity-70" />
                <Chip label="NEXT.JS" />
                <Chip label="REACT" />
                <Chip label="AI AGENTS" />
                <Chip label="VITE" />
                <Chip label="GSAP" />
                <UpArrow className="w-4 h-4 ml-2 opacity-80" />
              </div>
              
              <div className="flex items-center gap-3 mt-4 opacity-60">
                <svg viewBox="0 0 20 20" fill="none" stroke="#ff1919" strokeWidth="2" className="w-5 h-5">
                  <path d="M 12 4 L 4 10 L 12 16 M 16 4 L 8 10 L 16 16" />
                </svg>
                <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[11px] font-medium tracking-[0.2em] text-[#666] uppercase">
                  MAY '16 — INIT SEQUENCE STARTED
                </p>
                <svg viewBox="0 0 20 20" fill="none" stroke="#ff1919" strokeWidth="2" className="w-5 h-5">
                  <path d="M 8 4 L 16 10 L 8 16 M 4 4 L 12 10 L 4 16" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — portrait card */}
          <div className="vibe-reveal-right flex justify-center z-10 mt-16 lg:mt-0 shrink-0">
            <div className="relative w-full lg:w-[440px]" style={{ maxWidth: '440px' }}>
              
              {/* red ambient glow behind portrait */}
              <div className="absolute inset-0 bg-[#ff1919] blur-[70px] opacity-20 transform scale-90" />

              {/* HUD / film card container */}
              <div className="relative border border-[#2a2a2a] bg-[#000000] p-3 shadow-2xl">
                
                {/* HUD Corner Brackets */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-[#ff1919] opacity-80 shadow-[0_0_8px_rgba(255,25,25,0.8)] z-20 pointer-events-none" />
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-[#ff1919] opacity-80 shadow-[0_0_8px_rgba(255,25,25,0.8)] z-20 pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-[#ff1919] opacity-80 shadow-[0_0_8px_rgba(255,25,25,0.8)] z-20 pointer-events-none" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-[#ff1919] opacity-80 shadow-[0_0_8px_rgba(255,25,25,0.8)] z-20 pointer-events-none" />

                {/* top metadata bar */}
                <div className="flex justify-between items-center pb-3 border-b border-[#222] mb-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.3em] text-[#555] uppercase">APRL 10</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.2em] text-[#ff1919] uppercase flex items-center gap-2 drop-shadow-[0_0_4px_rgba(255,25,25,0.8)]">
                    <span className="w-2 h-2 rounded-full bg-[#ff1919] animate-pulse inline-block" />
                    REC
                  </span>
                </div>

                {/* image container with effects */}
                <div className="relative overflow-hidden group">
                  {/* left perforation strip */}
                  <div className="absolute top-0 bottom-0 left-0 w-4 bg-black z-10 flex flex-col justify-between py-2 border-r border-[#111]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-[#1a1a1a] border border-[#2a2a2a] mx-auto rounded-[1px]" />
                    ))}
                  </div>
                  {/* right perforation strip */}
                  <div className="absolute top-0 bottom-0 right-0 w-4 bg-black z-10 flex flex-col justify-between py-2 border-l border-[#111]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-[#1a1a1a] border border-[#2a2a2a] mx-auto rounded-[1px]" />
                    ))}
                  </div>

                  {/* The Image */}
                  <img
                    src="/assets/about_portrait.png"
                    alt="Developer portrait"
                    className="w-full block transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(1.4) brightness(0.65)',
                    }}
                  />

                  {/* Sci-Fi Gradients & Overlays */}
                  {/* Red Tint & Glow */}
                  <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 bg-[radial-gradient(ellipse_at_center,rgba(255,25,25,0.7)_0%,transparent_70%)]" />
                  
                  {/* Horizontal Glitch / Scanline effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,25,25,0.2)_50%)]" style={{ backgroundSize: '100% 4px' }} />
                  
                  {/* Red horizontal flair */}
                  <div className="absolute top-[30%] left-[-10%] right-[-10%] h-[2px] bg-[#ff1919] opacity-50 blur-[2px] transform -rotate-1" />
                  <div className="absolute top-[30%] left-[10%] right-[10%] h-[1px] bg-white opacity-70" />

                  <div className="absolute bottom-[25%] left-[-20%] right-[-10%] h-[4px] bg-[#ff1919] opacity-40 blur-[4px] transform rotate-1" />
                  <div className="absolute bottom-[25%] left-[-5%] right-[20%] h-[1px] bg-white opacity-60" />
                  
                  {/* Center Crosshair Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="relative w-20 h-20">
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white transform -translate-x-1/2" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white transform -translate-y-1/2" />
                      {/* Corner marks for crosshair */}
                      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white opacity-50" />
                      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white opacity-50" />
                      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white opacity-50" />
                      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white opacity-50" />
                    </div>
                  </div>
                </div>

                {/* bottom status bar */}
                <div className="flex justify-between items-center pt-3 border-t border-[#222] mt-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.2em] text-[#ff1919] uppercase drop-shadow-[0_0_3px_rgba(255,25,25,0.8)]">SYSTEM: ONLINE</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.2em] text-[#555] uppercase">ID: VIBE_001</span>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;
