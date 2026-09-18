import React from 'react';
import { motion } from 'framer-motion';

const statement = "SHAPING MEANINGFUL BRANDS THROUGH STRATEGY, CREATIVITY, AND COLLABORATION. EVERY PROJECT DESERVES A UNIQUE APPROACH COMBINING TECHNICAL EXCELLENCE WITH THOUGHTFUL DESIGN.";

const DesignPurpose = () => {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#ffffff', // White background
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 5vw',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1600px' }}>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(16px, 2vw, 24px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#0a0a0a',
          borderBottom: '4px solid #0a0a0a',
          display: 'inline-block',
          paddingBottom: '12px',
          marginBottom: '8vh'
        }}>
          PURPOSE // APPROACH
        </h2>
        
        <motion.h3 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03 }
            }
          }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 900,
            fontSize: 'clamp(32px, 6.5vw, 120px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#0a0a0a',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.2em'
          }}
        >
          {statement.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 } }
              }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h3>
      </div>
    </section>
  );
};

export default DesignPurpose;
