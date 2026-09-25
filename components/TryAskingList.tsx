"use client";

import { useState } from "react";

const EXAMPLES = [
  "My bluetooth is not working",
  "Can you tell me the status of my VPN ticket",
  "Can you add a comment to the Figma incident",
];

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4.5 4.5L19 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TryAskingList() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // clipboard access denied or unavailable — no-op
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      {EXAMPLES.map((example, index) => (
        <div
          key={example}
          className="flex items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-white px-4 py-3 shadow-sm"
        >
          <p className="text-[15px] text-foreground">&ldquo;{example}&rdquo;</p>
          <button
            type="button"
            onClick={() => handleCopy(example, index)}
            aria-label={`Copy "${example}"`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-50 hover:text-primary-600"
          >
            {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      ))}
    </div>
  );
}
