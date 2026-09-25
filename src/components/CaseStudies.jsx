import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import TechMarquee from './TechMarquee';

const EASE = [0.22, 1, 0.36, 1];

const PixelOverlay = ({ isHovered }) => {
  const rows = 8;
  const cols = 12;
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delayIn = (r + c) * 0.018;
      const delayOut = ((rows - r) + (cols - c)) * 0.012;
      blocks.push(
        <motion.div
          key={`${r}-${c}`}
          className="absolute bg-black/80"
          style={{
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
            left: `${(c / cols) * 100}%`,
            top: `${(r / rows) * 100}%`,
          }}
          initial="rest"
          animate={isHovered ? "hovered" : "rest"}
          variants={{
            rest: { scale: 0, opacity: 0, transition: { duration: 0.25, delay: delayOut, ease: EASE } },
            hovered: { scale: 1, opacity: 1, transition: { duration: 0.25, delay: delayIn, ease: EASE } }
          }}
        />
      );
    }
  }
  return <div className="absolute inset-0 z-10 pointer-events-none">{blocks}</div>;
};

const MagneticSquare = ({ sqX, sqY, size, mouseX, mouseY, isHovered }) => {
  const nx = sqX / 100;
  const ny = sqY / 100;
  
  const xDist = useTransform(mouseX, v => (v - nx) * 40);
  const yDist = useTransform(mouseY, v => (v - ny) * 40);
  
  const springX = useSpring(xDist, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(yDist, { stiffness: 80, damping: 18, mass: 0.6 });

  return (
    <motion.div
      className="absolute bg-black z-20 pointer-events-none"
      style={{
        left: `${sqX}%`,
        top: `${sqY}%`,
        width: size,
        height: size,
        x: springX,
        y: springY,
        opacity: isHovered ? 1 : 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group relative overflow-hidden aspect-[4/3] cursor-pointer border-brutalist"
      style={{ backgroundColor: 'transparent' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={project.image} alt={project.title} className="absolute h-full w-full object-cover img-brutalist" style={{ ...project.cropStyle }} />
      
      <PixelOverlay isHovered={isHovered} />
      
      {project.squares.map((sq, i) => (
        <MagneticSquare key={i} sqX={sq.x} sqY={sq.y} size={sq.size} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered} />
      ))}

      <div className="absolute right-0 top-0 z-10 flex items-center justify-center bg-transparent" style={{ width: '48px', height: '48px' }}>
        <div className="hud-crosshair hud-tr"></div>
      </div>

      <div className="absolute bottom-0 left-0 z-20" style={{ padding: '24px 32px', maxWidth: '90%', background: 'linear-gradient(0deg, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0) 100%)', width: '100%' }}>
        <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 32px)', textTransform: 'uppercase', color: '#ffffff', lineHeight: 1, marginBottom: '12px' }}>{project.title}</h3>
        <div className="font-hud" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

const renderIcon = (type) => {
  switch (type) {
    case "code": return (
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,4 1,9 6,14" />
        <polyline points="16,4 21,9 16,14" />
        <line x1="13" y1="2" x2="9" y2="16" />
      </svg>
    );
    case "dots": return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        {[3,10,17].map(cx => [3,10,17].map(cy => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" />))}
      </svg>
    );
    case "circle-ring": return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="9" />
        <circle cx="11" cy="11" r="4" />
      </svg>
    );
    case "arrow": return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="16" x2="16" y2="2" />
        <polyline points="7,2 16,2 16,11" />
      </svg>
    );
    case "wave-circle": return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="9" />
        <path d="M5 11Q8 7 11 11Q14 15 17 11" strokeLinecap="round" />
      </svg>
    );
    case "lines": return (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="0" y1="3" x2="24" y2="3" />
        <line x1="6" y1="9" x2="24" y2="9" />
        <line x1="0" y1="15" x2="18" y2="15" />
      </svg>
    );
    case "bolt": return (
      <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
        <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
      </svg>
    );
    case "plus": return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <rect x="7.5" y="0" width="3" height="18" />
        <rect x="0" y="7.5" width="18" height="3" />
      </svg>
    );
    default: return null;
  }
};

const CaseStudies = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const projects = [
    {
      id: "heartx", title: "HeartX", category: "Brand Strategy & Product Design", year: "2026",
      image: "https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800",
      squares: [{x:5,y:30,size:16}, {x:10,y:42,size:10}, {x:3,y:52,size:7}, {x:80,y:70,size:14}, {x:85,y:82,size:9}, {x:78,y:60,size:6}]
    },
    {
      id: "swave", title: "Swave®", category: "Web Design & Identity", year: "2025",
      image: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
      squares: [{x:82,y:55,size:16}, {x:88,y:68,size:10}, {x:78,y:72,size:7}, {x:85,y:42,size:6}, {x:90,y:80,size:8}]
    },
    {
      id: "eduspark", title: "EduSpark", category: "Brand Strategy & Web Design", year: "2023",
      image: "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800",
      squares: [{x:4,y:24,size:16}, {x:10,y:36,size:10}, {x:2,y:44,size:7}, {x:78,y:78,size:14}, {x:84,y:88,size:8}]
    },
    {
      id: "greenergy", title: "Greenergy", category: "Brand Strategy & Web Design", year: "2022",
      image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800",
      squares: [{x:82,y:26,size:14}, {x:88,y:38,size:10}, {x:78,y:44,size:7}, {x:84,y:54,size:5}, {x:90,y:60,size:8}]
    }
  ];

  const logos = [
    { name: "Codecraft_", type: "code" }, { name: "ennLabs", type: "dots" },
    { name: "GlobalBank", type: "circle-ring" }, { name: "45 Degrees°", type: "arrow" },
    { name: "AlphaWave", type: "wave-circle" }, { name: "Biosynthesis", type: "lines" },
    { name: "Boltshift", type: "bolt" }, { name: "Clandestine", type: "plus" }
  ];

  return (
    <section ref={sectionRef} id="projects-list" className="relative w-full pt-[15vh] pb-10 overflow-hidden" style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      
      {/* ── Massive Red Section Heading ("projects") (z-0 Overlay, Cut off) ─────────────── */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none">
        <h2 
          style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontWeight: 800, 
            fontSize: 'clamp(100px, 20vw, 380px)',
            color: '#FF0000',
            lineHeight: 0.8,
            letterSpacing: '-0.04em',
            opacity: 0.4,
            whiteSpace: 'nowrap'
          }}
        >
          projects
        </h2>
      </div>
      <style>
        {`
          @keyframes marqueeProjects {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-projects {
            animation: marqueeProjects 28s linear infinite;
          }
          .marquee-projects:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Header Area */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40 z-20" style={{ maxWidth: '1240px', margin: '0 auto', marginBottom: '8vh', paddingTop: '10vh' }}>
        
        <motion.div 
          ref={headerRef}
          className="relative mx-auto max-w-7xl text-center"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(20px, 3.5vw, 42px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#ffffff',
            borderBottom: '4px solid rgba(255, 255, 255, 0.08)',
            display: 'inline-block',
            paddingBottom: '12px',
            marginBottom: '40px'
          }}>
            RECENT PROJECTS
          </h2>
        </motion.div>
      </div>

      {/* Case Study Cards */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16 relative z-20" style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <div className="grid gap-4 md:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '24px' }}>
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))}
        </div>
      </div>

      {/* Footer Area with Seamless Full Bleed Background */}
      <div className="relative w-full overflow-hidden min-h-[60vh] lg:min-h-[85vh] border-t border-b border-brutalist" style={{ margin: '8vh 0 0' }}>
        
        {/* Full Width Image Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img 
            src="/sitting_man.png" 
            alt="Portrait" 
            className="absolute top-0 left-0 w-full max-w-none h-full object-cover object-[20%_25%] img-brutalist" 
            style={{ filter: 'grayscale(100%) contrast(140%) brightness(50%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full px-[8vw] h-full flex flex-col justify-center pointer-events-none min-h-[60vh] lg:min-h-[85vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
            
            {/* Left Column: Text & CTA */}
            <div className="py-16 lg:py-48 pointer-events-auto" style={{ maxWidth: '48rem', paddingLeft: '250px' }}>
              <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 900, fontSize: 'clamp(22px, 4.5vw, 45px)', textTransform: 'uppercase', color: '#ffffff', marginBottom: '24px', lineHeight: 1 }}>LET'S WORK TOGETHER</h3>
              <p className="font-hud" style={{ fontSize: '12px', lineHeight: 1.6, textTransform: 'uppercase' }}>
                I partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes.
              </p>
              <button className="group mt-20 flex items-center justify-center border-brutalist bg-transparent text-[#ffffff] hover:bg-white hover:text-black transition-colors" style={{ padding: '16px 28px', fontFamily: 'var(--font-inter)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '16px', lineHeight: 1 }}>
                <span style={{ transform: 'translateY(2px)' }}>START A PROJECT</span>
                <div className="ml-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
                  </svg>
                </div>
              </button>
            </div>
            
            {/* Right Column empty to let background show through */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <TechMarquee />
      </div>
      
      <div className="h-12" />
    </section>
  );
};

export default CaseStudies;
