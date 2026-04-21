"use client";

import React, { useRef, useState, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        backgroundColor: "hsl(0 0% 10% / 0.85)",
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: hovered ? "hsl(20 100% 55% / 0.4)" : "hsl(0 0% 30% / 0.35)",
        borderRadius: "14px",
        overflow: "hidden",
        padding: "2.5rem",
        touchAction: "none",
        transition: "border-color 0.3s ease",
      }}
      className={`relative flex flex-col justify-between backdrop-blur-sm gap-6 ${className}`}
    >
      {/* spotlight inner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(350px circle at ${pos.x} ${pos.y}, hsl(20 100% 55% / 0.12), transparent 65%)`,
        }}
      />
      {/* border glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(200px circle at ${pos.x} ${pos.y}, hsl(20 100% 55% / 0.5), transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
      />
      {children}
    </div>
  );
};

export { GlowCard };
