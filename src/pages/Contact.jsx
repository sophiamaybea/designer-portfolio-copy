import React, { useEffect } from "react";
import InquiryForm from "@/components/contact/InquiryForm";

export default function Contact() {
  useEffect(() => {
    document.title = "Get in touch — Bea Sophia";
  }, []);

  return (
    <div className="world-page">
      <div className="page-shell">
        <section className="page-hero">
          <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
            <span className="chapter-dot">04</span>
            GET IN TOUCH
          </span>
          <h1>Bring me the<br />interesting bit.</h1>
          <p>
            Course questions, journal questions, editorial work, collaborations or something difficult to fit into a dropdown. Send a note below.
          </p>
        </section>

        <section className="contact-world">
          <div>
            <img src="/art/skyline.png" alt="Ink skyline illustration by Bea Sophia" className="contact-art" />
          </div>
          <div className="contact-form-wrap">
            <span className="eyebrow">A NOTE TO THE STUDIO</span>
            <InquiryForm />
          </div>
        </section>
      </div>
    </div>
  );
}
