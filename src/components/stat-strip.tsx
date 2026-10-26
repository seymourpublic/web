import { Reveal } from "@/components/reveal";
import { productGroups, products } from "@/lib/content";

/**
 * Three plain numbers on a paper card that overlaps the bottom edge of the
 * header band. All three are counted from the content, so they rise as the
 * portfolio does. The numerals count up once when the card scrolls into view
 * (see `.count` in globals.css), and the divider rules draw in turn.
 */
export function StatStrip() {
  const stats = [
    {
      value: products.filter((p) => p.kind === "product").length,
      label: "Products",
    },
    {
      value: products.filter((p) => p.kind === "project").length,
      label: "Projects for clients",
    },
    { value: productGroups.length, label: "Problem spaces" },
  ];

  return (
    <Reveal className="rounded-card border border-ink-12 bg-surface">
      <dl className="m-0 grid grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className="relative px-5 py-6 sm:px-10 sm:py-9">
            {i > 0 && (
              <Reveal
                type="grow"
                delay={200 + i * 150}
                className="absolute top-6 bottom-6 left-0 w-px bg-ink-12"
              />
            )}
            <dd
              className="count m-0 mb-2 text-stat"
              style={{ "--to": s.value } as React.CSSProperties}
              aria-label={String(s.value)}
            />
            <dt className="text-caption text-ink-60">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
