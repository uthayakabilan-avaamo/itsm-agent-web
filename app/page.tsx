import Navbar from "@/components/Navbar";
import HeroVisual from "@/components/HeroVisual";
import AssistantFab from "@/components/AssistantFab";

const TRUST_ITEMS = ["SOC 2 Type II", "99.99% uptime", "Deploys in under a day"];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex flex-1 items-center">
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
          {/* left: copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              AI-native ITSM
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              IT service management,
              <br />
              run by AI agents.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Alex is the ITSM platform where autonomous agents triage,
              resolve, and route every ticket around the clock — so your team
              only steps in for the work that actually needs a human.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm shadow-primary-600/25 transition-colors hover:bg-primary-700"
              >
                Start free trial
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:border-primary-200 hover:bg-primary-50"
              >
                See how it works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
              {TRUST_ITEMS.map((item, i) => (
                <span key={item} className="flex items-center gap-6">
                  {i > 0 && (
                    <span className="hidden h-1 w-1 rounded-full bg-border-subtle sm:block" />
                  )}
                  <span className="text-[13px] font-medium text-muted">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* right: animation */}
          <div className="lg:pl-6">
            <HeroVisual />
          </div>
        </section>
      </main>

      <AssistantFab />
    </div>
  );
}
