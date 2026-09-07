import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCinema() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proof-chapter, .proof-final").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 70, rotateZ: 0.7, opacity: 0.55 },
          {
            y: 0,
            rotateZ: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: "top 54%",
              scrub: 0.65,
            },
          }
        );

        const rule = section.querySelector(".proof-rule");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 94%",
                end: "top 70%",
                scrub: 0.45,
              },
            }
          );
        }
      });

      gsap.utils.toArray(".settle-art").forEach((art, index) => {
        gsap.fromTo(
          art,
          {
            y: 86 + (index % 3) * 18,
            rotateZ: index % 2 === 0 ? -5 : 4,
            scale: 0.94,
          },
          {
            y: -16,
            rotateZ: index % 2 === 0 ? 1.2 : -1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: art,
              start: "top 96%",
              end: "bottom 18%",
              scrub: 0.9,
            },
          }
        );
      });

      gsap.utils.toArray(".proof-course-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          { x: index % 2 === 0 ? 30 : -30 },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 68%",
              scrub: 0.5,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
