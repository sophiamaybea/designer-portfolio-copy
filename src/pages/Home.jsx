import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InteractivePebbles from "@/components/home/InteractivePebbles";
import ScrollCinema from "@/components/home/ScrollCinema";

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
    text: "Notice before you explain. Image, sensory hierarchy, line, rhythm and the detail that changes the page.",
    art: ART.mountain,
  },
  {
    number: "02",
    title: "The Marrow Engine",
    text: "Find the live material in a draft, cut what is merely behaving itself and make the rest answer to the pressure.",
    art: ART.moon,
  },
  {
    number: "03",
    title: "Your First Poetry Manuscript",
    text: "Turn a folder of poems into a collection with shape, argument, sequence and a reason to exist as a book.",
    art: ART.brownstone,
  },
];

function ChapterLabel({ number, children }) {
  return (
    <div className="chapter-label proof-label">
      <span className="chapter-dot">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="world-hero proof-hero" aria-label="Bea Sophia introduction">
      <div className="proof-grid" aria-hidden="true" />
      <InteractivePebbles />

      <div className="hero-copy proof-hero-copy">
        <p className="eyebrow">WRITER / EDITOR / FOUNDER OF THE PAGE GALLERY</p>
        <h1 aria-label="Bea Sophia">
          <span>BEA</span>
          <span>SOPHIA</span>
        </h1>
        <p className="hero-intro">
          Writing, courses and an independent journal built around the interesting bit: what a page is actually doing.
        </p>
      </div>

      <figure className="hero-proof-art hero-proof-art-main" aria-hidden="true">
        <img src={ART.mountain} alt="" draggable="false" />
      </figure>
      <figure className="hero-proof-art hero-proof-art-side" aria-hidden="true">
        <img src={ART.skyline} alt="" draggable="false" />
      </figure>

      <nav className="hero-route-index" aria-label="Quick routes">
        <span>OPEN:</span>
        <Link to="/courses">COURSES ↗</Link>
        <Link to="/journal">JOURNAL ↗</Link>
        <Link to="/about">ABOUT ↗</Link>
      </nav>

      <a href="#work" className="scroll-cue proof-scroll-cue" aria-label="Continue to the work">
        <span>DOWN</span>
        <span>↓</span>
      </a>
    </section>
  );
}

function WorkChapter() {
  return (
    <section id="work" className="story-chapter proof-chapter proof-chapter-work">
      <div className="proof-rule" />
      <ChapterLabel number="01">THE WORK</ChapterLabel>
      <div className="proof-two-column">
        <div className="proof-statement">
          <p className="proof-index-note">OBSERVATION / EDITING / MAKING</p>
          <h2>I like the bit before the work becomes tidy.</h2>
          <p className="proof-body-copy">
            A brilliant image beside a dead paragraph. A structure nobody trusts yet. A sentence that changes what the whole piece might be about. That is usually where the useful work starts.
          </p>
          <Link to="/about" className="world-link">READ ABOUT THE STUDIO <span>↗</span></Link>
        </div>
        <div className="proof-art-stage">
          <span className="proof-art-number" aria-hidden="true">01</span>
          <img src={ART.walkers} alt="Two hand-drawn figures walking" className="settle-art proof-walkers" />
          <p className="proof-caption">DRAWING / BEA SOPHIA</p>
        </div>
      </div>
    </section>
  );
}

function CoursesChapter() {
  return (
    <section className="story-chapter proof-chapter proof-chapter-courses">
      <div className="proof-rule" />
      <ChapterLabel number="02">COURSE WORLDS</ChapterLabel>
      <div className="proof-section-heading">
        <h2>Courses built like working rooms, not content libraries.</h2>
        <p>Exercises, decisions, close reading and actual movement through the material. Leave with changed pages, not a folder of watched videos.</p>
      </div>

      <div className="proof-course-list">
        {courses.map((course) => (
          <article key={course.title} className="proof-course-row">
            <span className="proof-course-number">{course.number}</span>
            <div className="proof-course-copy">
              <h3>{course.title}</h3>
              <p>{course.text}</p>
            </div>
            <div className="proof-course-image" aria-hidden="true">
              <img src={course.art} alt="" className="settle-art" />
            </div>
            <Link to="/courses" className="proof-course-open" aria-label={`Open ${course.title}`}>
              OPEN ↗
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function JournalChapter() {
  return (
    <section className="story-chapter proof-chapter proof-chapter-journal">
      <div className="proof-rule" />
      <ChapterLabel number="03">THE PAGE GALLERY</ChapterLabel>
      <div className="proof-journal-grid">
        <div className="proof-journal-image">
          <span className="proof-art-number" aria-hidden="true">PG</span>
          <img src={ART.tudor} alt="Ink and wash portrait illustration by Bea Sophia" className="settle-art" />
        </div>
        <div className="proof-journal-copy">
          <p className="proof-index-note">INDEPENDENT LITERARY JOURNAL</p>
          <h2>Writing that cannot be replaced by somebody else’s sentence.</h2>
          <p>
            The Page Gallery is interested in image, rhythm, pressure, surprise and the moment a piece stops demonstrating that it can write and begins doing something only it can do.
          </p>
          <Link to="/journal" className="world-link">ENTER THE JOURNAL <span>↗</span></Link>
        </div>
      </div>
    </section>
  );
}

function FinalChapter() {
  return (
    <section className="story-chapter proof-final">
      <div className="proof-rule" />
      <div className="proof-final-copy">
        <p className="eyebrow">04 / COME IN</p>
        <h2>Bring the draft.<br />Bring the odd bit.</h2>
        <p>There is room for the work before it knows exactly what it is.</p>
        <div className="final-actions">
          <Link to="/courses" className="world-button">COURSES <span>↗</span></Link>
          <Link to="/journal" className="world-button world-button-outline">JOURNAL <span>↗</span></Link>
          <Link to="/contact" className="world-button world-button-outline">GET IN TOUCH <span>↗</span></Link>
        </div>
      </div>
      <img src={ART.skyline} alt="" className="settle-art proof-final-skyline" aria-hidden="true" />
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Bea Sophia — Writer, Editor & Founder";
  }, []);

  return (
    <div className="bea-home proof-world">
      <ScrollCinema />
      <Hero />
      <WorkChapter />
      <CoursesChapter />
      <JournalChapter />
      <FinalChapter />
    </div>
  );
}
