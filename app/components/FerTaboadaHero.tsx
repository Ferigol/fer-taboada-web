"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { FullScreenScrollFX } from "./FullScreenScrollFX";
import type { Section, FullScreenFXAPI } from "./FullScreenScrollFX";
import { NeonButton } from "@/components/ui/neon-button";
import { GlowCard } from "@/components/ui/spotlight-card";

const FONT = 'var(--font-gilroy), "Oswald", "Arial Black", sans-serif';
const ACCENT = "#ff5a00";
const BG = "#0d0d0d";

// ─── Background helpers ───────────────────────────────────────────────────────


function BlackBg({ active }: { active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        opacity: active ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}
    />
  );
}

// ─── Slide credit tag (right column) ─────────────────────────────────────────

function SlideCredit({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: FONT,
        fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
        fontWeight: 400,
        letterSpacing: "0.2em",
        lineHeight: 1.5,
        textAlign: "right",
        textTransform: "uppercase",
        opacity: 0.6,
        color: "rgba(245,245,245,0.9)",
      }}
    >
      {children}
    </span>
  );
}

// ─── Animation primitives ─────────────────────────────────────────────────────

type FadeUpProps = {
  active: boolean;
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function FadeUp({ active, delay, children, style }: FadeUpProps) {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${active ? delay : 0}s, transform 0.7s ease ${active ? delay : 0}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function FadeIn({ active, delay, children, style }: FadeUpProps) {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transition: `opacity 0.8s ease ${active ? delay : 0}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Slide 5 overlay: insight text ───────────────────────────────────────────

function Slide5InsightOverlay({ active }: { active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease",
        zIndex: 10,
        fontFamily: FONT,
      }}
    >
      <FadeIn active={active} delay={0.2} style={{ maxWidth: 900, textAlign: "center", padding: "0 2rem" }}>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "0em",
            color: "#ffffff",
            lineHeight: 1.6,
            textTransform: "none",
          }}
        >
          Entendieron que el arte<br />
          no decora espacios, despierta<br />
          pasión, conexión y ventas.
        </p>
      </FadeIn>
    </div>
  );
}

// ─── Cycling word animation ───────────────────────────────────────────────────

const CYCLE_WORDS = ["arte", "pasión", "ventas"];

function CyclingWord({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      // reset when slide leaves
      setVisible(false);
      setIndex(0);
      return;
    }
    // fade in "arte" immediately on activation
    setIndex(0);
    setVisible(true);

    // start cycling after "arte" has been shown for 3s
    let interval: ReturnType<typeof setInterval>;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % CYCLE_WORDS.length);
          setVisible(true);
        }, 600);
      }, 2800);
    }, 3000);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [active]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        fontStyle: "italic",
        fontWeight: 700,
        fontFamily: 'var(--font-gilroy), "Gilroy-BoldItalic", "Gilroy", sans-serif',
      }}
    >
      {CYCLE_WORDS[index]}
    </span>
  );
}

// ─── Slide 6 overlay: solution ────────────────────────────────────────────────

const CARD_BUTTON_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-gilroy), "Gilroy", sans-serif',
  fontWeight: 400,
  marginTop: "auto",
  textTransform: "none",
  letterSpacing: "normal",
};

const CARD_INNER_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

function Slide6SolutionOverlay({ active }: { active: boolean }) {
  return (
    <div
      className="slide6-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease",
        zIndex: 10,
        fontFamily: FONT,
        textTransform: "none",
        overflowY: "auto",
        padding: "6vh 5vw 4vh",
      }}
    >
      {/* Title + subtitle + cards grouped */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "50px" }}>

      <FadeUp active={active} delay={0.1} style={{ textAlign: "center", width: "100%" }}>
        <h2
          style={{
            margin: 0,
            marginTop: 0,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "none",
          }}
        >
          Transformo fútbol en<br /><CyclingWord active={active} />
        </h2>
      </FadeUp>

      {/* Subtitle */}
      <FadeUp active={active} delay={0.35} style={{ maxWidth: 580, textAlign: "center", marginTop: "1.5rem" }}>
        <p
          className="slide6-subtitle"
          style={{
            margin: 0,
            fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
            fontWeight: 400,
            letterSpacing: "0.03em",
            color: "rgba(245,245,245,0.5)",
            lineHeight: 1.7,
            textTransform: "none",
          }}
        >
          Un solo post me generó <span style={{ color: "#ffffff", fontWeight: 600, fontFamily: 'var(--font-gilroy), "Gilroy-SemiBold", "Gilroy", sans-serif' }}>27 millones de views.</span><br />
          Si eso hice para mi marca, imagina lo que puedo hacer por la tuya.
        </p>
      </FadeUp>

      {/* Cards grid */}
      <FadeUp
        active={active}
        delay={0.6}
        style={{ width: "100%", marginTop: "3rem", padding: "0 2rem" }}
      >
        <div className="slide6-grid">
          {/* Card 1 */}
          <GlowCard className="h-[280px] slide6-card-mobile">
            <div style={CARD_INNER_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <h3 className="card-title" style={{ margin: 0, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.1, textAlign: "center", fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif' }}>
                  Let&apos;s <span style={{ fontWeight: 700 }}>GOL</span>
                </h3>
                <p className="card-desc" style={{ margin: 0, fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)", color: "rgba(245,245,245,0.5)", lineHeight: 1.6, fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif', fontWeight: 400, textAlign: "center" }}>
                  <span className="card-text-desktop">Tienes un proyecto en mente<br />para tu club o para el crack<br />que representas.</span>
                  <span className="card-text-mobile">Tienes un proyecto en mente<br />para tu club o para el crack que representas.</span>
                </p>
              </div>
              <NeonButton
                variant="default"
                onClick={() => window.open("https://wa.link/b4pvk4", "_blank")}
                className="card-btn w-4/5 mx-auto h-11 flex items-center justify-center border-[#ff5a00]/60 text-white bg-transparent rounded-full normal-case tracking-normal hover:bg-[#ff5a00]/10"
                style={CARD_BUTTON_STYLE}
              >
                Trabajemos juntos
              </NeonButton>
            </div>
          </GlowCard>

          {/* Card 2 */}
          <GlowCard className="h-[280px] slide6-card-mobile">
            <div style={CARD_INNER_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <h3 className="card-title" style={{ margin: 0, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.1, textAlign: "center", fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif' }}>
                  vector <span style={{ fontWeight: 700 }}>GOL PRO</span>
                </h3>
                <p className="card-desc" style={{ margin: 0, fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)", color: "rgba(245,245,245,0.5)", lineHeight: 1.6, fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif', fontWeight: 400, textAlign: "center" }}>
                  <span className="card-text-desktop">Aprende a crear ilustraciones<br />digitales de cero a PRO.<br />Más de 800 estudiantes.</span>
                  <span className="card-text-mobile">Aprende a crear ilustraciones digitales de cero a PRO.<br />Más de 800 estudiantes.</span>
                </p>
              </div>
              <NeonButton
                variant="default"
                onClick={() => window.open("https://vgpro.fertaboada.com", "_blank")}
                className="card-btn w-4/5 mx-auto h-11 flex items-center justify-center border-[#ff5a00]/60 text-white bg-transparent rounded-full normal-case tracking-normal hover:bg-[#ff5a00]/10"
                style={CARD_BUTTON_STYLE}
              >
                Sí quiero dibujar
              </NeonButton>
            </div>
          </GlowCard>

          {/* Card 3 */}
          <GlowCard className="h-[280px] slide6-card-mobile">
            <div style={CARD_INNER_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <h3 className="card-title" style={{ margin: 0, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.1, textAlign: "center", fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif' }}>
                  lo<span style={{ fontWeight: 700 }}>GOL</span> galería
                </h3>
                <p className="card-desc" style={{ margin: 0, fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)", color: "rgba(245,245,245,0.5)", lineHeight: 1.6, fontFamily: 'var(--font-gilroy), "Gilroy-Regular", "Gilroy", sans-serif', fontWeight: 400, textAlign: "center" }}>
                  <span className="card-text-desktop">Descarga gratis recursos<br />creativos: logos, manuales de<br />marca y wallpapers de fútbol.</span>
                  <span className="card-text-mobile">Descarga gratis recursos creativos:<br />logos, manuales de marca y wallpapers de fútbol.</span>
                </p>
              </div>
              <NeonButton
                variant="default"
                onClick={() => window.open("https://logol.fertaboada.com/", "_blank")}
                className="card-btn w-4/5 mx-auto h-11 flex items-center justify-center border-[#ff5a00]/60 text-white bg-transparent rounded-full normal-case tracking-normal hover:bg-[#ff5a00]/10"
                style={CARD_BUTTON_STYLE}
              >
                Lo quiero ahora
              </NeonButton>
            </div>
          </GlowCard>
        </div>
      </FadeUp>

      </div>{/* end grouped container */}

      {/* Copyright */}
      <p
        className="slide6-copyright"
        style={{
          marginTop: "auto",
          paddingBottom: "1.5rem",
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
          fontWeight: 400,
          color: "rgba(245,245,245,0.3)",
          letterSpacing: "0.02em",
          fontFamily: 'var(--font-gilroy), "Gilroy", sans-serif',
          textTransform: "none",
        }}
      >
        © 2026 Fer Taboada – Football Artist. Todos los derechos reservados.
      </p>

    </div>
  );
}

const slide6Styles = `
  .mobile-club-label { display: none; }
  .card-text-mobile { display: none; }
  .card-text-desktop { display: inline; }
  .slide6-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(0.75rem, 2vw, 1.5rem);
    width: 100%;
  }
  .slide6-overlay {
    scrollbar-width: none;
  }
  .slide6-overlay::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 900px) {
    .mobile-club-label { display: block; }
  }
  @media (max-width: 768px) {
    .slide6-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .slide6-subtitle {
      display: none;
    }
    .slide6-overlay {
      justify-content: flex-start !important;
      padding-top: 4rem !important;
    }
    .card-text-desktop { display: none; }
    .card-text-mobile { display: inline; }
    .slide6-card-mobile {
      padding: 1.5rem !important;
      height: 189px !important;
    }
    .slide6-copyright {
      margin-top: 40px !important;
    }
    .slide6-card-mobile .card-title {
      font-size: 1.2rem !important;
    }
    .slide6-card-mobile .card-desc {
      font-size: 0.8rem !important;
      margin-top: 0.4rem !important;
    }
    .slide6-card-mobile .card-btn {
      padding: 0.6rem 1rem !important;
      font-size: 0.8rem !important;
      height: auto !important;
    }
  }
`;

// ─── Main component ───────────────────────────────────────────────────────────

export default function FerTaboadaHero() {
  const [idx, setIdx] = useState(0);
  const fxApiRef = useRef<FullScreenFXAPI>(null);

  // Question is visible on slides 1–5 (idx 0–4), hidden on slide 6 (idx 5).
  const questionVisible = idx < 5;
  // Centered only on slide 1; pinned to top on slides 2–5.
  const questionCentered = idx === 0;

  const sections: Section[] = useMemo(
    () => [
      // ── Slide 1: pain point (question only, nothing else) ──────────────────
      {
        id: "dolor",
        background: "",
        leftLabel: undefined,
        title: "",
        renderBackground: (active) => <BlackBg active={active} />,
      },

      // ── Slide 2: Real Madrid ───────────────────────────────────────────────
      {
        id: "real-madrid",
        background: "",
        leftLabel: "REAL MADRID",
        title: "",
        renderBackground: (active) => (
          <div style={{ position: "absolute", inset: 0, opacity: active ? 1 : 0, transition: "opacity 0.7s ease", willChange: "opacity", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/images/image-Real-Madrid.webp" alt="Real Madrid" style={{ width: "80%", height: "80%", objectFit: "contain", opacity: 0.6 }} />
          </div>
        ),
      },

      // ── Slide 3: Boca Juniors ──────────────────────────────────────────────
      {
        id: "boca-juniors",
        background: "",
        leftLabel: "BOCA JUNIORS",
        title: "",
        renderBackground: (active) => (
          <div style={{ position: "absolute", inset: 0, opacity: active ? 1 : 0, transition: "opacity 0.7s ease", willChange: "opacity", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/images/images-Boca-Juniors.webp" alt="Boca Juniors" style={{ width: "80%", height: "80%", objectFit: "contain", opacity: 0.6 }} />
          </div>
        ),
      },

      // ── Slide 4: Al-Nassr ──────────────────────────────────────────────────
      {
        id: "al-nassr",
        background: "",
        leftLabel: "AL-NASSR",
        title: "",
        renderBackground: (active) => (
          <div style={{ position: "absolute", inset: 0, opacity: active ? 1 : 0, transition: "opacity 0.7s ease", willChange: "opacity", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/images/image-All-Nassr.webp" alt="Al-Nassr" style={{ width: "80%", height: "80%", objectFit: "contain", opacity: 0.6 }} />
          </div>
        ),
      },

      // ── Slide 5: insight (pregunta arriba, frase centrada con fade) ────────
      {
        id: "insight",
        background: "",
        leftLabel: undefined,
        title: "",
        renderBackground: (active) => <BlackBg active={active} />,
        renderOverlay: (active) => <Slide5InsightOverlay active={active} />,
      },

      // ── Slide 6: solution (sin pregunta, fade+up con botones) ─────────────
      {
        id: "solucion",
        background: "",
        leftLabel: undefined,
        title: "",
        renderBackground: (active) => <BlackBg active={active} />,
        renderOverlay: (active) => <Slide6SolutionOverlay active={active} />,
      },
    ],
    []
  );

  const MOBILE_LABELS: Record<number, string> = { 1: "REAL MADRID", 2: "BOCA JUNIORS", 3: "AL-NASSR" };
  const mobileLabel = MOBILE_LABELS[idx];

  return (
    <div style={{ position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: slide6Styles }} />

      {/* Mobile club label — slides 2, 3, 4 only */}
      <div className="mobile-club-label" style={{
        position: "fixed",
        bottom: "calc(clamp(4rem, 8vh, 6rem) + 80px)",
        left: "clamp(1rem, 5vw, 2rem)",
        zIndex: 200,
        pointerEvents: "none",
        opacity: mobileLabel ? 1 : 0,
        transition: "opacity 0.4s ease",
        fontFamily: FONT,
        fontSize: "clamp(0.7rem, 3vw, 1rem)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        color: "rgba(245,245,245,0.92)",
      }}>
        {mobileLabel ?? ""}
      </div>

      {/* Isotipo — click goes to slide 1 */}
      <button
        onClick={() => fxApiRef.current?.goTo(0)}
        aria-label="Ir al inicio"
        style={{
          position: "fixed",
          top: "clamp(1.25rem, 3vh, 2rem)",
          left: "clamp(1.25rem, 3vw, 2.5rem)",
          zIndex: 200,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          opacity: 1,
        }}
      >
        <img
          src="/images/iso-fer-taboada.svg"
          alt="Fer Taboada"
          style={{ width: "clamp(1.2rem, 2.4vw, 1.92rem)", height: "auto", display: "block" }}
        />
      </button>

      {/* ¿Qué tienen en común estos clubes?
          Slide 1: perfectly centered, large.
          Slides 2–5: pinned to top, small.
          Slide 6: hidden. */}
      <div
        aria-hidden={!questionVisible}
        style={{
          position: "fixed",
          top: questionCentered ? "50%" : "5.5vh",
          left: "clamp(2rem, 20vw, 30vw)",
          right: "clamp(2rem, 20vw, 30vw)",
          zIndex: 200,
          textAlign: "center",
          pointerEvents: "none",
          opacity: questionVisible ? 1 : 0,
          transform: questionCentered ? "translateY(calc(-50% - 80px))" : "translateY(0)",
          transition: "top 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease",
          fontFamily: FONT,
          color: "#ffffff",
          fontSize: questionCentered ? "clamp(2rem, 4.5vw, 3.5rem)" : "clamp(0.85rem, 1.3vw, 1.05rem)",
          fontWeight: 700,
          letterSpacing: questionCentered ? "0.04em" : "0.22em",
          textTransform: "none",
          lineHeight: 1.15,
        }}
      >
        ¿Qué tienen en común estos clubes?
      </div>

      <FullScreenScrollFX
        sections={sections}
        currentIndex={idx}
        onIndexChange={setIdx}
        fontFamily={FONT}
        colors={{
          text: "rgba(245,245,245,0.92)",
          overlay: "rgba(0,0,0,0.5)",
          pageBg: BG,
          stageBg: BG,
        }}
        showProgress={idx < 5}
        bgTransition="fade"
        gap={1}
        gridPaddingX={2}
        ariaLabel="Hero section — Fer Taboada"
        apiRef={fxApiRef}
      />

    </div>
  );
}
