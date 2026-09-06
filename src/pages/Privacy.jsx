import React, { useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "A legal disclaimer",
    body: "The explanations and information provided on this page are only general and high-level explanations and information on how to write your own document of a Privacy Policy. You should not rely on this article as legal advice or as recommendations regarding what you should actually do, because we cannot know in advance what are the specific privacy policies you wish to establish between your business and your customers and visitors. We recommend that you seek legal advice to help you understand and to assist you in the creation of your own Privacy Policy.",
  },
  {
    title: "Privacy Policy - the basics",
    body: "Having said that, a privacy policy is a statement that discloses some or all of the ways a website collects, uses, discloses, processes, and manages the data of its visitors and customers. It usually also includes a statement regarding the website's commitment to protecting its visitors' or customers' privacy, and an explanation about the different mechanisms the website is implementing in order to protect privacy.\n\nDifferent jurisdictions have different legal obligations of what must be included in a Privacy Policy. You are responsible to make sure you are following the relevant legislation to your activities and location.",
  },
  {
    title: "What to include in the Privacy Policy",
    body: "Generally speaking, a Privacy Policy often addresses these types of issues: the types of information the website is collecting and the manner in which it collects the data; an explanation about why is the website collecting these types of information; what are the website's practices on sharing the information with third parties; ways in which your visitors and customers can exercise their rights according to the relevant privacy legislation; the specific practices regarding minors' data collection; and much, much more.\n\nTo learn more about this, check out our article \"Creating a Privacy Policy\".",
  },
];

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen px-6 md:px-8 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-6">
            Legal
          </span>
          <h1 className="font-body text-5xl md:text-6xl font-light tracking-tight text-foreground mb-16">
            Privacy Policy
          </h1>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="border-t border-border pt-10"
            >
              <h2 className="font-body text-xl font-medium text-foreground mb-4">
                {section.title}
              </h2>
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="font-body text-base text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}