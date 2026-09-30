"use client";

import { useEffect, useState, type CSSProperties } from "react";

const WIDGET_URL =
  "https://h1.avaamo.com/web_channels/ec7cfd21-deb8-4c31-a8e5-2dd1f97c64d6";

type AvaamoBotMessage = {
  event_type?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    Avaamo?: {
      addFrame: () => void;
      sendMessage: (message: string) => void;
      onChatBoxOpen?: () => void;
      onChatBoxClose?: () => void;
      onBotMessage?: (message: AvaamoBotMessage) => void;
    };
  }
}

const buttonStyle = (visible: boolean): CSSProperties => ({
  display: visible ? "inline-flex" : "none",
  position: "fixed",
  top: "20px",
  right: "90px",
  zIndex: 2147483647,
});

export default function AvaamoChatbotWidget() {
  const [showButtons, setShowButtons] = useState(false);
  const [isLiveAgentActive, setIsLiveAgentActive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const attachHandlers = (avaamo: NonNullable<Window["Avaamo"]>) => {
      avaamo.onChatBoxOpen = () => setShowButtons(true);
      avaamo.onChatBoxClose = () => setShowButtons(false);
      avaamo.onBotMessage = (message) => {
        if (message?.event_type === "chat_terminated") {
          setShowButtons(false);
          setIsLiveAgentActive(false);
        }
      };
    };

    const mount = () => {
      if (!cancelled && window.Avaamo) {
        window.Avaamo.addFrame();
        attachHandlers(window.Avaamo);
      }
    };

    if (window.Avaamo) {
      mount();
    } else {
      let script = document.getElementById(
        "avm-web-channel",
      ) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.src = WIDGET_URL;
        script.id = "avm-web-channel";
        document.body.appendChild(script);
      }

      script.addEventListener("load", mount);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLiveAgentClick = () => {
    window.Avaamo?.sendMessage("Please transfer me to a live agent right now. No further confirmations.");
    setIsLiveAgentActive(true);
  };

  const handleEndLiveAgentClick = () => {
    window.Avaamo?.sendMessage("#end agent");
    setIsLiveAgentActive(false);
  };

  return (
    <>
      <button
        id="liveAgentBtn"
        type="button"
        onClick={handleLiveAgentClick}
        style={buttonStyle(showButtons && !isLiveAgentActive)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-4 py-2 text-[14px] font-semibold text-foreground shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0"
        >
          <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" />
        </svg>
        Transfer to Live Agent
      </button>
      <button
        id="endLiveAgentBtn"
        type="button"
        onClick={handleEndLiveAgentClick}
        style={buttonStyle(showButtons && isLiveAgentActive)}
        className="rounded-full border border-border-subtle bg-white px-4 py-2 text-[14px] font-semibold text-foreground shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
      >
        End live agent
      </button>
    </>
  );
}
