import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Alex — ITSM, run by AI agents",
  description:
    "Alex is an AI-native IT service management platform. Autonomous agents triage, resolve, and escalate every ticket — so your team only sees the work that needs them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
