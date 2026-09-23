import Link from "next/link";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Customers", href: "#customers" },
  { label: "Docs", href: "/docs" },
];

function Logomark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="30" height="30" rx="9" fill="var(--color-primary-600)" />
      <circle cx="15" cy="15" r="6.5" fill="white" fillOpacity="0.95" />
      <circle cx="22" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logomark />
          <span className="text-[17px] font-semibold tracking-tight text-foreground">
            Alex
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14.5px] font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14.5px] font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#signin"
            className="hidden text-[14.5px] font-medium text-muted transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4.5 py-2.5 text-[14.5px] font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700"
          >
            Book a demo
          </a>
        </div>
      </nav>
    </header>
  );
}
