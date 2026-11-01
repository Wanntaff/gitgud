"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, Dices, Utensils } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function MobileQuickBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          // Show quick bar once scrolled past hero
          setVisible(window.scrollY > 320);
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (sectionId: string) => {
    soundEffects.playButtonClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    soundEffects.playTileTap();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aksi Cepat Mobile"
      className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-fade-in-up"
    >
      <div className="bg-white/95 backdrop-blur-md border-2 border-[#1B64B4]/25 rounded-2xl p-2 shadow-[0_8px_24px_-4px_rgba(27,100,180,0.22)] flex items-center justify-between gap-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Quick Jump: Game Catalog */}
        <button
          type="button"
          onClick={() => scrollTo("games")}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#F0F7FF] hover:bg-[#E1EFFF] text-[#1B64B4] border border-[#1B64B4]/20 font-mono text-[11px] font-bold transition-all active:scale-95 cursor-pointer truncate"
        >
          <Dices className="w-3.5 h-3.5 shrink-0 text-[#1B64B4]" />
          <span className="truncate">362 Game</span>
        </button>

        {/* Quick Jump: Menu Cafe */}
        <button
          type="button"
          onClick={() => scrollTo("menu")}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#FFF5F2] hover:bg-[#FFEBE5] text-[#E84A27] border border-brand-orange/30 font-mono text-[11px] font-bold transition-all active:scale-95 cursor-pointer truncate"
        >
          <Utensils className="w-3.5 h-3.5 shrink-0 text-[#E84A27]" />
          <span className="truncate">Menu Cafe</span>
        </button>

        {/* Primary Action: WhatsApp Reservation */}
        <a
          href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20reservasi%20meja%20boardgame%20dong!"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEffects.playSuccessChime()}
          className="flex-[1.35] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-black text-xs tracking-wide shadow-[2px_2px_0px_0px_#1B64B4] border border-[#1B64B4] transition-all active:scale-95 cursor-pointer truncate whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>RESERVASI</span>
        </a>

        {/* Back to top icon button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
          className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F0F7FF] text-[#64748B] hover:text-[#172554] border border-[#1B64B4]/20 transition-all active:scale-90 cursor-pointer shrink-0"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
