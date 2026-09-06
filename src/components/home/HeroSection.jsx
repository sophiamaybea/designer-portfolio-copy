import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const INFO_TEXTS = ["Graphic Designer", "Berlin / Available worldwide", "hello@alexmoreau.design"];

function TypewriterInfo({ isInView }) {
  const [visible, setVisible] = useState("");

  useEffect(() => {
    if (!isInView) return;
    const full = INFO_TEXTS.join("   /   ");
    let i = 0;
    const start = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        i += 1;
        setVisible(full.slice(0, i));
        if (i >= full.length) window.clearInterval(timer);
      }, 24);
    }, 520);
    return () => window.clearTimeout(start);
  }, [isInView]);

  return (
    <span>
      {visible}
      {visible.length < INFO_TEXTS.join("   /   ").length && <span className="opacity-40">|</span>}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden px-6 md:px-8 pt-28 md:pt-32 pb-8 flex flex-col justify-between"
      aria-label="Introduction"
    >
      {/* Quiet editorial markers: enough movement to feel alive, never like a template. */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[8vw] top-[18vh] h-[clamp(150px,23vw,390px)] w-[clamp(150px,23vw,390px)] rounded-full border border-foreground/10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt"
          animate={{ x: [0, 34, -20, 0], y: [0, -22, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 flex justify-between items-start font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground">
        <span>Independent design practice</span>
        <span className="hidden md:block text-right">Identity / Digital / Motion<br />Selected work 2024–26</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative z-10 mt-auto mb-auto py-16 md:py-10"
      >
        <h1 className="font-display font-normal tracking-[-0.055em] text-foreground leading-[0.72] text-[27vw] sm:text-[22vw] md:text-[18vw] lg:text-[16.3vw] select-none">
          <span className="block">Alex</span>
          <span className="block italic ml-[12vw] md:ml-[17vw]">Moreau</span>
        </h1>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-end border-t border-foreground/15 pt-5">
        <div className="md:col-span-8 font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase text-muted-foreground min-h-4">
          <TypewriterInfo isInView={isInView} />
        </div>
        <div className="md:col-span-4 md:text-right font-body text-xs md:text-sm text-foreground/55">
          Scroll to disturb the objects ↓
        </div>
      </div>
    </section>
  );
}
