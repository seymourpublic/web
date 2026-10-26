import Link from "next/link";
import { ArrowRight } from "@/components/arrow";
import { ContactPanel } from "@/components/contact-panel";
import { Faq } from "@/components/faq";
import { NamePanel } from "@/components/name-panel";
import { NavBar } from "@/components/nav-bar";
import { ProductPlate } from "@/components/product-plate";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SpacesSection } from "@/components/spaces-section";
import { StarChart } from "@/components/star-chart";
import { StatStrip } from "@/components/stat-strip";
import {
  faqs,
  liveFirst,
  missionTabs,
  principles,
  productSlug,
  products,
} from "@/lib/content";

const headline = ["Software that", "gives people", "better direction."];

/** The home grid shows a few, live work first; the products page lists them all. */
const FEATURED = 6;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page text-ink-100">
      <NavBar />

      {/* Header band: the portfolio as a star chart ------------------ */}
      <section className="on-night band-grid bg-night text-on-night">
        <div className="mx-auto max-w-page px-4 pt-12 pb-28 sm:px-6 sm:pt-16 sm:pb-32 lg:pt-14">
          <StarChart>
            <div>
              <h1 className="m-0 mb-6 text-display">
                {headline.map((line, i) => (
                  <span key={line} className="mask-line">
                    <span
                      style={{ "--ld": `${0.25 + i * 0.12}s` } as React.CSSProperties}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              <div
                className="after-headline"
                style={{ "--ld": "0.75s" } as React.CSSProperties}
              >
                <p className="m-0 mb-8 max-w-[440px] text-p1 text-on-night-60">
                  Northstar is an independent studio. We build and run a
                  growing portfolio of products and projects, and follow each
                  one further than most companies bother to.
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-2 rounded-nested bg-on-night px-5 py-3.5 text-cta text-night no-underline transition-colors duration-200 hover:bg-accent-night"
                  >
                    See the work
                    <ArrowRight size={15} strokeWidth={1.8} className="nudge" />
                  </Link>
                  <Link href="/company" className="link text-cta text-on-night">
                    How we work
                  </Link>
                </div>
              </div>
            </div>
          </StarChart>
        </div>
      </section>

      {/* Numbers, overlapping the band's lower edge ---------------- */}
      <div className="relative z-10 mx-auto -mt-12 max-w-page px-4 sm:px-6">
        <StatStrip />
      </div>

      {/* Approach -------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-32">
        <Reveal type="rule" className="mb-10 h-px bg-ink-100" />
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-8">
          <Reveal>
            <h2 className="m-0 pt-2 text-h4">Our approach</h2>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="m-0 mb-12 max-w-[860px] text-h1">
                {missionTabs[0].statement}
              </p>
            </Reveal>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {[
                { title: missionTabs[1].label, body: missionTabs[1].statement },
                { title: principles[1].title, body: principles[1].body },
              ].map((item, i) => (
                <Reveal key={item.title} delay={200 + i * 120}>
                  <h3 className="m-0 mb-3 text-h3">{item.title}</h3>
                  <p className="m-0 max-w-[420px] text-p1 text-ink-60">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work ----------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-36">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <Reveal>
            <h2 className="m-0 mb-4 max-w-[520px] text-h1">
              Work built for problems worth solving
            </h2>
            <p className="m-0 max-w-[460px] text-p1 text-ink-60">
              Everything we build has its own star on the chart, and the chart
              grows as the portfolio does. Open one to see what it does and
              who it is for.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-nested border border-ink-12 px-4 py-2.5 text-cta text-ink-100 no-underline transition-colors duration-200 hover:border-ink-100 hover:bg-ink-100 hover:text-page"
            >
              {products.length > FEATURED
                ? `All ${products.length} pieces of work`
                : "All work"}
              <ArrowRight size={14} strokeWidth={1.8} className="nudge" />
            </Link>
          </Reveal>
        </div>

        <ul className="m-0 grid list-none gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {liveFirst.slice(0, FEATURED).map((p, i) => (
            <li key={p.name}>
              <Link
                href={`/work#${productSlug(p)}`}
                className="group block text-ink-100 no-underline"
              >
                <Reveal type="wipe" delay={(i % 3) * 110}>
                  <ProductPlate product={p} className="mb-5" />
                </Reveal>
                <Reveal delay={(i % 3) * 110 + 250}>
                  <h3 className="m-0 mb-2 text-h3 transition-colors duration-200 group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="m-0 mb-4 max-w-[360px] text-p2 text-ink-60">
                    {p.tagline}
                  </p>
                  <span className="link text-p2 text-ink-100">View product</span>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Problem spaces ------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-36">
        <SpacesSection />
      </section>

      {/* The name -------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-36">
        <NamePanel />
      </section>

      {/* Questions ------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 className="m-0 pt-1 text-h4">Questions we get asked</h2>
          </Reveal>
          <Reveal delay={100} className="max-w-[820px]">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Contact --------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-20 sm:px-6 lg:pt-28">
        <ContactPanel />
      </section>

      <SiteFooter />
    </div>
  );
}
