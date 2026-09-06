import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const philosophyText = "I believe design is not decoration — it is the deliberate structuring of meaning. Every project begins with listening, continues with questioning, and resolves through relentless iteration. The goal is never novelty. The goal is clarity."

function AnimatedParagraph({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      {text}
    </motion.p>
  );
}

export default function PhilosophySection() {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section className="py-24 md:py-40 px-6 md:px-8" aria-label="Design Philosophy">
      <div>
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-8 md:mb-12">
          Design philosophy / 03
        </span>

        <div className="mb-16">
          <div className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.035em] text-foreground leading-[1.02] max-w-5xl">
            <AnimatedParagraph text={philosophyText} />
          </div>
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 items-start"
        >
          <Link
            to="/about"
            className="font-mono text-sm tracking-widest uppercase text-foreground hover:text-cobalt transition-colors duration-300 border-b border-foreground/20 hover:border-cobalt pb-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4"
          >
            Read My Story →
          </Link>
          <Link
            to="/contact"
            className="font-mono text-sm tracking-widest uppercase text-foreground hover:text-cobalt transition-colors duration-300 border-b border-foreground/20 hover:border-cobalt pb-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4"
          >
            Start a Conversation →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}