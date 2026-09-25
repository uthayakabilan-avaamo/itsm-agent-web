"use client";

import { useEffect } from "react";

const WIDGET_SRC =
  "https://h1.avaamo.com/web_channel/channel/71386201-1ddb-4309-a4cb-d9118c4e3e3a/agentic_agents/widget.js";

declare global {
  interface Window {
    PromptWidget?: { init: (container: string) => void };
  }
}

export default function AvaamoWidget() {
  useEffect(() => {
    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    const mount = () => {
      const container = document.getElementById("mobile-container");
      if (
        !cancelled &&
        window.PromptWidget &&
        container &&
        !container.dataset.initialized
      ) {
        container.dataset.initialized = "true";
        window.PromptWidget.init("#mobile-container");
      }
    };

    if (window.PromptWidget) {
      mount();
    } else {
      let script = document.getElementById(
        "avm-web-channel",
      ) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.src = WIDGET_SRC;
        script.id = "avm-web-channel";
        document.body.appendChild(script);
      }

      script.addEventListener("load", mount);
      // widget.js sets window.PromptWidget asynchronously after its own
      // load event, so also poll as a fallback.
      pollId = setInterval(() => {
        if (window.PromptWidget) {
          mount();
          if (pollId) clearInterval(pollId);
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return <div id="mobile-container" />;
}
