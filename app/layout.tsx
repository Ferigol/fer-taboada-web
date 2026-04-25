import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oswald } from "next/font/google";
import "./globals.css";

const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fer Taboada | Football Artist",
  description: "Transformo fútbol en arte. Illustrations, branding y contenido visual para clubes Real Madrid, Boca Juniors y Al-Nassr.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${gilroy.variable} ${oswald.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "#0d0d0d", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
