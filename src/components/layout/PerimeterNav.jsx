import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { projects } from "@/lib/projectData";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function FullScreenMenu({ isOpen, onClose }) {
  const [rotation, setRotation] = useState(0);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const targetRotation = React.useRef(0);
  const rafRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      setRotation(0);
      targetRotation.current = 0;
      setProjectsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onWheel = (e) => {
      e.preventDefault();
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.85;
      const spread = 22;
      const halfSpan = ((navLinks.length - 1) / 2) * spread;
      const bufferDeg = (100 / radius) * (180 / Math.PI);
      targetRotation.current -= e.deltaY * 0.04;
      targetRotation.current = Math.max(-(halfSpan + bufferDeg), Math.min(halfSpan, targetRotation.current));
      const animate = () => {
        setRotation(prev => {
          const diff = targetRotation.current - prev;
          if (Math.abs(diff) < 0.01) return targetRotation.current;
          return prev + diff * 0.1;
        });
        rafRef.current = requestAnimationFrame(animate);
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen]);

  const RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.85;
  const cx = window.innerWidth / 2 - RADIUS;
  const cy = window.innerHeight / 2 - 20;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-charcoal overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-gallery p-2 focus:outline-none z-10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Rotating circle */}
          <div
            className="absolute inset-0"
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
          >
            {/* Circle SVG */}
            <svg
              className="absolute"
              style={{ left: cx - RADIUS, top: cy - RADIUS, width: RADIUS * 2, height: RADIUS * 2, overflow: 'visible' }}
              viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
            >
              <circle
                cx={RADIUS}
                cy={RADIUS}
                r={RADIUS - 1}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
            </svg>

            {/* Hovered project image */}
            {hoveredProject && (
              <div
                className="absolute"
                style={{
                  left: cx,
                  top: cy,
                  width: RADIUS * 2,
                  height: RADIUS * 2,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 5,
                }}
              >
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Nav items on circle perimeter */}
            {navLinks.map((link, i) => {
              const spread = 22 * (Math.PI / 180);
              const angle = (i - (navLinks.length - 1) / 2) * spread;
              const x = cx + RADIUS * Math.cos(angle);
              const y = cy + RADIUS * Math.sin(angle);
              const counterRotate = -rotation;
              return (
                <div
                  key={link.path}
                  className="absolute flex flex-col items-start"
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(0, -50%) rotate(${counterRotate}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-cobalt flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-white/40 tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label === 'Projects' ? (
                        <div className="flex items-center gap-3">
                          <Link
                            to={link.path}
                            onClick={onClose}
                            className="font-body text-3xl md:text-4xl font-light text-gallery hover:text-cobalt transition-colors duration-300 focus:outline-none leading-tight"
                          >
                            {link.label}
                          </Link>
                          <button
                            onClick={(e) => { e.preventDefault(); setProjectsOpen(p => !p); }}
                            className="text-white/50 hover:text-cobalt transition-colors duration-200 focus:outline-none mt-1"
                            aria-label="Toggle projects"
                          >
                            <ChevronDown
                              className="w-5 h-5 transition-transform duration-300"
                              style={{ transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                          </button>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={onClose}
                          className="font-body text-3xl md:text-4xl font-light text-gallery hover:text-cobalt transition-colors duration-300 focus:outline-none leading-tight"
                        >
                          {link.label}
                        </Link>
                      )}
                      {link.label === 'Projects' && projectsOpen && (
                        <div className="mt-3 flex flex-col gap-1 pl-1">
                          {projects.map((p, pi) => (
                            <Link
                              key={p.slug}
                              to={`/project/${p.slug}`}
                              onClick={onClose}
                              onMouseEnter={() => setHoveredProject(p)}
                              onMouseLeave={() => setHoveredProject(null)}
                              className="font-body text-base font-light text-white/50 hover:text-cobalt transition-colors duration-200 focus:outline-none leading-snug"
                            >
                              <span className="font-mono text-xs text-white/30 mr-2">{p.id}</span>
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedLogo() {
  const [phase, setPhase] = useState("idle"); // idle | spacing | reset

  useEffect(() => {
    let timeout;

    const runCycle = () => {
      // 1. expand letter spacing
      setPhase("spacing");
      timeout = setTimeout(() => {
        // 2. stay expanded for 3s
        timeout = setTimeout(() => {
          // 3. reset
          setPhase("reset");
          timeout = setTimeout(() => {
            setPhase("idle");
            // wait 3s then repeat
            timeout = setTimeout(runCycle, 3000);
          }, 400);
        }, 3000);
      }, 500);
    };

    timeout = setTimeout(runCycle, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const letterSpacing = phase === "spacing" ? "0.7em" : "0.05em";

  return (
    <span
      className="font-mono text-xs md:text-sm uppercase"
      style={{
        letterSpacing,
        transition: phase === "spacing"
          ? "letter-spacing 0.4s cubic-bezier(0.65,0,0.35,1)"
          : phase === "reset"
          ? "letter-spacing 0.35s cubic-bezier(0.65,0,0.35,1)"
          : "none",
      }}
    >
      A/M
    </span>
  );
}

export default function PerimeterNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const location = useLocation();

  const isProjectPage = location.pathname.startsWith("/project/");

  useEffect(() => {
    setMenuOpen(false);
    setHeroVisible(true);
  }, [location]);

  useEffect(() => {
    if (!isProjectPage) return;
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setHeroVisible(window.scrollY < heroHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isProjectPage, location.pathname]);

  const shouldShowBackground = !heroVisible && typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none" aria-hidden="true">
        {/* Unified header background */}
        <div
          className="pointer-events-none md:hidden fixed top-6 left-6 right-6 flex justify-between items-center"
          style={{
            backgroundColor: shouldShowBackground ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
            backdropFilter: shouldShowBackground ? 'blur(10px)' : 'none',
            borderRadius: '8px',
            padding: shouldShowBackground ? '8px' : '0px',
            transition: 'all 0.3s ease',
            height: shouldShowBackground ? '40px' : 'auto'
          }}
        >
          {/* Top Left — Name */}
          <Link
            to="/"
            className="pointer-events-auto hover:text-cobalt transition-colors duration-500 focus:outline-none"
            style={{
              color: isProjectPage && heroVisible ? '#F5F5F7' : undefined
            }}
          >
            <AnimatedLogo />
          </Link>

          {/* Top Right — Menu Trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto font-mono text-xs tracking-widest uppercase hover:text-cobalt transition-colors duration-500 focus:outline-none"
            style={{
              color: isProjectPage && heroVisible ? '#F5F5F7' : undefined
            }}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Top Left — Name */}
          <Link
            to="/"
            className="pointer-events-auto absolute top-6 left-6 md:top-8 md:left-8 hover:text-cobalt transition-colors duration-500 focus:outline-none"
            style={{
              color: isProjectPage && heroVisible ? '#F5F5F7' : undefined
            }}
          >
            <AnimatedLogo />
          </Link>

          {/* Top Right — Menu Trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto absolute top-6 right-6 md:top-8 md:right-8 font-mono text-xs md:text-sm tracking-widest uppercase hover:text-cobalt transition-colors duration-500 focus:outline-none"
            style={{
              color: isProjectPage && heroVisible ? '#F5F5F7' : undefined
            }}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>



        {/* Bottom Right — CTA */}
        <Link
          to="/contact"
          className="pointer-events-auto absolute bottom-[26px] right-[26px] font-mono text-xs md:text-sm tracking-widest uppercase hover:text-cobalt transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4"
          style={{ color: isProjectPage && heroVisible ? '#F5F5F7' : undefined }}
        >
          Start a Project →
        </Link>
      </div>

      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}