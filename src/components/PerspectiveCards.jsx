import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const services = [
  "FULL STACK",
  "UI/UX + CODE",
  "BRAND IDENTITY",
  "MOTION DESIGN",
  "CREATIVE DEV"
];

const PerspectiveCards = () => {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const servicesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !h2Ref.current) return;
    
    // Copy ref values to local variables for cleanup
    const currentSection = sectionRef.current;
    
    // Create split text for h2
    const splitText = new SplitType(h2Ref.current, { 
      types: 'words',
      wordClass: 'word' // Applies dashed border and gradient from index.css
    });

    // Remove dashed border from the '//' sign
    if (splitText.words) {
      splitText.words.forEach(word => {
        if (word.textContent.includes('//')) {
          word.style.border = 'none';
        }
      });
    }

    // Create a master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: currentSection,
        start: "top top", 
        end: "+=1500",    
        pin: true,        
        scrub: 1,         
      }
    });

    // 1. Animate the SplitText words falling in
    if (splitText.words && splitText.words.length > 0) {
      tl.from(splitText.words, {
        y: -100,
        opacity: 0,
        rotation: () => gsap.utils.random(-80, 80),
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }

    // 2. Animate the giant service words fading in one by one
    const validServices = servicesRef.current.filter(Boolean);
    if (validServices.length > 0) {
      tl.from(validServices, {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    // Refresh ScrollTrigger to ensure correct pinning positions
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentSection) t.kill();
      });
      if (splitText) splitText.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        width: '100%',
        backgroundColor: '#000000', // Pitch black background
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15vh 0',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 5vw',
        }}
      >
        <div style={{ marginBottom: '8vh', width: '100%' }}>
          <h2 ref={h2Ref} style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: '12px',
            margin: 0,
            opacity: 1 // GSAP handles opacity, avoid FOUT
          }}>
            EXPERTISE // SERVICES
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) servicesRef.current[idx] = el;
              }}
              style={{
                width: '100%',
                borderBottom: '2px solid rgba(255,255,255,0.2)',
                paddingBottom: '2vh',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease, padding-left 0.3s ease',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.paddingLeft = '40px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.paddingLeft = '0px';
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 900,
                  fontSize: 'clamp(40px, 8vw, 150px)',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1,
                  color: 'inherit',
                }}
              >
                {service}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerspectiveCards;
