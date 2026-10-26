"use client";

import { useEffect, useRef, useState } from "react";

type RevealType = "fade" | "wipe" | "rule" | "grow";

/**
 * Marks an element to be revealed once, the first time it scrolls into view.
 * The visual is chosen by `type`, and lives in globals.css:
 *   fade  opacity only
 *   wipe  clipped open from the top, for plates and images
 *   rule  a hairline drawn from the left
 *   grow  a vertical line drawn downward
 * Descendants can also key off `[data-in="true"]` (counts, constellations).
 * `data-in` starts false on the server; a <noscript> rule in the layout shows
 * everything when scripts are off.
 */
export function Reveal({
  type = "fade",
  delay = 0,
  className = "",
  children,
}: {
  type?: RevealType;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={type}
      data-in={shown ? "true" : "false"}
      style={{ "--rd": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
