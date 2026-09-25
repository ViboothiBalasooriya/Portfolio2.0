import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '2vh 0',
    border: 'none',
    borderBottom: '4px solid #0a0a0a',
    backgroundColor: 'transparent',
    color: '#0a0a0a',
    fontFamily: 'var(--font-inter)',
    fontSize: 'clamp(18px, 2vw, 32px)',
    fontWeight: 900,
    outline: 'none',
    transition: 'border-color 0.3s',
    textTransform: 'uppercase',
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '15vh 0 5vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ position: 'relative', zIndex: 60, width: '100%', padding: '0 5vw' }}>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(20px, 5vw, 90px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 0.9,
          margin: '0 0 10vh 0',
          color: '#0a0a0a',
        }}>
          LET'S TALK.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '8vw' }}>
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6vh',
            }}
          >
            <div>
              <input
                type="text"
                required
                placeholder="YOUR NAME"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = '#0a0a0a'}
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = '#0a0a0a'}
              />
            </div>
            <div>
              <textarea
                rows={1}
                required
                placeholder="PROJECT DETAILS"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = '#0a0a0a'}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                alignSelf: 'flex-start',
                padding: '24px 48px',
                backgroundColor: sent ? 'var(--green)' : '#0a0a0a',
                color: '#ffffff',
                border: 'none',
                fontFamily: 'var(--font-inter)',
                fontSize: '24px',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              {sent ? 'RECEIVED ✓' : 'SUBMIT'}
            </motion.button>
          </motion.form>

          {/* Socials / Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4vh' }}>
            <h3 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(20px, 3vw, 40px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#0a0a0a',
              margin: 0,
            }}>
              DIRECT CONTACT
            </h3>
            <a
              href="mailto:viboothi@gmail.com"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(18px, 2.5vw, 32px)',
                fontWeight: 700,
                color: '#0a0a0a',
                textDecoration: 'none',
                borderBottom: '4px solid #0a0a0a',
                display: 'inline-block',
                alignSelf: 'flex-start',
              }}
            >
              VIBOOTHI@GMAIL.COM
            </a>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', marginTop: '4vh' }}>
              {['GITHUB', 'LINKEDIN', 'TWITTER', 'DRIBBBLE'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(24px, 3vw, 48px)',
                    fontWeight: 900,
                    color: '#0a0a0a',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.target.style.color = '#0a0a0a'}
                >
                  {soc} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
