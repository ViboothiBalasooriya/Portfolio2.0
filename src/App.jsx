import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import LoadingScreen from './components/LoadingScreen';
import FolioHero from './components/FolioHero';
import LatestProjects from './components/LatestProjects';
import CaseStudies from './components/CaseStudies';
import FAQSection from './components/FAQSection';
import BioTextSection from './components/BioTextSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      let mm = gsap.matchMedia(mainRef);
      
      mm.add("(min-width: 768px)", () => {
        var panels = gsap.utils.toArray(".section");

        panels.forEach((panel) => {
          let innerpanel = panel.querySelector(".section-inner");
          if (!innerpanel) return;
          
          let isHero = panel.querySelector('#hero') !== null;
          let isProjects = panel.classList.contains('projects-section');
          
          if (!isHero && !isProjects) return;
          
          let windowHeight = window.innerHeight;
          let endScroll = `+=${windowHeight}`;
          if (isHero) endScroll = `+=${windowHeight * 2.5}`;
          else if (isProjects) endScroll = `+=${windowHeight * 3}`;
          
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: endScroll,
              pinSpacing: true,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true
            }
          });
          
          if (isHero) {
            let zoomO = panel.querySelector('.zoom-o');
            
            let elementsToFade = Array.from(panel.querySelectorAll('h1 span, p, nav, .gradient-overlay'))
              .filter(el => !el.classList.contains('zoom-o'));
              
            tl.fromTo(elementsToFade, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0);
            
            if (zoomO) {
              tl.fromTo(zoomO, { scale: 1 }, {
                scale: 180,
                transformOrigin: "50% 50%",
                duration: 1,
                ease: "power2.in"
              }, 0.1);
            }

            let fadeToBlack = panel.querySelector('.fade-to-black');
            if (fadeToBlack) {
              tl.to(fadeToBlack, {
                opacity: 1,
                duration: 0.2,
                ease: "none"
              }, 0.85);
            }

            let bioContainer = panel.querySelector('.bio-container');
            if (bioContainer) {
              let vibeLeft = bioContainer.querySelector('.vibe-reveal-left');
              let vibeRight = bioContainer.querySelector('.vibe-reveal-right');
              
              tl.fromTo(bioContainer, { opacity: 0, scale: 0.95 }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              }, 1.0); // Delayed to start AFTER the '0' zoom finishes (was 0.3)
              
              if (vibeLeft && vibeRight) {
                tl.fromTo([vibeLeft, vibeRight], { opacity: 0, y: 40 }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  ease: "power2.out"
                }, 1.2);
              }
            }
          }
        });
      });

      // Mobile animations (simplified)
      mm.add("(max-width: 767px)", () => {
        let heroPanel = document.querySelector("#hero")?.closest(".section");
        if (heroPanel) {
          gsap.to(heroPanel.querySelector('.zoom-o'), {
            scale: 80,
            opacity: 0,
            scrollTrigger: {
              trigger: heroPanel,
              start: "top top",
              end: "+=100%",
              scrub: true,
              pin: true
            }
          });
          gsap.fromTo(heroPanel.querySelector('.bio-container'), { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
              trigger: heroPanel,
              start: "70% top", // Delay appearance on mobile until '0' is mostly zoomed out
              end: "+=100%",
              scrub: true
            }
          });
        }
      });

      return () => mm.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, [isLoading]);


  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div className="bg-radial-vignette" style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
        
        {/* Global Film Grain / Noise Overlay */}
        <svg 
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            opacity: 0.06,
            pointerEvents: 'none'
          }} 
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <main ref={mainRef}>
          <section className="section"><div className="section-inner"><FolioHero /></div></section>
          <section className="section projects-section"><div className="section-inner"><LatestProjects /></div></section>
          <section className="section"><div className="section-inner"><CaseStudies /></div></section>
          <section className="section bio-text-section" style={{ position: 'relative', zIndex: 1 }}><div className="section-inner"><BioTextSection /></div></section>
          <section className="section" style={{ position: 'relative', zIndex: 2 }}><div className="section-inner"><FAQSection /></div></section>
          <section className="section" style={{ position: 'relative', zIndex: 2 }}><div className="section-inner"><Footer /></div></section>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
