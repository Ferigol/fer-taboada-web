# PROMPT.md — Instrucciones de proyecto para futuras sesiones

## Proyecto
Sitio web personal de **Fer Taboada** (`fertaboada.com`).  
Stack: **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4** · **GSAP 3 + ScrollTrigger**.

---

## Diseño: reglas absolutas
- Fondo base: `#0d0d0d`
- Acento: `#ff5a00` (naranja)
- Tipografía principal: **Gilroy Bold** (local, `next/font/local`) — fallback Oswald 700 vía Google Fonts → `"Arial Black", sans-serif`
  - Variables CSS: `--font-gilroy` (600 Semibold, 700 Bold), `--font-oswald` (400, 700)
  - Archivos en `public/fonts/`: `Gilroy-Bold.otf` (700), `Gilroy-Semibold.otf` (600), `Gilroy-Regular.otf`
  - No existe peso 900 en Gilroy local — el navegador sintetiza o usa Bold como fallback
- **Sin** bordes redondeados (`border-radius: 0` en todos los elementos interactivos)
- **Sin** sombras (`box-shadow: none`)
- **Sin** gradientes (excepto overlays de imagen ya existentes en `FullScreenScrollFX`)
- Texto: `rgba(245,245,245,0.92)` sobre fondo oscuro
- Botones: relleno sólido o borde `2px solid` — nunca redondeados, nunca con sombra

---

## Arquitectura de archivos relevante

```
app/
  layout.tsx           — Oswald via next/font, metadata global, body sin margin/padding
  page.tsx             — solo renderiza <FerTaboadaHero />
  globals.css          — @import tailwindcss, reset dark base
  components/
    FullScreenScrollFX.tsx   — componente base de scroll full-screen con GSAP/ScrollTrigger
    FerTaboadaHero.tsx       — hero section de 5 slides
```

---

## FullScreenScrollFX — API y extensiones

Componente base de slides full-screen con scroll. Modificaciones ya aplicadas respecto al original:
- `"use client"` al inicio
- Ref callbacks retornan `void` (React 19)
- Tipo `Section` exportado
- Campo `renderOverlay?: (active: boolean, previous: boolean) => ReactNode` en `Section`  
  → se renderiza dentro de `.fx-fixed` con `z-index: 5`, encima de la grilla  
  → el div wrapper tiene `pointer-events: none`; cada overlay maneja sus propios pointer-events según `active`

### Tipo Section
```ts
type Section = {
  id?: string;
  background: string;           // src de img (ignorado si renderBackground está definido)
  leftLabel?: ReactNode;        // índice lateral izquierdo
  title: string | ReactNode;    // string → animación palabra-por-palabra con GSAP
  rightLabel?: ReactNode;       // columna lateral derecha
  renderBackground?: (active, previous) => ReactNode;  // reemplaza img + overlay
  renderOverlay?: (active, previous) => ReactNode;     // capa encima de la grilla
}
```

---

## FerTaboadaHero — Estructura de los 5 slides

| # | id | leftLabel | title | rightLabel | notas |
|---|---|---|---|---|---|
| 0 | dolor | DOLOR | `""` | — | Fondo negro puro |
| 1 | real-madrid | REAL MADRID | "REAL MADRID" | crédito del club | Fondo oscuro placeholder |
| 2 | boca-juniors | BOCA JUNIORS | "BOCA JUNIORS" | crédito del club | Fondo oscuro placeholder |
| 3 | al-nassr | AL-NASSR | "AL-NASSR" | crédito del club | Fondo oscuro placeholder |
| 4 | solucion | SOLUCIÓN | `""` | — | `renderOverlay` con Slide5Overlay |

### Pregunta fija (slides 0–3)
`position: fixed; z-index: 200; top: 6vh`  
Texto: *"¿Qué tienen en común estos clubes?"*  
Se oculta con `opacity: 0; transition: opacity 0.7s` cuando `idx >= 4`.

### Slide 5 — Slide5Overlay
Renderizado vía `renderOverlay`. Cuatro bloques con componente `<FadeUp delay={n}>`:
1. Texto insight (delay 0.15s)
2. Titular `TRANSFORMO FÚTBOL EN [palabra]` — palabra cicla cada 1.5s entre ARTE / PASIÓN / HINCHAS / VENTAS en `#ff5a00` con animación CSS `wordFadeUp`
3. Social proof (delay 0.55s)
4. Tres botones (delay 0.75s): "Trabajemos juntos" (fondo `#ff5a00`), "Aprende a dibujar como yo" (borde blanco), "Recursos gratis" (borde blanco)

---

## Convenciones de código

- Todos los archivos con lógica cliente llevan `"use client"` como primera línea
- `page.tsx` permanece como Server Component (importa directamente el Client Component)
- No usar `styled-jsx` registry — el componente base usa `<style jsx>` internamente (aceptable para client components)
- Estilos de componentes propios: inline styles o CSS modules; **no** Tailwind dentro de componentes del hero (interfiere con la especificidad)
- GSAP solo se registra en el cliente: `if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger) }`

---

## Próximas secciones planeadas (pendientes)
- Galería de obras / portfolio
- Sección de cursos / recursos
- Formulario de contacto (`#contacto`)
- Sección de recursos gratuitos (`#recursos`)
- Los hrefs de los botones del slide 5 apuntan a `#contacto`, `#aprender`, `#recursos` — aún sin destino real

---

## Notas sobre Next.js 16
Esta versión puede tener APIs distintas a versiones anteriores.  
**Leer siempre `node_modules/next/dist/docs/` antes de usar APIs de Next.js.**  
Font weights disponibles para Oswald: `"300" | "400" | "500" | "600" | "700"` (no existe 900).
