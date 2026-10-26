import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { StarMark, StarMarkAnimated } from "@/components/star-mark";

export const metadata: Metadata = {
  title: "Logo & Motion",
  description:
    "Internal brand reference: mark construction, scale, lockups, and the Northstar motion language.",
  robots: { index: false, follow: false },
};

const markFacts = [
  "Three circles, three radii — 4.6 / 2.4 / 1.5",
  "Positioned on a diagonal, never in a row",
  "Contained within a single circular orbit line",
];

const scales = [40, 28, 20, 14];

const alternates = [
  {
    key: "A — Orbit",
    note: "Current mark. Diagonal, contained by a ring.",
    svg: (
      <>
        <circle
          cx="24"
          cy="24"
          r="21.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle cx="31" cy="24" r="4.6" fill="var(--accent)" />
        <circle cx="17" cy="14" r="2.4" fill="currentColor" />
        <circle cx="20" cy="33" r="1.5" fill="currentColor" />
      </>
    ),
  },
  {
    key: "B — Trajectory",
    note: "A single curved path connects all three — a route, not a boundary.",
    svg: (
      <>
        <path
          d="M15,32 Q14,16 32,15"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle cx="32" cy="15" r="4.4" fill="var(--accent)" />
        <circle cx="15" cy="32" r="2.6" fill="currentColor" />
        <circle cx="17" cy="19" r="1.4" fill="currentColor" />
      </>
    ),
  },
  {
    key: "C — Bearing",
    note: "One point reads as origin; a thin bearing line points to the star.",
    svg: (
      <>
        <circle
          cx="24"
          cy="24"
          r="21.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <line
          x1="24"
          y1="24"
          x2="33"
          y2="12"
          stroke="var(--accent)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <circle cx="33" cy="12" r="3.4" fill="var(--accent)" />
        <circle cx="24" cy="24" r="4.4" fill="currentColor" />
        <circle cx="18" cy="33" r="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    key: "D — Cluster",
    note: "No ring. Tighter, denser grouping for small favicon sizes.",
    svg: (
      <>
        <circle cx="21" cy="27" r="6.2" fill="currentColor" />
        <circle cx="31" cy="16" r="3.4" fill="var(--accent)" />
        <circle cx="33" cy="29" r="1.6" fill="currentColor" />
      </>
    ),
  },
];

const timings = [
  { v: "1.6s", k: "constellation line draw" },
  { v: "250ms", k: "between lines" },
  { v: "0.35s", k: "selection change" },
  { v: "40s", k: "ring rotation" },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-page text-ink-100">
      <NavBar />

      <PageHero
        title="Logo and motion"
        intro="The mark and the motion express the same idea: orientation. Three points, unevenly weighted, always finding balance, and a system that moves with direction, not decoration."
      />

      {/* The mark */}
      <section className="mx-auto mt-12 max-w-page px-6">
        <div className="grid items-center gap-14 rounded-card border border-ink-12 bg-surface p-6 sm:p-14 lg:grid-cols-2">
          <div>
            <div className="mb-[18px] text-caption text-ink-60">
              The mark
            </div>
            <h2 className="m-0 mb-3.5 text-h2">Three stars, not one.</h2>
            <p className="m-0 mb-5 max-w-[420px] text-p1 text-ink-80">
              No five-pointed stars. Three circular points of different scale,
              staggered on a diagonal and held inside a single circular orbit —
              precise, not symmetrical. Balance without repetition.
            </p>
            <div className="flex flex-col gap-2.5">
              {markFacts.map((fact) => (
                <div key={fact} className="flex items-baseline gap-2.5">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
                  <span className="text-p2 text-ink-80">{fact}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center rounded-panel border border-ink-12 bg-well p-14 text-ink-100">
            <div className="absolute top-4 left-5 text-caption text-ink-60">
              Construction
            </div>
            <StarMark size={160} ring />
          </div>
        </div>
      </section>

      {/* Alternate directions */}
      <section className="mx-auto mt-6 max-w-page px-6">
        <div className="rounded-card border border-ink-12 bg-surface p-6 sm:p-14">
          <div className="mb-[18px] text-caption text-ink-60">
            Alternate directions
          </div>
          <h2 className="m-0 mb-2 text-h2">Other ways to draw Northstar.</h2>
          <p className="m-0 mb-8 max-w-[560px] text-p1 text-ink-80">
            Four explorations of the three-point idea, all built from unequal
            circles — never five-pointed stars, never a straight row.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
            {alternates.map((alt) => (
              <div
                key={alt.key}
                className="flex flex-col items-center gap-4 rounded-nested border border-ink-12 bg-well px-5 py-7"
              >
                <svg
                  width="88"
                  height="88"
                  viewBox="0 0 48 48"
                  className="text-ink-100"
                  aria-hidden="true"
                >
                  {alt.svg}
                </svg>
                <div className="text-center">
                  <div className="mb-1 text-p2 font-medium">{alt.key}</div>
                  <div className="text-caption text-ink-60">{alt.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale + inverse lockups */}
      <section className="mx-auto mt-6 grid max-w-page gap-6 px-6 lg:grid-cols-2">
        <div className="rounded-card border border-ink-12 bg-surface p-10">
          <div className="mb-6 text-caption text-ink-60">Scale</div>
          <div className="flex items-end gap-7 text-ink-100">
            {scales.map((size) => (
              <div key={size} className="text-center">
                <div className="flex h-10 items-end justify-center">
                  <StarMark size={size} ring={false} />
                </div>
                <div className="mt-2.5 text-caption text-ink-60">{size}px</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-card bg-night p-10 text-on-night">
          <div className="mb-6 text-caption text-on-night-60">On inverse</div>
          <div className="flex items-center gap-3">
            <StarMark size={28} ring={false} />
            <span className="text-h4">Northstar</span>
          </div>
          <div className="mt-[18px] flex items-center gap-3 text-accent-night">
            <StarMark size={28} ring={false} />
            <span className="text-h4 text-on-night">Northstar</span>
          </div>
        </div>
      </section>

      {/* 02 — orbital drift */}
      <section className="mx-auto mt-6 max-w-page px-6">
        <div className="grid items-center gap-12 rounded-card border border-ink-12 bg-surface p-6 sm:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center rounded-panel bg-night p-12 text-accent-night">
            <StarMarkAnimated size={180} ring animate />
          </div>
          <div>
            <div className="mb-[18px] text-caption text-ink-60">
              Orbital drift
            </div>
            <h2 className="m-0 mb-3.5 text-h2">
              A mark that&rsquo;s alive, quietly.
            </h2>
            <p className="m-0 mb-5 max-w-[440px] text-p1 text-ink-80">
              Each point drifts on its own slow, elliptical path — independent
              periods so the three never repeat in sync. The ring rotates once
              every 40 seconds. Used for splash screens, loading states, and the
              nav mark on hover. Never used decoratively at rest.
            </p>
            <div className="inline-block rounded-nested bg-ink-4 px-3.5 py-3 font-mono text-xs text-ink-60">
              4.2s, 5.5s and 6s periods, ease-in-out, independent phase
            </div>
          </div>
        </div>
      </section>

      {/* Motion principles */}
      <section className="mx-auto mt-20 max-w-page px-6 lg:mt-30">
        <h2 className="m-0 mb-2 text-h2">The motion language</h2>
        <p className="m-0 mb-8 max-w-[560px] text-p1 text-ink-80">
          Motion is rare. There is one moment on arrival, and after that
          things only move to answer what a person does.
        </p>

        <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:gap-6">
          <div className="flex min-h-[240px] flex-col rounded-panel bg-night p-7 text-on-night">
            <div className="mb-3.5 text-caption text-on-night-60">
              The arrival: lines are drawn
            </div>
            <div className="mb-3.5 flex flex-1 items-center justify-center">
              <svg width="220" height="110" viewBox="0 0 220 110" aria-hidden="true">
                <g stroke="var(--on-night-60)" strokeWidth="1" fill="none">
                  {[
                    [20, 80, 80, 30],
                    [80, 30, 140, 70],
                    [140, 70, 200, 40],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      pathLength={1}
                      className="chart-line"
                      style={{ "--d": `${0.3 + i * 0.25}s` } as React.CSSProperties}
                    />
                  ))}
                </g>
                {[
                  [20, 80],
                  [80, 30],
                  [140, 70],
                  [200, 40],
                ].map(([cx, cy]) => (
                  <circle key={cx} cx={cx} cy={cy} r="3.5" fill="var(--on-night)" />
                ))}
              </svg>
            </div>
            <p className="m-0 text-caption text-on-night-60">
              The home chart&rsquo;s constellation is drawn line by line, once,
              when the page loads. A route between points, not a fade.
            </p>
          </div>

          <div className="flex min-h-[240px] flex-col rounded-panel border border-ink-12 bg-surface p-7">
            <div className="mb-3.5 text-caption text-ink-60">
              The answer: a bearing appears
            </div>
            <div className="mb-3.5 flex flex-1 items-center justify-center text-ink-100">
              <svg width="220" height="110" viewBox="0 0 220 110" aria-hidden="true">
                <line
                  x1="60"
                  y1="55"
                  x2="170"
                  y2="30"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <circle cx="60" cy="55" r="3" fill="currentColor" />
                <circle cx="170" cy="30" r="9" fill="none" stroke="var(--accent)" strokeWidth="1" />
                <circle cx="170" cy="30" r="4.5" fill="var(--accent)" />
              </svg>
            </div>
            <p className="m-0 text-caption text-ink-60">
              Choosing a star rings it and draws its bearing from the pole. The
              reading beside the headline swaps with a short fade.
            </p>
          </div>
        </div>
      </section>

      {/* Timing reference */}
      <section className="mx-auto mt-14 max-w-page px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel border border-ink-12 bg-surface px-10 py-8">
          <div className="flex flex-wrap gap-6">
            {timings.map((t) => (
              <div key={t.k}>
                <div className="text-h4">{t.v}</div>
                <div className="text-caption text-ink-60">{t.k}</div>
              </div>
            ))}
          </div>
          <div className="font-mono text-xs text-ink-60">
            House ease: cubic-bezier(0.16, 1, 0.3, 1)
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
