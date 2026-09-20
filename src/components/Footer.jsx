import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa6';

/* ─── hand-drawn SVG accents ─────────────────────────────── */
const RedScribbleUnderline = () => (
  <svg viewBox="0 0 600 12" preserveAspectRatio="none" fill="none" stroke="#ff1919" strokeWidth="1.5" strokeLinecap="round" className="absolute left-0 -bottom-2 w-full h-3 opacity-90">
    <path d="M 2 8 C 80 2, 200 10, 320 4 C 440 -2, 530 8, 598 4" />
    <path d="M 50 10 C 200 6, 400 12, 550 8" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const Chip = ({ label }) => (
  <span
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
    className="inline-block text-[10px] font-medium tracking-[0.1em] uppercase text-[#333] border border-[#ccc] px-3 py-1.5"
  >
    {label}
  </span>
);

const Footer = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 16px 24px 16px',
    border: 'none',
    borderBottom: '2px solid #ddd',
    backgroundColor: 'transparent',
    color: '#000000',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 'clamp(15px, 1.5vw, 19px)',
    fontWeight: 500,
    outline: 'none',
    transition: 'border-color 0.3s',
    textTransform: 'uppercase',
  };

  return (
    <section className="relative w-full overflow-x-hidden flex flex-col font-sans bg-[#ffffff]" style={{ minHeight: '100vh', padding: '8vw 0 0 0' }}>
      
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#ff1919] rounded-full blur-[150px] opacity-[0.02] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#ff1919] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
      
      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Content Wrapper for Form */}
      <div className="relative z-10 w-full flex flex-col flex-grow justify-center items-center pb-24 px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32 w-full lg:w-fit mx-auto">
          
          {/* LEFT COLUMN — Heading & Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12 lg:gap-16 z-20 shrink-0"
          >
            {/* ── heading ──────────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6 opacity-60">
                <svg viewBox="0 0 20 20" fill="none" stroke="#ff1919" strokeWidth="2" className="w-5 h-5">
                  <path d="M 12 4 L 4 10 L 12 16 M 16 4 L 8 10 L 16 16" />
                </svg>
                <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[11px] font-medium tracking-[0.2em] text-[#555] uppercase">
                  INITIATE COMMS
                </p>
                <svg viewBox="0 0 20 20" fill="none" stroke="#ff1919" strokeWidth="2" className="w-5 h-5">
                  <path d="M 8 4 L 16 10 L 8 16 M 4 4 L 12 10 L 4 16" />
                </svg>
              </div>

              <h2
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold uppercase leading-[0.9] tracking-tight text-black drop-shadow-sm"
              >
                LET'S <br />
                <span className="text-[#ff1919]">TALK.</span>
              </h2>
            </div>

            {/* Direct Contact & Socials */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[12px] font-bold tracking-[0.2em] text-[#ff1919] uppercase">
                  [ DIRECT CONTACT ]
                </span>
                <a
                  href="mailto:viboothi@gmail.com"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-4xl md:text-5xl lg:text-[3rem] font-bold text-black hover:text-[#ff1919] transition-colors"
                >
                  VIBOOTHI@GMAIL.COM
                </a>
              </div>
              
              <div className="flex flex-col gap-4">
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[12px] font-bold tracking-[0.2em] text-[#ff1919] uppercase">
                  [ TRANSMISSION NETWORKS ]
                </span>
                <div className="flex items-center gap-6 mt-1">
                    <a href="#" className="text-[#222] hover:text-[#ff1919] transition-colors"><FaGithub size={34} /></a>
                    <a href="#" className="text-[#222] hover:text-[#ff1919] transition-colors"><FaLinkedin size={34} /></a>
                    <a href="#" className="text-[#222] hover:text-[#ff1919] transition-colors"><FaXTwitter size={34} /></a>
                    <a href="#" className="text-[#222] hover:text-[#ff1919] transition-colors"><FaDribbble size={34} /></a>
                    <a href="#" className="text-[#222] hover:text-[#ff1919] transition-colors"><FaInstagram size={34} /></a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center z-10 w-full lg:w-[600px] shrink-0 mt-10 lg:mt-0"
          >
            <div className="relative w-full">
              
              {/* HUD / form card container */}
              <div className="relative border-2 border-black bg-white p-10 md:p-14 shadow-2xl">
                
                {/* HUD Corner Brackets */}
                <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-[#ff1919] opacity-100 pointer-events-none" />
                <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-[#ff1919] opacity-100 pointer-events-none" />
                <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-[#ff1919] opacity-100 pointer-events-none" />
                <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-[#ff1919] opacity-100 pointer-events-none" />

                <div className="flex justify-between items-center pb-6 border-b border-[#ddd] mb-8">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.3em] text-[#333] font-bold uppercase">MESSAGE PING</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-[0.2em] text-[#ff1919] uppercase font-bold flex items-center gap-2 drop-shadow-[0_0_4px_rgba(255,25,25,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-[#ff1919] animate-pulse inline-block" />
                    AWAITING INPUT
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  <div className="flex flex-col gap-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-4 text-[11px] tracking-[0.2em] text-[#555] font-bold uppercase">
                      [ IDENTIFIER ]
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="YOUR NAME"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#ff1919'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      className="placeholder:text-[#999]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-4 text-[11px] tracking-[0.2em] text-[#555] font-bold uppercase">
                      [ COMMS NODE ]
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#ff1919'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      className="placeholder:text-[#999]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-4 text-[11px] tracking-[0.2em] text-[#555] font-bold uppercase">
                      [ PAYLOAD ]
                    </span>
                    <textarea
                      rows={1}
                      required
                      placeholder="PROJECT DETAILS"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={(e) => e.target.style.borderColor = '#ff1919'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      className="placeholder:text-[#999]"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      backgroundColor: sent ? '#000' : '#ff1919',
                      color: sent ? '#ff1919' : '#ffffff',
                      border: sent ? '2px solid #000' : '2px solid #ff1919',
                    }}
                    className="w-full py-5 mt-8 text-base font-bold tracking-[0.2em] uppercase transition-colors"
                  >
                    {sent ? 'TRANSMISSION SENT ✓' : 'EXECUTE SUBMIT'}
                  </motion.button>
                </form>
                
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Brutalist Footer Bar */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full bg-white border-t-2 border-black px-6 md:px-12 lg:px-24 py-8 text-black font-inter"
      >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">
              VIBOOTHI © 2026
            </p>
            
            <div className="flex items-center gap-6">
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mr-2">
                SYSTEM IDENTIFIER:
              </span>
              <div className="flex items-center gap-4">
                 <Chip label="VIBE_001" />
                 <Chip label="ONLINE" />
              </div>
            </div>
          </div>
      </motion.footer>
    </section>
  );
};

export default Footer;
