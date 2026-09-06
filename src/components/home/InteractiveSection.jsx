import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveImagePhysics from "@/components/physics/InteractiveImagePhysics";
import { physicsImages } from "@/lib/physicsImages";

export default function InteractiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden py-24 md:py-40 px-6 md:px-8" aria-label="Interactive Pieces">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-14 max-w-[60%]"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
          Interactive
        </span>
        <h2 className="font-body text-4xl md:text-6xl font-light tracking-tight text-foreground">
          Pieces in play — give them a nudge
        </h2>
      </motion.div>

      <div className="-mx-6 md:-mx-8">
        <InteractiveImagePhysics
          images={physicsImages}
          objectCount={22}
          interactionStrength={1}
          gravity={-700}
          restitution={0.5}
          friction={0.35}
          height={560}
        />
      </div>

      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mt-6">
        Move your cursor — or drag a finger — through the pieces
      </p>
    </section>
  );
}