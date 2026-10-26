import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpaceGlyph } from "@/components/space-glyph";
import { productGroups, productSlug, products, type Product } from "@/lib/content";

/** What to call the things in a space: product(s), project(s), or both. */
function nounFor(items: Product[]) {
  const projects = items.filter((p) => p.kind === "project").length;
  if (projects === 0) return items.length === 1 ? "product" : "products";
  if (projects === items.length) return items.length === 1 ? "project" : "projects";
  return "products and projects";
}

/**
 * One cell per problem space, each carrying its own small chart. Every
 * second cell is inverted so the grid keeps a rhythm of light and dark as
 * spaces are added.
 */
export function SpacesSection() {
  return (
    <div>
      <div className="mb-12 grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
        <Reveal>
          <h2 className="m-0 max-w-[520px] text-h1">
            The problem spaces we return to on purpose
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:justify-self-end">
          <p className="m-0 max-w-[460px] text-p1 text-ink-60">
            Each space is a place where people are routinely stuck. New
            products and projects join the space they belong to.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17.5rem),1fr))] gap-4">
        {productGroups.map((group, i) => {
          const items = products.filter((p) => p.category === group.key);
          const dark = i % 2 === 1;
          return (
            <Reveal
              key={group.key}
              delay={i * 120}
              className={`flex flex-col rounded-card p-7 sm:p-8 ${
                dark
                  ? "on-night bg-night text-on-night"
                  : "border border-ink-12 bg-surface text-ink-100"
              }`}
            >
              <div
                style={
                  {
                    "--glyph-accent": dark
                      ? "var(--accent-night)"
                      : "var(--accent)",
                  } as React.CSSProperties
                }
                className="mb-8"
              >
                <SpaceGlyph space={group.key} />
              </div>

              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-stat">{items.length}</span>
                <span
                  className={`text-caption ${dark ? "text-on-night-60" : "text-ink-60"}`}
                >
                  {nounFor(items)}
                </span>
              </div>
              <h3 className="m-0 mb-2 text-h3">{group.label}</h3>
              <p
                className={`m-0 mb-8 text-p2 ${dark ? "text-on-night-60" : "text-ink-60"}`}
              >
                {group.blurb}
              </p>

              <ul
                className={`m-0 mt-auto list-none border-t p-0 ${
                  dark ? "border-on-night-12" : "border-ink-12"
                }`}
              >
                {items.map((p) => (
                  <li
                    key={p.name}
                    className={`border-b last:border-b-0 ${
                      dark ? "border-on-night-12" : "border-ink-12"
                    }`}
                  >
                    <Link
                      href={`/work#${productSlug(p)}`}
                      className="group flex items-center justify-between py-3 text-p2 text-inherit no-underline"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        {p.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-[2] ${
                          dark ? "bg-accent-night" : "bg-accent"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
