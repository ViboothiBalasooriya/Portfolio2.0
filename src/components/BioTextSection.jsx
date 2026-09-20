import React from 'react';
import { motion } from 'framer-motion';

const words = [
  "PUSHING", "PIXELS,", "OPTIMIZING", "LOGIC,", "AND", "TURNING", "VISION", 
  "INTO", "REALITY.", "DEFINING", "A", "CREATIVE", "AND", "TECHNICAL", 
  "LEGACY", "IN", "DESIGN", "AND", "CODE—ON", "AND", "OFF", "THE", "SCREEN."
];

const BioTextSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#ff1919] overflow-hidden" style={{ padding: '8vw 0' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
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
          <motion.span
            key={i}
            variants={wordVariants}
            style={{
              display: 'inline-block',
              backgroundColor: '#ffffff',
              color: '#ff1919',
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
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default BioTextSection;
