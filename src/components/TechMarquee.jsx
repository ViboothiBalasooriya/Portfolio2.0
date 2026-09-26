import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

const brandLogos = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '⬢' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Figma', icon: '◈' },
];

const TechMarquee = () => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.05 * (delta / 16);

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    let newX = baseX.get() + moveBy;

    if (newX <= -50) {
      newX += 50;
    } else if (newX > 0) {
      newX -= 50;
    }

    baseX.set(newX);
  });

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#ffffff',
        padding: '24px 0',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ x }}>
        <div
          className="marquee-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '80px',
            width: 'max-content',
            paddingLeft: '80px',
            paddingRight: '80px',
          }}
        >
        {[...Array(6)].map((_, groupIdx) => (
          <React.Fragment key={groupIdx}>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(0,0,0,0.5)',
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
                  color: '#000000',
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
