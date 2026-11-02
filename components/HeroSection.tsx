"use client";

import Image from "next/image";
import { Dices, CalendarDays, MapPin, UserCheck, Coffee, Sparkles } from "lucide-react";
import DicePicker from "./DicePicker";
import { soundEffects } from "@/lib/soundEffects";

export default function HeroSection() {
  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    soundEffects.playButtonClick();
    const element = document.getElementById(sectionId);
    if (element) {
      const nav = document.querySelector("nav");
      const offset = nav ? nav.offsetHeight + 8 : 72;
      const top =
        element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F0F7FF] min-h-[calc(100vh-96px)] flex flex-col justify-center py-6 sm:py-10 lg:py-10 xl:py-12 px-4 sm:px-6 lg:px-12 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
        {/* Kolom Kiri: Copywriting & Hierarki */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3.5 sm:gap-4.5 z-10">
          {/* Pill Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-[#172554] font-mono w-fit shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="font-bold text-[#172554]">Baciro, Jogja</span>
            <span className="text-[#CBD5E1] select-none">•</span>
            <span className="text-[#475569] font-medium">Cafe &amp; Board Game Lounge</span>
          </div>

          {/* Headline Utama with Squiggle Wave Underline */}
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.75rem] leading-[1.15] tracking-tight text-[#172554]">
            Bosan Nongkrong Cuma Main HP?{" "}
            <br className="hidden lg:inline" />
            Saatnya{" "}
            <span className="relative inline-block text-[#E84A27] whitespace-nowrap">
              <span>Adu Taktik</span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 text-[#E84A27] pointer-events-none overflow-visible"
                viewBox="0 0 100 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,6 Q12.5,1 25,6 T50,6 T75,6 T100,6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <span className="whitespace-nowrap">di Gitgud.</span>
          </h1>

          {/* Subheadline (Bahasa Indonesia Santai) */}
          <p className="text-[#334155] text-xs sm:text-[15px] lg:text-[15px] xl:text-base leading-relaxed max-w-xl font-sans">
            Nongkrong bukan sekadar scrolling HP. Di{" "}
            <strong className="text-[#172554] font-bold">Gitgud</strong>, kamu
            bisa duel taktik, tuduh temanmu di{" "}
            <span className="text-[#1B64B4] font-semibold italic">
              Blood on the Clocktower
            </span>
            , atau santai ngopi sambil coba ratusan board game bareng panduan
            ramah Game Master kami!
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-0.5 sm:pt-1">
            <a
              href="#games"
              onClick={(e) => scrollTo(e, "games")}
              className="bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.98] text-white px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Dices className="w-4 h-4 shrink-0" />
              <span>Jelajahi 300+ Koleksi Game</span>
            </a>
            <a
              href="#events"
              onClick={(e) => scrollTo(e, "events")}
              className="bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] text-[#172554] px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 text-brand-orange shrink-0" />
              <span>Event BOTC Kamis</span>
            </a>
          </div>

          {/* Quick Stats Bar */}
          <div
            data-testid="hero-stats"
            className="grid grid-cols-3 grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] gap-2 sm:gap-4 lg:gap-5 pt-3 sm:pt-5 mt-0.5 sm:mt-1 border-t border-slate-200 w-full max-w-xl"
          >
            <div className="min-w-0">
              <div className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] text-brand-orange tracking-tight whitespace-nowrap">
                300+
              </div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-mono mt-0.5 leading-snug font-medium">
                Pilihan Board Game
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] text-[#172554] tracking-tight whitespace-nowrap">
                24 Jam
              </div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-mono mt-0.5 leading-snug font-medium">
                Buka Jumat – Minggu
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] text-[#172554] tracking-tight whitespace-nowrap">
                100%
              </div>
              <div className="text-[10px] sm:text-xs text-[#64748B] font-mono mt-0.5 leading-snug font-medium">
                Diajarin Game Master
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: The Living Bento Hero Grid */}
        <div className="lg:col-span-7 xl:col-span-7 z-10 relative">
          {/* Ambient Warm Glow */}
          <div
            className="absolute -top-12 -bottom-12 -left-12 -right-12 sm:-inset-16 bg-[radial-gradient(circle,rgba(232,74,39,0.06)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">
            {/* Cell 1: Primary Cafe & Game Atmosphere Photo */}
            <div className="sm:col-span-7 relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xs group min-h-[250px] sm:min-h-[300px] flex flex-col justify-between p-3.5 sm:p-4">
              <Image
                src="/cafe/hero-lounge.jpg"
                alt="Suasana Meja Board Game & Cafe Gitgud Baciro Jogja"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 45vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              {/* Soft gradient overlay for high contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/90 via-[#0A1120]/30 to-black/15 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/40 text-[#172554] font-mono text-[10px] font-bold shadow-xs">
                  <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
                  <span>BACIRO HQ // MEJA 04</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#172554]/90 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-medium">
                  <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                  <span>Atmosphere</span>
                </span>
              </div>

              {/* Bottom Caption & Vibe Detail */}
              <div className="relative z-10 text-white">
                <div className="font-mono text-[9.5px] uppercase tracking-widest text-[#FF8566] font-bold mb-0.5">
                  Tabletop &amp; Cafe Lounge
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                  Meja Kayu Lega &amp; Suasana Hangat Bareng Squad
                </h3>
                <p className="text-[11px] text-slate-200/90 mt-0.5 line-clamp-2 font-sans">
                  Ratusan game fisik asli siap dimainkan santai tanpa batasan waktu terburu-buru.
                </p>
              </div>
            </div>

            {/* Right Stack in Bento: Cell 2 (Coffee) + Cell 3 (Solo Player) */}
            <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-3.5">
              {/* Cell 2: Specialty Coffee Bar Macro Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xs group h-[145px] sm:h-[150px] flex flex-col justify-between p-3">
                <Image
                  src="/cafe/hero-coffee.jpg"
                  alt="Specialty Espresso Bar Gitgud Cafe"
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/90 via-black/35 to-black/10 pointer-events-none" />

                {/* Top Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[#172554] font-mono text-[9px] font-bold shadow-xs">
                    <Coffee className="w-3 h-3 text-brand-orange shrink-0" />
                    <span>SPECIALTY BAR</span>
                  </span>
                </div>

                {/* Bottom Label */}
                <div className="relative z-10 text-white">
                  <h4 className="font-display font-bold text-xs sm:text-[13px] text-white leading-tight">
                    Artisan Coffee &amp; Snack
                  </h4>
                  <p className="text-[9.5px] text-slate-200 mt-0.5 font-mono">
                    Diseduh fresh • Gak bikin kartu berminyak
                  </p>
                </div>
              </div>

              {/* Cell 3: Solo Player Friendly Card */}
              <div className="relative rounded-2xl border border-slate-200 bg-white p-3 sm:p-3.5 shadow-xs flex-1 flex flex-col justify-between overflow-hidden">
                <div className="absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full bg-brand-orange" />
                <div className="flex items-start gap-2.5 pl-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[8.5px] font-bold text-brand-orange uppercase tracking-wider block">
                      COMMUNITY WELCOME
                    </span>
                    <h4 className="font-display font-bold text-xs text-[#172554] leading-tight mt-0.5">
                      Datang Solo? No Problem!
                    </h4>
                  </div>
                </div>
                <p className="text-[10px] text-[#64748B] pl-1 mt-1.5 leading-snug font-sans line-clamp-2">
                  Game Master kami siap nemenin &amp; ngenalin kamu ke meja open-squad yang ramah.
                </p>
              </div>
            </div>

            {/* Cell 4: Full-width Interactive Base: Compact DicePicker */}
            <div className="sm:col-span-12">
              <DicePicker compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}