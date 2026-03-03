import { useMemo } from "react";

interface Orb {
  id: number;
  size: number;
  left: number;
  bottom: number;
  color: string;
  duration: number;
  delay: number;
  swayDuration: number;
}

const ORB_COLORS = [
  "oklch(0.68 0.28 350 / 0.25)",
  "oklch(0.55 0.25 295 / 0.25)",
  "oklch(0.85 0.20 85 / 0.20)",
  "oklch(0.65 0.22 145 / 0.25)",
  "oklch(0.72 0.22 45 / 0.25)",
  "oklch(0.55 0.22 250 / 0.25)",
  "oklch(0.82 0.18 75 / 0.22)",
];

export function FloatingOrbs() {
  const orbs = useMemo<Orb[]>(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: Math.round(20 + ((i * 37 + 13) % 80)),
      left: Math.round((i * 1234567) % 10000) / 100,
      bottom: Math.round((i * 987654) % 10000) / 100 - 20,
      color: ORB_COLORS[i % ORB_COLORS.length],
      duration: 7 + (i % 7) * 1.5,
      delay: -(i * 0.8),
      swayDuration: 3 + (i % 4),
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {orbs.map((orb) => (
        <div
          key={orb.id}
          style={{
            position: "absolute",
            left: `${orb.left}%`,
            bottom: `${orb.bottom}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: "50%",
            background: orb.color,
            backdropFilter: "blur(2px)",
            animation: `float-up ${orb.duration}s ${orb.delay}s ease-in infinite`,
            filter: `blur(${Math.round(orb.size / 15)}px)`,
          }}
        />
      ))}
    </div>
  );
}
