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
      let ctx = gsap.context(() => {
        var panels = gsap.utils.toArray(".section");
        panels.pop(); // Remove the last one so it doesn't get pinned

        panels.forEach((panel) => {
          let innerpanel = panel.querySelector(".section-inner");
          if (!innerpanel) return;
          
          let isHero = panel.querySelector('#hero') !== null;
          let isProjects = panel.classList.contains('projects-section');
          let isBioText = panel.classList.contains('bio-text-section');
          let isFAQ = panel.classList.contains('faq-section');
          
          // Only apply global pinning to Hero, Projects, BioText, and FAQ. Let the rest scroll natively.
          if (!isHero && !isProjects && !isBioText && !isFAQ) return;
          
          let windowHeight = window.innerHeight;
          let endScroll = `+=${windowHeight}`;
          if (isHero) endScroll = `+=${windowHeight * 2.5}`;
          else if (isProjects) endScroll = `+=${windowHeight * 3}`;
          
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: endScroll,
              pinSpacing: (isBioText || isFAQ) ? false : true,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true
            }
          });
          
          if (isHero) {
            let zoomO = panel.querySelector('.zoom-o');
            
            // Fade out everything else in the hero section
            let elementsToFade = Array.from(panel.querySelectorAll('h1 span, p, nav, .gradient-overlay'))
              .filter(el => !el.classList.contains('zoom-o'));
              
            tl.fromTo(elementsToFade, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0);
            
            // Scale the 'O' to zoom completely through it
            if (zoomO) {
              tl.fromTo(zoomO, { scale: 1 }, {
                scale: 180, // Zoom until the 'O' completely disappears
                transformOrigin: "50% 50%",
                duration: 1, // Stretch out the zoom over the scroll distance
                ease: "power2.in"
              }, 0.1);
            }

            // Fade the background video to solid black ONLY when the 'O' hole covers the screen
            let fadeToBlack = panel.querySelector('.fade-to-black');
            if (fadeToBlack) {
              tl.to(fadeToBlack, {
                opacity: 1,
                duration: 0.2, // quick fade right at the end of the zoom
                ease: "none"
              }, 0.85);
            }

            // Reveal the Vibe Coder section from INSIDE the 'O'
            let bioContainer = panel.querySelector('.bio-container');
            if (bioContainer) {
              let vibeLeft = bioContainer.querySelector('.vibe-reveal-left');
              let vibeRight = bioContainer.querySelector('.vibe-reveal-right');
              
              tl.fromTo(bioContainer, { opacity: 0, scale: 0.9 }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              }, 0.3); // Fade in container as hole gets big enough
              
              if (vibeLeft && vibeRight) {
                tl.fromTo([vibeLeft, vibeRight], { opacity: 0, y: 40 }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  ease: "power2.out"
                }, 0.5);
              }
            }
          } else if (isProjects) {
            // Let it stay fully visible and pinned. The internal bento timeline handles the zoom.
          } else if (isBioText || isFAQ) {
            // Just pin it without any scale/fade animations so the next section natively scrolls over it.
          }
        });

        ScrollTrigger.refresh();
      }, mainRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <main ref={mainRef}>
          <section className="section"><div className="section-inner"><FolioHero /></div></section>
          <section className="section projects-section"><div className="section-inner"><LatestProjects /></div></section>
          <section className="section"><div className="section-inner"><CaseStudies /></div></section>
          <section className="section bio-text-section" style={{ position: 'relative', zIndex: 1 }}><div className="section-inner"><BioTextSection /></div></section>
          <section className="section faq-section" style={{ position: 'relative', zIndex: 2 }}><div className="section-inner"><FAQSection /></div></section>
          <section className="section footer-section" style={{ position: 'relative', zIndex: 3 }}><div className="section-inner"><Footer /></div></section>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
