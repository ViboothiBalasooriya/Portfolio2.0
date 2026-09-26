import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = [
  "I'M", "PUSHING", "PIXELS,", "OPTIMIZING", "LOGIC,", "AND", "TURNING", "MY", "VISION", 
  "INTO", "REALITY.", "DEFINING", "MY", "CREATIVE", "AND", "TECHNICAL", 
  "LEGACY", "IN", "DESIGN", "AND", "CODE—ON", "AND", "OFF", "THE", "SCREEN."
];

const BioTextSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = textRef.current.querySelectorAll('.bio-word');
      
      gsap.set(elements, { opacity: 0, y: 30 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=150%", // Pin and scroll for this amount
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden" style={{ padding: '8vw 0' }}>
      <div
        ref={textRef}
        style={{
          maxWidth: '1200px',
          width: '100%',
          padding: '0 24px',
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          lineHeight: '1.1',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="bio-word"
            style={{
              display: 'inline-block',
              backgroundColor: '#ffffff',
              color: '#000000',
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
    </section>
  );
};

export default BioTextSection;
