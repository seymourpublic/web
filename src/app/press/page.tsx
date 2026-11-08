import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { displayUrl, pressItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Launches and updates from Northstar Technology. Press inquiries: press@northstartechnology.co.za",
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-page text-ink-100">
      <NavBar />

      <PageHero
        title="Press and launches"
        intro={
          <p className="m-0">
            What has gone live and what is changing. For press inquiries, media
            kits or interviews, write to{" "}
            <a href="mailto:press@northstartechnology.co.za" className="link text-accent-night">
              press@northstartechnology.co.za
            </a>
            .
          </p>
        }
      />

      <section className="mx-auto max-w-page px-4 pt-14 sm:px-6 lg:pt-20">
        <Reveal type="rule" className="h-px bg-ink-100" />
        <ul className="m-0 list-none p-0">
          {pressItems.map((item, i) => (
            <li key={item.title} className="border-b border-ink-12">
              <Reveal
                delay={i * 90}
                className="grid gap-3 py-8 sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[220px_1fr_auto]"
              >
                <div>
                  <p className="m-0 text-p2 text-ink-100">{item.kind}</p>
                  {item.when && (
                    <p className="m-0 text-coord text-ink-60">{item.when}</p>
                  )}
                </div>
                <div>
                  <h2 className="m-0 mb-2 text-h3">{item.title}</h2>
                  <p className="m-0 max-w-[560px] text-p1 text-ink-60">
                    {item.summary}
                  </p>
                </div>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link self-start text-p2 text-ink-100 sm:col-start-2 lg:col-start-3"
                  >
                    {displayUrl(item.href)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
