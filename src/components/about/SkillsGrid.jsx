import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { category: "Brand Identity", tools: ["Logo & Mark Design", "Brand Systems", "Visual Identity Guidelines", "Naming & Verbal Identity", "Brand Strategy"] },
  { category: "Print & Packaging", tools: ["Packaging Design", "Editorial & Print", "Signage & Environmental", "Label & Tag Design", "Production Oversight"] },
  { category: "Digital Branding", tools: ["Web Visual Direction", "Social Media Systems", "Digital Templates", "Motion Branding", "Art Direction"] },
  { category: "Tools", tools: ["Figma", "Adobe Illustrator", "InDesign", "Photoshop", "Glyphs"] },
];

export default function SkillsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-12"
    >
      {skills.map((group) => (
        <div key={group.category}>
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
            {group.category}
          </span>
          <div className="space-y-2">
            {group.tools.map((tool) => (
              <div key={tool} className="flex items-center gap-3 py-2">
                <div className="w-1.5 h-1.5 bg-sage rounded-full flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}