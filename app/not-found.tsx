"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        fontFamily: 'var(--font-gilroy), "Arial Black", sans-serif',
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "clamp(6rem, 20vw, 14rem)",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </p>

      <p
        style={{
          margin: 0,
          fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
          fontWeight: 400,
          color: "rgba(245,245,245,0.5)",
          letterSpacing: "0.02em",
        }}
      >
        Esta página no existe... pero el fútbol sí.
      </p>

      <Link
        href="/"
        style={{
          marginTop: "1rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 2.5rem",
          border: "1.5px solid rgba(255,90,0,0.6)",
          borderRadius: "9999px",
          color: "#ffffff",
          fontFamily: 'var(--font-gilroy), "Arial Black", sans-serif',
          fontWeight: 400,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
          textDecoration: "none",
          background: "transparent",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,90,0,0.1)";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,90,0,0.9)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,90,0,0.6)";
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
