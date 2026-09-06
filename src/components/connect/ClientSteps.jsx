import React, { useState } from "react";
import { MessageSquare, Sparkles, Code2, Wrench } from "lucide-react";

const clients = [
  {
    key: "chatgpt",
    label: "ChatGPT",
    icon: MessageSquare,
    steps: [
      "Open ChatGPT and go to Apps.",
      "Enable Developer mode (a warning appears — accept it; custom apps run your own prompts against external tools, which carries some risk).",
      "Click Create app, name it whatever you like, and paste the server URL above into the connector field.",
      "Create the app, then enable it from the chat composer before you start prompting.",
    ],
  },
  {
    key: "claude",
    label: "Claude",
    icon: Sparkles,
    steps: [
      "Open Claude and open the profile menu.",
      "Go to Settings → Connectors.",
      "Click Add custom connector, name it, and paste the server URL above.",
      "Click Add to save the connector.",
    ],
  },
  {
    key: "cursor",
    label: "Cursor",
    icon: Code2,
    steps: [
      "In Cursor, open Settings → Tools & Integrations.",
      "Click New MCP Server — this opens your mcp.json file.",
      "Add an entry whose url is the server URL above, then save the file.",
      "Toggle the new server on so Cursor can reach it.",
    ],
  },
  {
    key: "custom",
    label: "Custom",
    icon: Wrench,
    steps: [
      "Copy the server URL above.",
      "Add it to your client as a streamable HTTP MCP server.",
      "Most clients need only a name and the URL.",
      "Reload the client so it picks up the new server.",
    ],
  },
];

export default function ClientSteps() {
  const [active, setActive] = useState("chatgpt");
  const current = clients.find((c) => c.key === active);
  const Icon = current.icon;

  return (
    <div className="connect-clients">
      <div className="connect-tabs" role="tablist" aria-label="AI client instructions">
        {clients.map((c) => {
          const TabIcon = c.icon;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={active === c.key}
              className={active === c.key ? "active" : ""}
              onClick={() => setActive(c.key)}
            >
              <TabIcon size={15} aria-hidden="true" />
              {c.label}
            </button>
          );
        })}
      </div>

      <ol className="connect-steps">
        {current.steps.map((step, i) => (
          <li key={i}>
            <span className="connect-step-number">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
        <li className="connect-step-note">
          <span className="connect-step-number">↳</span>
          <span>
            <strong>One more step:</strong> the client opens this app's consent page. Sign in
            with your own app account and approve — the assistant only ever acts as you.
          </span>
        </li>
      </ol>

      <p className="connect-refresh">
        <Icon size={14} aria-hidden="true" />
        After we ship changes to the app, refresh the connector in your client — assistants
        cache the tool list, so a stale connector may miss new tools.
      </p>
    </div>
  );
}