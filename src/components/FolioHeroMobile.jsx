import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../assets/Man_blinking_slowly_1080p_20260914170541_1080p_20260914172941.mp4';
import AboutMe from './AboutMe';

const FolioHeroMobile = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          mixBlendMode: 'screen',
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="gradient-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))',
          zIndex: 2,
        }}
      />

      {/* Fade to black overlay (Animated by GSAP during zoom - needed for App.jsx compatibility) */}
      <div
        className="fade-to-black"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0a0a0a',
          opacity: 0,
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* Bio Container (Revealed by GSAP) */}
      <div 
        className="bio-container"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          opacity: 0, // Animated by GSAP
        }}
      >
        <div style={{ width: '100%', pointerEvents: 'auto' }}>
          <AboutMe />
        </div>
      </div>

      {/* Mobile Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '24px',
          paddingBottom: '48px',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 900,
            fontSize: '12vw',
            color: '#ffffff',
            margin: '0 0 10px 0',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          HI, I'M <br/>
          <span className="zoom-o">VIBOOTHI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            fontFamily: 'monospace, var(--font-inter)',
            fontSize: '12px',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: 0.8,
            marginBottom: '32px'
          }}
        >
          I am a full-stack developer and UI/UX designer. My digital experiences evoke different emotions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white text-[10px] font-mono tracking-widest uppercase opacity-70">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-white absolute top-0"
              animate={{ y: [-24, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FolioHeroMobile;
