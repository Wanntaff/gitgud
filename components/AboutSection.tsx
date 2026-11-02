import { Layers, Compass, Coffee, Moon } from "lucide-react";
import MeepleIcon from "./MeepleIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 lg:mb-14">
          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-mono text-xs font-semibold">
            <MeepleIcon className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>Ruang Bermain &amp; Cafe Baciro</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
            MEJA KAYU LEGA, KOLEKSI LENGKAP, GAK ADA KATA BOSAN
          </h2>
          <p className="text-[#475569] text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed font-sans">
            Mau main party game santai bareng bestie atau adu strategi kampanye berjam-jam, meja di Baciro selalu siap buat squad kamu.
          </p>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex md:hidden items-center justify-between text-xs font-mono text-[#64748B] mb-3 px-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
            <span>Geser kartu ke samping</span>
            <span className="text-brand-orange font-bold">→</span>
          </span>
          <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium text-[#475569]">
            4 Keunggulan
          </span>
        </div>

        {/* Cards: Mobile Touch-Friendly Snap Track / Desktop 4-Col Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 md:pb-0 scroll-pl-4 scroll-pr-4">
          {/* Card 1 */}
          <div className="tabletop-card group w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm flex flex-col justify-between min-h-[210px] sm:min-h-[230px]">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
                300+ Koleksi Game
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-sans">
                Dari party game seru, bluffing, deduksi sosial, sampai strategi berat edisi impor original.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="tabletop-card group w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm flex flex-col justify-between min-h-[210px] sm:min-h-[230px]">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F0F7FF] border border-[#1B64B4]/20 text-[#1B64B4] rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
                Game Master Standby
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-sans">
                Gak perlu pusing baca rulebook puluhan halaman. Game Master kami jelaskan aturan langsung di meja sampai squad kamu paham.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="tabletop-card group w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm flex flex-col justify-between min-h-[210px] sm:min-h-[230px]">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
                Specialty Espresso Bar
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-sans">
                Mesin espresso profesional, racikan kopi artisan, serta aneka mocktail dan camilan ramah kartu yang gak bikin tangan berminyak.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="tabletop-card group w-[80vw] sm:w-[68vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm flex flex-col justify-between min-h-[210px] sm:min-h-[230px]">
            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F0F7FF] border border-[#172554]/20 text-[#172554] rounded-lg flex items-center justify-center font-bold mb-3.5 sm:mb-4 shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#172554] mb-1.5">
                Weekend <span className="whitespace-nowrap">24 Jam</span>
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-sans">
                Sesi adu taktik gak bakal kepotong jam tutup. Dari Jumat pagi sampai Minggu tengah malam, kami buka 24 jam non-stop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
