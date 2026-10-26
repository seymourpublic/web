import { Reveal } from "@/components/reveal";
import { contactRows } from "@/lib/content";

/**
 * Contact block after the reference: a steel card that stands proud of the
 * navy panel behind it (top and bottom, from the large breakpoint up), listing
 * where to write, beside a short invitation.
 */
export function ContactPanel() {
  return (
    <div className="relative grid lg:grid-cols-[minmax(0,440px)_1fr] lg:py-8">
      {/* Inset by the wrapper's padding plus 2rem, so the steel card stands
          2rem proud of the navy at both ends. */}
      <div
        aria-hidden="true"
        className="on-night absolute inset-x-0 top-16 bottom-16 hidden rounded-card bg-night lg:block"
      />

      <Reveal
        type="fade"
        className="relative rounded-t-card bg-steel p-8 text-on-steel sm:p-10 lg:rounded-card"
      >
        <h2 className="m-0 mb-8 text-h2">Contact</h2>
        <dl className="m-0">
          {contactRows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-t border-on-steel-24 py-4 first:border-t-0 first:pt-0"
            >
              <dt className="text-p2">{row.label}</dt>
              <dd className="m-0">
                <a
                  href={`mailto:${row.value}`}
                  className="link text-h4 break-all text-on-steel"
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal
        delay={140}
        className="on-night relative flex flex-col justify-center gap-6 rounded-b-card bg-night p-8 text-on-night sm:p-12 lg:rounded-none lg:bg-transparent lg:p-16"
      >
        <h2 className="m-0 max-w-[480px] text-h1">Write to the studio.</h2>
        <p className="m-0 max-w-[460px] text-p1 text-on-night-60">
          Tell us what you are working on, or which product caught your eye.
        </p>
        <div>
          <a
            href="mailto:hello@northstar.tech"
            className="inline-block rounded-nested bg-on-night px-5 py-3 text-cta text-night no-underline transition-colors duration-200 hover:bg-accent-night"
          >
            Send a message
          </a>
        </div>
      </Reveal>
    </div>
  );
}
