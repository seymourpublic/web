"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/arrow";
import { StarMark } from "@/components/star-mark";

const links = [
  { label: "Work", href: "/work" },
  { label: "Company", href: "/company" },
  { label: "Press", href: "/press" },
];

/**
 * Sticky navy bar that continues straight into each page's header band, so
 * the top of every page reads as one block. Logo left, links in a quiet pill
 * in the middle, contact right.
 */
export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="on-night sticky top-0 z-50 border-b border-on-night-12 bg-night px-4 text-on-night sm:px-6">
      {/* A bearing line along the bar's lower edge, drawn as the page scrolls. */}
      <span aria-hidden="true" className="scroll-bearing" />
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-page grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]"
      >
        <Link
          href="/"
          aria-label="Northstar Technology, home"
          className="flex items-center gap-2 justify-self-start text-on-night no-underline"
        >
          <StarMark size={30} ring={false} className="text-accent-night" />
          <span className="text-h4">Northstar</span>
        </Link>

        <ul className="m-0 hidden list-none items-center gap-1 rounded-full border border-on-night-12 bg-on-night-6 p-1 md:flex">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-p2 no-underline transition-colors duration-200 ${
                  isActive(href)
                    ? "bg-on-night-12 text-on-night"
                    : "text-on-night-60 hover:text-on-night"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="hidden rounded-nested bg-on-night px-4 py-2.5 text-cta text-night no-underline transition-colors duration-200 hover:bg-accent-night sm:block"
          >
            Contact
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-nested border border-on-night-12 bg-transparent text-on-night md:hidden"
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="m-0 mx-auto max-w-page list-none border-t border-on-night-12 p-0 pb-4 md:hidden"
        >
          {[...links, { label: "Contact", href: "/contact" }].map(
            ({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`block border-b border-on-night-12 py-4 text-h3 no-underline ${
                    isActive(href) ? "text-accent-night" : "text-on-night"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </header>
  );
}
