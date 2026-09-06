import React, { useState } from "react";
import { Terminal, Plug, RefreshCw } from "lucide-react";
import CopyField from "./CopyField";

const MCP_ENDPOINT = "https://app.base44.com/mcp";
const MCP_REGISTER = "claude mcp add --transport http base44 https://app.base44.com/mcp";

const approaches = [
  {
    key: "mcp",
    label: "MCP server",
    icon: Plug,
    blurb:
      "For Claude Code and other MCP-capable assistants. Point the agent at Base44's platform sandbox — it edits the app's code directly in the cloud, no local checkout needed.",
    blocks: [
      { kind: "copy", label: "Endpoint", value: MCP_ENDPOINT },
      { kind: "copy", label: "Register in Claude Code", value: MCP_REGISTER },
    ],
    steps: [
      "Add the server above to your assistant.",
      "Authenticate via OAuth (PKCE) through the /mcp menu, or use the device flow for a headless client.",
      "When consent prompts appear, grant sandbox:write so the agent can edit files and run commands.",
    ],
  },
  {
    key: "cli",
    label: "CLI",
    icon: Terminal,
    blurb:
      "For local agents and scripts. Authenticate, point at this app, and start writing files — no local project required.",
    blocks: [
      { kind: "copy", label: "Authenticate", value: "base44 login" },
      { kind: "copy", label: "Target this app", value: "base44 --app-id <APP_ID>   # or set BASE44_APP_ID" },
    ],
    steps: [
      "Run base44 login and grant sandbox:write when asked.",
      "Target the app with --app-id or the BASE44_APP_ID environment variable.",
      "Use sandbox write / edit / run commands — each change commits to the active branch automatically.",
    ],
  },
];

export default function CodingAgentSteps() {
  const [active, setActive] = useState("mcp");
  const current = approaches.find((a) => a.key === active);
  const Icon = current.icon;

  return (
    <section className="connect-agent">
      <span className="chapter-label" style={{ justifyContent: "flex-start" }}>
        <span className="chapter-dot">06</span>
        CONNECT A CODING AGENT
      </span>
      <h2>Let your agent edit the code.</h2>
      <p className="connect-agent-lede">
        For the studio, not visitors. Point your own AI coding agent at the app's cloud sandbox
        and it can read, write and run against the real app — changes commit to the active branch
        and show up in the editor immediately. No local checkout.
      </p>

      <div className="connect-tabs" role="tablist" aria-label="Coding agent connection approach">
        {approaches.map((a) => {
          const TabIcon = a.icon;
          return (
            <button
              key={a.key}
              type="button"
              role="tab"
              aria-selected={active === a.key}
              className={active === a.key ? "active" : ""}
              onClick={() => setActive(a.key)}
            >
              <TabIcon size={15} aria-hidden="true" />
              {a.label}
            </button>
          );
        })}
      </div>

      <p className="connect-agent-blurb">{current.blurb}</p>

      <div className="connect-agent-blocks">
        {current.blocks.map((b) => (
          <div key={b.label} className="connect-agent-block">
            <span className="eyebrow">{b.label}</span>
            <CopyField value={b.value} />
          </div>
        ))}
      </div>

      <ol className="connect-steps">
        {current.steps.map((step, i) => (
          <li key={i}>
            <span className="connect-step-number">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <ul className="connect-agent-notes">
        <li>
          <RefreshCw size={13} aria-hidden="true" />
          Changes save automatically — a write or edit commits instantly; a run (rm, mv…) commits a few seconds later.
        </li>
        <li>
          <RefreshCw size={13} aria-hidden="true" />
          Don't run <code>deploy</code>, <code>functions deploy</code>, <code>entities push</code> or other push commands against the sandbox — those assume a local project.
        </li>
        <li>
          <RefreshCw size={13} aria-hidden="true" />
          While the agent is using sandbox tools, the Base44 builder chat is blocked; if a build is mid-flight, mutating tools return <code>BUILDER_BUSY</code>.
        </li>
        <li>
          <RefreshCw size={13} aria-hidden="true" />
          Easiest start: in the app editor, open the menu next to Publish and choose <strong>Send to Coding Agent</strong> for a ready-made prompt.
        </li>
      </ul>

      <p className="connect-agent-plan">
        <Icon size={14} aria-hidden="true" />
        Reaching an app's sandbox from outside the editor needs a Builder plan or higher, and
        sandbox:write must be granted explicitly during login or OAuth consent.
      </p>
    </section>
  );
}