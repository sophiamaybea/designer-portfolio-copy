import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeRow({ index, year, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8"
    >
      <div className="md:col-span-3">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">{year}</span>
      </div>
      <div className="md:col-span-9">
        {children}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <div>
      <FadeRow index={0} year="2023 – Present">
        <h3 className="font-body text-lg font-medium text-foreground mb-2">Independent Brand Studio</h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">Running a boutique branding practice from Berlin — working with founders, retailers, and creative studios on brand identity, packaging, and digital presence.</p>
      </FadeRow>

      <FadeRow index={1} year="2020 – 2023">
        <h3 className="font-body text-lg font-medium text-foreground mb-2">Senior Brand Designer — Brand Studio Berlin</h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">Led identity projects for FMCG, hospitality, and cultural brands. Responsible for full brand systems from strategy through production.</p>
      </FadeRow>

      <FadeRow index={2} year="2017 – 2020">
        <h3 className="font-body text-lg font-medium text-foreground mb-2">Designer — Design Agency</h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">Contributed to branding, editorial, and typography projects for fashion, culture, and music industry clients.</p>
      </FadeRow>

      <FadeRow index={3} year="2016">
        <h3 className="font-body text-lg font-medium text-foreground mb-2">MFA Visual Communication — Creative Agency</h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">Graduated with distinction. Thesis on typographic identity and the semiotics of brand marks.</p>
      </FadeRow>

      <FadeRow index={4} year="2014">
        <h3 className="font-body text-lg font-medium text-foreground mb-2">BA Graphic Design — Design & Motion Studio</h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">Foundation in Swiss design principles, brand systems, and typographic thinking.</p>
      </FadeRow>
    </div>
  );
}