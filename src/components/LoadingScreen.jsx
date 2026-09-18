import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import signatureVideo from '../assets/White_signature_writing_on_black_20260914204414.mp4';

const LoadingScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600); // Wait for fade out animation
  };

  useEffect(() => {
    // Fallback just in case video fails to play/end unexpectedly
    const fallbackTimer = setTimeout(() => {
      handleVideoEnd();
    }, 8000); // 8 seconds fallback
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center select-none"
        >
          <video
            src={signatureVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'scale(0.4)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
