/**
 * All site copy in one place. Swap the `image` fields as real photography
 * arrives.
 *
 * Growing the portfolio
 * ---------------------
 * - New product or project: add one object to `products` with a `category`
 *   that matches a problem space below. The home chart, the product plates,
 *   the problem-space cells, the constellations and the products page all
 *   pick it up and place it automatically. `chart` is only an optional
 *   override for hand-placing a star.
 * - New problem space: add one object to `productGroups` with a `key`, a
 *   `label`, a `blurb` and a `sector`, the arc of bearings (degrees clockwise
 *   from north) its stars are spread across on the chart. Keep sectors from
 *   overlapping so spaces stay readable as separate regions.
 */

/** The problem spaces. Order sets the order on every page. */
export const productGroups = [
  {
    label: "Consumer",
    key: "CONSUMER" as const,
    blurb: "Everyday tools for documents, files, housing and discovery.",
    sector: [200, 330] as [number, number],
  },
  {
    label: "Professional",
    key: "PROFESSIONAL" as const,
    blurb: "Infrastructure for careers, talent and professional opportunity.",
    sector: [20, 100] as [number, number],
  },
  {
    label: "Infrastructure",
    key: "INFRASTRUCTURE" as const,
    blurb: "Trust, verification and identity, built in.",
    sector: [110, 180] as [number, number],
  },
];

export type SpaceKey = (typeof productGroups)[number]["key"];

export type Product = {
  name: string;
  category: SpaceKey;
  /** A product is Northstar's own; a project is built for a client. */
  kind: "product" | "project";
  /** The client, for a project. */
  client?: string;
  tagline: string;
  description: string;
  slot: string;
  /** A single cover screenshot in /public. Used instead of `screens[0]` when set. */
  image?: string;
  /** Screens of the real thing, in /public: the first is the cover on cards and
   *  the rest fill the gallery on the Work page. Leave out and the card falls
   *  back to the generated star plate. */
  screens?: { src: string; caption: string }[];
  /** How the screens were captured, shown under the gallery. */
  screensNote?: string;
  /** A short status tag on the plate, e.g. "Prototype". A live site adds "Live". */
  badge?: string;
  /** The live site, when there is one. */
  url?: string;
  /** A download for the product: shown as a button on the Work page. */
  download?: { label: string; href: string; note: string };
  /** Source code, when the product is open source. */
  source?: string;
  /** Logo file in /public (SVG or PNG), shown on the plate when set. */
  logo?: string;
  /** Optional hand placement on the star chart: bearing in degrees clockwise
   *  from north, distance from the pole (0–1) and brightness (1–3). Leave it
   *  out and the product is placed automatically inside its space's sector. */
  chart?: { bearing: number; distance: number; magnitude: 1 | 2 | 3 };
};

export const products: Product[] = [
  {
    name: "FOLIO",
    category: "CONSUMER",
    kind: "product",
    tagline: "The modern document workspace.",
    description:
      "A free, open-source desktop app for working with PDFs: read, edit text and images, fill forms, annotate, organize pages, redact, run OCR and sign with certificates, without the weight of legacy PDF software. Everything runs on your own machine, with no account and no uploads.",
    download: {
      label: "Download Folio for Windows",
      href: "https://github.com/seymourpublic/Folio/releases/latest/download/Folio-Setup.exe",
      note: "Version 0.1.0, 198 MB, free. Windows 10 or later, 64-bit. The installer is not yet code-signed, so Windows may ask you to confirm.",
    },
    source: "https://github.com/seymourpublic/Folio",
    slot: "Product visual — FOLIO",
    logo: "/brand/folio.png",
    screens: [
      { src: "/work/folio/01-workspace.jpg", caption: "A document open, with page thumbnails and every view tool at hand." },
      { src: "/work/folio/02-annotate.jpg", caption: "Annotation tools in one toolbar." },
      { src: "/work/folio/03-organize.jpg", caption: "Reorder, rotate, extract and delete pages." },
      { src: "/work/folio/04-command-palette.jpg", caption: "Every action, one keystroke away in the command palette." },
      { src: "/work/folio/05-dark.jpg", caption: "The same workspace in dark." },
    ],
    screensNote: "Captured from the app with a sample document.",
  },
  {
    name: "Scroll",
    category: "CONSUMER",
    kind: "product",
    tagline: "Your files, organized like thought.",
    description:
      "A Windows file manager with tabs, two panes and light and dark themes.",
    slot: "Product visual — Scroll",
    logo: "/brand/scroll.png",
    screens: [
      { src: "/work/scroll/01-folder.jpg", caption: "A folder in a clean, tabbed window." },
      { src: "/work/scroll/02-dual-pane.jpg", caption: "Two panes side by side, for moving things between folders." },
    ],
    screensNote: "Captured from the app with a demo folder.",
  },
  {
    name: "HabitatIQ",
    category: "CONSUMER",
    kind: "product",
    tagline: "Know what a place is like before you sign for it.",
    description:
      "Six honest signals on every home and suburb, reported by the people who actually live there. No listing copy, no agent gloss.",
    slot: "Product visual — HabitatIQ",
    url: "https://habitatiq.co.za",
    screens: [
      { src: "/work/habitatiq/01-home.jpg", caption: "Search any suburb, city or address." },
      { src: "/work/habitatiq/02-explore.jpg", caption: "Explore homes and filter by the signals that matter to you." },
      { src: "/work/habitatiq/03-property.jpg", caption: "A home's score, and how it was reached." },
      { src: "/work/habitatiq/04-map.jpg", caption: "A live map of scored suburbs." },
      { src: "/work/habitatiq/05-methodology.jpg", caption: "How the score is built, with the weights published." },
    ],
    screensNote: "Captured from the live site.",
  },
  {
    name: "Snag",
    category: "CONSUMER",
    kind: "product",
    tagline: "Describe what you need. Fund it. The crowd does the rest.",
    description:
      "A funded-escrow bounty marketplace. Post a task, fund the reward, and a crowd of hunters submits work to claim it.",
    slot: "Product visual — Snag",
    screens: [
      { src: "/work/snag/01-feed.jpg", caption: "The bounty feed, filtered by category and reward." },
      { src: "/work/snag/02-bounty.jpg", caption: "A bounty with its brief, requirements and submissions." },
      { src: "/work/snag/03-post.jpg", caption: "Posting and funding a bounty." },
      { src: "/work/snag/04-profile.jpg", caption: "A hunter's profile, with XP and badges." },
    ],
    screensNote: "Captured from a local build with sample data.",
  },
  {
    name: "Latch",
    category: "PROFESSIONAL",
    kind: "product",
    tagline: "The gap after graduation is a network gap.",
    description:
      "Mentorship for CS and IT graduates in South Africa. Latch matches each graduate with an engineer five to ten years ahead of them, and shows how every match was scored.",
    slot: "Product visual — Latch",
    screens: [
      { src: "/work/latch/01-landing.jpg", caption: "The landing page, for graduates and mentors." },
      { src: "/work/latch/02-home.jpg", caption: "A graduate's home, with mentors ranked against their profile." },
      { src: "/work/latch/03-matching.jpg", caption: "Every match score, factor by factor." },
      { src: "/work/latch/04-messages.jpg", caption: "Messaging between a graduate and a mentor." },
      { src: "/work/latch/05-jobs.jpg", caption: "A job board with skill-matched roles." },
    ],
    screensNote: "Captured from a local build with sample data.",
  },
  {
    name: "Verity",
    category: "INFRASTRUCTURE",
    kind: "product",
    tagline: "Before you trust it, check it.",
    description:
      "Look up any website, phone number, email or business against South Africa's shared scam intelligence, and see the evidence behind the risk.",
    slot: "Product visual — Verity",
    badge: "Prototype",
    screens: [
      { src: "/work/verity/01-home.jpg", caption: "Check a website, number, email or business." },
      { src: "/work/verity/02-report.jpg", caption: "A report that shows the evidence behind the risk." },
      { src: "/work/verity/03-scan.jpg", caption: "A pasted message, annotated for scam tactics." },
      { src: "/work/verity/04-database.jpg", caption: "A searchable database of reported scams." },
      { src: "/work/verity/05-alerts.jpg", caption: "Live alerts on active campaigns." },
    ],
    screensNote: "Prototype screens, shown with fictional sample data.",
  },
  {
    name: "All Grace Properties",
    category: "CONSUMER",
    kind: "project",
    client: "All Grace Properties",
    tagline: "More than property. It's possibility.",
    description:
      "A residential property agency serving the Vaal. Buy, rent, invest or list, with personal service from first viewing to final signature.",
    slot: "Project visual — All Grace Properties",
    url: "https://allgraceproperties.co.za",
    logo: "/brand/all-grace-properties.png",
    screens: [
      { src: "/work/all-grace-properties/01-home.jpg", caption: "A new home for a Vaal property agency." },
      { src: "/work/all-grace-properties/02-services.jpg", caption: "Buying, renting, selling and investing in one place." },
      { src: "/work/all-grace-properties/03-bond-calculator.jpg", caption: "A bond calculator for repayments and affordability." },
      { src: "/work/all-grace-properties/04-area-guide.jpg", caption: "Guides to the areas the agency serves." },
      { src: "/work/all-grace-properties/05-market-estimate.jpg", caption: "A free market estimate request." },
    ],
    screensNote: "Captured from the live site.",
  },
];

/**
 * Products with a live site first, otherwise in listed order. Used wherever
 * the site shows a selection or a sequence (the home hero and grid), so real,
 * visitable work leads.
 */
export const liveFirst: Product[] = [...products].sort(
  (a, b) => Number(Boolean(b.url)) - Number(Boolean(a.url)),
);

/** URL fragment for a product, e.g. /work#all-grace-properties. */
export const productSlug = (p: Pick<Product, "name">) =>
  p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A live site's address as it reads on screen: no scheme, no trailing slash. */
export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Category values are grouping keys; this is how they read on screen. */
export const categoryLabel = Object.fromEntries(
  productGroups.map((g) => [g.key, g.label]),
) as Record<SpaceKey, string>;

export const pillars = [
  { num: "01", title: "We build products, not services." },
  { num: "02", title: "Each solves a real, identifiable problem." },
  { num: "03", title: "Built with technical rigor and patience." },
];

export const missionTabs = [
  {
    label: "Our approach",
    statement:
      "We don't chase every direction. We choose where to work, then follow each product further than most companies bother to.",
  },
  {
    label: "How we build",
    statement:
      "Small teams own a product or project end to end. No handoffs, no diffusion of responsibility.",
  },
  {
    label: "Why it matters",
    statement:
      "A north star doesn't move the traveler — it gives them a fixed point to move relative to. That's the job.",
  },
];

export const principles = [
  {
    num: "01",
    title: "Small teams, full ownership.",
    body: "Each product is built by a small group that owns it end to end — no handoffs, no diffusion of responsibility.",
  },
  {
    num: "02",
    title: "We choose the problem first.",
    body: "We don't start with a technology looking for a use. We start with something broken and work backward.",
  },
  {
    num: "03",
    title: "Depth in every product.",
    body: "Each product is built over years and given the time it needs, rather than one idea multiplied many ways.",
  },
  {
    num: "04",
    title: "Independent by design.",
    body: "Our products answer to the people who use them, not to a client roadmap. Projects we build for others get the same care.",
  },
];

/**
 * Launches and updates for the Press page, newest first. `when` is optional:
 * leave it out until a date is confirmed rather than guessing one. `href` is
 * the live thing.
 */
export const pressItems: {
  kind: "Launch" | "Update";
  when?: string;
  title: string;
  summary: string;
  href?: string;
}[] = [
  {
    kind: "Launch",
    title: "All Grace Properties is live",
    summary:
      "A new website for the Vaal property agency, built by Northstar: listings, rentals, investment tools and a way to list a property.",
    href: "https://allgraceproperties.co.za",
  },
  {
    kind: "Launch",
    title: "HabitatIQ is live",
    summary:
      "Rental homes and suburbs across South Africa, scored on six signals and reported by the people who live there.",
    href: "https://habitatiq.co.za",
  },
];

export const contactRows = [
  { label: "General", value: "hello@northstartechnology.co.za" },
  { label: "Press", value: "press@northstartechnology.co.za" },
  { label: "Careers", value: "careers@northstartechnology.co.za" },
];

export const faqs = [
  {
    q: "Does Northstar take client work?",
    a: "Yes, alongside our own products. Products start from problems we chose to take seriously ourselves. Projects, like the All Grace Properties website, are built for clients who bring theirs. Write to hello@northstartechnology.co.za to talk about one.",
  },
  {
    q: "What does Northstar build?",
    a: "A growing portfolio of products and projects, organised across the problem spaces we return to deliberately: consumer, professional, and infrastructure. Each is built over years rather than one idea multiplied many ways.",
  },
  {
    q: "How are your teams organised?",
    a: "Each product or project is built by a small group that owns it end to end — no handoffs, no diffusion of responsibility.",
  },
  {
    q: "How do I reach the right person?",
    a: "General enquiries go to hello@northstartechnology.co.za, press to press@northstartechnology.co.za, and careers to careers@northstartechnology.co.za.",
  },
];
