import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const rows = [
  ["01", "Writing", "Poems, essays and other forms where the sentence has to do more than behave."],
  ["02", "Editing", "Close, practical editorial work centred on what the piece is actually trying to become."],
  ["03", "Courses", "Interactive writing rooms built around exercises, attention and decisions on the page."],
  ["04", "The journal", "The Page Gallery Journal, an independent literary space founded by Bea Sophia."],
];

export default function About() {
  useEffect(() => {
    document.title = "About — Bea Sophia";
  }, []);

  return (
    <div className="world-page">
      <div className="page-shell">
        <section className="page-hero">
          <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
            <span className="chapter-dot">03</span>
            ABOUT
          </span>
          <h1>Bea Sophia.</h1>
          <p>
            Writer, editor and founder of The Page Gallery Journal. I make writing, courses and editorial spaces for people who care about what a sentence is actually doing.
          </p>
        </section>

        <section className="about-world-grid">
          <div>
            <img src="/art/moon.png" alt="Moonlit water illustration by Bea Sophia" className="about-art" />
          </div>
          <div className="about-copy">
            <span className="eyebrow">THE STUDIO</span>
            <h2>I like the bit before the work becomes tidy.</h2>
            <p>
              The interesting stage is often the one where a draft is still giving off contradictory signals: a brilliant image beside a dead paragraph, a structure nobody trusts yet, a line that changes what the whole thing might be about.
            </p>
            <p>
              My work is built around staying with that stage long enough to make useful decisions. Not sanding everything into the same literary surface, but finding what has energy and making the rest answer to it.
            </p>
            <div className="about-list">
              {rows.map(([number, title, description]) => (
                <div className="about-list-row" key={title}>
                  <span>{number}</span>
                  <div>
                    <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.65rem", fontWeight: 400 }}>{title}</strong>
                    <span style={{ color: "var(--quiet)", lineHeight: 1.6 }}>{description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link to="/contact" className="world-link">Get in touch <span>↗</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
