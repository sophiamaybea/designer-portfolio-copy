import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollPortal({ word, subword, kicker, art, tone = "blue" }) {
  return (
    <section className={`scroll-portal scroll-portal-${tone}`} aria-label={`${word} ${subword}`}>
      <div className="scroll-portal-sticky">
        <div className="portal-wash" aria-hidden="true" />
        <div className="portal-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="portal-kicker">{kicker}</p>
        <h2 className="portal-word" aria-hidden="true">
          <span>{word}</span>
          <span>{subword}</span>
        </h2>
        <img src={art} alt="" className="portal-art" draggable={false} />
        <div className="portal-index" aria-hidden="true">
          <span>SCROLL</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

export default function ScrollCinema() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (reduced) return;

      const routePath = document.querySelector(".scroll-route-path");
      if (routePath) {
        const length = routePath.getTotalLength();
        gsap.set(routePath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(routePath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".bea-home",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      }

      gsap.utils.toArray(".story-chapter").forEach((section) => {
        gsap.fromTo(
          section,
          {
            clipPath: "inset(5% 2.2% 5% 2.2% round 42px)",
            scale: 0.985,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 94%",
              end: "top 28%",
              scrub: 0.8,
            },
          }
        );

        const label = section.querySelector(".chapter-label");
        if (label) {
          gsap.fromTo(
            label,
            { y: 55, opacity: 0, letterSpacing: "0.28em" },
            {
              y: 0,
              opacity: 1,
              letterSpacing: "0.11em",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "top 50%",
                scrub: 0.8,
              },
            }
          );
        }

        section.querySelectorAll("h2").forEach((heading) => {
          gsap.fromTo(
            heading,
            {
              clipPath: "inset(0 0 100% 0)",
              yPercent: 22,
              rotateX: -10,
              transformOrigin: "50% 100%",
            },
            {
              clipPath: "inset(0 0 0% 0)",
              yPercent: 0,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: heading,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.9,
              },
            }
          );
        });
      });

      gsap.utils.toArray(".chapter-copy-large > p, .courses-heading > p, .journal-copy > p:not(.journal-small)").forEach((copy) => {
        gsap.fromTo(
          copy,
          { y: 70, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: copy,
              start: "top 92%",
              end: "top 60%",
              scrub: 0.7,
            },
          }
        );
      });

      gsap.utils.toArray(".chapter-art-stage img, .journal-art-wrap img, .course-doorway img").forEach((art, index) => {
        gsap.fromTo(
          art,
          {
            y: 140,
            scale: 0.76,
            rotate: index % 2 === 0 ? -8 : 7,
          },
          {
            y: -70,
            scale: 1.07,
            rotate: index % 2 === 0 ? 3 : -3,
            ease: "none",
            scrollTrigger: {
              trigger: art,
              start: "top 100%",
              end: "bottom 5%",
              scrub: 1.1,
            },
          }
        );
      });

      gsap.utils.toArray(".course-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            x: 130 + index * 12,
            opacity: 0.12,
            rotateZ: 1.8,
          },
          {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 94%",
              end: "top 58%",
              scrub: 0.6,
            },
          }
        );
      });

      const stackCards = gsap.utils.toArray(".course-stack-card");
      stackCards.forEach((card, index) => {
        const art = card.querySelector(".course-stack-art");
        const orbit = card.querySelector(".course-stack-orbit");
        const copy = card.querySelector(".course-stack-copy");
        const next = stackCards[index + 1];

        gsap.fromTo(
          card,
          { scale: 0.92, y: 90, rotateZ: index % 2 === 0 ? -1.8 : 1.5, opacity: 0.55 },
          {
            scale: 1,
            y: 0,
            rotateZ: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 22%",
              scrub: 0.85,
            },
          }
        );

        if (art) {
          gsap.fromTo(
            art,
            { scale: 0.62, rotate: index % 2 === 0 ? -14 : 12, yPercent: 22, opacity: 0.28 },
            {
              scale: 1.08,
              rotate: index % 2 === 0 ? 4 : -4,
              yPercent: -12,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom 14%",
                scrub: 1.05,
              },
            }
          );
        }

        if (orbit) {
          gsap.fromTo(
            orbit,
            { scale: 0.35, rotate: -35, opacity: 0.08 },
            {
              scale: 1.25,
              rotate: 42,
              opacity: 0.42,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 18%",
                scrub: 1.2,
              },
            }
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { y: 65, opacity: 0, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                end: "top 36%",
                scrub: 0.75,
              },
            }
          );
        }

        if (next) {
          gsap.to(card, {
            scale: 0.91 - index * 0.012,
            y: -34 - index * 9,
            rotateZ: index % 2 === 0 ? -1.1 : 0.9,
            opacity: 0.54,
            filter: "blur(2.5px)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top 82%",
              end: "top 18%",
              scrub: 0.9,
            },
          });
        }
      });

      gsap.utils.toArray(".scroll-portal").forEach((portal) => {
        const stage = portal.querySelector(".scroll-portal-sticky");
        const wash = portal.querySelector(".portal-wash");
        const art = portal.querySelector(".portal-art");
        const words = portal.querySelectorAll(".portal-word span");
        const rings = portal.querySelectorAll(".portal-rings span");
        const kicker = portal.querySelector(".portal-kicker");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: portal,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        timeline
          .fromTo(
            wash,
            { clipPath: "circle(6% at 50% 50%)", opacity: 0.25 },
            { clipPath: "circle(82% at 50% 50%)", opacity: 1, ease: "none" },
            0
          )
          .fromTo(
            stage,
            { scale: 0.96, borderRadius: "48px" },
            { scale: 1, borderRadius: "0px", ease: "none" },
            0
          )
          .fromTo(
            art,
            { scale: 0.45, y: 180, rotate: -18, opacity: 0.2 },
            { scale: 1.2, y: -40, rotate: 8, opacity: 1, ease: "none" },
            0.08
          )
          .fromTo(
            words[0],
            { xPercent: -38, letterSpacing: "0.08em" },
            { xPercent: 0, letterSpacing: "-0.055em", ease: "none" },
            0.03
          )
          .fromTo(
            words[1],
            { xPercent: 38, letterSpacing: "0.08em" },
            { xPercent: 0, letterSpacing: "-0.055em", ease: "none" },
            0.03
          )
          .fromTo(
            kicker,
            { y: 55, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.1
          );

        rings.forEach((ring, index) => {
          timeline.fromTo(
            ring,
            { scale: 0.22 + index * 0.08, opacity: 0.06, rotate: -20 - index * 8 },
            { scale: 1.2 + index * 0.16, opacity: 0.44 - index * 0.08, rotate: 28 + index * 10, ease: "none" },
            0.05 + index * 0.03
          );
        });
      });

      const finalHeading = document.querySelector(".final-copy h2");
      if (finalHeading) {
        gsap.fromTo(
          finalHeading,
          { scale: 0.58, y: 120, letterSpacing: "0.015em", opacity: 0.2 },
          {
            scale: 1,
            y: 0,
            letterSpacing: "-0.045em",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-chapter",
              start: "top 90%",
              end: "center 55%",
              scrub: 1,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-cinema-ui" aria-hidden="true">
      <svg className="scroll-route" viewBox="0 0 80 1000" preserveAspectRatio="none">
        <path
          className="scroll-route-ghost"
          d="M40 0 C12 100, 68 170, 40 255 S12 390, 40 505 S68 650, 40 760 S12 900, 40 1000"
        />
        <path
          className="scroll-route-path"
          d="M40 0 C12 100, 68 170, 40 255 S12 390, 40 505 S68 650, 40 760 S12 900, 40 1000"
        />
      </svg>
      <span className="scroll-route-dot scroll-route-dot-a" />
      <span className="scroll-route-dot scroll-route-dot-b" />
      <span className="scroll-route-dot scroll-route-dot-c" />
    </div>
  );
}
