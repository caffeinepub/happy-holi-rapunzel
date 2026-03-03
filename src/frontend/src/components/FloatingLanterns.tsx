import { useMemo } from "react";

interface Lantern {
  id: number;
  x: number;
  duration: number;
  delay: number;
  scale: number;
  hue: number;
}

export function FloatingLanterns() {
  const lanterns = useMemo<Lantern[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 8 + ((i * 9999) % 84),
      duration: 9 + (i % 5) * 2,
      delay: -(i * 1.2),
      scale: 0.6 + (i % 4) * 0.2,
      hue: 70 + (i % 3) * 10,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {lanterns.map((l) => (
        <div
          key={l.id}
          style={{
            position: "absolute",
            left: `${l.x}%`,
            bottom: "-120px",
            animation: `lantern-float ${l.duration}s ${l.delay}s ease-in infinite`,
            transform: `scale(${l.scale})`,
            filter: `drop-shadow(0 0 12px oklch(0.85 0.18 ${l.hue} / 0.8))`,
          }}
        >
          <LanternSVG hue={l.hue} />
        </div>
      ))}
    </div>
  );
}

function LanternSVG({ hue }: { hue: number }) {
  return (
    <svg
      role="img"
      aria-label="Floating lantern"
      width="40"
      height="64"
      viewBox="0 0 40 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Floating lantern</title>
      {/* Top cap */}
      <rect
        x="12"
        y="2"
        width="16"
        height="5"
        rx="2"
        fill={`oklch(0.75 0.16 ${hue})`}
      />
      {/* String */}
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="7"
        stroke={`oklch(0.70 0.14 ${hue})`}
        strokeWidth="1.5"
      />

      {/* Main body */}
      <rect
        x="4"
        y="7"
        width="32"
        height="42"
        rx="8"
        fill={`oklch(0.82 0.18 ${hue})`}
        opacity="0.9"
      />

      {/* Glow inner */}
      <rect
        x="9"
        y="12"
        width="22"
        height="32"
        rx="5"
        fill={`oklch(0.95 0.15 ${hue})`}
        opacity="0.55"
      />

      {/* Decorative lines */}
      <line
        x1="4"
        y1="21"
        x2="36"
        y2="21"
        stroke={`oklch(0.65 0.18 ${hue})`}
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="4"
        y1="35"
        x2="36"
        y2="35"
        stroke={`oklch(0.65 0.18 ${hue})`}
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Bottom tassel */}
      <rect
        x="14"
        y="49"
        width="12"
        height="6"
        rx="3"
        fill={`oklch(0.72 0.16 ${hue})`}
      />
      <line
        x1="16"
        y1="55"
        x2="14"
        y2="63"
        stroke={`oklch(0.70 0.14 ${hue})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="55"
        x2="20"
        y2="64"
        stroke={`oklch(0.70 0.14 ${hue})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="55"
        x2="26"
        y2="63"
        stroke={`oklch(0.70 0.14 ${hue})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
