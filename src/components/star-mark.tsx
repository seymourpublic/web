/**
 * The Northstar mark: three solid circles of unequal radius (4.6 / 2.4 / 1.5 in
 * a 48x48 viewBox) placed on a diagonal, optionally held inside a thin orbit
 * ring. Deliberately not a five-pointed star.
 */
type StarMarkProps = {
  size?: number;
  color?: string;
  ring?: boolean;
  className?: string;
};

export function StarMark({
  size = 32,
  color = "currentColor",
  ring = true,
  className,
}: StarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
      focusable="false"
    >
      {ring && (
        <circle
          cx="24"
          cy="24"
          r="21.5"
          fill="none"
          stroke={color}
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      )}
      <circle cx="17" cy="14" r="2.4" fill={color} />
      <circle cx="31" cy="24" r="4.6" fill={color} />
      <circle cx="20" cy="33" r="1.5" fill={color} />
    </svg>
  );
}

/**
 * Idle motion variant. Each point drifts on its own period (4.2s / 5.5s / 6s)
 * so the three never repeat in sync; the ring rotates once every 40s. Reserved
 * for splash screens, loading states, and the brand reference page — never
 * decorative at rest.
 */
export function StarMarkAnimated({
  size = 96,
  color = "currentColor",
  ring = true,
  animate = true,
  className,
}: StarMarkProps & { animate?: boolean }) {
  const drift = (name: string, duration: number, delay: number) =>
    animate ? `${name} ${duration}s ease-in-out ${delay}s infinite` : "none";
  const pop = (delay: number) =>
    animate ? `ns-pop 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s both` : "none";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={{ display: "block", flexShrink: 0, overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
    >
      {ring && (
        <g
          style={{
            transformOrigin: "24px 24px",
            animation: animate ? "ns-spin 40s linear infinite" : "none",
          }}
        >
          <circle
            cx="24"
            cy="24"
            r="21.5"
            fill="none"
            stroke={color}
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>
      )}
      <g
        style={{
          transformOrigin: "31px 24px",
          animation: drift("ns-orbit-b", 5.5, 0),
        }}
      >
        <circle cx="31" cy="24" r="4.6" fill={color} style={{ animation: pop(0) }} />
      </g>
      <g
        style={{
          transformOrigin: "17px 14px",
          animation: drift("ns-orbit-a", 4.2, 0.3),
        }}
      >
        <circle cx="17" cy="14" r="2.4" fill={color} style={{ animation: pop(0.12) }} />
      </g>
      <g
        style={{
          transformOrigin: "20px 33px",
          animation: drift("ns-orbit-c", 6, 0.6),
        }}
      >
        <circle cx="20" cy="33" r="1.5" fill={color} style={{ animation: pop(0.24) }} />
      </g>
    </svg>
  );
}

/** The three dots without the viewBox — used inline as a small stat-card icon. */
export function DotTriad() {
  return (
    <div className="flex gap-[5px]">
      <span className="h-[7px] w-[7px] rounded-full bg-ink-100" />
      <span className="-mt-px h-[9px] w-[9px] rounded-full bg-accent" />
      <span className="mt-0.5 h-[5px] w-[5px] rounded-full bg-ink-100" />
    </div>
  );
}
