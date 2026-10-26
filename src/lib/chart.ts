import {
  productGroups,
  products,
  type Product,
  type SpaceKey,
} from "@/lib/content";

/**
 * Shared star-chart geometry. Used by the home chart, the problem-space cells
 * and the product plates, so a product sits at the same bearing and distance
 * everywhere it appears.
 */

/** Rounded so server and browser trig agree to the attribute and hydrate cleanly. */
export const fix = (n: number) => Math.round(n * 1000) / 1000;

/** Point at a bearing (degrees clockwise from north) and radius from a centre. */
export function polar(bearing: number, r: number, cx = 50, cy = 50) {
  const a = (bearing * Math.PI) / 180;
  return { x: fix(cx + r * Math.sin(a)), y: fix(cy - r * Math.cos(a)) };
}

/** Small seeded generator so scattered stars never shift between renders. */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function hashString(text: string) {
  let h = 7;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

export type Placement = {
  bearing: number;
  distance: number;
  magnitude: 1 | 2 | 3;
};

/**
 * Every product's place on the chart. Products are spread evenly across their
 * space's sector, in the order they appear in `products`, at staggered
 * distances so neighbours never stack. Brightness is a stable pick from the
 * name. A product's own `chart` field wins when it is set.
 */
const placements = new Map<string, Placement>();

for (const group of productGroups) {
  const [from, to] = group.sector;
  const members = products.filter((p) => p.category === group.key);
  members.forEach((p, i) => {
    // A sector may cross north (for example 340 to 380), so wrap into 0–359.
    const raw = Math.round(from + ((i + 0.5) * (to - from)) / members.length);
    const bearing = ((raw % 360) + 360) % 360;
    const distance = fix(0.45 + ((i * 0.23) % 0.37));
    const magnitude = (1 + (hashString(p.name) % 3)) as 1 | 2 | 3;
    placements.set(p.name, p.chart ?? { bearing, distance, magnitude });
  });
}

export function placement(product: Pick<Product, "name">): Placement {
  const found = placements.get(product.name);
  if (!found) throw new Error(`No chart placement for product "${product.name}"`);
  return found;
}

/**
 * The lines of a space's constellation: its products joined in order of
 * bearing, so the shape follows the sky rather than the list. A space with a
 * single product has no lines.
 */
export function constellation(space: SpaceKey): [string, string][] {
  const members = products
    .filter((p) => p.category === space)
    .sort((a, b) => placement(a).bearing - placement(b).bearing);
  return members.slice(1).map((p, i) => [members[i].name, p.name]);
}
