import React from 'react';
import { motion } from 'framer-motion';

const words = [
  "PUSHING", "PIXELS,", "OPTIMIZING", "LOGIC,", "AND", "TURNING", "VISION", 
  "INTO", "REALITY.", "DEFINING", "A", "CREATIVE", "AND", "TECHNICAL", 
  "LEGACY", "IN", "DESIGN", "AND", "CODE—ON", "AND", "OFF", "THE", "SCREEN."
];

const BioBanner = () => {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#0a0a0a', // Dark background
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          width: '100%',
          padding: '0 var(--side-padding)',
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          lineHeight: '1.1',
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              backgroundColor: '#ffffff', // White highlight
              color: '#0a0a0a', // Black text
              fontFamily: 'var(--font-inter)',
              fontWeight: 900,
              fontSize: 'clamp(24px, 4vw, 75px)', // Reduced font size
              letterSpacing: '-0.03em',
              padding: '0 0.2em',
              margin: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default BioBanner;
