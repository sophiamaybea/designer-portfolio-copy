import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projectData";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen" onMouseMove={handleMouseMove}>
      {/* Header */}
      <div className="px-6 md:px-8 pt-32 pb-12">
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Selected Works
        </span>
        <h1 className="font-body text-4xl md:text-6xl font-light tracking-tight text-foreground mt-3">
          Projects
        </h1>
      </div>

      {/* Strips */}
      <div className="border-t border-border">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="group block border-b border-border relative overflow-hidden"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background fill on hover */}
            <motion.div
              className="hidden md:block absolute inset-0 bg-foreground"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              style={{ originX: 0 }}
            />

            {/* Mobile image */}
            <div className="md:hidden relative z-10 pb-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="relative z-10 px-6 md:px-8 py-7 md:py-8 grid grid-cols-12 items-center gap-4">
              {/* Index */}
              <div className="col-span-2 md:col-span-1">
                <span
                  className="font-mono text-xs tracking-widest transition-colors duration-300"
                  style={{ color: window.innerWidth >= 768 && hoveredIndex === i ? "hsl(var(--background))" : "hsl(var(--muted-foreground))" }}
                >
                  {project.id}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-7 md:col-span-5">
                <span
                   className="font-body text-xl md:text-2xl font-light tracking-tight transition-colors duration-300"
                   style={{ color: window.innerWidth >= 768 && hoveredIndex === i ? "hsl(var(--background))" : "hsl(var(--foreground))" }}
                 >
                  {project.title}
                </span>
              </div>

              {/* Category */}
              <div className="hidden md:block col-span-3">
                <span
                   className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                   style={{ color: window.innerWidth >= 768 && hoveredIndex === i ? "hsl(var(--background))/60" : "hsl(var(--muted-foreground))" }}
                 >
                  {project.category}
                </span>
              </div>

              {/* Year */}
              <div className="hidden md:block col-span-2">
                <span
                   className="font-mono text-xs tracking-widest transition-colors duration-300"
                   style={{ color: window.innerWidth >= 768 && hoveredIndex === i ? "hsl(var(--background))" : "hsl(var(--muted-foreground))" }}
                 >
                   {project.year}
                </span>
              </div>

              {/* Arrow */}
              <div className="col-span-3 md:col-span-1 flex justify-end">
                <motion.span
                  className="font-mono text-sm transition-colors duration-300"
                  animate={{ x: hoveredIndex === i ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: window.innerWidth >= 768 && hoveredIndex === i ? "hsl(var(--background))" : "hsl(var(--muted-foreground))" }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating image that follows cursor */}
      <AnimatePresence>
        {hoveredIndex !== null && window.innerWidth >= 768 && (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed pointer-events-none z-50 w-56 h-72 overflow-hidden shadow-2xl"
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 100,
            }}
          >
            <img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}