import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Journal() {
  useEffect(() => {
    document.title = "The Page Gallery Journal — Bea Sophia";
  }, []);

  return (
    <div className="world-page">
      <div className="page-shell">
        <section className="page-hero">
          <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
            <span className="chapter-dot">02</span>
            THE PAGE GALLERY JOURNAL
          </span>
          <h1>The journal.</h1>
          <p>
            An independent literary space founded by Bea Sophia, interested in writing that feels alert, specific and difficult to replace with somebody else's sentence.
          </p>
        </section>

        <section className="journal-manifesto">
          <img src="/art/tudor.png" alt="Ink and wash portrait illustration by Bea Sophia" />
          <div>
            <span className="eyebrow">WHAT WE LOOK FOR</span>
            <h2>Not polish for the sake of polish.</h2>
            <p>
              The journal is built around close attention. We are interested in image, rhythm, pressure, surprise and the moments when a piece stops demonstrating that it can write and begins doing something only it can do.
            </p>
            <p>
              That means there is room for strange forms, unfinished edges, formally ambitious work and writing that does not arrive wearing the expected literary uniform.
            </p>
            <Link to="/contact" className="world-link">Ask about the journal <span>↗</span></Link>
          </div>
        </section>

        <section className="journal-manifesto" style={{ borderTop: "1px solid var(--line)" }}>
          <div>
            <span className="eyebrow">THE PAGE</span>
            <h2>A place for attention to become visible.</h2>
            <p>
              The visual world matters here too. Illustration, spacing, shape and the page itself are part of how a piece is read, not decoration added after the fact.
            </p>
          </div>
          <img src="/art/mountain.png" alt="Mountain and lake reflection illustration by Bea Sophia" />
        </section>
      </div>
    </div>
  );
}
