import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const brandLogos = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '⬢' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Figma', icon: '◈' },
];

const TechMarquee = () => {
  const { scrollY } = useScroll();
  const marqueeX = useTransform(scrollY, [0, 2000], [0, -1000]);

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#ffffff', // Inverted from #0a0a0a
        padding: '24px 0',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ x: marqueeX }}>
        <div
          className="marquee-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '80px',
            width: 'max-content',
            paddingLeft: '80px',
          }}
        >
        {[...Array(6)].map((_, groupIdx) => (
          <React.Fragment key={groupIdx}>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(0,0,0,0.5)', // Inverted from rgba(255,255,255,0.4)
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              Trusted by brands I've worked with
            </span>
            {brandLogos.map((brand, idx) => (
              <div
                key={`${groupIdx}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#000000', // Inverted from #ffffff
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '22px' }}>{brand.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechMarquee;
