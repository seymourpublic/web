"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Screen = { src: string; caption: string };

/**
 * A project's screens: a row of thumbnails you can scroll sideways, and a
 * lightbox that opens on any of them. The lightbox is a fixed layer rather than
 * a native <dialog>, so the site's own cursor stays above it. It locks page
 * scroll, keeps focus inside, closes on Escape or a click outside, and walks
 * through the screens with the arrow keys.
 */
export function ScreenGallery({
  name,
  screens,
  note,
}: {
  name: string;
  screens: Screen[];
  note?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  const count = screens.length;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (by: number) =>
      setOpen((i) => (i === null ? i : (i + by + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const previouslyFocused = opener.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "Tab" && layer.current) {
        // Keep Tab inside the lightbox.
        const items = layer.current.querySelectorAll<HTMLElement>("button");
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, close, step]);

  const current = open === null ? null : screens[open];

  return (
    <div>
      <ul
        className="m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto p-0 pb-3"
        aria-label={`Screens from ${name}`}
      >
        {screens.map((s, i) => (
          <li key={s.src} className="w-[78%] shrink-0 snap-start sm:w-[300px]">
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpen(i);
              }}
              className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-panel border border-ink-12 bg-well">
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 78vw, 300px"
                  className="object-cover object-top transition-transform duration-700 ease-[var(--ease-house)] group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-2 block text-caption text-ink-60 transition-colors duration-200 group-hover:text-ink-100">
                <span className="sr-only">View larger: </span>
                {s.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {note && <p className="m-0 mt-1 text-caption text-ink-60">{note}</p>}

      {current && open !== null && (
        <div
          ref={layer}
          role="dialog"
          aria-modal="true"
          aria-label={`${name}: screen ${open + 1} of ${count}`}
          className="gallery-layer on-night"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="gallery-stage">
            <div className="mb-3 flex items-center justify-between gap-4 text-on-night">
              <p className="m-0 text-p2">
                <span className="text-h4">{name}</span>
                <span className="ml-3 text-coord text-on-night-60">
                  {open + 1} of {count}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="cursor-pointer rounded-nested border border-on-night-12 bg-transparent px-3 py-1.5 text-p2 text-on-night transition-colors duration-200 hover:bg-on-night-12"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel bg-night-deep">
              <Image
                key={current.src}
                src={current.src}
                alt={current.caption}
                fill
                sizes="(max-width: 1100px) 96vw, 1100px"
                className="swap object-contain"
                priority
              />
            </div>

            <div className="mt-3 flex items-start justify-between gap-6 text-on-night">
              <p className="m-0 max-w-[620px] text-p2 text-on-night-60">
                {current.caption}
              </p>
              {count > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="cursor-pointer rounded-nested border border-on-night-12 bg-transparent px-3 py-1.5 text-p2 text-on-night transition-colors duration-200 hover:bg-on-night-12"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="cursor-pointer rounded-nested border border-on-night-12 bg-transparent px-3 py-1.5 text-p2 text-on-night transition-colors duration-200 hover:bg-on-night-12"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
