/**
 * Inner-page header: the navy band with column lines, a sentence-case
 * headline and an intro, left-aligned to the page column. It meets the sticky
 * nav bar with no seam. Children render beneath the intro.
 */
export function PageHero({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="on-night band-grid bg-night text-on-night">
      <div className="mx-auto max-w-page px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-24">
        <h1 className="m-0 mb-6 max-w-[760px] text-h1">{title}</h1>
        {intro && (
          <div className="max-w-[560px] text-p1 text-on-night-60">{intro}</div>
        )}
        {children}
      </div>
    </section>
  );
}
