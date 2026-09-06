import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is your typical process for a new project?",
    a: "Every project begins with a Discovery phase — understanding your business, audience, and objectives. From there, I develop a strategic framework before moving into design exploration, iteration, and final delivery. The exact timeline and phases vary by project scope.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. While I'm based in Berlin, the majority of my clients are international. I'm experienced with remote collaboration and can accommodate various time zones. For larger projects, I'm available for on-site workshops.",
  },
  {
    q: "What is your availability like?",
    a: "I typically take on 2–3 projects at a time to ensure dedicated attention. For the most current availability, please submit an inquiry and I'll respond within 48 hours with my schedule and a preliminary timeline.",
  },
  {
    q: "Do you collaborate with other designers or agencies?",
    a: "Yes. I regularly collaborate with specialized talent — developers, copywriters, motion designers, and strategists — assembled based on each project's needs. I also partner with agencies on select projects.",
  },
  {
    q: "What does your pricing look like?",
    a: "Pricing is project-based, determined by scope, complexity, and timeline. I provide detailed proposals after an initial consultation. My minimum project engagement starts at $10,000.",
  },
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
          <AccordionTrigger className="font-body text-base text-foreground hover:text-cobalt py-6 text-left">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl">
              {faq.a}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}