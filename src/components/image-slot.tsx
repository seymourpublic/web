import Image from "next/image";

type ImageSlotProps = {
  /** Drop a real asset in here and the placeholder disappears. */
  src?: string;
  alt?: string;
  /** Placeholder caption, shown only while `src` is empty. */
  label?: string;
  radius?: "card" | "panel" | "nested";
  className?: string;
  /** Inline style hook for height / aspect-ratio, which vary per slot. */
  style?: React.CSSProperties;
  priority?: boolean;
};

const RADIUS = {
  card: "rounded-card",
  panel: "rounded-panel",
  nested: "rounded-nested",
} as const;

/**
 * Renders a real image when one is supplied, otherwise a flat well carrying
 * the slot's intent so unfinished pages still read as designed.
 */
export function ImageSlot({
  src,
  alt = "",
  label = "Image",
  radius = "panel",
  className = "",
  style,
  priority,
}: ImageSlotProps) {
  return (
    <div
      className={`relative overflow-hidden bg-well ${RADIUS[radius]} ${className}`}
      style={style}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 1280px"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <span className="absolute bottom-4 left-4 text-caption text-ink-60">
          {label}
        </span>
      )}
    </div>
  );
}
