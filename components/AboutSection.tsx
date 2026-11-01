import { Layers, Compass, Coffee, Moon } from "lucide-react";
import MeepleIcon from "./MeepleIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 lg:mb-14">
          {/* Creative Tabletop Meeple Guild Seal Ribbon */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF5F2] border-2 border-brand-orange text-brand-orange rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#E84A27] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 border border-brand-orange shadow-xs group-hover:rotate-12 transition-transform">
              <MeepleIcon className="w-3.5 h-3.5 text-white shrink-0" />
            </span>
            <span className="text-[#475569] font-bold text-[10px]">GUILD 01</span>
            <span className="text-brand-orange select-none">•</span>
            <span className="text-[#172554]">LEVEL UP NONGKRONG KAMU</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
            BUKAN CAFE BIASA, INI TEMPAT BIKIN CERITA
          </h2>
          <p className="text-[#475569] text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
            Dari pemula yang baru kenal Uno sampai veteran D&amp;D kampanye puluhan
            jam, semua punya tempat di meja kami.
          </p>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex md:hidden items-center justify-between text-xs font-mono text-[#64748B] mb-3 px-1">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span>Geser kartu ke samping →</span>
          </span>
          <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-bold text-[#475569]">
            4 Keunggulan
          </span>
        </div>

        {/* Cards: Mobile Touch-Friendly Snap Track / Desktop 4-Col Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none gap-4 sm:gap-7 -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 md:pb-0 scroll-pl-4 scroll-pr-4">
          {/* Card 1: Dominant Orange */}
          <div className="w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border-2 border-[#1B64B4]/20 rounded-xl p-5 sm:p-7 shadow-brutal-orange hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[210px] sm:min-h-[240px]">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-orange text-white rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-xl text-[#172554] mb-1.5 sm:mb-2">
                300+ Koleksi Game
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Dari party games seru, strategi berat, bluffing, sampai game
                langka impor. Katalog game kami terus bertambah tiap bulan!
              </p>
            </div>
          </div>

          {/* Card 2: Light Blue */}
          <div className="w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border-2 border-[#1B64B4]/20 rounded-xl p-5 sm:p-7 shadow-brutal-lightblue hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[210px] sm:min-h-[240px]">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-lightblue text-[#172554] rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-xl text-[#172554] mb-1.5 sm:mb-2">
                Game Master Standby
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Males baca buku panduan 20 halaman? Tenang! Game Master kami
                bakal jelasin cara mainnya sampai squad kamu langsung paham.
              </p>
            </div>
          </div>

          {/* Card 3: Soft Pink */}
          <div className="w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border-2 border-[#1B64B4]/20 rounded-xl p-5 sm:p-7 shadow-brutal-pink hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[210px] sm:min-h-[240px]">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-pink text-[#172554] rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-xl text-[#172554] mb-1.5 sm:mb-2">
                Specialty Espresso Bar
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Mesin espresso profesional, racikan kopi artisan, dan aneka
                artisan mocktails &amp; snack ramah boardgame (gak bikin kartu
                berminyak!).
              </p>
            </div>
          </div>

          {/* Card 4: Royal Blue */}
          <div className="w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border-2 border-[#1B64B4]/20 rounded-xl p-5 sm:p-7 shadow-brutal-blue hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[210px] sm:min-h-[240px]">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs">
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-xl text-[#172554] mb-1.5 sm:mb-2">
                Weekend <span className="whitespace-nowrap">24 Jam</span>
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Main game seru kepotong jam tutup cafe? Gak di Gitgud! Hari Jumat
                sampai Minggu kami gas{" "}
                <span className="whitespace-nowrap font-semibold text-[#1B64B4]">
                  24 jam non-stop
                </span>{" "}
                buat kamu dan teman-teman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
