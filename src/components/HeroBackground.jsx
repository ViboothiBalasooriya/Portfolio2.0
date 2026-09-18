import React, { useRef, useEffect } from 'react';
import heroVideo from '../assets/Man_blinking_slowly_1080p_20260914170541_1080p_20260914172941.mp4';

const HeroBackground = () => {
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);
  const fadeFrameRef = useRef(null);

  const startFade = (targetOpacity, durationMs) => {
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const newOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = newOpacity.toString();
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(animate);
      }
    };
    fadeFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => startFade(1, 600);
    video.addEventListener('canplay', handleCanPlay);
    if (video.readyState >= 3) startFade(1, 600);

    const handleTimeUpdate = () => {
      if (!video) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        startFade(0, 500);
      }
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
        fadingOutRef.current = false;
        startFade(1, 600);
      }, 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0,
          zIndex: 1,
          filter: 'blur(1px) brightness(0.9) contrast(1.1)',
          transform: 'scale(1.01)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default HeroBackground;
