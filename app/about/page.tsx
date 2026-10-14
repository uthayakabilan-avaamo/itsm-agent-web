import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AboutFlowDiagram from "@/components/AboutFlowDiagram";
import AboutFlows, { FLOW_LINKS } from "@/components/AboutFlows";

export const metadata: Metadata = {
  title: "About Alex",
  description:
    "Alex is a conversational IT Service Desk agent that verifies identity, troubleshoots first, and manages tickets end to end in one chat.",
};

const CAPABILITY_GROUPS = [
  {
    title: "Get help",
    items: [
      {
        name: "Troubleshoot first",
        text: "For something broken, Alex offers known fixes one at a time before creating a ticket.",
      },
      {
        name: "Answer ITSM questions",
        text: "Ask what an incident is, or how a process works, and get a plain answer.",
      },
      {
        name: "Escalate to a live agent",
        text: "On request, after repeated failure, or when something can't be done in chat.",
      },
    ],
  },
  {
    title: "Manage tickets",
    items: [
      {
        name: "Create tickets",
        text: "An Incident when something is broken, a Service Request when you want something. Alex confirms a summary first.",
      },
      {
        name: "Find and check status",
        text: "Look up by number, by describing it (typos are fine), or list recent tickets.",
      },
      {
        name: "Add a note",
        text: "Append a comment to any of your tickets.",
      },
      {
        name: "Resolve or cancel",
        text: "Resolve an Incident, or cancel a Service Request that is still cancelable.",
      },
    ],
  },
  {
    title: "Safety",
    items: [
      {
        name: "Verified identity",
        text: "Nothing happens on a ticket until you sign in with your employee number and an emailed code.",
      },
      {
        name: "Stays in scope",
        text: "Alex declines non-ITSM questions and prompt-injection attempts.",
      },
    ],
  },
];

const AUTH_STEPS = [
  {
    title: "Share your employee number",
    text: "A 4 to 5 digit number. Alex asks again if the input is anything else.",
  },
  {
    title: "Get a one-time code",
    text: "A 6-digit code is emailed to you. It is valid for 10 minutes and works once.",
  },
  {
    title: "Enter the code",
    text: "Wrong or expired? Resend it or switch employee number, with unlimited retries.",
  },
  {
    title: "You're in",
    text: "Alex greets you by name and offers four quick actions to start.",
  },
];

const WHY_IT_MATTERS = [
  {
    title: "Fewer tickets",
    text: "Guided self-fix solves many issues before a ticket is ever needed.",
  },
  {
    title: "Better tickets",
    text: "Alex collects full detail up front and records what was already tried.",
  },
  {
    title: "Secure by design",
    text: "Identity is verified before any action is taken.",
  },
  {
    title: "Scoped",
    text: "Alex only handles IT Service Desk work and politely refuses the rest.",
  },
];

const GLOSSARY = [
  {
    term: "Incident (INC-n)",
    meaning: "Something is broken. Statuses: Logged, Active, Resolved, Closed.",
  },
  {
    term: "Service Request (SR-n)",
    meaning:
      "You want something new: equipment, access, software. Statuses: Logged, Submitted, Cancelled, Closed.",
  },
  {
    term: "Note",
    meaning: "A comment attached to a ticket.",
  },
  {
    term: "OTP",
    meaning: "One-time password: 6 digits, valid for 10 minutes, single use.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        {/* hero */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-16 lg:px-8 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            About
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Meet Alex, your IT Service Desk agent.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Alex is a conversational agent for Avaamo employees. In one chat it
            verifies who you are, tries to fix the problem first, and then
            creates, finds and updates tickets, so nobody has to fill in a form.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/assistant"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-[14.5px] font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700"
            >
              Talk to Alex
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-white px-5 py-3 text-[14.5px] font-semibold text-foreground shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
            >
              Read the docs
            </Link>
          </div>
        </section>

        {/* capabilities */}
        <section className="border-t border-border-subtle">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
            <SectionHeading
              eyebrow="What Alex can do"
              title="From a broken laptop to a resolved ticket, in one conversation."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {CAPABILITY_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="rounded-3xl border border-border-subtle bg-white p-6 shadow-sm"
                >
                  <h3 className="text-[15px] font-semibold text-primary-700">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <p className="text-[15px] font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* flow */}
        <section className="border-t border-border-subtle bg-primary-50/40">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="One flow, from hello to sign-off."
              text="Every conversation starts with a verified identity. From there Alex routes the request, handles it, and always asks if there is anything else before signing off."
            />
            <div className="mt-10">
              <AboutFlowDiagram />
            </div>
          </div>
        </section>

        {/* every flow */}
        <section className="border-t border-border-subtle">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
            <SectionHeading
              eyebrow="Every flow"
              title="Step by step, flow by flow."
              text="The detailed paths behind the overview: how Alex finds a ticket, creates one, updates it, and hands off to a person."
            />
            <nav
              aria-label="Flows"
              className="mt-8 flex flex-wrap gap-2"
            >
              {FLOW_LINKS.map((flow) => (
                <a
                  key={flow.id}
                  href={`#flow-${flow.id}`}
                  className="inline-flex items-center rounded-full bg-primary-50 px-3.5 py-1.5 text-[13px] font-medium text-primary-700 transition-colors hover:bg-primary-100"
                >
                  {flow.title}
                </a>
              ))}
            </nav>
            <div className="mt-10">
              <AboutFlows />
            </div>
          </div>
        </section>

        {/* auth */}
        <section className="border-t border-border-subtle">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
            <SectionHeading
              eyebrow="Secure by design"
              title="Verified before anything happens."
              text="Alex will not act on any ticket until you are verified, so your tickets stay yours."
            />
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {AUTH_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-3xl border border-border-subtle bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-[14px] font-semibold text-primary-700">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-[15px] font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* why it matters + glossary */}
        <section className="border-t border-border-subtle">
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-16 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionHeading eyebrow="Why it matters" title="Less friction, better tickets." />
              <dl className="mt-8 space-y-5">
                {WHY_IT_MATTERS.map((item) => (
                  <div key={item.title}>
                    <dt className="text-[15px] font-semibold text-foreground">
                      {item.title}
                    </dt>
                    <dd className="mt-1 text-[14.5px] leading-relaxed text-muted">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <SectionHeading eyebrow="Glossary" title="Key terms." />
              <dl className="mt-8 divide-y divide-border-subtle rounded-3xl border border-border-subtle bg-white shadow-sm">
                {GLOSSARY.map((item) => (
                  <div key={item.term} className="p-5">
                    <dt className="text-[15px] font-semibold text-foreground">
                      {item.term}
                    </dt>
                    <dd className="mt-1 text-[14.5px] leading-relaxed text-muted">
                      {item.meaning}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
