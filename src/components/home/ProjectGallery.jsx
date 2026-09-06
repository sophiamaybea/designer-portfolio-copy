import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projectData";

export default function ProjectGallery() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-40 px-6 md:px-8" aria-label="Selected Works">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
      >
        <div className="md:col-span-3">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground block">
            Selected works / 02
          </span>
        </div>
        <h2 className="md:col-span-9 font-display text-[13vw] sm:text-[10vw] md:text-[7.5vw] leading-[0.84] tracking-[-0.04em] text-foreground">
          Work with a <span className="italic">point of view.</span>
        </h2>
      </motion.div>

      <div className="space-y-24 md:space-y-40">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-20 md:mt-32">
        <Link
          to="/projects"
          className="font-mono text-2xl md:text-3xl tracking-widest uppercase font-light pb-1 focus:outline-none animated-gradient-text"
          style={{ borderBottom: 'none' }}
        >
          All Projects →
        </Link>
      </div>
    </section>
  );
}