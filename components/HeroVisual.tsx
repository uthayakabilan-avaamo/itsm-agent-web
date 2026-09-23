function OrbitNode({
  cx,
  cy,
  r,
  delay,
}: {
  cx: number;
  cy: number;
  r: number;
  delay: string;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="var(--color-primary-500)"
      className="animate-pulse-soft"
      style={{ animationDelay: delay, transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

export default function HeroVisual() {
  const center = 300;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* ambient glow */}
      <div
        className="absolute inset-8 rounded-full bg-primary-400/20 blur-3xl"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 600 600"
        className="relative h-full w-full"
        aria-hidden="true"
      >
        {/* orbit paths */}
        <circle
          cx={center}
          cy={center}
          r="240"
          fill="none"
          stroke="var(--color-primary-100)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r="180"
          fill="none"
          stroke="var(--color-primary-100)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r="120"
          fill="none"
          stroke="var(--color-primary-200)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {/* outer orbit, rotating */}
        <g
          className="animate-spin-slower"
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          <OrbitNode cx={center} cy={center - 240} r={6} delay="0s" />
          <OrbitNode cx={center + 208} cy={center + 120} r={5} delay="0.6s" />
          <OrbitNode cx={center - 208} cy={center + 120} r={4.5} delay="1.2s" />
        </g>

        {/* middle orbit, rotating opposite */}
        <g
          className="animate-spin-slow"
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          <OrbitNode cx={center + 180} cy={center} r={5} delay="0.3s" />
          <OrbitNode cx={center - 90} cy={center + 156} r={4} delay="0.9s" />
          <OrbitNode cx={center - 90} cy={center - 156} r={4} delay="1.5s" />
        </g>

        {/* data lines into the hub */}
        <g stroke="var(--color-primary-400)" strokeWidth="1.5" fill="none" opacity="0.5">
          <path
            d="M 300 180 L 300 240"
            strokeDasharray="4 6"
            className="animate-dash"
          />
          <path
            d="M 411 360 L 356 320"
            strokeDasharray="4 6"
            className="animate-dash"
          />
          <path
            d="M 189 360 L 244 320"
            strokeDasharray="4 6"
            className="animate-dash"
          />
        </g>

        {/* central hub */}
        <circle cx={center} cy={center} r="64" fill="white" />
        <circle
          cx={center}
          cy={center}
          r="64"
          fill="none"
          stroke="var(--color-primary-200)"
          strokeWidth="1"
        />
        <rect
          x={center - 26}
          y={center - 26}
          width="52"
          height="52"
          rx="16"
          fill="var(--color-primary-600)"
        />
        <path
          d={`M ${center - 10} ${center + 2} L ${center - 2} ${center + 10} L ${
            center + 12
          } ${center - 10}`}
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* floating status cards */}
      <div className="animate-float-slow absolute -left-2 top-10 rounded-2xl border border-border-subtle bg-white px-3.5 py-2.5 shadow-lg shadow-primary-900/5 sm:left-0">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-foreground">
            Ticket #4521 resolved
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted">Auto-triaged by agent · 12s</p>
      </div>

      <div className="animate-float-slower absolute -right-2 bottom-14 rounded-2xl border border-border-subtle bg-white px-3.5 py-2.5 shadow-lg shadow-primary-900/5 sm:right-0">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          <span className="text-xs font-semibold text-foreground">SLA compliance</span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted">98.6% this month</p>
      </div>

      <div className="animate-float-slow absolute bottom-2 left-4 rounded-2xl border border-border-subtle bg-white px-3.5 py-2.5 shadow-lg shadow-primary-900/5 sm:left-8">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold text-foreground">3 agents online</span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted">Handling 214 tickets</p>
      </div>
    </div>
  );
}
