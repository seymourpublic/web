"use client";

import { useState } from "react";

/**
 * Accordion between hairlines. One open at a time. The answer opens by
 * animating its row height; the plus turns into a minus by rotating a bar,
 * so the control shows the change it makes.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;
        return (
          <div key={item.q} className="border-t border-ink-12 last:border-b">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-button`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-6 text-left text-h4 text-ink-100"
              >
                <span className="transition-colors duration-200 group-hover:text-accent">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-ink-60"
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-button`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-house)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="m-0 max-w-[640px] pb-7 text-p1 text-ink-60">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
