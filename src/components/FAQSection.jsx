import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FAQSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} id="faqs" className="relative w-full bg-[#050505] overflow-hidden selection:bg-[#ff0000] selection:text-white">
      
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] mix-blend-screen z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <div className="relative z-10 w-full pt-32 pb-32 md:pb-[20vh]">
        
        {/* Top Header */}
        <div className="w-full px-[8vw] lg:px-[10vw] flex flex-col md:flex-row justify-between items-start mb-32">
          <h2 className="text-[#ffffff] font-inter font-black text-2xl md:text-4xl uppercase leading-[1] max-w-2xl tracking-tighter">
            TIRED OF OUTDATED<br/>DIGITAL EXPERIENCES?
          </h2>
          <span className="text-white/60 font-mono text-xs md:text-sm tracking-widest mt-8 md:mt-0 uppercase">
            [ ABOUT ME ]
          </span>
        </div>

        {/* Stats & Image Grid */}
        <div className="w-full px-[8vw] lg:px-[10vw] grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-center">
          
          {/* Left Stats */}
          <div className="flex flex-col space-y-24">
            <motion.div style={{ y: y1 }}>
              <h3 className="text-white font-inter font-black text-4xl lg:text-6xl tracking-tighter">3+ years</h3>
              <p className="text-[#ff0000] font-inter text-xs font-bold mt-3 uppercase max-w-[180px] leading-relaxed">
                of experience <span className="text-white/70 font-normal">in the full-stack development market</span>
              </p>
            </motion.div>
            <motion.div style={{ y: y1 }}>
              <h3 className="text-white font-inter font-black text-4xl lg:text-6xl tracking-tighter">100%</h3>
              <p className="text-[#ff0000] font-inter text-xs font-bold mt-3 uppercase max-w-[180px] leading-relaxed">
                commitment <span className="text-white/70 font-normal">to high-performance, pixel-perfect UIs</span>
              </p>
            </motion.div>
          </div>

          {/* Center Image */}
          <div className="flex justify-center relative my-12 md:my-0 md:mt-32">
            <motion.div 
              initial={{ rotate: -5, scale: 0.9 }}
              whileInView={{ rotate: -2, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-[240px] md:w-[300px]"
            >
              <div className="absolute inset-0 bg-[#1a1a1a] transform rotate-3 scale-105 -z-10 shadow-2xl"></div>
              <img 
                src="/assets/about_portrait.png" 
                alt="Portrait" 
                className="w-full h-auto object-cover grayscale brightness-75 contrast-125 border-4 border-[#1a1a1a]" 
              />
              {/* Film strip edge effect (visual flair) */}
              <div className="absolute -left-3 top-0 bottom-0 w-3 flex flex-col justify-between py-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2 bg-black/80 mx-auto rounded-sm"></div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Stats */}
          <div className="flex flex-col space-y-24 md:items-end md:text-right">
            <motion.div style={{ y: y2 }}>
              <h3 className="text-white font-inter font-black text-4xl lg:text-6xl tracking-tighter">50+</h3>
              <p className="text-[#ff0000] font-inter text-xs font-bold mt-3 uppercase max-w-[180px] ml-auto leading-relaxed">
                successful <span className="text-white/70 font-normal">projects shipped globally</span>
              </p>
            </motion.div>
            <motion.div style={{ y: y2 }}>
              <h3 className="text-white font-inter font-black text-4xl lg:text-6xl tracking-tighter">200%</h3>
              <p className="text-[#ff0000] font-inter text-xs font-bold mt-3 uppercase max-w-[180px] ml-auto leading-relaxed">
                faster <span className="text-white/70 font-normal">delivery through advanced agile frameworks</span>
              </p>
            </motion.div>
          </div>

        </div>

        {/* Big Red Typography Section */}
        <div className="w-full flex justify-center items-center mt-64 lg:mt-80 relative px-4 pb-64 md:pb-96">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#ff0000] font-inter font-black text-[10vw] md:text-[6.5vw] leading-[0.9] tracking-tighter text-center max-w-[95vw] md:max-w-[85vw] relative z-10 break-words"
          >
            I AM A DEVELOPER THAT USES ADVANCED TECHNOLOGIES TO BUILD DIGITAL EXPERIENCES EVEN BEFORE YOU REALIZE YOU NEED THEM
            
            {/* Hand-drawn SVG arrows (Decorative) - Repositioned to avoid clipping */}
            <svg className="absolute -top-16 left-[2%] md:left-[10%] w-12 md:w-20 text-white transform -rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M10,90 Q40,40 90,10 M70,10 L90,10 L90,30" />
            </svg>
            <svg className="absolute bottom-8 -right-2 md:-right-8 w-12 md:w-20 text-white transform rotate-45 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M10,90 Q40,40 90,10 M70,10 L90,10 L90,30" />
            </svg>
            <svg className="absolute -bottom-12 left-[30%] w-20 md:w-32 text-white pointer-events-none" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M10,30 Q100,5 190,30" />
            </svg>
          </motion.h2>
        </div>

      </div>
      
      {/* CSS for hiding scrollbar in cards */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default FAQSection;
