"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Dices, Utensils, MapPin } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function MobileQuickBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          // Tampilkan bar setelah user scroll melewati hero section
          setVisible(window.scrollY > 320);
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (sectionId: string) => {
    soundEffects.playButtonClick();
    const el = document.getElementById(sectionId);
    if (el) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;
      const top = Math.round(
        el.getBoundingClientRect().top + window.scrollY - navHeight
      );
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Navigasi Cepat Mobile"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden animate-fade-in-up"
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sm px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-1.5 max-w-sm mx-auto">
          {/* Quick Jump: Game Catalog */}
          <button
            type="button"
            onClick={() => jumpTo("games")}
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#475569] hover:text-[#172554] active:bg-slate-50 transition-colors cursor-pointer"
          >
            <Dices className="w-5 h-5 mb-0.5 text-[#172554]" />
            <span className="font-mono text-[10px] font-bold tracking-tight">Game</span>
          </button>

          {/* Quick Jump: Menu Cafe */}
          <button
            type="button"
            onClick={() => jumpTo("menu")}
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#475569] hover:text-brand-orange active:bg-[#FFF5F0] transition-colors cursor-pointer"
          >
            <Utensils className="w-5 h-5 mb-0.5 text-brand-orange" />
            <span className="font-mono text-[10px] font-bold tracking-tight">Menu</span>
          </button>

          {/* Quick Jump: Lokasi & Jam Buka */}
          <button
            type="button"
            onClick={() => jumpTo("location")}
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#475569] hover:text-[#172554] active:bg-slate-50 transition-colors cursor-pointer"
          >
            <MapPin className="w-5 h-5 mb-0.5 text-[#172554]" />
            <span className="font-mono text-[10px] font-bold tracking-tight">Lokasi</span>
          </button>

          {/* Primary Action: WhatsApp Reservation Pill */}
          <a
            href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20reservasi%20meja%20boardgame%20dong!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playSuccessChime()}
            className="flex-[1.4] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold text-xs tracking-wide shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>RESERVASI</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
