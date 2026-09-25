import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaMusic, FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa6';

/* ─── film-strip perforations ─────────────────────────────── */
const FilmPerf = ({ side = 'left', count = 18 }) => (
  <div
    className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} w-5 flex flex-col justify-between py-4 z-20 pointer-events-none`}
    style={{ borderRight: side === 'left' ? '1px solid rgba(255,255,255,0.04)' : 'none', borderLeft: side === 'right' ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-2.5 h-2.5 mx-auto border border-[rgba(255,255,255,0.06)] bg-[#060606] rounded-[1px]" />
    ))}
  </div>
);

/* ─── scanline overlay ────────────────────────────────────── */
const ScanlineOverlay = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)',
      backgroundSize: '100% 4px'
    }}
  />
);

/* ─── HUD data readout line ───────────────────────────────── */
const HudDataLine = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.25)]">{label}</span>
    <span className="flex-1 border-b border-dotted border-[rgba(255,255,255,0.06)]" />
    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.4)]">{value}</span>
  </div>
);

const Footer = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (status === 'sending') return;
    setStatus('sending');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setFormState({ name: '', email: '', message: '' });
      }, 4000);
    }, (error) => {
      console.error('FAILED...', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 0 14px 0',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    fontWeight: 500,
    outline: 'none',
    transition: 'border-color 0.4s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden flex flex-col bg-transparent" style={{ minHeight: '100vh' }}>

      {/* ── Massive Red Section Heading ("contact") (z-0 Overlay, Cut off) ─────────────── */}
      <div className="absolute top-[10%] md:top-[20%] -right-[15%] md:-right-[10%] z-0 pointer-events-none select-none">
        <h2 
          style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontWeight: 800, 
            fontSize: 'clamp(100px, 25vw, 400px)',
            color: '#FF0000',
            lineHeight: 0.8,
            letterSpacing: '-0.04em',
            opacity: 0.4
          }}
        >
          contact
        </h2>
      </div>

      {/* Atmospheric glow - very subtle */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-white rounded-full blur-[200px] opacity-[0.015] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-white rounded-full blur-[180px] opacity-[0.02] pointer-events-none" />

      {/* Film-strip perforations on edges */}
      <FilmPerf side="left" />
      <FilmPerf side="right" />

      {/* Scanline texture */}
      <ScanlineOverlay />

      {/* ── Top metadata bar ──────────────────────────────── */}
      <div className="relative z-20 w-full border-b border-[rgba(255,255,255,0.05)] px-8 md:px-16 py-4">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">SEC_05 // CONTACT</span>
          <div className="flex items-center gap-4">
            <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">COMMS CHANNEL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse opacity-60" />
            <span className="font-hud text-[9px] text-white opacity-60">OPEN</span>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-20 w-full max-w-[1400px] mx-auto">

          {/* LEFT COLUMN — Heading & Direct Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10 lg:gap-14 z-20 shrink-0 lg:w-[45%]"
          >
            {/* Heading */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.15)]" />
                <span className="font-hud text-[10px] text-[rgba(255,255,255,0.35)]">INITIATE COMMS</span>
                <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.15)]" />
              </div>

              <h2
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold uppercase leading-[0.85] tracking-tight text-white"
              >
                LET'S <br />
                TALK.
              </h2>

              {/* Decorative line under heading */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-[2px] bg-white opacity-30" />
                <div className="w-2 h-2 border border-[rgba(255,255,255,0.2)] rotate-45" />
              </div>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-hud text-[10px] text-[rgba(255,255,255,0.35)]">
                  [ DIRECT CONTACT ]
                </span>
                <a
                  href="mailto:viboothi@gmail.com"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-lg md:text-xl lg:text-2xl font-bold text-white hover:text-[rgba(255,255,255,0.6)] transition-colors duration-300 tracking-wider"
                >
                  VIBOOTHI@GMAIL.COM
                </a>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="font-hud text-[10px] text-[rgba(255,255,255,0.35)]">
                  [ TRANSMISSION NETWORKS ]
                </span>
                <div className="flex items-center gap-5 mt-1">
                  {[
                    { icon: FaGithub, href: '#' },
                    { icon: FaLinkedin, href: '#' },
                    { icon: FaXTwitter, href: '#' },
                    { icon: FaDribbble, href: '#' },
                    { icon: FaInstagram, href: '#' },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="text-[rgba(255,255,255,0.25)] hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* HUD data readouts */}
            <div className="hidden lg:flex flex-col gap-2 mt-4 opacity-70">
              <HudDataLine label="LATITUDE" value="06.9271° N" />
              <HudDataLine label="LONGITUDE" value="79.8612° E" />
              <HudDataLine label="TIMEZONE" value="UTC+05:30" />
              <HudDataLine label="STATUS" value="ACCEPTING PROJECTS" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center z-10 w-full lg:w-[55%] shrink-0"
          >
            <div className="relative w-full max-w-[580px]">
              
              {/* Form card */}
              <div className="relative bg-[rgba(255,255,255,0.01)] backdrop-blur-sm border border-[rgba(255,255,255,0.06)] p-8 md:p-12">
                
                {/* HUD Corner Brackets */}
                <div className="hud-crosshair hud-tl"></div>
                <div className="hud-crosshair hud-tr"></div>
                <div className="hud-crosshair hud-bl"></div>
                <div className="hud-crosshair hud-br"></div>

                {/* Top metadata bar */}
                <div className="flex justify-between items-center pb-5 border-b border-[rgba(255,255,255,0.06)] mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.5)]">INCOMING TRANSMISSION</span>
                  </div>
                  <span className="font-hud text-[9px] text-[rgba(255,255,255,0.25)]">ENC: AES-256</span>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">
                      [ IDENTIFIER ]
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="YOUR NAME"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      className="placeholder:text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">
                      [ COMMS NODE ]
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      className="placeholder:text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">
                      [ PAYLOAD ]
                    </span>
                    <textarea
                      rows={2}
                      name="message"
                      required
                      placeholder="PROJECT DETAILS"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      className="placeholder:text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-4 mt-4 border border-[rgba(255,255,255,0.1)] bg-transparent hover:border-[rgba(255,255,255,0.25)] font-hud text-[12px] text-white font-bold transition-all duration-300"
                    style={{
                      backgroundColor: status === 'sent' ? 'rgba(255,255,255,0.1)' : (status === 'error' ? 'rgba(255,0,0,0.15)' : 'transparent'),
                    }}
                  >
                    {status === 'sending' ? '[ TRANSMITTING... ]' : status === 'sent' ? '[ TRANSMISSION SENT ✓ ]' : status === 'error' ? '[ ERROR: RETRY ]' : '[ EXECUTE SUBMIT ]'}
                  </motion.button>
                </form>

                {/* Bottom form metadata */}
                <div className="flex justify-between items-center pt-5 mt-8 border-t border-[rgba(255,255,255,0.04)]">
                  <span className="font-hud text-[8px] text-[rgba(255,255,255,0.2)]">RESPONSE TIME: &lt;24H</span>
                  <span className="font-hud text-[8px] text-[rgba(255,255,255,0.2)]">FORM_V2.1</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Brutalist Footer Bar ──────────────────────────── */}
      <div className="relative z-20 w-full border-t border-[rgba(255,255,255,0.05)]">
        {/* Decorative film-strip line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />

        <div className="px-8 md:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-6">
              <span className="font-hud text-[9px] text-[rgba(255,255,255,0.25)]">
                VIBOOTHI © 2026
              </span>
              <span className="hidden md:inline font-hud text-[9px] text-[rgba(255,255,255,0.12)]">
                //
              </span>
              <span className="hidden md:inline font-hud text-[9px] text-[rgba(255,255,255,0.2)]">
                ALL RIGHTS RESERVED
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-hud text-[9px] text-[rgba(255,255,255,0.15)]">SYS_ID:</span>
              <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.06)] px-2 py-0.5">VIBE_001</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-green-400 opacity-60" />
                <span className="font-hud text-[9px] text-[rgba(255,255,255,0.3)]">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
