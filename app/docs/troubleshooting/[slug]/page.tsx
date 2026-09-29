import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  TROUBLESHOOTING_PRODUCTS,
  getTroubleshootingProduct,
} from "@/components/docs/troubleshootingProducts";

export function generateStaticParams() {
  return TROUBLESHOOTING_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function TroubleshootingProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getTroubleshootingProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[13px] text-muted">
            <Link href="/docs" className="hover:text-primary-600">
              Docs
            </Link>
            <span>/</span>
            <Link
              href="/docs#troubleshooting-library"
              className="hover:text-primary-600"
            >
              Troubleshooting library
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {product.category}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {product.blurb}
          </p>

          <a
            href={product.officialSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-600 hover:text-primary-700"
          >
            {product.officialSourceLabel}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {product.issues.length > 0 ? (
            <div className="mt-12 space-y-6">
              {product.issues.map((issue) => (
                <div
                  key={issue.title}
                  className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {issue.title}
                  </h2>
                  <p className="mt-1.5 text-[14.5px] text-muted">
                    {issue.symptoms}
                  </p>

                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-muted marker:font-semibold marker:text-primary-400">
                    {issue.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  <a
                    href={issue.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary-600 hover:text-primary-700"
                  >
                    View official article &rarr;
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-[15px] text-muted">
              Common issues for {product.name} are being added — check the
              official source above in the meantime.
            </p>
          )}

          <Link
            href="/docs#troubleshooting-library"
            className="mt-14 inline-flex items-center gap-1.5 text-[14px] font-medium text-muted hover:text-primary-600"
          >
            &larr; Back to the troubleshooting library
          </Link>
        </div>
      </main>
    </div>
  );
}
