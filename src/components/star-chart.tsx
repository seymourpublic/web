"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { constellation, fix, placement, polar, seeded } from "@/lib/chart";
import {
  categoryLabel,
  displayUrl,
  liveFirst,
  productGroups,
  productSlug,
} from "@/lib/content";

/**
 * The home hero: a polar star chart of the portfolio. Northstar sits at the
 * pole; each product is a star placed by bearing and distance inside its
 * problem space's sector, and the products of one space are joined into a
 * constellation. Everything here is derived from `products` and
 * `productGroups`, so a new product or space appears without touching this
 * file.
 *
 * The chart introduces the portfolio by itself: every few seconds the
 * highlight moves to the next star. A single ring glides to it, one bearing
 * line swings round the pole by the shortest arc, and the readout beside the
 * headline cross-fades in a block of fixed height, so nothing jumps or
 * reflows. Rotation pauses while the chart or readout is hovered or focused,
 * can be paused outright, and is off under reduced motion.
 *
 * Geometry is in a 0–100 viewBox so star positions double as CSS
 * percentages for the HTML buttons laid over the SVG.
 */

const R = 46; // chart radius in viewBox units
const INTERVAL = 7000; // ms each product stays highlighted
const FADE = 380; // ms for the readout to fade out before its text changes

// Live work leads the rotation; the rest follow in their listed order.
const stars = liveFirst.map((p) => {
  const place = placement(p);
  return { ...p, place, ...polar(place.bearing, R * place.distance) };
});
const byName = Object.fromEntries(stars.map((s) => [s.name, s]));

/** One constellation per problem space. */
const lines: [string, string][] = productGroups.flatMap((g) =>
  constellation(g.key),
);

/** Each problem space is named at the middle of its sector, near the rim. */
const spaceLabels = productGroups.map((g) => ({
  label: g.label,
  ...polar((g.sector[0] + g.sector[1]) / 2, R * 0.9),
}));

/** Background field: a fixed scatter of faint stars, seeded so it never shifts. */
const field = (() => {
  const rand = seeded(7);
  const out: { x: number; y: number; r: number; o: number }[] = [];
  while (out.length < 90) {
    const p = polar(rand() * 360, Math.sqrt(rand()) * R);
    const r = fix(0.12 + rand() * 0.24);
    const o = fix(0.15 + rand() * 0.4);
    // Keep the pole and the product stars clear so they read first.
    const crowds = [{ x: 50, y: 50 }, ...stars].some(
      (s) => Math.hypot(s.x - p.x, s.y - p.y) < 4,
    );
    if (!crowds) out.push({ ...p, r, o });
  }
  return out;
})();

const starRadius = { 1: 0.9, 2: 1.15, 3: 1.45 } as const;

/** Signed shortest turn, in degrees, from one bearing to another. */
function shortestTurn(from: number, to: number) {
  return ((((to - from + 180) % 360) + 360) % 360) - 180;
}

const REDUCED = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

export function StarChart({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  // What the readout is showing. It trails `active` by one fade, so the old
  // text is gone before the new text arrives.
  const [shown, setShown] = useState(0);
  // Cumulative bearing of the swinging line, so each swing takes the short way.
  const [angle, setAngle] = useState(stars[0].place.bearing);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const paused = hovering || userPaused;
  const fading = shown !== active;
  const current = stars[shown];
  const lead = stars[active];

  const goTo = useCallback((index: number) => {
    setActive(index);
    setAngle((prev) => prev + shortestTurn(prev, stars[index].place.bearing));
  }, []);

  // Advance the highlight. Any change (including a choice by the visitor)
  // restarts the clock, so a star is never cut short.
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(
      () => goTo((active + 1) % stars.length),
      INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, goTo]);

  // Swap the readout's text once its fade-out is done.
  useEffect(() => {
    if (shown === active) return;
    const id = window.setTimeout(() => setShown(active), reduced ? 0 : FADE);
    return () => window.clearTimeout(id);
  }, [active, shown, reduced]);

  const hold = {
    onPointerEnter: () => setHovering(true),
    onPointerLeave: () => setHovering(false),
    onFocus: () => setHovering(true),
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setHovering(false);
      }
    },
  };

  return (
    // On small screens the readout follows the chart, so a tapped star's details
    // land below it rather than out of view above.
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[1fr_auto] lg:gap-x-6 lg:gap-y-14">
      <div className="lg:col-start-1 lg:row-start-1 lg:self-end">{children}</div>

      <div
        className="lg:col-start-1 lg:row-start-2 lg:max-w-[440px] lg:self-start"
        {...hold}
      >
        {/* A hairline that fills over the time each product is on show. */}
        <div className="relative h-px bg-on-night-12">
          {!reduced && !paused && (
            <span
              key={active}
              className="hero-progress absolute inset-0 bg-accent-night"
              style={{ animationDuration: `${INTERVAL}ms` }}
            />
          )}
        </div>

        <div className="pt-6">
          <div
            className="readout"
            data-fading={fading}
            aria-live={paused ? "polite" : "off"}
          >
            <div className="mb-3 flex items-baseline justify-between gap-4 text-coord text-on-night-60">
              <span>
                {categoryLabel[current.category]} {current.kind}
              </span>
              <span>
                Bearing {String(current.place.bearing).padStart(3, "0")}°
              </span>
            </div>
            <h2 className="m-0 mb-2 text-h3 text-on-night">{current.name}</h2>
            <p className="m-0 mb-4 line-clamp-3 text-p2 text-on-night-60">
              {current.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href={`/work#${productSlug(current)}`}
                className="link text-cta text-accent-night"
              >
                More about {current.name}
              </Link>
              {current.url && (
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-cta text-on-night"
                >
                  {displayUrl(current.url)}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          {!reduced && (
            <button
              type="button"
              aria-pressed={userPaused}
              onClick={() => setUserPaused((v) => !v)}
              className="mt-5 cursor-pointer border-0 bg-transparent p-0 text-coord text-on-night-60 underline decoration-on-night-12 underline-offset-4 transition-colors duration-200 hover:text-on-night"
            >
              {userPaused ? "Resume rotation" : "Pause rotation"}
            </button>
          )}
        </div>
      </div>

      <div
        className="relative row-start-2 mx-auto aspect-square w-full max-w-[640px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        {...hold}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* Graticule: distance rings and bearing spokes. */}
          <g fill="none" stroke="var(--on-night-12)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {[1 / 3, 2 / 3, 1].map((k) => (
              <circle key={k} cx="50" cy="50" r={R * k} vectorEffect="non-scaling-stroke" />
            ))}
            {Array.from({ length: 12 }, (_, i) => {
              const from = polar(i * 30, R / 3);
              const to = polar(i * 30, R);
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </g>

          {/* Degree ticks on the outer ring. */}
          <g stroke="var(--on-night-60)" vectorEffect="non-scaling-stroke">
            {Array.from({ length: 72 }, (_, i) => {
              const from = polar(i * 5, R);
              const to = polar(i * 5, R + (i % 6 === 0 ? 1.6 : 0.7));
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  opacity={i % 6 === 0 ? 0.8 : 0.4}
                />
              );
            })}
          </g>

          {/* The background sky turns slowly about the pole. The products stay
              fixed: they are the reference frame. */}
          <g className="sky-turn">
            {field.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="var(--on-night)"
                opacity={s.o}
                className="chart-star"
                style={{ "--d": `${(i % 20) * 0.02}s` } as React.CSSProperties}
              />
            ))}
          </g>

          {/* Constellations: drawn once, line by line. Stroke is in viewBox
              units, because non-scaling strokes ignore pathLength for dashes. */}
          <g stroke="var(--on-night-60)" strokeWidth="0.16" fill="none">
            {lines.map(([a, b], i) => (
              <line
                key={`${a}-${b}`}
                x1={byName[a].x}
                y1={byName[a].y}
                x2={byName[b].x}
                y2={byName[b].y}
                pathLength={1}
                className="chart-line"
                style={{ "--d": `${0.5 + i * 0.25}s` } as React.CSSProperties}
              />
            ))}
          </g>

          {/* Bearing from the pole to the highlighted star. One line, swung to
              the new bearing by the shortest arc and lengthened or shortened
              to the new distance; both are CSS transitions. */}
          <g className="chart-bearing" style={{ transform: `rotate(${angle}deg)` }}>
            <line
              x1="50"
              y1="50"
              x2="50"
              y2={50 - R}
              pathLength={1}
              stroke="var(--accent-night)"
              strokeWidth="0.2"
              strokeOpacity="0.85"
              style={{ strokeDasharray: `${lead.place.distance} 1` }}
            />
          </g>

          {stars.map((s, i) => (
            <g
              key={s.name}
              className="chart-star"
              style={{ "--d": `${0.2 + i * 0.08}s` } as React.CSSProperties}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r={starRadius[s.place.magnitude]}
                className="chart-dot"
                style={{
                  fill:
                    i === active ? "var(--accent-night)" : "var(--on-night)",
                }}
              />
            </g>
          ))}

          {/* The ring that marks the highlighted star glides between them. */}
          <g
            className="chart-ring"
            style={
              {
                transform: `translate(${lead.x}px, ${lead.y}px)`,
                "--r": `${starRadius[lead.place.magnitude] + 1.6}px`,
              } as React.CSSProperties
            }
          >
            <circle
              cx="0"
              cy="0"
              fill="none"
              stroke="var(--accent-night)"
              strokeWidth="0.18"
            />
          </g>

          {/* The pole: Northstar's own mark, the fixed point. */}
          <g transform="translate(50 50) scale(0.3) translate(-24 -24)" fill="var(--on-night)">
            <circle cx="17" cy="14" r="2.4" />
            <circle cx="31" cy="24" r="4.6" />
            <circle cx="20" cy="33" r="1.5" />
          </g>
        </svg>

        {/* Compass letters and problem-space names, set in HTML for legible sizes. */}
        <div aria-hidden="true" className="text-coord text-on-night-60">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">N</span>
          <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">E</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">S</span>
          <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">W</span>
          {spaceLabels.map((l) => (
            <span
              key={l.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 italic"
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
            >
              {l.label}
            </span>
          ))}
          <span
            className="absolute -translate-x-1/2 translate-y-3"
            style={{ left: "50%", top: "54%" }}
          >
            Northstar
          </span>
        </div>

        {/* One real button per product star. */}
        <div role="group" aria-label="Products and projects on the chart">
          {stars.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-pressed={i === active}
              onClick={() => goTo(i)}
              onMouseEnter={() => goTo(i)}
              onFocus={() => goTo(i)}
              className="absolute flex -translate-x-[14px] -translate-y-1/2 cursor-pointer items-center gap-1 rounded-full border-0 bg-transparent p-0 py-1.5 pr-2 text-left"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className="h-7 w-7 shrink-0" />
              <span
                className={`text-caption transition-colors duration-500 ${
                  i === active ? "text-on-night" : "text-on-night-60 hover:text-on-night"
                }`}
              >
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
