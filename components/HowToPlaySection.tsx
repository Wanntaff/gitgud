import { Compass } from "lucide-react";

export default function HowToPlaySection() {
  const steps = [
    {
      num: "01",
      title: "Pilih Meja Squad",
      desc: "Langsung mampir ke Baciro HQ, pilih meja kayu lega yang paling nyaman buat rombonganmu.",
    },
    {
      num: "02",
      title: "Pesan Kopi & Camilan",
      desc: "Order minuman atau makanan di bar untuk nemenin fokus adu taktik tanpa bikin kartu berminyak.",
    },
    {
      num: "03",
      title: "Ambil Game di Rak",
      desc: "Pilih bebas dari 300+ koleksi fisik, atau minta rekomendasi judul yang cocok dari Game Master.",
    },
    {
      num: "04",
      title: "Dipandu Sampai Paham",
      desc: "Game Master siap menjelaskan aturan main langkah demi langkah. Duduk santai tanpa perlu baca rulebook.",
    },
  ];

  return (
    <section
      id="how-to-play"
      className="scroll-mt-20 py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="border border-slate-200 bg-white rounded-2xl p-5 sm:p-8 md:p-10 relative shadow-xs overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-10">
            <div>
              {/* Section Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F7FF] border border-[#1B64B4]/20 text-[#1B64B4] font-mono text-xs font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#1B64B4] shrink-0" />
                <span>Alur Kunjungan</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
                CARA NONGKRONG &amp; MAIN DI GITGUD
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] font-sans max-w-sm leading-relaxed">
              Pertama kali main di cafe board game? Alurnya santai dan fleksibel tanpa birokrasi ribet:
            </p>
          </div>

          {/* Mobile Swipe Notice */}
          <div className="flex sm:hidden items-center justify-between text-xs font-mono text-[#64748B] mb-3 px-0.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
              <span>Geser tahapan (01–04)</span>
              <span className="text-brand-orange font-bold">→</span>
            </span>
            <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium text-[#475569]">
              4 Langkah
            </span>
          </div>

          {/* Steps: Mobile Touch-Friendly Snap Track / Desktop 4-Col Grid */}
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 scroll-pl-4 scroll-pr-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="tabletop-card group w-[76vw] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-none bg-[#F8FAFC] hover:bg-white p-4.5 sm:p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm shadow-xs min-h-[160px] sm:min-h-[180px] flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="font-display font-black text-3xl sm:text-4xl text-brand-orange mb-2 group-hover:scale-105 origin-left transition-transform duration-200">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-[#172554] text-sm sm:text-base mb-1.5 group-hover:text-brand-orange transition-colors duration-200">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
