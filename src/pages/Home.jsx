import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import InteractivePebbles from "@/components/home/InteractivePebbles";

const ART = {
  mountain: "/art/mountain.png",
  tudor: "/art/tudor.png",
  walkers: "/art/walkers.png",
  moon: "/art/moon.png",
  brownstone: "/art/brownstone.png",
  skyline: "/art/skyline.png",
};

const courses = [
  {
    number: "01",
    title: "The Perception Lab",
    text: "A practical course in noticing more, choosing better and making the page carry what you actually saw.",
  },
  {
    number: "02",
    title: "The Marrow Engine",
    text: "An editing studio for finding the live material in a draft and cutting everything that is merely behaving itself.",
  },
  {
    number: "03",
    title: "Your First Poetry Manuscript",
    text: "A guided route from scattered poems to a collection with shape, pressure and a reason to exist as a book.",
  },
];

function ChapterLabel({ number, children }) {
  return (
    <div className="chapter-label">
      <span className="chapter-dot">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function FloatingArt({ src, alt, className, depth = 1, pointerX, pointerY, reduced }) {
  const x = useTransform(pointerX, [-0.5, 0.5], [-18 * depth, 18 * depth]);
  const y = useTransform(pointerY, [-0.5, 0.5], [-12 * depth, 12 * depth]);

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={reduced ? undefined : { x, y }}
      animate={reduced ? undefined : { translateY: [0, -8 * depth, 0] }}
      transition={{ duration: 5 + depth, repeat: Infinity, ease: "easeInOut" }}
      draggable={false}
    />
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 90, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 90, damping: 18 });

  const onPointerMove = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section className="world-hero" onPointerMove={onPointerMove} aria-label="Bea Sophia introduction">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <InteractivePebbles />

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">WRITER · EDITOR · FOUNDER OF THE PAGE GALLERY JOURNAL</p>
        <h1>
          <span>BEA</span>
          <span>SOPHIA</span>
        </h1>
        <p className="hero-intro">
          Writing, courses and an independent journal for people who want to make work that feels more alive on the page.
        </p>
      </motion.div>

      <FloatingArt
        src={ART.mountain}
        alt="Bea Sophia mountain and lake illustration"
        className="hero-art hero-mountain"
        depth={0.7}
        pointerX={pointerX}
        pointerY={pointerY}
        reduced={reduced}
      />
      <FloatingArt
        src={ART.skyline}
        alt="Bea Sophia ink skyline illustration"
        className="hero-art hero-skyline"
        depth={1.25}
        pointerX={pointerX}
        pointerY={pointerY}
        reduced={reduced}
      />
      <FloatingArt
        src={ART.moon}
        alt="Bea Sophia moonlit water illustration"
        className="hero-art hero-moon"
        depth={1.55}
        pointerX={pointerX}
        pointerY={pointerY}
        reduced={reduced}
      />

      <div className="hero-actions">
        <Link to="/courses" className="world-link">Explore the courses <span>↗</span></Link>
        <Link to="/journal" className="world-link world-link-muted">Visit the journal <span>↗</span></Link>
      </div>

      <a href="#work" className="scroll-cue" aria-label="Scroll into Bea Sophia's world">
        <span>ENTER</span>
        <span className="scroll-cue-line" />
      </a>
    </section>
  );
}

function WorkChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [90, -80]);
  const lineX = useTransform(scrollYProgress, [0.1, 0.8], ["-18%", "8%"]);

  return (
    <section ref={ref} id="work" className="story-chapter chapter-work">
      <div className="chapter-rule" />
      <ChapterLabel number="01">THE WORK</ChapterLabel>
      <div className="chapter-grid">
        <div className="chapter-copy chapter-copy-large">
          <motion.h2 style={{ x: lineX }}>
            A page is not a product.<br />It is a place something happens.
          </motion.h2>
          <p>
            I write, edit and build courses around attention: what a line is doing, where a draft goes flat, what an image is actually carrying and what can be removed without losing the nerve of it.
          </p>
          <Link to="/about" className="world-link">More about the studio <span>↗</span></Link>
        </div>
        <motion.div className="chapter-art-stage walkers-stage" style={{ y: artY }}>
          <img src={ART.walkers} alt="Two hand-drawn figures walking" className="walkers-art" />
          <div className="orbit-small orbit-small-a" aria-hidden="true" />
          <div className="orbit-small orbit-small-b" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

function CoursesChapter() {
  const [active, setActive] = useState(0);

  return (
    <section className="story-chapter chapter-courses">
      <div className="chapter-rule" />
      <ChapterLabel number="02">COURSES</ChapterLabel>
      <div className="courses-world">
        <div className="courses-heading">
          <h2>Courses built like studios,<br />not lectures.</h2>
          <p>Exercises, decisions, close reading and practical ways back into the work.</p>
        </div>

        <div className="courses-list" role="list">
          {courses.map((course, index) => (
            <button
              key={course.title}
              type="button"
              className={`course-row ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className="course-number">{course.number}</span>
              <span className="course-title">{course.title}</span>
              <span className="course-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="course-doorway">
          <motion.img
            key={active}
            src={ART.brownstone}
            alt="Illustrated townhouse with glowing windows"
            className="brownstone-art"
            initial={{ opacity: 0.2, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          />
          <div className="course-note">
            <span>{courses[active].number}</span>
            <p>{courses[active].text}</p>
          </div>
        </div>
      </div>
      <div className="chapter-end-link">
        <Link to="/courses" className="world-link world-link-large">Enter the course room <span>→</span></Link>
      </div>
    </section>
  );
}

function JournalChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const y = useTransform(scrollYProgress, [0, 1], [70, -55]);

  return (
    <section ref={ref} className="story-chapter chapter-journal">
      <div className="chapter-rule" />
      <ChapterLabel number="03">THE JOURNAL</ChapterLabel>
      <div className="journal-world">
        <motion.div className="journal-art-wrap" style={{ rotate, y }}>
          <img src={ART.tudor} alt="Bea Sophia ink portrait illustration" className="tudor-art" />
        </motion.div>
        <div className="journal-copy">
          <p className="journal-small">THE PAGE GALLERY JOURNAL</p>
          <h2>A home for writing that still has something strange in it.</h2>
          <p>
            An independent journal founded by Bea Sophia, built around close attention to language, image, rhythm and the things a piece cannot quite explain away.
          </p>
          <Link to="/journal" className="world-link">Go to the journal <span>↗</span></Link>
        </div>
      </div>
    </section>
  );
}

function FinalChapter() {
  return (
    <section className="story-chapter final-chapter">
      <div className="final-skyline-wrap" aria-hidden="true">
        <img src={ART.skyline} alt="" className="final-skyline" />
      </div>
      <div className="final-copy">
        <ChapterLabel number="04">COME IN</ChapterLabel>
        <h2>Bring the draft.<br />Bring the odd bit.</h2>
        <p>There is room for the work before it knows exactly what it is.</p>
        <div className="final-actions">
          <Link to="/courses" className="world-button">COURSES <span>↗</span></Link>
          <Link to="/journal" className="world-button world-button-outline">THE JOURNAL <span>↗</span></Link>
          <Link to="/contact" className="world-button world-button-outline">GET IN TOUCH <span>↗</span></Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Bea Sophia — Writer, Editor & Founder";
  }, []);

  return (
    <div className="bea-home">
      <Hero />
      <WorkChapter />
      <CoursesChapter />
      <JournalChapter />
      <FinalChapter />
    </div>
  );
}
