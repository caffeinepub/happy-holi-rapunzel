const FLOWER_COLORS = [
  "oklch(0.68 0.28 350)",
  "oklch(0.55 0.25 295)",
  "oklch(0.65 0.22 145)",
  "oklch(0.72 0.22 45)",
  "oklch(0.55 0.22 250)",
] as const;

const FLOWER_POSITIONS = [
  { y: 120, side: 85 },
  { y: 280, side: 25 },
  { y: 440, side: 85 },
  { y: 610, side: 25 },
  { y: 770, side: 85 },
] as const;

export function RapunzelHair() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 top-0 h-full pointer-events-none"
      style={{ width: "120px", zIndex: 1 }}
    >
      <svg
        role="img"
        aria-label="Rapunzel's flowing golden hair"
        viewBox="0 0 120 900"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Rapunzel's flowing golden hair</title>
        <defs>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.18 85)" />
            <stop offset="40%" stopColor="oklch(0.82 0.20 75)" />
            <stop offset="75%" stopColor="oklch(0.75 0.18 70)" />
            <stop offset="100%" stopColor="oklch(0.65 0.15 65)" />
          </linearGradient>
          <filter id="hairGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main hair strand - flowing wave */}
        <path
          d="M 60 0
             C 85 40, 25 80, 60 130
             C 95 180, 20 220, 55 270
             C 90 320, 15 360, 50 410
             C 85 460, 10 500, 45 550
             C 80 600, 5 640, 40 690
             C 75 740, 0 780, 35 830
             C 55 860, 65 870, 60 890"
          fill="none"
          stroke="url(#hairGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hairGlow)"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 0,
            animation: "hair-draw 2s ease-out forwards",
          }}
        />

        {/* Second strand for thickness/layering */}
        <path
          d="M 45 0
             C 72 35, 18 78, 48 125
             C 78 172, 12 215, 42 262
             C 72 309, 8 352, 38 398
             C 68 445, 4 490, 34 536
             C 64 582, 0 625, 30 672
             C 60 718, -5 760, 25 808
             C 42 840, 50 860, 48 885"
          fill="none"
          stroke="url(#hairGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.6"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 0,
            animation: "hair-draw 2.5s 0.3s ease-out forwards",
          }}
        />

        {/* Thin highlight strand */}
        <path
          d="M 70 0
             C 90 45, 35 88, 68 135
             C 100 182, 30 225, 62 275
             C 95 325, 22 365, 55 415
             C 88 465, 15 505, 50 555
             C 82 605, 10 645, 42 695
             C 75 745, 2 785, 38 835
             C 58 862, 70 875, 68 895"
          fill="none"
          stroke="oklch(0.96 0.12 85)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.5"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 0,
            animation: "hair-draw 3s 0.5s ease-out forwards",
          }}
        />

        {/* Curly end — spiral at bottom */}
        <path
          d="M 35 835 Q 20 855, 30 870 Q 40 885, 55 878 Q 70 872, 68 858 Q 66 844, 52 842 Q 42 840, 38 850"
          fill="none"
          stroke="url(#hairGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 0,
            animation: "hair-draw 2s 2s ease-out forwards",
          }}
        />

        {/* Decorative flowers in hair */}
        {FLOWER_POSITIONS.map((pos, i) => (
          <g key={pos.y} transform={`translate(${pos.side}, ${pos.y})`}>
            <circle r="5" fill={FLOWER_COLORS[i]} opacity="0.8" />
            <circle r="2.5" fill="oklch(0.97 0.01 80)" opacity="0.9" />
          </g>
        ))}
      </svg>
    </div>
  );
}
