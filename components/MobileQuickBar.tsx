"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Dices,
  Utensils,
  MapPin,
  Ticket,
  ChevronUp,
  X,
  Clock,
  HelpCircle,
  Footprints,
  Volume2,
  VolumeX,
  Navigation,
  Info,
  Check,
} from "lucide-react";
import { soundEffects, useSoundSettings } from "@/lib/soundEffects";

interface NavDockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const DOCK_ITEMS: NavDockItem[] = [
  { id: "games", label: "Game", icon: Dices },
  { id: "events", label: "Event", icon: Ticket, badge: "BOTC" },
  { id: "menu", label: "Menu", icon: Utensils },
  { id: "location", label: "Lokasi", icon: MapPin },
];

export default function MobileQuickBar() {
  const [visible, setVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { muted, toggle: toggleSound } = useSoundSettings();
  const [addressCopied, setAddressCopied] = useState(false);

  useEffect(() => {
    let ticking = false;
    const trackedSections = ["about", "how-to-play", "games", "events", "menu", "faq", "location"];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          const scrollY = window.scrollY;
          // Tampilkan bar setelah user scroll melewati batas hero awal
          setVisible(scrollY > 280);

          // Deteksi active section untuk bottom navigation dock
          const nav = document.querySelector("nav");
          const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;

          for (let i = trackedSections.length - 1; i >= 0; i--) {
            const secId = trackedSections[i];
            const el = document.getElementById(secId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= navHeight + 200) {
                setActiveSection(secId);
                return;
              }
            }
          }
          if (scrollY < 200) {
            setActiveSection("");
          }
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
    setSheetOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;
      const top = Math.round(
        el.getBoundingClientRect().top + window.scrollY - navHeight
      );
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  const copyAddress = () => {
    soundEffects.playButtonClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        "Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta 55225"
      );
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Expandable Quick Sheet Modal Drawer for Complete Mobile Navigation */}
      {sheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Lengkap & Informasi Gitgud"
          className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-fade-in"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl border-t border-slate-200/90 shadow-2xl p-4 pb-[max(1.2rem,env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto space-y-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-[#172554]">
                  Navigasi &amp; Info Kafe Baciro
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playCardSnap();
                  setSheetOpen(false);
                }}
                aria-label="Tutup menu info"
                className="p-1 rounded-lg text-[#64748B] hover:text-[#172554] active:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Destinations Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <button
                type="button"
                onClick={() => jumpTo("about")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <Info className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">Tentang Gitgud</div>
                  <div className="text-[9.5px] text-[#64748B]">Ruang Main Baciro</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpTo("how-to-play")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <Footprints className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">Alur Kunjungan</div>
                  <div className="text-[9.5px] text-[#64748B]">4 Langkah Mudah</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpTo("games")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <Dices className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">Koleksi 300+ Game</div>
                  <div className="text-[9.5px] text-[#64748B]">Filter &amp; Dadu Acak</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpTo("events")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <Ticket className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">Event &amp; BOTC</div>
                  <div className="text-[9.5px] text-[#64748B]">Kamis Gratis RSVP</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpTo("menu")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <Utensils className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">Menu Cafe &amp; Bites</div>
                  <div className="text-[9.5px] text-[#64748B]">Kopi, Mocktail &amp; Food</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpTo("faq")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF5F0] border border-slate-200 text-left text-[#172554] font-semibold active:scale-98 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold">FAQ &amp; Bantuan</div>
                  <div className="text-[9.5px] text-[#64748B]">Biaya, Jam &amp; Aturan</div>
                </div>
              </button>
            </div>

            {/* Practical Venue Info Box */}
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 text-xs font-sans space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <div className="font-bold text-[#172554]">Jam Operasional Kafe:</div>
                  <div className="text-[11px] text-[#475569]">Senin - Kamis: 07.00 - 00.00 WIB</div>
                  <div className="text-[11px] font-bold text-brand-orange">Jumat - Minggu: 24 Jam Non-Stop</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-2 text-[11px] text-[#334155]">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>Jl. Soka no. 44 Baciro</span>
                </div>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="text-[10px] font-bold text-brand-orange hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  {addressCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <span>Salin Alamat</span>
                  )}
                </button>
              </div>
            </div>

            {/* Audio Toggle & Direct Map Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playButtonClick();
                  toggleSound();
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer active:scale-95 transition-all ${
                  muted
                    ? "bg-[#F8FAFC] border-slate-200 text-[#64748B]"
                    : "bg-[#FFF5F0] border-brand-orange/30 text-brand-orange"
                }`}
              >
                {muted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Efek Suara: Mati</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Efek Suara: Nyala</span>
                  </>
                )}
              </button>

              <a
                href="https://share.google/u0UPT7njRoXYm9kZc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playButtonClick()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#172554] text-xs font-semibold cursor-pointer active:scale-95 transition-all text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-[#1B64B4]" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Luxury Mobile Sticky Dock */}
      <aside
        aria-label="Navigasi Cepat Mobile"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden animate-fade-in-up"
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-6px_25px_rgba(23,37,84,0.07)] px-2 sm:px-3 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
          {/* Top Micro-Rail: Operational Status & Quick Expand Trigger */}
          <div className="flex items-center justify-between px-1.5 pb-1 mb-1 border-b border-slate-100 text-[9.5px] font-sans">
            <div className="flex items-center gap-1.5 font-bold text-[#172554] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Baciro HQ • Buka Sekarang</span>
              <span className="text-brand-orange hidden xs:inline">• Weekend 24 Jam</span>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playCardSnap();
                setSheetOpen(!sheetOpen);
              }}
              className="inline-flex items-center gap-1 text-[#475569] hover:text-brand-orange font-semibold px-1.5 py-0.5 rounded hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span>Info &amp; Menu</span>
              <ChevronUp className={`w-3 h-3 transition-transform ${sheetOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Primary Navigation Dock Strip */}
          <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
            {DOCK_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jumpTo(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all cursor-pointer active:scale-92 ${
                    isActive
                      ? "text-brand-orange bg-[#FFF5F0]"
                      : "text-[#475569] hover:text-[#172554] active:bg-slate-50"
                  }`}
                >
                  <div className="relative">
                    <IconComponent
                      className={`w-4.5 h-4.5 mb-0.5 transition-transform ${
                        isActive ? "scale-110 text-brand-orange" : "text-[#475569]"
                      }`}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-2.5 text-[8px] font-bold px-1 py-0.2 rounded-full bg-brand-orange text-white leading-none">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-sans text-[10px] leading-tight ${
                      isActive ? "font-bold text-brand-orange" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 w-3 h-[2px] rounded-full bg-brand-orange" />
                  )}
                </button>
              );
            })}

            {/* Direct WhatsApp Reservation Pill */}
            <a
              href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20reservasi%20meja%20boardgame%20dong!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playSuccessChime()}
              className="luxury-btn luxury-sheen flex-[1.3] inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold text-[11px] tracking-wide shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>RESERVASI</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
