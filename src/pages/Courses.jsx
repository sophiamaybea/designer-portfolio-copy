import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    number: "01",
    title: "The Perception Lab",
    description: "A course in noticing before explaining. You work through image, attention, sensory hierarchy, line, rhythm and the difference between a detail that decorates a poem and one that changes it.",
    points: ["Visual writing exercises", "Close-reading experiments", "Image and sentence work", "Practical revision decisions"],
  },
  {
    number: "02",
    title: "The Marrow Engine",
    description: "An editing studio for drafts that are technically fine but not yet alive. The work is to locate pressure, cut dead language and make every decision earn its place.",
    points: ["Draft diagnosis", "Line-level editing games", "Pressure and pacing", "Ending and structure work"],
  },
  {
    number: "03",
    title: "Your First Poetry Manuscript",
    description: "For writers with a folder full of poems who want to understand what belongs together, what is missing and how a collection becomes more than a stack of individual pieces.",
    points: ["Sequence and architecture", "Finding the collection's argument", "Cutting and expanding", "Submission-ready organisation"],
  },
];

export default function Courses() {
  useEffect(() => {
    document.title = "Courses — Bea Sophia";
  }, []);

  return (
    <div className="world-page">
      <div className="page-shell">
        <section className="page-hero">
          <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
            <span className="chapter-dot">01</span>
            COURSES
          </span>
          <h1>Workshops for<br />the actual page.</h1>
          <p>
            These are not hours of video with a worksheet at the end. They are working rooms: exercises, close reading, decisions, experiments and ways of getting your hands back into the writing.
          </p>
        </section>

        <section className="course-page-list" aria-label="Writing courses">
          {courses.map((course) => (
            <article key={course.title} className="course-page-card">
              <span className="index">{course.number}</span>
              <div>
                <h2>{course.title}</h2>
              </div>
              <div className="course-description">
                <p>{course.description}</p>
                <ul className="course-points">
                  {course.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div style={{ marginTop: "1.8rem" }}>
                  <Link to="/contact" className="world-link">Ask about this course <span>↗</span></Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="journal-manifesto" style={{ borderTop: "1px solid var(--line)" }}>
          <div>
            <span className="eyebrow">A DOOR, NOT A DASHBOARD</span>
            <h2>Make something while you are here.</h2>
            <p>
              The point is not to collect information about writing. The point is to leave with pages that have changed because you noticed something you had not noticed before.
            </p>
            <Link to="/contact" className="world-button">ASK ABOUT ENROLMENT <span>↗</span></Link>
          </div>
          <img src="/art/brownstone.png" alt="Hand-drawn townhouse with glowing windows" />
        </section>
      </div>
    </div>
  );
}
