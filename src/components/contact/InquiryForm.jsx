import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const initialForm = {
  name: "",
  email: "",
  topic: "",
  message: "",
};

export default function InquiryForm() {
  const { toast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.topic || !form.message.trim()) {
      toast({ title: "Please complete each field.", variant: "destructive" });
      return;
    }

    setStatus("sending");
    try {
      await base44.entities.Inquiry.create({
        name: form.name.trim(),
        email: form.email.trim(),
        topic: form.topic,
        message: form.message.trim(),
        source: "bea-sophia-website",
      });
      setStatus("sent");
      setForm(initialForm);
    } catch (error) {
      console.error("Inquiry submission failed", error);
      setStatus("error");
      toast({ title: "That note did not send. Please try again.", variant: "destructive" });
    }
  };

  if (status === "sent") {
    return (
      <div style={{ padding: "3rem 0", borderBottom: "1px solid var(--line)" }} aria-live="polite">
        <p className="eyebrow">RECEIVED</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 1rem" }}>
          Thank you.
        </h2>
        <p style={{ color: "var(--quiet)", maxWidth: 520, lineHeight: 1.7 }}>
          Your note is safely in the studio.
        </p>
        <button type="button" className="world-link" style={{ background: "transparent", marginTop: "1.5rem" }} onClick={() => setStatus("idle")}>
          Send another note <span>↗</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "2rem" }}>
      <label style={{ display: "grid", gap: "0.65rem" }}>
        <span className="eyebrow" style={{ margin: 0 }}>NAME</span>
        <input
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Your name"
          style={{ width: "100%", minHeight: 52, border: 0, borderBottom: "1px solid var(--line)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.5rem", padding: "0.35rem 0" }}
        />
      </label>

      <label style={{ display: "grid", gap: "0.65rem" }}>
        <span className="eyebrow" style={{ margin: 0 }}>EMAIL</span>
        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", minHeight: 52, border: 0, borderBottom: "1px solid var(--line)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.5rem", padding: "0.35rem 0" }}
        />
      </label>

      <label style={{ display: "grid", gap: "0.65rem" }}>
        <span className="eyebrow" style={{ margin: 0 }}>ABOUT</span>
        <select
          value={form.topic}
          onChange={(event) => update("topic", event.target.value)}
          style={{ width: "100%", minHeight: 52, border: 0, borderBottom: "1px solid var(--line)", borderRadius: 0, background: "transparent", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.45rem", padding: "0.35rem 0" }}
        >
          <option value="">Choose one</option>
          <option value="course">A course</option>
          <option value="journal">The journal</option>
          <option value="editorial">Editorial work</option>
          <option value="collaboration">A collaboration</option>
          <option value="other">Something else</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: "0.65rem" }}>
        <span className="eyebrow" style={{ margin: 0 }}>YOUR NOTE</span>
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell me what you are thinking about…"
          rows={7}
          style={{ width: "100%", resize: "vertical", border: 0, borderBottom: "1px solid var(--line)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.45rem", lineHeight: 1.35, padding: "0.5rem 0" }}
        />
      </label>

      <div>
        <button type="submit" className="world-button" disabled={status === "sending"}>
          {status === "sending" ? "SENDING…" : "SEND THE NOTE"} <span>↗</span>
        </button>
        {status === "error" && (
          <p style={{ color: "var(--quiet)", fontSize: "0.78rem", marginTop: "0.8rem" }} aria-live="polite">
            The form hit a snag. Your words are still here, so you can try again.
          </p>
        )}
      </div>
    </form>
  );
}
