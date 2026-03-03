import { useEffect, useRef, useState } from "react";
import { FloatingLanterns } from "./components/FloatingLanterns";
import { FloatingOrbs } from "./components/FloatingOrbs";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { RapunzelHair } from "./components/RapunzelHair";

const WISH_CARDS = [
  {
    emoji: "🌻",
    message: "May your hair glow as golden as the Holi sun!",
    bg: "oklch(0.68 0.28 350)", // pink
    shadow: "0 8px 40px oklch(0.68 0.28 350 / 0.6)",
  },
  {
    emoji: "🎨",
    message:
      "From Corona to the festival fields — colors follow you everywhere!",
    bg: "oklch(0.55 0.25 295)", // purple
    shadow: "0 8px 40px oklch(0.55 0.25 295 / 0.6)",
  },
  {
    emoji: "🌈",
    message: "Let every color splash remind you of your brave adventures!",
    bg: "oklch(0.72 0.22 145)", // green (slightly brightened for readability)
    shadow: "0 8px 40px oklch(0.72 0.22 145 / 0.6)",
  },
  {
    emoji: "🍳",
    message: "Your frying pan and Holi colors — an unstoppable combo!",
    bg: "oklch(0.72 0.22 45)", // orange
    shadow: "0 8px 40px oklch(0.72 0.22 45 / 0.6)",
  },
  {
    emoji: "🦎",
    message: "May Pascal bring you the most colorful surprises today!",
    bg: "oklch(0.55 0.22 250)", // blue
    shadow: "0 8px 40px oklch(0.55 0.22 250 / 0.6)",
  },
  {
    emoji: "🏮",
    message: "Float like lanterns, shine like colors — Happy Holi, princess!",
    bg: "oklch(0.76 0.20 85)", // gold/yellow
    shadow: "0 8px 40px oklch(0.76 0.20 85 / 0.6)",
  },
] as const;

const QUOTES = [
  {
    text: "New dream: throw Holi colors from the top of my tower!",
    attr: "— Rapunzel",
    accent: "oklch(0.68 0.28 350)",
  },
  {
    text: "Life is too short for one color. Paint it all!",
    attr: "— The Festival of Holi",
    accent: "oklch(0.55 0.25 295)",
  },
  {
    text: "When you finally leave your tower, make sure it's for Holi.",
    attr: "— Flynn Rider, probably",
    accent: "oklch(0.72 0.22 45)",
  },
  {
    text: "Even Pascal turned pink today. Today is a good day.",
    attr: "— Rapunzel's diary",
    accent: "oklch(0.65 0.22 145)",
  },
] as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export default function App() {
  const throwColorsRef = useRef<(() => void) | null>(null);
  const [buttonBouncing, setButtonBouncing] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleThrowColors = () => {
    throwColorsRef.current?.();
    setButtonBouncing(true);
    setTimeout(() => setButtonBouncing(false), 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "oklch(0.12 0.04 280)",
        color: "oklch(0.97 0.01 80)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Particle canvas — full screen, pointer-events: none */}
      <ParticleCanvas
        throwColorsRef={throwColorsRef}
        reducedMotion={reducedMotion}
      />

      {/* Floating background orbs */}
      {!reducedMotion && <FloatingOrbs />}

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem 1.5rem",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Animated gradient background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 30%, oklch(0.68 0.28 350 / 0.18) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, oklch(0.55 0.25 295 / 0.18) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, oklch(0.85 0.20 85 / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 10% 70%, oklch(0.65 0.22 145 / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 60%, oklch(0.72 0.22 45 / 0.15) 0%, transparent 50%),
              oklch(0.12 0.04 280)
            `,
            backgroundSize: "300% 300%",
            animation: reducedMotion
              ? "none"
              : "holi-bg-shift 12s ease infinite",
            zIndex: 0,
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "860px",
            width: "100%",
          }}
        >
          {/* Decorative crown / sparkle row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              animation: reducedMotion
                ? "none"
                : "fade-in-up 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            {["✨", "👑", "🌸", "🎨", "🌸", "👑", "✨"].map((ch, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list, order never changes
              <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                {ch}
              </span>
            ))}
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              background: `linear-gradient(
                135deg,
                oklch(0.68 0.28 350) 0%,
                oklch(0.55 0.25 295) 20%,
                oklch(0.85 0.20 85) 40%,
                oklch(0.65 0.22 145) 60%,
                oklch(0.72 0.22 45) 80%,
                oklch(0.55 0.22 250) 100%
              )`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: reducedMotion
                ? "none"
                : "text-glow-cycle 4s ease-in-out infinite, fade-in-up 0.8s 0.2s ease-out forwards",
              opacity: 0,
              marginBottom: "1rem",
            }}
          >
            Happy Holi,
            <br />
            Rapunzel!
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              color: "oklch(0.85 0.10 80)",
              marginBottom: "2.5rem",
              letterSpacing: "0.02em",
              animation: reducedMotion
                ? "none"
                : "fade-in-up 0.8s 0.4s ease-out forwards",
              opacity: 0,
            }}
          >
            Where golden hair meets the colors of spring
          </p>

          {/* Throw Colors button */}
          <button
            type="button"
            data-ocid="throw_colors.primary_button"
            onClick={handleThrowColors}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              fontWeight: 700,
              padding: "1rem 2.5rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: `linear-gradient(135deg,
                oklch(0.68 0.28 350) 0%,
                oklch(0.55 0.25 295) 40%,
                oklch(0.72 0.22 45) 100%
              )`,
              color: "oklch(0.97 0.01 80)",
              boxShadow:
                "0 0 30px oklch(0.68 0.28 350 / 0.5), 0 4px 20px rgba(0,0,0,0.3)",
              animation: buttonBouncing
                ? "bounce-btn 0.6s ease-in-out"
                : reducedMotion
                  ? "none"
                  : "bounce-btn 1.8s ease-in-out infinite",
              transition: "box-shadow 0.2s, transform 0.1s",
              marginBottom: "3rem",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 50px oklch(0.68 0.28 350 / 0.8), 0 8px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px oklch(0.68 0.28 350 / 0.5), 0 4px 20px rgba(0,0,0,0.3)";
            }}
          >
            🎨 Throw Colors!
          </button>

          {/* Personalized message */}
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              padding: "2rem 2.5rem",
              background: "oklch(0.16 0.05 280 / 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: "1.5rem",
              border: "1px solid oklch(0.82 0.18 75 / 0.3)",
              boxShadow:
                "0 0 40px oklch(0.82 0.18 75 / 0.15), inset 0 1px 0 oklch(0.82 0.18 75 / 0.2)",
              animation: reducedMotion
                ? "none"
                : "fade-in-up 0.8s 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                lineHeight: 1.8,
                color: "oklch(0.92 0.06 80)",
              }}
            >
              "From your enchanted tower to the festival of colors — may this
              Holi paint your world as brilliantly as your magical golden hair
              paints every sunrise. Your adventures have just begun, princess.{" "}
              <strong style={{ color: "oklch(0.82 0.18 75)" }}>
                Happy Holi!
              </strong>{" "}
              🌸"
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.5,
            animation: reducedMotion
              ? "none"
              : "fade-in-up 1s 1.2s ease-out forwards",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, oklch(0.82 0.18 75), transparent)",
              animation: reducedMotion ? "none" : "pulse-scale 2s infinite",
            }}
          />
        </div>
      </section>

      {/* ── HAIR DECORATION SECTION ──────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "600px",
          background: `linear-gradient(
            to bottom,
            oklch(0.12 0.04 280),
            oklch(0.10 0.05 290)
          )`,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <RapunzelHair />

        {/* Section content beside the hair */}
        <div
          style={{
            paddingLeft: "140px",
            paddingRight: "2rem",
            paddingTop: "4rem",
            paddingBottom: "4rem",
            maxWidth: "900px",
          }}
        >
          <h2
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "oklch(0.82 0.18 75)",
              marginBottom: "1.5rem",
              textShadow: "0 0 30px oklch(0.82 0.18 75 / 0.5)",
            }}
          >
            Rapunzel's
            <br />
            Golden Braid
          </h2>
          <p
            style={{
              fontFamily: '"Figtree", system-ui, sans-serif',
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.8,
              color: "oklch(0.80 0.05 80)",
              maxWidth: "500px",
            }}
          >
            70 feet of golden magic, now adorned with the colors of Holi. Each
            strand shimmers with the spirit of spring — pink as roses, purple as
            dusk, gold as sunlight — weaving through the air like a living
            rainbow.
          </p>

          {/* Color swatches along hair path */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { color: "oklch(0.68 0.28 350)", label: "Gulal Pink" },
              { color: "oklch(0.55 0.25 295)", label: "Violet" },
              { color: "oklch(0.85 0.20 85)", label: "Turmeric Gold" },
              { color: "oklch(0.65 0.22 145)", label: "Pista Green" },
              { color: "oklch(0.72 0.22 45)", label: "Marigold" },
              { color: "oklch(0.55 0.22 250)", label: "Sapphire" },
            ].map((swatch) => (
              <div
                key={swatch.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "9999px",
                  background: `${swatch.color}22`,
                  border: `1px solid ${swatch.color}66`,
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: swatch.color,
                    boxShadow: `0 0 8px ${swatch.color}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"Figtree", system-ui, sans-serif',
                    fontSize: "0.8rem",
                    color: "oklch(0.85 0.05 80)",
                  }}
                >
                  {swatch.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative right-side color splash */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-80px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle,
              oklch(0.68 0.28 350 / 0.12) 0%,
              oklch(0.55 0.25 295 / 0.08) 40%,
              transparent 70%
            )`,
            filter: "blur(30px)",
          }}
        />
      </section>

      {/* ── WISH CARDS SECTION ───────────────────────────────── */}
      <section
        data-ocid="wish_cards.section"
        style={{
          position: "relative",
          padding: "5rem 1.5rem",
          background: "oklch(0.10 0.05 290)",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "oklch(0.97 0.01 80)",
                marginBottom: "0.75rem",
              }}
            >
              Colorful Wishes for You,
              <span
                style={{
                  display: "block",
                  background: `linear-gradient(90deg,
                    oklch(0.82 0.18 75),
                    oklch(0.68 0.28 350)
                  )`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Rapunzel ✨
              </span>
            </h2>
            <p
              style={{
                fontFamily: '"Figtree", system-ui, sans-serif',
                color: "oklch(0.65 0.06 280)",
                fontSize: "1.05rem",
              }}
            >
              Six wishes, six colors, one magical princess
            </p>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {WISH_CARDS.map((card, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list, order never changes
              <WishCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LANTERNS SECTION ─────────────────────────────────── */}
      <section
        data-ocid="lanterns.section"
        style={{
          position: "relative",
          minHeight: "520px",
          background: "oklch(0.07 0.03 270)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem",
          zIndex: 1,
        }}
      >
        <FloatingLanterns />

        {/* Stars background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 20% 30%, oklch(0.97 0.01 80 / 0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 80% 10%, oklch(0.97 0.01 80 / 0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 50% 60%, oklch(0.97 0.01 80 / 0.7) 0%, transparent 100%),
              radial-gradient(1px 1px at 35% 80%, oklch(0.97 0.01 80 / 0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 65% 45%, oklch(0.97 0.01 80 / 0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 10% 55%, oklch(0.97 0.01 80 / 0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 90% 75%, oklch(0.97 0.01 80 / 0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 25% 15%, oklch(0.82 0.18 75 / 0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 72% 88%, oklch(0.82 0.18 75 / 0.4) 0%, transparent 100%)
            `,
          }}
        />

        {/* Section content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          <h2
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "oklch(0.82 0.18 75)",
              textShadow:
                "0 0 30px oklch(0.82 0.18 75 / 0.6), 0 0 80px oklch(0.82 0.18 75 / 0.3)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Like Lanterns in the Night Sky...
          </h2>

          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              color: "oklch(0.80 0.08 80)",
              lineHeight: 1.8,
            }}
          >
            "Every lantern carries a wish.
            <br />
            Every color tells a story."
          </p>

          <div
            aria-hidden="true"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
              fontSize: "2rem",
            }}
          >
            <span
              style={{
                animation: reducedMotion
                  ? "none"
                  : "glow-pulse 1.5s 0s ease-in-out infinite",
              }}
            >
              🏮
            </span>
            <span
              style={{
                animation: reducedMotion
                  ? "none"
                  : "glow-pulse 1.8s 0.2s ease-in-out infinite",
              }}
            >
              ✨
            </span>
            <span
              style={{
                animation: reducedMotion
                  ? "none"
                  : "glow-pulse 2.1s 0.4s ease-in-out infinite",
              }}
            >
              🌟
            </span>
            <span
              style={{
                animation: reducedMotion
                  ? "none"
                  : "glow-pulse 2.4s 0.6s ease-in-out infinite",
              }}
            >
              ✨
            </span>
            <span
              style={{
                animation: reducedMotion
                  ? "none"
                  : "glow-pulse 2.7s 0.8s ease-in-out infinite",
              }}
            >
              🏮
            </span>
          </div>
        </div>
      </section>

      {/* ── QUOTES SECTION ───────────────────────────────────── */}
      <section
        data-ocid="quotes.section"
        style={{
          position: "relative",
          padding: "5rem 1.5rem",
          background: "oklch(0.10 0.05 290)",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                color: "oklch(0.97 0.01 80)",
                marginBottom: "0.5rem",
              }}
            >
              Words as Colorful as Your World
            </h2>
            <div
              style={{
                width: "80px",
                height: "3px",
                background:
                  "linear-gradient(90deg, oklch(0.68 0.28 350), oklch(0.55 0.25 295))",
                margin: "1rem auto 0",
                borderRadius: "9999px",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {QUOTES.map((q, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <QuoteCard key={i} quote={q} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        data-ocid="footer.section"
        style={{
          position: "relative",
          padding: "3rem 1.5rem",
          background: `linear-gradient(
            135deg,
            oklch(0.12 0.06 295) 0%,
            oklch(0.10 0.04 280) 50%,
            oklch(0.12 0.05 265) 100%
          )`,
          overflow: "hidden",
          borderTop: "1px solid oklch(0.82 0.18 75 / 0.2)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Decorative footer dots */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[
            {
              x: 10,
              y: 30,
              c: "oklch(0.68 0.28 350 / 0.4)",
              s: 8,
              id: "pink1",
            },
            {
              x: 25,
              y: 70,
              c: "oklch(0.55 0.25 295 / 0.4)",
              s: 6,
              id: "purple1",
            },
            {
              x: 40,
              y: 20,
              c: "oklch(0.85 0.20 85 / 0.4)",
              s: 10,
              id: "yellow1",
            },
            {
              x: 60,
              y: 80,
              c: "oklch(0.65 0.22 145 / 0.4)",
              s: 7,
              id: "green1",
            },
            {
              x: 75,
              y: 35,
              c: "oklch(0.72 0.22 45 / 0.4)",
              s: 9,
              id: "orange1",
            },
            {
              x: 88,
              y: 65,
              c: "oklch(0.55 0.22 250 / 0.4)",
              s: 6,
              id: "blue1",
            },
            {
              x: 95,
              y: 25,
              c: "oklch(0.68 0.28 350 / 0.3)",
              s: 5,
              id: "pink2",
            },
            { x: 5, y: 55, c: "oklch(0.82 0.18 75 / 0.4)", s: 7, id: "gold1" },
          ].map((dot) => (
            <div
              key={dot.id}
              style={{
                position: "absolute",
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.s}px`,
                height: `${dot.s}px`,
                borderRadius: "50%",
                background: dot.c,
                boxShadow: `0 0 ${dot.s * 2}px ${dot.c}`,
              }}
            />
          ))}
        </div>

        {/* Footer emoji row */}
        <div
          style={{
            fontSize: "1.8rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {["🌸", "🎨", "🏮", "✨", "👑", "🌈", "✨", "🏮", "🎨", "🌸"].map(
            (ch, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
              <span key={i}>{ch}</span>
            ),
          )}
        </div>

        <p
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            color: "oklch(0.82 0.18 75)",
            marginBottom: "0.5rem",
            textShadow: "0 0 20px oklch(0.82 0.18 75 / 0.5)",
          }}
        >
          Happy Holi, Rapunzel! 🌸
        </p>

        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "oklch(0.65 0.06 280)",
            marginBottom: "1.5rem",
          }}
        >
          Made with 💛 for Rapunzel's Holi celebration
        </p>

        <p
          style={{
            fontFamily: '"Figtree", system-ui, sans-serif',
            fontSize: "0.8rem",
            color: "oklch(0.50 0.04 280)",
          }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.65 0.12 280)", textDecoration: "none" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

/* ── Wish Card Component ─────────────────────────────────────────── */

interface WishCardProps {
  card: {
    emoji: string;
    message: string;
    bg: string;
    shadow: string;
  };
  index: number;
}

function WishCard({ card, index }: WishCardProps) {
  const [hovered, setHovered] = useState(false);
  const ocid = `wish_cards.item.${index + 1}` as const;

  return (
    <div
      data-ocid={ocid}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: card.bg,
        borderRadius: "1.5rem",
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: hovered
          ? `${card.shadow.replace("0.6)", "0.9)").replace("40px", "60px")}, 0 0 0 2px oklch(0.97 0.01 80 / 0.2)`
          : card.shadow,
        transform: hovered
          ? "scale(1.05) rotate(1deg)"
          : "scale(1) rotate(0deg)",
        transition:
          "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer overlay on hover */}
      {hovered && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              120deg,
              transparent 0%,
              oklch(0.97 0.01 80 / 0.1) 40%,
              oklch(0.97 0.01 80 / 0.2) 50%,
              oklch(0.97 0.01 80 / 0.1) 60%,
              transparent 100%
            )`,
            borderRadius: "1.5rem",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Emoji */}
      <span
        style={{
          fontSize: "2.5rem",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }}
      >
        {card.emoji}
      </span>

      {/* Message */}
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
          lineHeight: 1.65,
          color: "oklch(0.97 0.01 80)",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          margin: 0,
        }}
      >
        {card.message}
      </p>
    </div>
  );
}

/* ── Quote Card Component ────────────────────────────────────────── */

interface QuoteCardProps {
  quote: {
    text: string;
    attr: string;
    accent: string;
  };
  index: number;
}

function QuoteCard({ quote, index }: QuoteCardProps) {
  const ocid = `quotes.item.${index + 1}` as const;

  return (
    <div
      data-ocid={ocid}
      style={{
        background: "oklch(0.14 0.04 280)",
        borderRadius: "1rem",
        padding: "2rem",
        borderLeft: `4px solid ${quote.accent}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), -2px 0 20px ${quote.accent}33`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 8px 30px rgba(0,0,0,0.4), -2px 0 30px ${quote.accent}55`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 4px 20px rgba(0,0,0,0.3), -2px 0 20px ${quote.accent}33`;
      }}
    >
      {/* Open quote mark */}
      <div
        style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontSize: "4rem",
          lineHeight: 0.8,
          color: quote.accent,
          opacity: 0.5,
          marginBottom: "0.5rem",
          userSelect: "none",
        }}
      >
        "
      </div>

      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
          lineHeight: 1.7,
          color: "oklch(0.88 0.04 80)",
          margin: "0 0 1rem",
        }}
      >
        {quote.text}
      </p>

      <p
        style={{
          fontFamily: '"Figtree", system-ui, sans-serif',
          fontSize: "0.85rem",
          color: quote.accent,
          fontWeight: 600,
          letterSpacing: "0.05em",
          margin: 0,
        }}
      >
        {quote.attr}
      </p>
    </div>
  );
}
