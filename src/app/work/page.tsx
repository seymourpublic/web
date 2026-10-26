import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { PageHero } from "@/components/page-hero";
import { ProductPlate } from "@/components/product-plate";
import { Reveal } from "@/components/reveal";
import { ScreenGallery } from "@/components/screen-gallery";
import { SiteFooter } from "@/components/site-footer";
import {
  displayUrl,
  productGroups,
  productSlug,
  products,
  type Product,
} from "@/lib/content";

/** "4 products, 1 project": what a problem space holds. */
function countLabel(items: Product[]) {
  const made = items.filter((p) => p.kind === "product").length;
  const built = items.length - made;
  return [
    made > 0 && `${made} ${made === 1 ? "product" : "products"}`,
    built > 0 && `${built} ${built === 1 ? "project" : "projects"}`,
  ]
    .filter(Boolean)
    .join(", ");
}

export const metadata: Metadata = {
  title: "Work",
  description:
    "Built to move people from stuck to oriented — the products and projects Northstar builds and runs, organised by problem space.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-page text-ink-100">
      <NavBar />

      <PageHero
        title="Built to move people from stuck to oriented."
        intro="Everything Northstar builds and runs, organised by the problem spaces we return to deliberately. Each new product joins the space it belongs to."
      >
        <nav
          aria-label="Problem spaces"
          className="after-headline mt-10 inline-flex flex-wrap gap-1 rounded-panel border border-on-night-12 bg-on-night-6 p-1"
          style={{ "--ld": "0.5s" } as React.CSSProperties}
        >
          {productGroups.map((g) => (
            <a
              key={g.key}
              href={`#${g.label.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-p2 text-on-night-60 no-underline transition-colors duration-200 hover:bg-on-night-12 hover:text-on-night"
            >
              {g.label}{" "}
              <span className="text-coord">
                {products.filter((p) => p.category === g.key).length}
              </span>
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="mx-auto max-w-page px-4 pt-6 sm:px-6 lg:pt-10">
        {productGroups.map((group) => {
          const items = products.filter((p) => p.category === group.key);
          return (
            <section
              key={group.key}
              id={group.label.toLowerCase()}
              aria-labelledby={`space-${group.key}`}
              className="scroll-mt-24 py-12 md:py-14"
            >
              <Reveal type="rule" className="mb-8 h-px bg-ink-100" />
              <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-8">
                <Reveal className="md:sticky md:top-24 md:self-start">
                  <h2 id={`space-${group.key}`} className="m-0 mb-1 text-h4">
                    {group.label}
                  </h2>
                  <p className="m-0 mb-3 text-p2 text-ink-60">
                    {countLabel(items)}
                  </p>
                  <p className="m-0 max-w-[200px] text-p2 text-ink-60">
                    {group.blurb}
                  </p>
                </Reveal>

                <div>
                  {items.map((product) => (
                    <article
                      key={product.name}
                      id={productSlug(product)}
                      className="group grid scroll-mt-24 gap-6 border-t border-ink-12 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,300px)_1fr] sm:gap-10"
                    >
                      <Reveal type="wipe">
                        <ProductPlate product={product} />
                      </Reveal>
                      <Reveal delay={200}>
                        {product.kind === "project" && (
                          <p className="m-0 mb-2 text-p2 text-ink-60">
                            Project for {product.client}
                          </p>
                        )}
                        <h3 className="m-0 mb-3 text-h2">{product.name}</h3>
                        <p className="m-0 mb-3 text-h4 text-ink-100">
                          {product.tagline}
                        </p>
                        <p className="m-0 mb-5 max-w-[460px] text-p1 text-ink-60">
                          {product.description}
                        </p>
                        {product.download && (
                          <div className="mb-5">
                            <a
                              href={product.download.href}
                              download
                              className="inline-flex items-center rounded-full bg-ink-100 px-5 py-2.5 text-cta text-on-night no-underline transition-opacity duration-200 hover:opacity-85"
                            >
                              {product.download.label}
                            </a>
                            <p className="m-0 mt-2 max-w-[460px] text-p2 text-ink-60">
                              {product.download.note}
                              {product.source && (
                                <>
                                  {" "}
                                  <a
                                    href={product.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                  >
                                    View the source
                                  </a>
                                  .
                                </>
                              )}
                            </p>
                          </div>
                        )}
                        {product.url && (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link text-cta text-ink-100"
                          >
                            Visit {displayUrl(product.url)}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </Reveal>
                      {product.screens && product.screens.length > 0 && (
                        <Reveal delay={120} className="min-w-0 sm:col-span-2">
                          <ScreenGallery
                            name={product.name}
                            screens={product.screens}
                            note={product.screensNote}
                          />
                        </Reveal>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <SiteFooter />
    </div>
  );
}
