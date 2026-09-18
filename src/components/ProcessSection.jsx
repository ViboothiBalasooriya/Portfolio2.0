import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    num: '01',
    title: 'E-COMMERCE PLATFORM',
    description: 'A FULL-STACK E-COMMERCE SOLUTION WITH REAL-TIME INVENTORY AND SEAMLESS PAYMENT INTEGRATION.',
  },
  {
    num: '02',
    title: 'FINTECH DASHBOARD',
    description: 'AN INTUITIVE FINANCIAL DASHBOARD FEATURING COMPLEX DATA VISUALIZATION AND SECURE AUTHENTICATION.',
  },
  {
    num: '03',
    title: 'HEALTHCARE APP',
    description: 'A MOBILE-FIRST APPLICATION CONNECTING PATIENTS WITH DOCTORS VIA WEBRTC VIDEO CONSULTATIONS.',
  },
  {
    num: '04',
    title: 'REAL ESTATE PORTAL',
    description: 'A MODERN PROPERTY LISTING PLATFORM WITH INTERACTIVE 3D MAPS AND ADVANCED FILTERING.',
  },
  {
    num: '05',
    title: 'AI WRITING ASSISTANT',
    description: 'A SAAS TOOL LEVERAGING LLMS TO HELP CREATORS GENERATE SEO-OPTIMIZED CONTENT AUTOMATICALLY.',
  },
];

const ProcessSection = () => {
  return (
    <section
      id="projects-list"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
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
        <div style={{ marginBottom: '8vh' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(16px, 2vw, 24px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#0a0a0a',
            borderBottom: '4px solid #0a0a0a',
            display: 'inline-block',
            paddingBottom: '12px'
          }}>
            FEATURED // PROJECTS
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr 2fr',
                gap: '2vw',
                padding: '4vh 0',
                borderTop: '2px solid #0a0a0a',
                borderBottom: idx === projects.length - 1 ? '2px solid #0a0a0a' : 'none',
                alignItems: 'start',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 900,
                color: '#0a0a0a',
                lineHeight: 1,
                letterSpacing: '-0.04em'
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 900,
                color: '#0a0a0a',
                lineHeight: 1,
                letterSpacing: '-0.03em'
              }}>
                {step.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(12px, 1.2vw, 16px)',
                fontWeight: 600,
                color: '#0a0a0a',
                lineHeight: 1.5,
                paddingTop: '0.5vw'
              }}>
                {step.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
