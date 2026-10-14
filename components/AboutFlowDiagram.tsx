import type { ReactNode } from "react";

type BoxProps = {
  cx: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  tone?: "default" | "primary" | "success" | "warn";
};

const TONES = {
  default: "fill-white stroke-primary-200",
  primary: "fill-primary-600 stroke-primary-600",
  success: "fill-emerald-50 stroke-emerald-300",
  warn: "fill-amber-50 stroke-amber-300",
};

export function Box({ cx, y, w, h, lines, tone = "default" }: BoxProps) {
  const textClass = tone === "primary" ? "fill-white" : "fill-foreground";
  const lineHeight = 16;
  const startY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2 + 4.5;
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={y}
        width={w}
        height={h}
        rx={14}
        strokeWidth={1.5}
        className={TONES[tone]}
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={startY + i * lineHeight}
          textAnchor="middle"
          className={`${textClass} text-[13px] font-medium`}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Decision({
  cx,
  cy,
  w,
  h,
  lines,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  lines: string[];
}) {
  const points = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  return (
    <g>
      <polygon
        points={points}
        strokeWidth={1.5}
        className="fill-primary-50 stroke-primary-400"
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={cy + 4.5 + (i - (lines.length - 1) / 2) * 16}
          textAnchor="middle"
          className="fill-primary-900 text-[13px] font-semibold"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Edge({
  d,
  dashed = false,
  arrow = true,
}: {
  d: string;
  dashed?: boolean;
  arrow?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1.6}
      strokeDasharray={dashed ? "5 5" : undefined}
      markerEnd={arrow ? "url(#about-arrow)" : undefined}
      className="stroke-primary-400"
    />
  );
}

export function Label({
  x,
  y,
  anchor = "start",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-muted text-[11.5px] font-medium"
    >
      {children}
    </text>
  );
}

export default function AboutFlowDiagram() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border-subtle bg-white p-4 shadow-sm sm:p-6">
      <svg
        viewBox="0 0 1010 950"
        role="img"
        aria-labelledby="about-flow-title about-flow-desc"
        className="mx-auto h-auto w-full min-w-[860px]"
      >
        <title id="about-flow-title">How Alex handles a conversation</title>
        <desc id="about-flow-desc">
          An employee opens the chat and verifies their identity. Alex then
          either guides a self-fix for something broken, creates a service
          request, shows ticket status, updates a ticket, or hands off to a
          live agent. After each outcome Alex asks if there is anything else,
          then signs off.
        </desc>

        <defs>
          <marker
            id="about-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" className="fill-primary-400" />
          </marker>
        </defs>

        {/* entry */}
        <Box cx={450} y={20} w={220} h={52} lines={["Employee opens chat"]} tone="primary" />
        <Edge d="M450 72 V110" />
        <Box
          cx={450}
          y={110}
          w={290}
          h={64}
          lines={["Verify identity", "employee number + emailed code"]}
        />
        <Edge d="M450 174 V212" />
        <Decision cx={450} cy={250} w={250} h={76} lines={["What do they need?"]} />

        {/* branch bus */}
        <Edge d="M450 288 V305" arrow={false} />
        <Edge d="M175 305 H900" arrow={false} />
        <Edge d="M175 305 V340" />
        <Edge d="M380 305 V340" />
        <Edge d="M560 305 V340" />
        <Edge d="M740 305 V340" />
        <Edge d="M900 305 V340" />
        <Label x={181} y={327}>Something is broken</Label>
        <Label x={386} y={327}>Needs something new</Label>
        <Label x={566} y={327}>Check on a ticket</Label>
        <Label x={746} y={327}>Update a ticket</Label>
        <Label x={894} y={327} anchor="end">Wants a person</Label>

        {/* branches */}
        <Box cx={175} y={340} w={150} h={60} lines={["Guided self-fix", "one suggestion at a time"]} />
        <Box cx={380} y={340} w={150} h={60} lines={["Create Service", "Request"]} />
        <Box cx={560} y={340} w={150} h={60} lines={["Find and show", "status"]} />
        <Box cx={740} y={340} w={150} h={60} lines={["Add note /", "Resolve / Cancel"]} />
        <Box cx={900} y={340} w={150} h={60} lines={["Hand off to live agent", "with summary"]} tone="warn" />

        {/* self-fix outcome */}
        <Edge d="M175 400 V435" />
        <Decision cx={175} cy={475} w={170} h={80} lines={["Fixed?"]} />
        <Edge d="M90 475 H80 V540" />
        <Edge d="M260 475 H270 V540" />
        <Label x={72} y={466} anchor="end">Fixed</Label>
        <Label x={278} y={466}>Not fixed</Label>
        <Box cx={80} y={540} w={150} h={56} lines={["Solved,", "no ticket needed"]} tone="success" />
        <Box cx={270} y={540} w={150} h={56} lines={["Create Incident ticket", "with everything tried"]} />

        {/* ticket logged */}
        <Edge d="M270 596 V640" />
        <Edge d="M380 400 V640" />
        <Box cx={320} y={640} w={200} h={56} lines={["Ticket logged", "and confirmed"]} tone="success" />

        {/* merge into "anything else" */}
        <Edge d="M80 596 V720" arrow={false} />
        <Edge d="M320 696 V720" arrow={false} />
        <Edge d="M560 400 V720" arrow={false} />
        <Edge d="M740 400 V720" arrow={false} />
        <Edge d="M900 400 V720" arrow={false} />
        <Edge d="M80 720 H900" arrow={false} />
        <Edge d="M450 720 V750" />

        <Decision cx={450} cy={790} w={190} h={80} lines={["Anything else?"]} />
        <Edge d="M545 790 H990 V250 H575" dashed />
        <Label x={560} y={782}>Yes</Label>
        <Edge d="M450 830 V870" />
        <Label x={460} y={856}>No</Label>
        <Box cx={450} y={870} w={220} h={52} lines={["Warm sign-off"]} tone="primary" />
      </svg>
    </div>
  );
}
