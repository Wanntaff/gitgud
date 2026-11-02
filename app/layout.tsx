import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gitgud Board Game & Cafe | Yogyakarta",
  description:
    "Boardgame & Espresso Bar di Baciro, Yogyakarta. 300+ koleksi game, Game Master standby, weekend 24 jam.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-white text-[#172554] font-sans antialiased selection:bg-brand-orange selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
