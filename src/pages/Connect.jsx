import React, { useEffect, useMemo } from "react";
import CopyField from "@/components/connect/CopyField";
import ClientSteps from "@/components/connect/ClientSteps";

export default function Connect() {
  useEffect(() => {
    document.title = "Connect an AI assistant — Bea Sophia";
  }, []);

  const serverUrl = useMemo(
    () => new URL("/api/mcp", window.location.origin).toString(),
    [],
  );

  return (
    <div className="world-page">
      <div className="page-shell">
        <section className="page-hero">
          <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
            <span className="chapter-dot">05</span>
            CONNECT AN ASSISTANT
          </span>
          <h1>Point an AI at<br />the studio.</h1>
          <p>
            This studio runs an MCP server. Plug it into your AI assistant and it can read and
            edit the design scratch and inquiry records you have access to — signed in as you,
            limited by your own app permissions.
          </p>
        </section>

        <section className="connect-world">
          <div className="connect-side">
            <span className="eyebrow">THE SERVER URL</span>
            <p>
              Copy this URL into your AI client. It's resolved from this app's own address, so it
              works from wherever you're signed in.
            </p>
            <CopyField value={serverUrl} />
          </div>

          <ClientSteps />
        </section>
      </div>
    </div>
  );
}