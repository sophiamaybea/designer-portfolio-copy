import React, { useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: null,
    body: "The purpose of the following template is to assist you in writing your accessibility statement. Please note that you are responsible for ensuring that your site's statement meets the requirements of the local law in your area or region.\n\n*Note: This page currently has several sections. Once you complete editing the Accessibility Statement below, you need to delete this section.\n\nTo learn more about this, check out our article \"Accessibility: Adding an Accessibility Statement to Your Site\".",
  },
  {
    title: "Accessibility Statement",
    body: "This statement was last updated on [enter relevant date].\n\nWe at [enter organization / business name] are working to make our site [enter site name and address] accessible to people with disabilities.",
  },
  {
    title: "What web accessibility is",
    body: "An accessible site allows visitors with disabilities to browse the site with the same or a similar level of ease and enjoyment as other visitors. This can be achieved with the capabilities of the system on which the site is operating, and through assistive technologies.",
  },
  {
    title: "Accessibility adjustments on this site",
    body: "We have adapted this site in accordance with WCAG [2.0 / 2.1 / 2.2 - select relevant option] guidelines, and have made the site accessible to the level of [A / AA / AAA - select relevant option]. This site's contents have been adapted to work with assistive technologies, such as screen readers and keyboard use. As part of this effort, we have also [remove irrelevant information]:",
    list: [
      "Used the Accessibility Wizard to find and fix potential accessibility issues",
      "Set the language of the site",
      "Set the content order of the site's pages",
      "Defined clear heading structures on all of the site's pages",
      "Added alternative text to images",
      "Implemented color combinations that meet the required color contrast",
      "Reduced the use of motion on the site",
      "Ensured all videos, audio, and files on the site are accessible",
    ],
  },
  {
    title: "Declaration of partial compliance with the standard due to third-party content [only add if relevant]",
    body: "The accessibility of certain pages on the site depend on contents that do not belong to the organization, and instead belong to [enter relevant third-party name]. The following pages are affected by this: [list the URLs of the pages]. We therefore declare partial compliance with the standard for these pages.",
  },
  {
    title: "Accessibility arrangements in the organization [only add if relevant]",
    body: "[Enter a description of the accessibility arrangements in the physical offices / branches of your site's organization or business. The description can include all current accessibility arrangements - starting from the beginning of the service (e.g., the parking lot and / or public transportation stations) to the end (such as the service desk, restaurant table, classroom etc.). It is also required to specify any additional accessibility arrangements, such as disabled services and their location, and accessibility accessories (e.g. in audio inductions and elevators) available for use]",
  },
  {
    title: "Requests, issues and suggestions",
    body: "If you find an accessibility issue on the site, or if you require further assistance, you are welcome to contact us through the organization's accessibility coordinator:\n\n[Name of the accessibility coordinator]\n\n[Telephone number of the accessibility coordinator]\n\n[Email address of the accessibility coordinator]\n\n[Enter any additional contact details if relevant / available]",
  },
];

export default function Accessibility() {
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
            Accessibility
          </h1>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="border-t border-border pt-10"
            >
              {section.title && (
                <h2 className="font-body text-xl font-medium text-foreground mb-4">
                  {section.title}
                </h2>
              )}
              {section.body && section.body.split("\n\n").map((para, j) => (
                <p key={j} className="font-body text-base text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2 list-disc list-inside">
                  {section.list.map((item, k) => (
                    <li key={k} className="font-body text-base text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}