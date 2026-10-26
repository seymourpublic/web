import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { NavBar } from "@/components/nav-bar";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Northstar Technology — general, press, and careers enquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-ink-100">
      <NavBar />

      <PageHero
        title="Write to the address that fits."
        intro="General questions, press, and careers each have their own inbox."
      />

      <section className="mx-auto w-full max-w-page flex-1 px-4 pt-14 sm:px-6 lg:pt-20">
        <ContactPanel />
      </section>

      <SiteFooter />
    </div>
  );
}
