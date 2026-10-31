"use client";

import { Dices, CalendarDays, MapPin, UserCheck } from "lucide-react";
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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F0F7FF] min-h-[calc(100vh-6rem)] flex flex-col justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
        {/* Kolom Kiri: Copywriting & Hierarki */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 z-10">
          {/* Pill Badge Atas */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1B64B4]/25 text-xs sm:text-sm text-[#172554] font-mono w-fit shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E84A27] shrink-0" />
            <span className="font-bold text-[#172554]">Baciro, Jogja</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7B5CB]" />
            <span className="text-[#475569] font-medium">Cafe &amp; Board Game Lounge</span>
          </div>

          {/* Headline Utama with Squiggle Wave Underline */}
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] leading-[1.14] tracking-tight text-[#172554]">
            Bosan Nongkrong Cuma Main HP? Saatnya{" "}
            <span className="relative inline-block text-[#E84A27] whitespace-nowrap">
              <span>Adu Taktik</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#E84A27] pointer-events-none overflow-visible"
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
            di Gitgud.
          </h1>

          {/* Subheadline (Bahasa Indonesia Santai) */}
          <p className="text-[#334155] text-sm sm:text-base xl:text-lg leading-relaxed max-w-2xl font-sans">
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
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#games"
              onClick={(e) => scrollTo(e, "games")}
              className="bg-[#E84A27] hover:bg-[#D83B13] active:scale-[0.98] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-display font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-[2.5px_2.5px_0px_0px_#1B64B4] border-2 border-[#1B64B4] cursor-pointer"
            >
              <Dices className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Jelajahi 300+ Koleksi Game</span>
            </a>
            <a
              href="#events"
              onClick={(e) => scrollTo(e, "events")}
              className="bg-white hover:bg-[#FFF5F8] border-2 border-brand-pink hover:border-[#E84A27] active:scale-[0.98] text-[#172554] px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-display font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-[2.5px_2.5px_0px_0px_#F7B5CB] cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 text-[#C2185B] shrink-0" />
              <span>Event BOTC Kamis</span>
            </a>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-[#1B64B4]/15 max-w-xl">
            <div>
              <div className="font-display font-black text-xl sm:text-2xl xl:text-3xl text-[#E84A27] tracking-tight">
                300+
              </div>
              <div className="text-xs sm:text-sm text-[#475569] font-mono mt-0.5 leading-tight font-medium">
                Pilihan Board Game
              </div>
            </div>
            <div>
              <div className="font-display font-black text-xl sm:text-2xl xl:text-3xl text-[#1B64B4] tracking-tight">
                24 Jam
              </div>
              <div className="text-xs sm:text-sm text-[#475569] font-mono mt-0.5 leading-tight font-medium">
                Buka Jumat – Minggu
              </div>
            </div>
            <div>
              <div className="font-display font-black text-xl sm:text-2xl xl:text-3xl text-[#C2185B] tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm text-[#475569] font-mono mt-0.5 leading-tight font-medium">
                Diajarin Game Master
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Gud Game Picker & Solo Player Banner */}
        <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 z-10 relative">
          {/* Ambient Warm Glow behind right card */}
          <div
            className="absolute -top-12 -bottom-12 -left-12 -right-12 sm:-inset-16 bg-[radial-gradient(circle,rgba(232,74,39,0.08)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />

          <DicePicker />

          {/* Solo Player Banner di Bawah Widget */}
          <div className="bg-white border-2 border-[#1B64B4]/20 border-l-4 border-l-[#E84A27] rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#FFF0EB] border border-[#E84A27]/30 flex items-center justify-center text-[#E84A27] shrink-0 mt-0.5">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-xs sm:text-sm text-[#172554]">
                Datang Sendirian? No Problem!
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed mt-0.5 font-sans">
                Banyak komunitas &amp; game solo yang bisa kamu gabung. Staff dan
                Game Master kami siap nemenin &amp; ngenalin ke sesama pengunjung!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}