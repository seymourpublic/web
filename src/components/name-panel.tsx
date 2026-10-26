import Link from "next/link";
import { Reveal } from "@/components/reveal";

/**
 * Dark statement panel: the name explained. The second sentence is set in a
 * quieter blue, the way the reference lets a headline trail off. A rule draws
 * across the top as it arrives.
 */
export function NamePanel() {
  return (
    <div className="on-night rounded-card bg-night px-6 py-12 text-on-night sm:px-12 sm:py-16">
      <Reveal
        type="rule"
        className="mb-10 h-px bg-on-night-12 sm:mb-14"
      />
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-8">
        <Reveal>
          <p className="m-0 pt-2 text-p2 text-on-night-60">Why the name</p>
        </Reveal>
        <div>
          <Reveal delay={100}>
            <p className="m-0 mb-8 max-w-[860px] text-h1">
              A north star doesn&rsquo;t move the traveller.{" "}
              <span className="text-accent-night">
                It gives them a fixed point to move relative to.
              </span>
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="m-0 mb-8 max-w-[560px] text-p1 text-on-night-60">
              That is what we try to build: software that gives people better
              direction, in places where direction is usually missing. Small
              teams own each product end to end.
            </p>
            <Link href="/company" className="link text-cta text-on-night">
              More about the studio
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
