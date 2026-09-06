import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Timeline from "@/components/about/Timeline";
import SkillsGrid from "@/components/about/SkillsGrid";


const PORTRAIT = "https://media.base44.com/images/public/6a0c41d815b4ff33c8825d04/02344f1f7_Base44_Templates_3_Gemini_3__Nano_Banana_Pro__2026-05-27_17-42-22.jpeg";

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="px-6 md:px-8 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <FadeIn className="md:col-span-5">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={PORTRAIT}
                alt="Alex Moreau — portrait"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </FadeIn>

          <FadeIn className="md:col-start-7 md:col-span-6 flex flex-col justify-end" delay={0.2}>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
              About
            </span>
            <h1 className="font-body text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 leading-tight">
              Brands that mean
              <br />
              <span className="text-muted-foreground">something.</span>
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground mb-6">
              I'm Alex Moreau, a graphic designer based in Berlin specializing in brand identity. Over the past decade, I've built visual systems for cafés, fashion labels, startups, and cultural institutions — from the first sketch to the final print file.
            </p>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              My work lives at the intersection of strategy and craft. I believe a strong brand isn't just a logo — it's a system of decisions, each one deliberate, each one communicating something true about the people behind it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-8 py-24 md:py-32" aria-label="Experience">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-body text-3xl md:text-4xl font-light tracking-tight text-foreground block mb-12">
              Experience & Education
            </h2>
          </FadeIn>
          <Timeline />
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-8 py-24 md:py-32" aria-label="Technical proficiency">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-body text-3xl md:text-4xl font-light tracking-tight text-foreground block mb-12">
              Software & Technical Proficiency
            </h2>
          </FadeIn>
          <SkillsGrid />
        </div>
      </section>


    </div>
  );
}