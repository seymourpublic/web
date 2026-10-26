import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { Faq } from "@/components/faq";
import { ImageSlot } from "@/components/image-slot";
import { NamePanel } from "@/components/name-panel";
import { NavBar } from "@/components/nav-bar";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SpacesSection } from "@/components/spaces-section";
import { faqs, principles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description:
    "An independent studio that builds and runs its own products, and builds projects for clients, for problems worth solving.",
};

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-page text-ink-100">
      <NavBar />

      <PageHero
        title="An independent studio that builds and runs products for problems worth solving."
        intro={
          <p className="m-0">
            Northstar Technology builds and runs software, and the portfolio
            keeps growing. Our products start from problems we chose to take
            seriously ourselves. Our projects are built for clients who bring
            theirs, and get the same care.
          </p>
        }
      />

      {/* How we work ---------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-20 sm:px-6 lg:pt-28">
        <Reveal type="rule" className="mb-8 h-px bg-ink-100" />
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 className="m-0 text-h4">How we work</h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 120 + Math.floor(i / 2) * 160}>
                <h3 className="m-0 mb-3 text-h3">{p.title}</h3>
                <p className="m-0 max-w-[440px] text-p1 text-ink-60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 pt-20 sm:px-6 lg:pt-28">
        <Reveal type="wipe">
          <ImageSlot
            label="Team or workspace photo"
            radius="card"
            style={{ aspectRatio: "16 / 7" }}
          />
        </Reveal>
      </section>

      {/* Problem spaces ------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-32">
        <SpacesSection />
      </section>

      {/* The name ------------------------------------------------- */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-32">
        <NamePanel />
      </section>

      {/* Questions ------------------------------------------------ */}
      <section className="mx-auto max-w-page px-4 pt-24 sm:px-6 lg:pt-32">
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <Reveal>
            <h2 className="m-0 pt-1 text-h4">Questions we get asked</h2>
          </Reveal>
          <Reveal delay={100} className="max-w-[820px]">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 pt-20 sm:px-6 lg:pt-28">
        <ContactPanel />
      </section>

      <SiteFooter />
    </div>
  );
}
