"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Anything that does something when pressed. */
const INTERACTIVE = "a, button, summary, label, [role='button']";

/**
 * The site's cursor: a small dot that sits exactly on the pointer and a ring
 * that trails it, swelling over anything clickable. The colour follows what
 * is underneath (light on the navy bands, navy on paper). It only exists for a
 * fine pointer such as a mouse or trackpad; touch devices and anyone without
 * JavaScript keep the normal cursor, and reduced motion removes the trailing.
 */
export function CustomCursor() {
  const enabled = useMedia(FINE_POINTER);
  const reduced = useMedia(REDUCED);
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!enabled || !host || !dotEl || !ringEl) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");

    const ease = reduced ? 1 : 0.17;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;
    let placed = false;

    const draw = () => {
      rx += (x - rx) * ease;
      ry += (y - ry) * ease;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Keep going until the ring has caught the pointer, then rest.
      frame =
        Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1
          ? requestAnimationFrame(draw)
          : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      if (!placed) {
        // First sighting: appear where the pointer is, not sliding in from a corner.
        placed = true;
        rx = x;
        ry = y;
      }
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      host.dataset.visible = "true";

      const target = event.target instanceof Element ? event.target : null;
      host.dataset.hover = target?.closest(INTERACTIVE) ? "true" : "false";
      host.dataset.tone = target?.closest(".on-night") ? "night" : "paper";

      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onDown = () => {
      host.dataset.down = "true";
    };
    const onUp = () => {
      host.dataset.down = "false";
    };
    const onLeave = () => {
      host.dataset.visible = "false";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    html.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      html.removeEventListener("mouseleave", onLeave);
      html.classList.remove("has-cursor");
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="cursor"
      data-visible="false"
      data-hover="false"
      data-tone="paper"
      data-down="false"
    >
      <div ref={ring} className="cursor-ring">
        <i />
      </div>
      <div ref={dot} className="cursor-dot">
        <i />
      </div>
    </div>
  );
}
