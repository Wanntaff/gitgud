import { Layers, Compass, Coffee, Moon } from "lucide-react";
import MeepleIcon from "./MeepleIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 content-visibility-auto py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Creative Tabletop Meeple Guild Seal Ribbon */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF5F2] border-2 border-brand-orange text-brand-orange rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#E84A27] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 border border-brand-orange shadow-xs group-hover:rotate-12 transition-transform">
              <MeepleIcon className="w-3.5 h-3.5 text-white shrink-0" />
            </span>
            <span className="text-[#475569] font-bold text-[10px]">GUILD 01</span>
            <span className="text-brand-orange select-none">•</span>
            <span className="text-[#172554]">LEVEL UP NONGKRONG KAMU</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#172554] mt-3 tracking-tight leading-tight">
            BUKAN CAFE BIASA, INI TEMPAT BIKIN CERITA
          </h2>
          <p className="text-[#475569] text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
            Dari pemula yang baru kenal Uno sampai veteran D&amp;D kampanye puluhan
            jam, semua punya tempat di meja kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {/* Card 1: Dominant Orange */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-6 sm:p-7 shadow-brutal-orange hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-brand-orange text-white rounded-lg flex items-center justify-center font-bold mb-4 shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#172554] mb-2">
                300+ Koleksi Game
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Dari party games seru, strategi berat, bluffing, sampai game
                langka impor. Katalog game kami terus bertambah tiap bulan!
              </p>
            </div>
          </div>

          {/* Card 2: Light Blue */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-6 sm:p-7 shadow-brutal-lightblue hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-brand-lightblue text-[#172554] rounded-lg flex items-center justify-center font-bold mb-4 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#172554] mb-2">
                Game Master Standby
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                Males baca buku panduan 20 halaman? Tenang! Game Master kami
                bakal jelasin cara mainnya sampai squad kamu langsung paham.
              </p>
            </div>
          </div>

          {/* Card 3: Soft Pink */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-6 sm:p-7 shadow-brutal-pink hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-brand-pink text-[#172554] rounded-lg flex items-center justify-center font-bold mb-4 shadow-xs">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#172554] mb-2">
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
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-6 sm:p-7 shadow-brutal-blue hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center font-bold mb-4 shadow-xs">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#172554] mb-2">
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
