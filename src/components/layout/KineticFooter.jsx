import React from "react";
import { Link } from "react-router-dom";

export default function KineticFooter() {
  return (
    <footer className="bea-footer">
      <img src="/art/skyline.png" alt="" className="footer-skyline" aria-hidden="true" />
      <p className="footer-big-name">BEA SOPHIA</p>

      <div className="footer-grid">
        <div>
          <p className="footer-kicker">
            Writing, courses and an independent journal for people making work with a pulse.
          </p>
        </div>

        <div className="footer-col">
          <h3>EXPLORE</h3>
          <Link to="/courses">Courses</Link>
          <Link to="/journal">The journal</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Get in touch</Link>
        </div>

        <div className="footer-col">
          <h3>THE STUDIO</h3>
          <span>Writing</span>
          <span>Editing</span>
          <span>Courses</span>
          <span>Independent publishing</span>
        </div>

        <div className="footer-col">
          <h3>ELSEWHERE</h3>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
          <span>The Page Gallery Journal</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 BEA SOPHIA</span>
        <span>WORDS, PICTURES, ODD BITS.</span>
      </div>
    </footer>
  );
}
