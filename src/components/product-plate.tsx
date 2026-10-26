import Image from "next/image";
import { fix, hashString, placement, polar, seeded } from "@/lib/chart";
import { categoryLabel, type Product } from "@/lib/content";

/**
 * A product's image slot. With a real `image` it shows that; until then it
 * draws a plate: the same graticule as the home chart, with this product's
 * star at its real bearing and distance from the pole. Each plate is unique
 * and deterministic, so the cards read as a set.
 */

const W = 400;
const H = 300;
const CX = 200;
const CY = 150;
const R = 120;

const starRadius = { 1: 2.4, 2: 3, 3: 3.8 } as const;

function buildPlate(product: Product) {
  const { bearing, distance, magnitude } = placement(product);
  const star = polar(bearing, R * distance, CX, CY);

  const rand = seeded(hashString(product.name));
  const field: { x: number; y: number; r: number; o: number }[] = [];
  while (field.length < 46) {
    const x = fix(rand() * W);
    const y = fix(rand() * H);
    const r = fix(0.6 + rand() * 0.9);
    const o = fix(0.2 + rand() * 0.5);
    // Keep the pole and this product's star clear so they read first.
    if (Math.hypot(x - star.x, y - star.y) < 16) continue;
    if (Math.hypot(x - CX, y - CY) < 14) continue;
    field.push({ x, y, r, o });
  }

  const spokes = Array.from({ length: 12 }, (_, i) => ({
    from: polar(i * 30, R / 3, CX, CY),
    to: polar(i * 30, R * 1.4, CX, CY),
  }));

  return { star, field, spokes, magnitude, bearing };
}

/** Marks laid over any plate: the logo, and a status tag (Live, or a badge). */
function Badges({ product }: { product: Product }) {
  const status = product.badge ?? (product.url ? "Live" : undefined);
  return (
    <>
      {product.logo && (
        <div className="absolute top-3 left-3 flex h-8 items-center rounded-nested bg-surface px-2">
          <Image
            src={product.logo}
            alt={`${product.name} logo`}
            width={96}
            height={24}
            className="h-5 w-auto"
          />
        </div>
      )}
      {status && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-night px-2.5 py-1 text-coord text-on-night">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent-night"
          />
          {status}
        </div>
      )}
    </>
  );
}

export function ProductPlate({
  product,
  className = "",
  priority,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const cover = product.image ?? product.screens?.[0]?.src;
  if (cover) {
    return (
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-panel border border-ink-12 bg-well ${className}`}
      >
        <Image
          src={cover}
          alt={`${product.name}: ${product.screens?.[0]?.caption ?? "a screen from the product"}`}
          fill
          sizes="(max-width: 900px) 100vw, 640px"
          className="object-cover object-left-top transition-transform duration-700 ease-[var(--ease-house)] group-hover:scale-[1.03]"
          priority={priority}
        />
        <Badges product={product} />
      </div>
    );
  }

  const { star, field, spokes, magnitude, bearing } = buildPlate(product);

  return (
    <div
      className={`plate relative aspect-[4/3] overflow-hidden rounded-panel bg-night text-on-night ${className}`}
      role="img"
      aria-label={`${product.name}: a star plate placing it at bearing ${bearing} degrees`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g fill="none" stroke="var(--on-night-12)" strokeWidth="1">
          {[1 / 3, 2 / 3, 1].map((k) => (
            <circle key={k} cx={CX} cy={CY} r={R * k} />
          ))}
          {spokes.map((s, i) => (
            <line key={i} x1={s.from.x} y1={s.from.y} x2={s.to.x} y2={s.to.y} />
          ))}
        </g>

        {field.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--on-night)"
            opacity={s.o}
          />
        ))}

        <line
          x1={CX}
          y1={CY}
          x2={star.x}
          y2={star.y}
          stroke="var(--accent-night)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <circle
          cx={star.x}
          cy={star.y}
          r={starRadius[magnitude] + 5}
          fill="none"
          stroke="var(--accent-night)"
          strokeWidth="1"
        />
        {/* Answers a hover on the card: a ring leaves the star and fades. */}
        <circle
          cx={star.x}
          cy={star.y}
          r={starRadius[magnitude] + 5}
          fill="none"
          stroke="var(--accent-night)"
          strokeWidth="1"
          className="plate-ping"
        />
        <circle
          cx={star.x}
          cy={star.y}
          r={starRadius[magnitude]}
          fill="var(--accent-night)"
        />

        <g
          transform={`translate(${CX} ${CY}) scale(0.5) translate(-24 -24)`}
          fill="var(--on-night)"
        >
          <circle cx="17" cy="14" r="2.4" />
          <circle cx="31" cy="24" r="4.6" />
          <circle cx="20" cy="33" r="1.5" />
        </g>
      </svg>

      <Badges product={product} />

      <div className="absolute inset-x-4 bottom-3 flex items-baseline justify-between text-coord text-on-night-60">
        <span>{categoryLabel[product.category]}</span>
        <span>Bearing {String(bearing).padStart(3, "0")}°</span>
      </div>
    </div>
  );
}
