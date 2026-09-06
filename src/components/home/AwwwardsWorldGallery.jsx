import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    index: "01",
    eyebrow: "DRAWINGS / OBSERVATION",
    word: "NOTICE",
    title: "The world starts by looking harder.",
    text: "Drawings, fragments and the odd details that refuse to behave like decoration.",
    art: "/art/mountain.png",
    href: "/about",
    cta: "About Bea",
    tilt: -7,
  },
  {
    index: "02",
    eyebrow: "THE PAGE GALLERY",
    word: "READ",
    title: "A journal with its own weather.",
    text: "The Page Gallery Journal lives inside the same visual world instead of being filed away in a menu.",
    art: "/art/tudor.png",
    href: "/journal",
    cta: "Enter the journal",
    tilt: 5,
  },
  {
    index: "03",
    eyebrow: "COURSE WORLDS",
    word: "MAKE",
    title: "Courses that feel like rooms you enter.",
    text: "Not a stack of videos. Exercises, choices, close reading and visual prompts designed as an experience.",
    art: "/art/brownstone.png",
    href: "/courses",
    cta: "Explore courses",
    tilt: -4,
  },
  {
    index: "04",
    eyebrow: "NEW YORK / ELSEWHERE",
    word: "MOVE",
    title: "The page can move before the sentence does.",
    text: "Illustration, city fragments and motion become part of the reading rhythm, not a layer pasted on afterwards.",
    art: "/art/skyline.png",
    href: "/about",
    cta: "See the world",
    tilt: 7,
  },
  {
    index: "05",
    eyebrow: "STUDIO BEA SOPHIA",
    word: "WRITE",
    title: "Bring the thing that is not quite finished.",
    text: "The studio is built around writing that still has pressure, strangeness and somewhere left to go.",
    art: "/art/walkers.png",
    href: "/contact",
    cta: "Come in",
    tilt: -5,
  },
];

export default function AwwwardsWorldGallery() {
  const rootRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!root || !sticky || !track) return undefined;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 801px)", () => {
      const scenes = gsap.utils.toArray(".aw-scene", root);
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      scenes.forEach((scene, index) => {
        const art = scene.querySelector(".aw-scene-art");
        const title = scene.querySelector(".aw-scene-title");
        const word = scene.querySelector(".aw-scene-word");
        const copy = scene.querySelector(".aw-scene-copy");
        const ring = scene.querySelector(".aw-scene-ring");

        gsap.fromTo(
          art,
          {
            xPercent: index % 2 === 0 ? 34 : -28,
            yPercent: 18,
            scale: 0.62,
            rotate: SCENES[index].tilt * 1.8,
            opacity: 0.18,
          },
          {
            xPercent: index % 2 === 0 ? -18 : 18,
            yPercent: -12,
            scale: 1.12,
            rotate: SCENES[index].tilt * -0.45,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: "left 94%",
              end: "right 6%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          title,
          { yPercent: 34, rotateX: -18, opacity: 0.18 },
          {
            yPercent: -12,
            rotateX: 7,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: "left 88%",
              end: "right 18%",
              scrub: 0.9,
            },
          }
        );

        gsap.fromTo(
          word,
          { xPercent: 26, letterSpacing: "0.08em", opacity: 0.06 },
          {
            xPercent: -22,
            letterSpacing: "-0.06em",
            opacity: 0.16,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          copy,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          {
            y: -15,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: "left 76%",
              end: "center 50%",
              scrub: 0.7,
            },
          }
        );

        gsap.fromTo(
          ring,
          { scale: 0.4, rotate: -35, opacity: 0.05 },
          {
            scale: 1.35,
            rotate: 45,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        sticky,
        { scale: 0.95, borderRadius: 52 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 92%",
            end: "top top",
            scrub: 0.7,
          },
        }
      );

      return () => tween.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="aw-world-gallery" aria-label="Bea Sophia world index">
      <div ref={stickyRef} className="aw-world-sticky">
        <div className="aw-world-topline" aria-hidden="true">
          <span>BEA SOPHIA / WORLD INDEX</span>
          <span>VERTICAL SCROLL → HORIZONTAL WORLD</span>
          <span>01—05</span>
        </div>

        <div ref={trackRef} className="aw-world-track">
          {SCENES.map((scene) => (
            <article key={scene.index} className="aw-scene">
              <div className="aw-scene-ring" aria-hidden="true" />
              <p className="aw-scene-word" aria-hidden="true">{scene.word}</p>
              <div className="aw-scene-copy">
                <div className="aw-scene-meta">
                  <span>{scene.index}</span>
                  <span>{scene.eyebrow}</span>
                </div>
                <h2 className="aw-scene-title">{scene.title}</h2>
                <p className="aw-scene-text">{scene.text}</p>
                <Link to={scene.href} className="aw-scene-link">{scene.cta} <span>↗</span></Link>
              </div>
              <div className="aw-scene-art-wrap">
                <img className="aw-scene-art" src={scene.art} alt="" draggable={false} />
              </div>
              <span className="aw-scene-coordinate" aria-hidden="true">{scene.index}/05</span>
            </article>
          ))}
        </div>

        <div className="aw-world-bottom" aria-hidden="true">
          <span>SCROLL TO TRAVEL</span>
          <span className="aw-world-progress"><i /></span>
          <span>STUDIO BEA SOPHIA</span>
        </div>
      </div>
    </section>
  );
}
