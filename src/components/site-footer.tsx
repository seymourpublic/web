import Link from "next/link";
import { StarMark } from "@/components/star-mark";
import { productGroups } from "@/lib/content";

const columns = [
  {
    title: "Studio",
    links: [
      { label: "Company", href: "/company" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    // Linked by problem space, so the column stays short as work is added.
    title: "Work",
    links: productGroups.map((g) => ({
      label: g.label,
      href: `/work#${g.label.toLowerCase()}`,
    })),
  },
];

/** A deep navy panel on the paper, as the reference closes its pages. */
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-page px-4 pt-24 pb-6 sm:px-6 lg:pt-36">
      <div className="on-night rounded-card bg-night-deep px-6 py-10 text-on-night sm:px-12 sm:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <StarMark size={30} ring={false} className="text-accent-night" />
              <span className="text-h4">Northstar Technology</span>
            </div>
            <p className="m-0 mb-8 max-w-[400px] text-p1 text-on-night-60">
              An independent product studio. Software for problems worth
              solving carefully, then we get out of the way.
            </p>
            <a
              href="mailto:hello@northstar.tech"
              className="inline-block rounded-nested bg-on-night px-5 py-3 text-cta text-night no-underline transition-colors duration-200 hover:bg-accent-night"
            >
              hello@northstar.tech
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="m-0 mb-4 text-p2 text-on-night-60">
                  {col.title}
                </h2>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {col.links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="link text-p2 text-on-night">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-on-night-12 pt-6 text-caption text-on-night-60">
          <span>
            © {new Date().getFullYear()} Northstar Technology (Pty) Ltd
          </span>
          <span>Better direction.</span>
        </div>
      </div>
    </footer>
  );
}
