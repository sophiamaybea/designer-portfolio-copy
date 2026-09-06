import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import InquiryForm from "@/components/contact/InquiryForm";
import FAQ from "@/components/contact/FAQ";

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

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <section className="px-6 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
              Contact
            </span>
            <h1 className="font-body text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6 leading-tight">
              Let's build something
              <br />
              <span className="text-muted-foreground">remarkable together.</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Whether you have a detailed brief or just an idea, I'd love to hear about your project. Fill out the form below and I'll get back to you within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 md:px-8 py-16 md:py-24 border-t border-border" aria-label="Project inquiry form">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-8">
              Project Inquiry
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <InquiryForm />
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-16 md:py-24 border-t border-border" aria-label="Frequently asked questions">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-8">
              Collaboration FAQ
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FAQ />
          </FadeIn>
        </div>
      </section>

      {/* Contact Info & Social */}
      <section className="px-6 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24 border-t border-border" aria-label="Contact information">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <FadeIn>
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
                Email
              </span>
              <a
                href="mailto:hello@alexmoreau.design"
                className="font-body text-lg text-foreground hover:text-cobalt transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4"
              >
                hello@alexmoreau.design
              </a>
            </FadeIn>

            <FadeIn delay={0.1}>
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
                Location
              </span>
              <p className="font-body text-lg text-foreground">Berlin, Germany</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Available for remote & on-site</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-4">
                Social
              </span>
              <div className="flex flex-col gap-2">
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="font-body text-base text-foreground hover:text-cobalt transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4">Dribbble ↗</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-body text-base text-foreground hover:text-cobalt transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4">LinkedIn ↗</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-body text-base text-foreground hover:text-cobalt transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4">Instagram ↗</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-body text-base text-foreground hover:text-cobalt transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4">X / Twitter ↗</a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}