import Navbar from "@/components/Navbar";
import AvaamoWidget from "@/components/AvaamoWidget";
import TryAskingList from "@/components/TryAskingList";

export default function AssistantPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex flex-1 items-stretch overflow-hidden">
        <section className="mx-auto grid h-full w-full max-w-7xl auto-rows-fr grid-cols-1 items-stretch gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          {/* left: dummy copy */}
          <div className="flex max-w-xl flex-col items-start justify-center py-20 lg:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              AI Assistant
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Talk to Alex,
              <br />
              right here.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Alex is your ITSM assistant — it handles ticket activity end to
              end, so you can skip the forms and just ask.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Status", "Create", "Comment", "Resolve", "Cancel"].map(
                (action) => (
                  <span
                    key={action}
                    className="inline-flex items-center rounded-full bg-primary-50 px-3.5 py-1.5 text-[13px] font-medium text-primary-700"
                  >
                    {action}
                  </span>
                ),
              )}
            </div>

            <div className="mt-9 w-full">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                Try asking
              </p>
              <TryAskingList />
            </div>
          </div>

          {/* right: widget */}
          <div className="flex items-stretch justify-center lg:pl-6">
            <AvaamoWidget />
          </div>
        </section>
      </main>
    </div>
  );
}
