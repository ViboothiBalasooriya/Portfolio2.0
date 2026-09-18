import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: 'HOW DOES WORKING WITH YOU WORK?',
    answer: 'WE START WITH A 15-MINUTE INTRO CALL TO ALIGN ON SCOPE AND TIMELINE. I OPERATE EITHER ON A PROJECT BASIS OR AN AGILE MONTHLY SPRINT RETAINER.',
  },
  {
    question: 'WHAT TECH STACK DO YOU SPECIALIZE IN?',
    answer: 'REACT 19, NEXT.JS, TYPESCRIPT, NODE.JS, EXPRESS, MONGODB/POSTGRESQL, AND FIGMA FOR UI/UX DESIGN SYSTEMS.',
  },
  {
    question: 'HOW FAST CAN WE LAUNCH A PROJECT?',
    answer: 'STANDARD WEB APPLICATIONS OR LANDING PAGE DESIGNS ARE TYPICALLY DELIVERED WITHIN 1 TO 3 WEEKS DEPENDING ON COMPLEX INTEGRATIONS.',
  },
  {
    question: 'ARE YOU AVAILABLE FOR CONTRACT ROLES?',
    answer: 'YES. I AM AVAILABLE FOR HIGH-IMPACT CONTRACT WORK, FRACTIONAL LEAD ROLES, AND SELECT FREELANCE PARTNERSHIPS.',
  },
];

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      style={{
        width: '100%',
        backgroundColor: '#0a0a0a',
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
            color: '#ffffff',
            borderBottom: '4px solid #ffffff',
            display: 'inline-block',
            paddingBottom: '12px'
          }}>
            DETAILS // FAQS
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                borderBottom: '2px solid rgba(255,255,255,0.2)',
                padding: '4vh 0',
                cursor: 'pointer',
              }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(24px, 4vw, 48px)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    color: openFaq === idx ? 'var(--accent)' : '#ffffff',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFaq === idx ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {openFaq === idx ? <FiMinus size={32} /> : <FiPlus size={32} />}
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'clamp(14px, 1.5vw, 20px)',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.6,
                        marginTop: '3vh',
                        marginBottom: 0,
                        maxWidth: '80%',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
