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
          
          // Only apply global pinning to Hero and Projects. Let the rest scroll natively.
          if (!isHero && !isProjects) return;
          
          let windowHeight = window.innerHeight;
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: isHero ? `+=${windowHeight * 2.5}` : `+=${windowHeight * 3}`,
              pinSpacing: true,
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

            // Fade the background video to solid black as the 'O' zooms
            let fadeToBlack = panel.querySelector('.fade-to-black');
            if (fadeToBlack) {
              tl.to(fadeToBlack, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.in"
              }, 0.2); // Fade out early
            }

            // Reveal the bio text from INSIDE the 'O'
            let bioContainer = panel.querySelector('.bio-container');
            if (bioContainer) {
              let bioWords = bioContainer.querySelectorAll('.bio-word');
              
              tl.fromTo(bioContainer, { opacity: 0, scale: 0.8 }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              }, 0.3); // Fade in container as hole gets big enough
              
              tl.fromTo(bioWords, { opacity: 0, y: 30 }, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.03,
                ease: "power2.out"
              }, 0.4);
            }
          } else if (isProjects) {
            // Let it stay fully visible and pinned. The internal bento timeline handles the zoom.
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
          <section className="section"><div className="section-inner"><FAQSection /></div></section>
          <section className="section"><div className="section-inner"><Footer /></div></section>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
