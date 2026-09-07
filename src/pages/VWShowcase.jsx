import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "@/styles/vw-showcase.css";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    number: "01",
    eyebrow: "WRITING / ATTENTION",
    title: ["PERCEPTION", "LAB"],
    deck: "Exercises that change what you notice before they tell you what to write.",
    noteA: "Ideal for close reading",
    noteB: "Ideal for image-making",
    art: "/art/mountain.png",
    tone: "ivory",
  },
  {
    number: "02",
    eyebrow: "EDITING / PRESSURE",
    title: ["MARROW", "ENGINE"],
    deck: "A live editing system for locating the nerve of a draft and cutting the merely competent.",
    noteA: "Ideal for redrafting",
    noteB: "Ideal for manuscript work",
    art: "/art/tudor.png",
    tone: "burgundy",
  },
  {
    number: "03",
    eyebrow: "INTERACTION / PLAY",
    title: ["COURSE", "WORLDS"],
    deck: "Rooms, choices, visual prompts and movement through material. Not a stack of videos.",
    noteA: "Ideal for discovery",
    noteB: "Ideal for interactive learning",
    art: "/art/brownstone.png",
    tone: "acid",
  },
  {
    number: "04",
    eyebrow: "JOURNAL / CURATION",
    title: ["PAGE", "GALLERY"],
    deck: "An independent literary space built around work that still has strangeness, risk and weather in it.",
    noteA: "Ideal for emerging work",
    noteB: "Ideal for close editorial care",
    art: "/art/walkers.png",
    tone: "blue",
  },
  {
    number: "05",
    eyebrow: "MOTION / STORY",
    title: ["SCROLL", "CINEMA"],
    deck: "The page moves with the reading. Images arrive, typography stretches and sections behave like scenes.",
    noteA: "Ideal for storytelling",
    noteB: "Ideal for launches",
    art: "/art/moon.png",
    tone: "ink",
  },
  {
    number: "06",
    eyebrow: "CITY / FRAGMENTS",
    title: ["NEW YORK", "ELSEWHERE"],
    deck: "Illustration, city fragments and found texture become part of the reading rhythm rather than decoration.",
    noteA: "Ideal for atmosphere",
    noteB: "Ideal for visual essays",
    art: "/art/skyline.png",
    tone: "silver",
  },
  {
    number: "07",
    eyebrow: "STUDIO / PRACTICE",
    title: ["MAKE IT", "UNDENIABLE"],
    deck: "A studio for work before it behaves itself. Bring the draft, the odd bit and the thing you nearly deleted.",
    noteA: "Ideal for risk",
    noteB: "Ideal for momentum",
    art: "/art/tudor.png",
    tone: "rose",
  },
  {
    number: "08",
    eyebrow: "BEA SOPHIA / WORLD",
    title: ["ENTER", "THE WORK"],
    deck: "Writing, courses and an independent journal designed as one continuous visual world.",
    noteA: "Ideal for staying awhile",
    noteB: "Ideal for getting lost",
    art: "/art/mountain.png",
    tone: "ivory",
  },
];

const usageArt = ["/art/brownstone.png", "/art/moon.png", "/art/walkers.png"];

function Mark() {
  return (
    <svg className="vws-mark" viewBox="0 0 86 70" aria-hidden="true">
      <circle cx="14" cy="53" r="11" />
      <circle cx="34" cy="30" r="11" />
      <circle cx="56" cy="12" r="11" />
      <circle cx="75" cy="38" r="11" />
      <circle cx="55" cy="55" r="11" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="vws-hero vws-panel" data-tone="burgundy">
      <div className="vws-hero-grid" aria-hidden="true" />
      <div className="vws-hero-chapters">
        {chapters.slice(0, 4).map((chapter) => (
          <a key={chapter.number} href={`#chapter-${chapter.number}`} className="vws-chapter-link">
            <span>{chapter.number}</span>
            <span>{chapter.title.join(" ")}</span>
          </a>
        ))}
      </div>
      <div className="vws-hero-center">
        <p className="vws-kicker">BEA SOPHIA / MEMORABLE WEB EXPERIENCE</p>
        <h1 className="vws-hero-title" aria-label="Master the page">
          <span>MASTER</span>
          <span>THE PAGE</span>
        </h1>
        <p className="vws-hero-deck">A scroll-built showcase of writing, illustration, courses and editorial worlds.</p>
      </div>
      <div className="vws-hero-chapters vws-hero-chapters-bottom">
        {chapters.slice(4).map((chapter) => (
          <a key={chapter.number} href={`#chapter-${chapter.number}`} className="vws-chapter-link">
            <span>{chapter.number}</span>
            <span>{chapter.title.join(" ")}</span>
          </a>
        ))}
      </div>
      <div className="vws-scroll-hint">SCROLL TO ENTER <i /></div>
    </section>
  );
}

function IntroStatement() {
  return (
    <section className="vws-statement vws-panel" data-tone="ivory">
      <div className="vws-statement-rail"><span>THE EXPERIENCE</span><span>001 — 008</span></div>
      <p className="vws-statement-small">THE ONLY WEBSITE I WANT IS ONE THAT FEELS LIKE IT HAS ITS OWN PHYSICS.</p>
      <h2 className="vws-statement-title">
        <span>WRITING</span>
        <span>SHOULD NOT</span>
        <span>SIT STILL.</span>
      </h2>
      <div className="vws-statement-copy">
        <p>Build the atmosphere first. Let the typography move with the thought. Let an image enter late. Make scrolling feel like crossing a threshold.</p>
        <p>Every section below is a different application of the same system: scale, rhythm, collision, reveal and tension.</p>
      </div>
    </section>
  );
}

function UsageStrip({ index }) {
  return (
    <div className="vws-usage">
      <div className="vws-usage-marquee" aria-hidden="true">
        <span>REAL USAGE · REAL USAGE · REAL USAGE · REAL USAGE · REAL USAGE · REAL USAGE · REAL USAGE ·</span>
      </div>
      <div className="vws-usage-grid">
        {usageArt.map((src, artIndex) => (
          <div className="vws-usage-card" key={`${index}-${src}-${artIndex}`}>
            <span>{String(artIndex + 1).padStart(2, "0")}</span>
            <img src={src} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Chapter({ chapter, index }) {
  return (
    <section id={`chapter-${chapter.number}`} className={`vws-chapter vws-panel vws-tone-${chapter.tone}`} data-tone={chapter.tone}>
      <div className="vws-chapter-sticky">
        <div className="vws-chapter-topline">
          <span>{chapter.number}. {chapter.eyebrow}</span>
          <span>STUDIO BEA SOPHIA</span>
        </div>
        <p className="vws-ghost-word" aria-hidden="true">{chapter.title[0]}</p>
        <div className="vws-chapter-layout">
          <div className="vws-chapter-copy">
            <div className="vws-number-disc">{chapter.number}</div>
            <h2 className="vws-chapter-title">
              <span>{chapter.title[0]}</span>
              <span>{chapter.title[1]}</span>
            </h2>
            <ol className="vws-ideal-list">
              <li><span>1</span>{chapter.noteA}</li>
              <li><span>2</span>{chapter.noteB}</li>
            </ol>
            <div className="vws-application">
              <span>3</span>
              <div>
                <h3>{chapter.title.join(" ")} application:</h3>
                <p>{chapter.deck}</p>
              </div>
            </div>
          </div>
          <div className="vws-art-stage">
            <div className="vws-art-orbit" aria-hidden="true" />
            <img src={chapter.art} alt="" className="vws-chapter-art" draggable={false} />
            <span className="vws-art-index">{String(index + 1).padStart(2, "0")} / 08</span>
          </div>
        </div>
      </div>
      <UsageStrip index={index} />
    </section>
  );
}

function AwardBreak() {
  return (
    <section className="vws-award vws-panel" data-tone="ink">
      <div className="vws-award-grid" aria-hidden="true" />
      <p className="vws-kicker">THE POINT IS NOT THE AWARD. THE POINT IS THE MEMORY.</p>
      <h2><span>MEMORABLE</span><span>EXPERIENCES</span></h2>
      <div className="vws-award-copy">
        <p>Strong web motion is not movement for movement’s sake. It creates hierarchy, anticipation and a sense that the reader has physically travelled through an idea.</p>
        <p>This build uses that principle throughout: pinned scenes, accelerated scale, clipped reveals, scroll-linked image choreography and oversized typography.</p>
      </div>
    </section>
  );
}

function FinalScene() {
  return (
    <section className="vws-final vws-panel" data-tone="burgundy">
      <img src="/art/skyline.png" alt="" className="vws-final-art" draggable={false} />
      <p className="vws-kicker">BEA SOPHIA / STUDIO WORLD</p>
      <h2><span>CHANGE</span><span>THE PAGE</span></h2>
      <p>See the work. Enter the courses. Read the journal.</p>
      <div className="vws-final-actions">
        <Link to="/courses">COURSES <span>↗</span></Link>
        <Link to="/journal">THE JOURNAL <span>↗</span></Link>
        <Link to="/contact">GET IN TOUCH <span>↗</span></Link>
      </div>
    </section>
  );
}

export default function VWShowcase() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    document.title = "Bea Sophia — Memorable Web Experience";
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    let lenis;
    let raf;

    if (!reduceMotion) {
      lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9 });
      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {
      gsap.set(".vws-preloader", { display: "grid" });
      const intro = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      intro
        .fromTo(".vws-preloader-mark", { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55 })
        .fromTo(".vws-preloader-line i", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.15)
        .to(".vws-preloader", { yPercent: -100, duration: 0.9 }, ">-0.05")
        .fromTo(".vws-hero-title span", { yPercent: 120, rotateX: -35 }, { yPercent: 0, rotateX: 0, stagger: 0.08, duration: 0.9 }, "<0.2")
        .fromTo(".vws-hero-chapters, .vws-hero-deck, .vws-scroll-hint", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.55 }, "<0.25");

      if (reduceMotion) return;

      gsap.to(".vws-hero-title span:first-child", {
        xPercent: -14,
        scrollTrigger: { trigger: ".vws-hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".vws-hero-title span:last-child", {
        xPercent: 16,
        scrollTrigger: { trigger: ".vws-hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".vws-hero-grid", {
        rotate: 7,
        scale: 1.18,
        scrollTrigger: { trigger: ".vws-hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.fromTo(".vws-statement-title span", { xPercent: (i) => i % 2 ? 18 : -18 }, {
        xPercent: 0,
        stagger: 0.03,
        scrollTrigger: { trigger: ".vws-statement", start: "top 82%", end: "center 45%", scrub: 1 },
      });

      gsap.utils.toArray(".vws-chapter").forEach((section, index) => {
        const sticky = section.querySelector(".vws-chapter-sticky");
        const titleLines = section.querySelectorAll(".vws-chapter-title span");
        const art = section.querySelector(".vws-chapter-art");
        const orbit = section.querySelector(".vws-art-orbit");
        const ghost = section.querySelector(".vws-ghost-word");
        const details = section.querySelectorAll(".vws-ideal-list li, .vws-application");
        const usageCards = section.querySelectorAll(".vws-usage-card");

        gsap.fromTo(sticky, { clipPath: "inset(7% 3% 7% 3% round 40px)", scale: 0.96 }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          scrollTrigger: { trigger: section, start: "top 92%", end: "top top", scrub: 0.9 },
        });

        gsap.fromTo(titleLines, { yPercent: 120, rotateX: -38 }, {
          yPercent: 0,
          rotateX: 0,
          stagger: 0.05,
          scrollTrigger: { trigger: section, start: "top 76%", end: "top 20%", scrub: 0.85 },
        });

        gsap.fromTo(art, {
          xPercent: index % 2 === 0 ? 35 : -35,
          yPercent: 32,
          scale: 0.5,
          rotate: index % 2 === 0 ? -15 : 15,
          opacity: 0.1,
        }, {
          xPercent: index % 2 === 0 ? -8 : 8,
          yPercent: -18,
          scale: 1.12,
          rotate: index % 2 === 0 ? 5 : -5,
          opacity: 1,
          scrollTrigger: { trigger: section, start: "top 90%", end: "bottom 10%", scrub: 1.15 },
        });

        gsap.fromTo(orbit, { scale: 0.28, rotate: -35, opacity: 0 }, {
          scale: 1.28,
          rotate: 55,
          opacity: 0.65,
          scrollTrigger: { trigger: section, start: "top 82%", end: "bottom 14%", scrub: 1.25 },
        });

        gsap.fromTo(ghost, { xPercent: 20, letterSpacing: "0.08em", opacity: 0.02 }, {
          xPercent: -22,
          letterSpacing: "-0.07em",
          opacity: 0.12,
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });

        gsap.fromTo(details, { y: 60, opacity: 0, filter: "blur(10px)" }, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 62%", end: "center 42%", scrub: 0.7 },
        });

        usageCards.forEach((card, cardIndex) => {
          gsap.fromTo(card, { y: 120 + cardIndex * 35, rotate: cardIndex % 2 ? 4 : -4 }, {
            y: -40 - cardIndex * 18,
            rotate: cardIndex % 2 ? -2 : 2,
            scrollTrigger: { trigger: card, start: "top 105%", end: "bottom 0%", scrub: 1 },
          });
        });
      });

      gsap.fromTo(".vws-award h2 span", { xPercent: (i) => i ? 30 : -30 }, {
        xPercent: 0,
        scrollTrigger: { trigger: ".vws-award", start: "top 78%", end: "center 45%", scrub: 1 },
      });

      gsap.fromTo(".vws-final h2 span", { scaleX: 0.55, letterSpacing: "0.12em", opacity: 0.15 }, {
        scaleX: 1,
        letterSpacing: "-0.065em",
        opacity: 1,
        scrollTrigger: { trigger: ".vws-final", start: "top 80%", end: "center 48%", scrub: 1 },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="vws-root">
      <div className="vws-preloader" aria-hidden="true">
        <div className="vws-preloader-mark"><Mark /></div>
        <div className="vws-preloader-line"><i /></div>
        <span>LOADING THE WORLD</span>
      </div>

      <header className="vws-nav">
        <Link to="/" className="vws-nav-brand"><Mark /><span>BEA SOPHIA</span></Link>
        <span className="vws-nav-center">MEMORABLE EXPERIENCE / 2026</span>
        <Link to="/contact" className="vws-nav-cta">GET IN TOUCH</Link>
      </header>

      <Hero />
      <IntroStatement />
      {chapters.slice(0, 4).map((chapter, index) => <Chapter key={chapter.number} chapter={chapter} index={index} />)}
      <AwardBreak />
      {chapters.slice(4).map((chapter, index) => <Chapter key={chapter.number} chapter={chapter} index={index + 4} />)}
      <FinalScene />
    </div>
  );
}
