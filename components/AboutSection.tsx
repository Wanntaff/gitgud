import { Layers, Compass, Coffee, Moon } from "lucide-react";
import MeepleIcon from "./MeepleIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 content-visibility-auto min-h-[calc(100vh-4rem)] flex flex-col py-6 sm:py-8 lg:py-10 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          {/* Creative Tabletop Meeple Guild Seal Ribbon */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF5F2] border-2 border-brand-orange text-brand-orange rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#E84A27] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 border border-brand-orange shadow-xs group-hover:rotate-12 transition-transform">
              <MeepleIcon className="w-3.5 h-3.5 text-white shrink-0" />
            </span>
            <span className="text-[#475569] font-bold text-[10px]">GUILD 01</span>
            <span className="text-brand-orange select-none">•</span>
            <span className="text-[#172554]">LEVEL UP NONGKRONG KAMU</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#172554] mt-2.5 tracking-tight">
            BUKAN CAFE BIASA, INI TEMPAT BIKIN CERITA
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm mt-2">
            Dari pemula yang baru kenal Uno sampai veteran D&amp;D kampanye puluhan
            jam, semua punya tempat di meja kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Dominant Orange */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-4 sm:p-5 shadow-brutal-orange hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 bg-brand-orange text-white rounded-lg flex items-center justify-center font-bold mb-3 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
              300+ Koleksi Game
            </h3>
            <p className="text-[#475569] text-xs leading-relaxed">
              Dari party games seru, strategi berat, bluffing, sampai game
              langka impor. Katalog game kami terus bertambah tiap bulan!
            </p>
          </div>

          {/* Card 2: Light Blue */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-4 sm:p-5 shadow-brutal-lightblue hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 bg-brand-lightblue text-[#172554] rounded-lg flex items-center justify-center font-bold mb-3 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
              Game Master Standby
            </h3>
            <p className="text-[#475569] text-xs leading-relaxed">
              Males baca buku panduan 20 halaman? Tenang! Game Master kami
              bakal jelasin cara mainnya sampai squad kamu langsung paham.
            </p>
          </div>

          {/* Card 3: Soft Pink */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-4 sm:p-5 shadow-brutal-pink hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 bg-brand-pink text-[#172554] rounded-lg flex items-center justify-center font-bold mb-3 shadow-xs">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
              Specialty Espresso Bar
            </h3>
            <p className="text-[#475569] text-xs leading-relaxed">
              Mesin espresso profesional, racikan kopi artisan, dan aneka
              artisan mocktails &amp; snack ramah boardgame (gak bikin kartu
              berminyak!).
            </p>
          </div>

          {/* Card 4: Royal Blue */}
          <div className="bg-white border-2 border-[#1B64B4]/20 rounded-xl p-4 sm:p-5 shadow-brutal-blue hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 bg-brand-blue text-white rounded-lg flex items-center justify-center font-bold mb-3 shadow-xs">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
              Weekend <span className="whitespace-nowrap">24 Jam</span>
            </h3>
            <p className="text-[#475569] text-xs leading-relaxed">
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
    </section>
  );
}
