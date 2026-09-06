import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Courses", path: "/courses" },
  { label: "Journal", path: "/journal" },
  { label: "About", path: "/about" },
];

export default function PerimeterNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className="bea-nav">
        <Link to="/" className="bea-brand" aria-label="Bea Sophia home">
          <span className="bea-brand-mark" aria-hidden="true" />
          <span>BEA SOPHIA</span>
        </Link>

        <nav className="bea-nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="bea-nav-contact">
          Get in touch ↗
        </Link>

        <button
          type="button"
          className="bea-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-world-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-world-menu"
            className="mobile-world-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <Link to="/">Home</Link>
            {links.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
            <Link to="/contact">Get in touch</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
