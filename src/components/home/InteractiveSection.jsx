import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveImagePhysics from "@/components/physics/InteractiveImagePhysics";
import { physicsImages } from "@/lib/physicsImages";

export default function InteractiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-36" aria-label="Interactive glass pieces">
      <div className="px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-4 md:mb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-8"
        >
          <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground block mb-4">
            Play / 01
          </span>
          <h2 className="font-display text-[15vw] sm:text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.82] tracking-[-0.04em] text-foreground">
            Objects <span className="italic">in motion.</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-4 md:text-right font-body text-xs md:text-sm leading-relaxed text-muted-foreground md:pb-2"
        >
          Move your cursor through the field.<br className="hidden md:block" /> Tap or drag on touch.
        </motion.p>
      </div>

      <div className="relative -mt-2 md:-mt-8">
        <InteractiveImagePhysics
          images={physicsImages}
          objectCount={17}
          interactionStrength={0.86}
          gravity={-470}
          restitution={0.63}
          friction={0.24}
          height={640}
        />
      </div>

      <div className="mx-6 md:mx-8 border-t border-foreground/15 pt-4 flex justify-between gap-6 font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
        <span>Physical image study</span>
        <span>Pointer reactive / real-time</span>
      </div>
    </section>
  );
}
