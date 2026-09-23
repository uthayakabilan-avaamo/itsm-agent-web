import { DOCS_NAV } from "./nav";

export default function DocsSidebar() {
  return (
    <nav className="space-y-6">
      {DOCS_NAV.map((section) => (
        <div key={section.id}>
          <a
            href={`#${section.id}`}
            className="block text-[13px] font-semibold uppercase tracking-wide text-foreground"
          >
            {section.label}
          </a>
          <ul className="mt-2 space-y-1.5 border-l border-border-subtle pl-3.5">
            {section.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block text-[13.5px] leading-snug text-muted transition-colors hover:text-primary-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
