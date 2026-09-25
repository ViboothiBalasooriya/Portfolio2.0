import React, { useState, useEffect, useRef } from 'react';
import { client, urlFor } from '../client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, Flip);

const DEFAULT_PROJECTS = [
  { id: 1, img: "https://assets.codepen.io/16327/portrait-pattern-1.jpg" },
  { id: 2, img: "https://assets.codepen.io/16327/portrait-image-12.jpg" },
  { id: 3, type: "text", content: "VIBOOTHI BALASOORIYA" },
  { id: 4, img: "https://assets.codepen.io/16327/portrait-pattern-2.jpg" },
  { id: 5, img: "https://assets.codepen.io/16327/portrait-image-4.jpg" },
  { id: 6, img: "https://assets.codepen.io/16327/portrait-image-3.jpg" },
  { id: 7, img: "https://assets.codepen.io/16327/portrait-pattern-3.jpg" },
  { id: 8, img: "https://assets.codepen.io/16327/portrait-image-1.jpg" },
];

const ProjectsBentoGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const galleryRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    client.fetch('*[_type == "project"] | order(order asc)').then((data) => {
      if (data && data.length > 0) {
        const formatted = data.map((p) => ({
          id: p._id,
          type: p.isTextOnly ? 'text' : undefined,
          content: p.title,
          img: p.image ? urlFor(p.image).url() : undefined
        }));
        setProjects(formatted);
      }
    });
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let galleryElement = galleryRef.current;
      let galleryItems = galleryElement.querySelectorAll(".gallery__item");

      galleryElement.classList.remove("gallery--final");

      // Temporarily add the final class to capture the final state
      galleryElement.classList.add("gallery--final");
      const flipState = Flip.getState(galleryItems);
      galleryElement.classList.remove("gallery--final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "expoScale(1, 5)",
      });

      let galleryWrap = containerRef.current.querySelector('.gallery-wrap');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryElement,
          start: "center center",
          end: "+=300%",
          scrub: true,
          refreshPriority: -1
        }
      });

      // Phase 0: Pause - let the full gallery sit still for a moment as the user scrolls
      tl.to({}, { duration: 1 });

      // Phase 1: Flip animation (bento grid expands)
      tl.add(flip);

      // Phase 2: Zoom gallery and transition background to white
      if (galleryWrap) {
        tl.set(galleryWrap, { overflow: 'visible' });
      }
      
      tl.to(galleryElement, {
        scale: 1.8,
        duration: 1.5,
        ease: "power2.in",
        transformOrigin: "50% 50%"
      });

      let textElement = galleryElement.querySelector(".gallery-text-content");
      if (textElement) {
        tl.to(textElement, {
          scale: 1 / 1.8,
          duration: 1.5,
          ease: "power2.in",
          transformOrigin: "50% 50%"
        }, "<");
      }
      
      return () => gsap.set(galleryItems, { clearProps: "all" });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <div ref={containerRef} className="projects-gallery-container relative" style={{ zIndex: 20, backgroundColor: 'var(--bg-dark)' }}>

      <div className="gallery-wrap relative z-60">
        <div className="gallery gallery--bento gallery--switch" ref={galleryRef}>
          {projects.map((proj) => (
            <div 
              className="gallery__item" 
              key={proj.id} 
              onClick={() => !proj.type && setSelectedProject(proj)}
              style={{ 
                cursor: proj.type === 'text' ? 'default' : 'pointer', 
                overflow: 'hidden'
              }}
            >
              {proj.type === 'text' ? (
                <div className="border-brutalist" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505' }}>
                  <div className="hud-crosshair hud-tl"></div>
                  <div className="hud-crosshair hud-tr"></div>
                  <div className="hud-crosshair hud-bl"></div>
                  <div className="hud-crosshair hud-br"></div>
                  <span className="font-hud" style={{ position: 'absolute', top: '12px', left: '24px', fontSize: '10px' }}>[SYS-CORE]</span>
                  <h2 className="gallery-text-content" style={{ 
                    fontFamily: 'var(--font-inter)', 
                    fontWeight: 700, 
                    color: '#ffffff', 
                    fontSize: 'clamp(12px, 1.5vw, 20px)', 
                    textTransform: 'uppercase', 
                    textAlign: 'center', 
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    padding: '1rem',
                    margin: 0
                  }}>
                    {proj.content}
                  </h2>
                </div>
              ) : (
                <div className="border-brutalist" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div className="hud-crosshair hud-tl"></div>
                  <div className="hud-crosshair hud-tr"></div>
                  <div className="hud-crosshair hud-bl"></div>
                  <div className="hud-crosshair hud-br"></div>
                  <span className="font-hud" style={{ position: 'absolute', top: '12px', left: '24px', fontSize: '10px', zIndex: 11 }}>
                    [PRJ-{String(proj.id).substring(0, 4).toUpperCase()}]
                  </span>
                  <motion.img 
                    layoutId={`project-img-${proj.id}`} 
                    src={proj.img} 
                    alt="" 
                    className="img-brutalist"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <button 
              style={{ 
                position: 'absolute', 
                top: '2rem', 
                right: '2rem', 
                background: 'rgba(255, 255, 255, 0.1)', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onClick={() => setSelectedProject(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              layoutId={`project-img-${selectedProject.id}`}
              src={selectedProject.img}
              alt=""
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '12px',
                cursor: 'default',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsBentoGallery;
