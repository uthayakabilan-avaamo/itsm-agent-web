"use client";

import { useEffect } from "react";

const WIDGET_URL =
  "https://h1.avaamo.com/web_channels/71386201-1ddb-4309-a4cb-d9118c4e3e3a?action=demo&banner=true&banner_text=+&banner_title=This+is+how+the+chat+agent+shows+up&controller=web_channels&demo=true";

declare global {
  interface Window {
    Avaamo?: {
      addFrame: () => void;
      sendMessage: (message: string) => void;
      onChatBoxOpen?: () => void;
      onChatBoxClose?: () => void;
      onBotMessage?: (message: { event_type?: string; [key: string]: unknown }) => void;
    };
  }
}

export default function AvaamoClassicDemoWidget() {
  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (!cancelled && window.Avaamo) {
        window.Avaamo.addFrame();
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

  return null;
}
