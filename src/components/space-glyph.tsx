import { constellation, placement, polar } from "@/lib/chart";
import { products, type SpaceKey } from "@/lib/content";

const W = 200;
const H = 140;
const CX = 100;
const CY = 70;
const R = 62;

/**
 * A problem space as a small chart: the same graticule, with only that
 * space's products plotted and joined into its constellation. Lines draw
 * themselves when an ancestor with `data-in="true"` (a Reveal) comes into
 * view. Colour comes from the parent: `currentColor` for ink,
 * `--glyph-accent` for the stars.
 */
export function SpaceGlyph({ space }: { space: SpaceKey }) {
  const members = products
    .filter((p) => p.category === space)
    .map((p) => {
      const place = placement(p);
      return {
        ...p,
        place,
        ...polar(place.bearing, R * place.distance, CX, CY),
      };
    });
  const byName = Object.fromEntries(members.map((m) => [m.name, m]));
  const lines = constellation(space);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <g fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1">
        {[1 / 3, 2 / 3, 1].map((k) => (
          <circle key={k} cx={CX} cy={CY} r={R * k} />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const a = polar(i * 30, R / 3, CX, CY);
          const b = polar(i * 30, R, CX, CY);
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>

      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" fill="none">
        {lines.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            x1={byName[a].x}
            y1={byName[a].y}
            x2={byName[b].x}
            y2={byName[b].y}
            pathLength={1}
            className="glyph-line"
            style={{ "--d": `${0.25 + i * 0.22}s` } as React.CSSProperties}
          />
        ))}
      </g>

      {members.map((m, i) => (
        <g
          key={m.name}
          className="glyph-star"
          style={{ "--d": `${0.1 + i * 0.12}s` } as React.CSSProperties}
        >
          <circle
            cx={m.x}
            cy={m.y}
            r={fixRadius(m.place.magnitude, 2)}
            fill="var(--glyph-accent)"
          />
          <circle
            cx={m.x}
            cy={m.y}
            r={fixRadius(m.place.magnitude, 6)}
            fill="none"
            stroke="var(--glyph-accent)"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
        </g>
      ))}

      <g
        transform={`translate(${CX} ${CY}) scale(0.4) translate(-24 -24)`}
        fill="currentColor"
      >
        <circle cx="17" cy="14" r="2.4" />
        <circle cx="31" cy="24" r="4.6" />
        <circle cx="20" cy="33" r="1.5" />
      </g>
    </svg>
  );
}

/** Star radius for a brightness step, rounded so markup is stable. */
function fixRadius(magnitude: 1 | 2 | 3, extra: number) {
  return Math.round((magnitude * 1.1 + extra) * 100) / 100;
}
