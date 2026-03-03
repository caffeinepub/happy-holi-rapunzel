import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const HOLI_COLORS = [
  "255, 80, 150", // hot pink
  "190, 60, 230", // purple
  "255, 200, 30", // golden yellow
  "60, 210, 120", // green
  "255, 130, 30", // orange
  "60, 130, 255", // blue
  "255, 60, 100", // fuchsia
  "130, 255, 80", // lime
  "255, 240, 60", // bright yellow
  "80, 200, 255", // cyan
];

function randomColor() {
  return HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)];
}

function createParticle(x: number, y: number, speed: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const v = Math.random() * speed + 1;
  return {
    x,
    y,
    vx: Math.cos(angle) * v,
    vy: Math.sin(angle) * v - Math.random() * 3,
    size: Math.random() * 8 + 3,
    color: randomColor(),
    alpha: 1,
    decay: Math.random() * 0.015 + 0.01,
  };
}

interface Props {
  throwColorsRef: React.MutableRefObject<(() => void) | null>;
  reducedMotion: boolean;
}

export function ParticleCanvas({ throwColorsRef, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(true);

  const spawnBurst = useCallback(
    (cx: number, cy: number, count: number, speed: number) => {
      if (reducedMotion) return;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(cx, cy, speed));
      }
    },
    [reducedMotion],
  );

  const throwColors = useCallback(() => {
    if (reducedMotion) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Main burst from center
    spawnBurst(w / 2, h / 2, 120, 14);
    // Side bursts
    spawnBurst(w * 0.2, h * 0.3, 40, 10);
    spawnBurst(w * 0.8, h * 0.3, 40, 10);
    spawnBurst(w * 0.15, h * 0.7, 30, 8);
    spawnBurst(w * 0.85, h * 0.7, 30, 8);
  }, [reducedMotion, spawnBurst]);

  useEffect(() => {
    throwColorsRef.current = throwColors;
  }, [throwColors, throwColorsRef]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY, 50, 7);
    };
    document.addEventListener("click", handleClick);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      if (!activeRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.vx *= 0.99; // air drag
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = `rgb(${p.color})`;
        ctx.beginPath();
        // Slightly irregular blob shape
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Small trailing dot for paint-splash feel
        ctx.globalAlpha = Math.max(0, p.alpha * 0.4);
        ctx.arc(
          p.x - p.vx * 0.5,
          p.y - p.vy * 0.3,
          p.size * 0.4,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
    };
  }, [reducedMotion, spawnBurst]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      data-ocid="canvas_target"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
