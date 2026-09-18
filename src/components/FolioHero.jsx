import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import heroVideo from '../assets/Man_blinking_slowly_1080p_20260914170541_1080p_20260914172941.mp4';

const navLinks = [
  { label: 'portfolio', href: '#projects' },
  { label: 'services', href: '#process' },
  { label: 'contacts', href: '#contact' },
];

const useScrambleText = (targetText, delay = 0, duration = 1500) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let timeoutId;
    let frameId;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    
    // Assign a random reveal progress threshold for each character
    const thresholds = Array.from({ length: targetText.length }, () => Math.random());
    
    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / Math.max(duration, 1), 1);
        
        let currentText = "";
        
        for (let i = 0; i < targetText.length; i++) {
          if (targetText[i] === " ") {
             currentText += " ";
          } else if (progress >= thresholds[i]) {
            currentText += targetText[i];
          } else {
            currentText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setText(currentText);
        
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setText(targetText); // Lock in final text
        }
      };
      
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [targetText, delay, duration]);

  return text;
};

const FolioHero = () => {
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);
  const fadeFrameRef = useRef(null);

  const scrambledDescription = useScrambleText(
    "I am a full-stack developer and UI/UX designer. My digital experiences are not only functional, but also evoke different emotions in the users. I can capture requirements that no one else has noticed and convey them through my projects.",
    2200, // Starts scrambling when the typewriter effect starts
    2500  // Duration of scramble
  );

  const startFade = (targetOpacity, durationMs) => {
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const newOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = newOpacity.toString();
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(animate);
      }
    };
    fadeFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => startFade(1, 600);
    video.addEventListener('canplay', handleCanPlay);
    if (video.readyState >= 3) startFade(1, 600);

    const handleTimeUpdate = () => {
      if (!video) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        startFade(0, 500);
      }
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
        fadingOutRef.current = false;
        startFade(1, 600);
      }, 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  const controls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detect scroll to lock the text
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setHasScrolled(true);
    };
    window.addEventListener('scroll', handleScroll);
    if (window.scrollY > 10) setHasScrolled(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Looping typewriter effect
  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    
    const runAnimation = async () => {
      // Initial delay for the very first type-out
      await new Promise(r => { timeoutId = setTimeout(r, 2200); });
      
      while (isMounted) {
        if (hasScrolled) break;
        
        await controls.start("visible");
        
        // Wait 3 seconds
        let waited = 0;
        while (waited < 3000) {
          if (hasScrolled) break;
          await new Promise(r => { timeoutId = setTimeout(r, 100); });
          waited += 100;
        }
        
        if (hasScrolled) break;
        
        // Delete backwards
        await controls.start("hidden");
        
        // Wait 0.5s before typing again
        waited = 0;
        while (waited < 500) {
          if (hasScrolled) break;
          await new Promise(r => { timeoutId = setTimeout(r, 100); });
          waited += 100;
        }
      }
      
      if (isMounted && hasScrolled) {
        controls.set("visible");
      }
    };
    
    runAnimation();
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [controls, hasScrolled]);

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
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0,
          zIndex: 1,
          filter: 'blur(1px) brightness(0.9) contrast(1.1)', // Decreased blur further
          transform: 'scale(1.01)', // Adjusted scale for minimal blur
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="gradient-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 2,
        }}
      />

      {/* Fade to black overlay (Animated by GSAP during zoom) */}
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

      {/* Bio Text Container (zIndex: 5) - Sits behind the 'O' (zIndex: 10) but in front of video/black overlay */}
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
        <div 
          style={{
            maxWidth: '1200px',
            width: '100%',
            padding: '0 var(--side-padding)',
            textAlign: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            lineHeight: '1.1',
          }}
        >
          {[
            "PUSHING", "PIXELS,", "OPTIMIZING", "LOGIC,", "AND", "TURNING", "VISION", 
            "INTO", "REALITY.", "DEFINING", "A", "CREATIVE", "AND", "TECHNICAL", 
            "LEGACY", "IN", "DESIGN", "AND", "CODE—ON", "AND", "OFF", "THE", "SCREEN."
          ].map((word, i) => (
            <span
              key={i}
              className="bio-word"
              style={{
                display: 'inline-block',
                backgroundColor: '#ffffff',
                color: '#0a0a0a',
                fontFamily: 'var(--font-inter)',
                fontWeight: 900,
                fontSize: 'clamp(24px, 4vw, 75px)',
                letterSpacing: '-0.03em',
                padding: '0 0.2em',
                margin: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      {/* Navbar */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          width: '100%',
          padding: '40px var(--side-padding)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'monospace, var(--font-inter)',
                fontSize: '15px',
                fontWeight: 500,
                color: '#ffffff', // Changed to white
                textDecoration: 'none',
                textTransform: 'lowercase',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 var(--side-padding)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1200px',
            marginTop: '15vh',
          }}
        >
          {/* Main Name - Typewriter Effect */}
          <motion.h1
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { 
                transition: { staggerChildren: 0.04, staggerDirection: -1 } 
              },
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 900,
              fontSize: 'clamp(40px, 9vw, 150px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#ffffff',
              margin: '0 0 40px 0',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {"HI, I'M VIBOOTHI".split("").map((char, index) => (
              <motion.span
                key={index}
                className={index === 11 ? "zoom-o" : ""}
                variants={{
                  hidden: { opacity: 0, display: 'none' },
                  visible: { opacity: 1, display: index === 11 ? 'inline-block' : 'inline' }
                }}
              >
                {char}
              </motion.span>
            ))}
            {/* Blinking Cursor */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5, delay: 2.2 }}
              style={{
                display: 'inline-block',
                width: 'clamp(4px, 1vw, 12px)',
                height: 'clamp(30px, 7vw, 120px)',
                backgroundColor: '#ffffff',
                marginLeft: '8px',
                verticalAlign: 'text-bottom',
              }}
            />
          </motion.h1>

          {/* Description */}
          <p
            style={{
              fontFamily: 'monospace, var(--font-inter)',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontWeight: 400,
              color: '#ffffff', // Changed to white
              lineHeight: 1.6,
              marginBottom: '24px',
              maxWidth: '900px',
              textAlign: 'center',
            }}
          >
            {scrambledDescription || '\u00A0'}
          </p>

        </motion.div>
      </div>
      
    </section>
  );
};

export default FolioHero;
