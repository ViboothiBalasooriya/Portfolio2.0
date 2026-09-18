import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa6';

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
    padding: '2vh 0',
    border: 'none',
    borderBottom: '4px solid #ffffff',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: 'var(--font-inter)',
    fontSize: 'clamp(18px, 2vw, 32px)',
    fontWeight: 900,
    outline: 'none',
    transition: 'border-color 0.3s',
    textTransform: 'uppercase',
  };

  return (
    <section className="relative w-full overflow-x-hidden flex flex-col font-sans bg-[#0a0a0a]" style={{ minHeight: '100vh' }}>
      {/* Immersive Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        style={{ filter: 'grayscale(100%) opacity(40%)' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
      />

      {/* Content Wrapper for Form */}
      <div className="relative z-10 w-full px-[8vw] flex flex-col pt-32 pb-32 flex-grow justify-center">
        
        {/* LET'S TALK Form Section (Brutalist style on top of darkened video) */}
        <div style={{ width: '100%', marginBottom: '15vh' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(40px, 10vw, 200px)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            margin: '0 0 10vh 0',
            color: '#ffffff',
          }}>
            LET'S TALK.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Form in Liquid Glass Card */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 liquid-glass p-8 md:p-12 pl-16 md:pl-24 lg:pl-32 rounded-3xl w-full"
            >
              <div>
                <input
                  type="text"
                  required
                  placeholder="YOUR NAME"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = '#ffffff'}
                  className="placeholder:text-white/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = '#ffffff'}
                  className="placeholder:text-white/50"
                />
              </div>
              <div>
                <textarea
                  rows={1}
                  required
                  placeholder="PROJECT DETAILS"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = '#ffffff'}
                  className="placeholder:text-white/50"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  alignSelf: 'flex-start',
                  padding: '24px 48px',
                  backgroundColor: sent ? 'var(--green)' : '#ffffff',
                  color: '#0a0a0a',
                  border: 'none',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '24px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  marginTop: '4vh'
                }}
              >
                {sent ? 'RECEIVED ✓' : 'SUBMIT'}
              </motion.button>
            </motion.form>

            {/* Direct Contact & Socials (Right Side) */}
            <div className="flex flex-col gap-12 items-center text-center w-full md:pl-20 mt-10 md:mt-0">
              <div className="flex flex-col items-center gap-4">
                <h3 style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  margin: 0,
                  opacity: 0.5,
                  letterSpacing: '0.1em'
                }}>
                  Direct Contact
                </h3>
                <a
                  href="mailto:viboothi@gmail.com"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(20px, 2.5vw, 36px)',
                    fontWeight: 700,
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  VIBOOTHI@GMAIL.COM
                </a>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                 <h3 style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  margin: 0,
                  opacity: 0.5,
                  letterSpacing: '0.1em'
                }}>
                  Socials
                </h3>
                <div className="flex items-center justify-center gap-8 mt-2">
                    <a href="#" className="text-white hover:text-[var(--accent)] transition-colors"><FaGithub size={32} /></a>
                    <a href="#" className="text-white hover:text-[var(--accent)] transition-colors"><FaLinkedin size={32} /></a>
                    <a href="#" className="text-white hover:text-[var(--accent)] transition-colors"><FaXTwitter size={32} /></a>
                    <a href="#" className="text-white hover:text-[var(--accent)] transition-colors"><FaDribbble size={32} /></a>
                    <a href="#" className="text-white hover:text-[var(--accent)] transition-colors"><FaInstagram size={32} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brutalist Footer Grid (Converted from Liquid Glass) */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full bg-[#0a0a0a] border-t-8 border-white px-[5vw] py-16 text-white font-inter"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
            {/* Left Column (Brand) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
                </svg>
                <span className="text-3xl font-black tracking-tighter uppercase">VIBOOTHI</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest max-w-sm mt-2 opacity-100">
                Premium clarity on global events and cosmic wonders.
              </p>
            </div>

            {/* Right Column (Links) */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Discover */}
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-white border-b-2 border-white pb-2 inline-block self-start">Discover</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-4">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Labs & Workshops</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Deep Dive Series</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Global Circle</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Resource Vault</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Future Roadmap</a></li>
                </ul>
              </div>

              {/* The Mission */}
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-white border-b-2 border-white pb-2 inline-block self-start">The Mission</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-4">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Origin Story</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">The Collective</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Newsroom Hub</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Join the Team</a></li>
                </ul>
              </div>

              {/* Concierge */}
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-white border-b-2 border-white pb-2 inline-block self-start">Concierge</h4>
                <ul className="text-xs font-bold uppercase tracking-wider space-y-4">
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Get in Touch</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Legal Privacy</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">User Agreement</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Report Concern</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-2 border-white flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mt-10">
            <p className="text-[12px] font-black uppercase tracking-widest opacity-100">VIBOOTHI © 2026</p>
            
            <div className="flex items-center gap-6">
              <span className="text-[12px] font-black uppercase tracking-widest mr-2">JOIN THE JOURNEY:</span>
              <div className="flex items-center gap-6">
                <a href="#" className="opacity-100 hover:text-[var(--accent)] transition-colors"><FaMusic size={20} /></a>
                <a href="#" className="opacity-100 hover:text-[var(--accent)] transition-colors"><FaFacebook size={20} /></a>
                <a href="#" className="opacity-100 hover:text-[var(--accent)] transition-colors"><FaXTwitter size={20} /></a>
                <a href="#" className="opacity-100 hover:text-[var(--accent)] transition-colors"><FaYoutube size={20} /></a>
                <a href="#" className="opacity-100 hover:text-[var(--accent)] transition-colors"><FaInstagram size={20} /></a>
              </div>
            </div>
          </div>
      </motion.footer>
    </section>
  );
};

export default Footer;
