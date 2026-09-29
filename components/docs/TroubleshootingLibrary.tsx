import Link from "next/link";
import {
  TROUBLESHOOTING_CATEGORIES,
  TROUBLESHOOTING_PRODUCTS,
} from "./troubleshootingProducts";

const CATEGORY_IDS: Record<string, string> = {
  "Endpoint & OS": "tl-endpoint-os",
  "Identity & Access": "tl-identity-access",
  "Networking & VPN": "tl-networking-vpn",
  Collaboration: "tl-collaboration",
  "Developer & Design Tools": "tl-developer-design-tools",
  Hardware: "tl-hardware",
};

export default function TroubleshootingLibrary() {
  return (
    <section id="troubleshooting-library" className="scroll-mt-20 py-14">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
        Section 1
      </span>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        Troubleshooting Library
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        A dedicated reference page per product, summarizing the most common
        issues and fixes from each vendor&apos;s official documentation —
        paraphrased and linked back to the source for full detail.
      </p>

      <div className="mt-8 space-y-10">
        {TROUBLESHOOTING_CATEGORIES.map((category) => {
          const products = TROUBLESHOOTING_PRODUCTS.filter(
            (product) => product.category === category,
          );

          if (products.length === 0) return null;

          return (
            <div key={category} id={CATEGORY_IDS[category]} className="scroll-mt-24">
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                {category}
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/docs/troubleshooting/${product.slug}`}
                    className="group rounded-2xl border border-border-subtle bg-white p-4 shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        {product.name}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-muted transition-colors group-hover:text-primary-600"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                      {product.blurb}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
