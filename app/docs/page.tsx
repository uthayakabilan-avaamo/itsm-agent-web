import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsContent from "@/components/docs/DocsContent";

export default function DocsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-16 pt-14">
              <DocsSidebar />
            </div>
          </aside>

          <div className="min-w-0 border-t border-border-subtle lg:border-none">
            <div className="pt-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                Knowledge base
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                ITSM Policy, Operations &amp; Troubleshooting
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                The official Knowledge Base and Standard Operating Procedure
                manual for the Enterprise IT Service Desk — governance
                principles, ticket lifecycle rules, operational workflows,
                troubleshooting SOPs, and security escalation policy.
              </p>
            </div>

            <div className="divide-y divide-border-subtle">
              <DocsContent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
