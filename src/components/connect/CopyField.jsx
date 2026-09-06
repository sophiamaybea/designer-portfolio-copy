import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyField({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="connect-copy-field">
      <input
        type="text"
        readOnly
        value={value}
        aria-label="MCP server URL"
        onFocus={(e) => e.target.select()}
      />
      <button type="button" onClick={copy} className="connect-copy-button">
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}