import { Compass } from "lucide-react";

export default function HowToPlaySection() {
  const steps = [
    {
      num: "01",
      color: "text-brand-orange",
      title: "Datang & Pilih Meja",
      desc: "Langsung mampir ke cafe di Baciro, pilih meja yang paling cozy buat squad kamu.",
    },
    {
      num: "02",
      color: "text-[#C2185B]",
      title: "Pesan Minuman / Snack",
      desc: "Order kopi favorit kamu di bar biar sesi main makin fokus dan seru.",
    },
    {
      num: "03",
      color: "text-[#1B64B4]",
      title: "Pilih Game di Rak",
      desc: "Pilih sendiri game yang kamu suka atau minta rekomendasi game master kami.",
    },
    {
      num: "04",
      color: "text-[#1B64B4]",
      title: "Diajarin Sampai Paham!",
      desc: "Game Master bakal mandu rules step-by-step. Kamu tinggal enjoy gamenya!",
    },
  ];

  return (
    <section
      id="how-to-play"
      className="scroll-mt-16 content-visibility-auto py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#F8FAFC] border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="border-2 border-[#1B64B4]/25 bg-white rounded-2xl p-6 sm:p-8 md:p-10 relative shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              {/* Creative Tabletop Newbie Quest Token */}
              <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#F0F7FF] border-2 border-brand-lightblue text-[#1B64B4] rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#5BB5F8] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
                <span className="w-6 h-6 rounded-full bg-brand-lightblue text-[#172554] flex items-center justify-center shrink-0 border border-brand-lightblue shadow-xs group-hover:rotate-45 transition-transform">
                  <Compass className="w-3.5 h-3.5 text-[#172554] shrink-0" />
                </span>
                <span className="text-[#475569] font-bold text-[10px]">QUEST</span>
                <span className="text-brand-lightblue select-none">•</span>
                <span className="text-[#172554]">NEWBIE GUIDE</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#172554] mt-3 tracking-tight leading-tight">
                Gimana Cara Main di Gitgud?
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#475569] font-mono max-w-sm leading-relaxed">
              Gak perlu malu kalau baru pertama kali! Langkahnya gampang banget:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#F8FAFC] p-5 sm:p-6 rounded-xl border-2 border-[#1B64B4]/15 hover:border-[#1B64B4]/40 transition-colors shadow-2xs min-h-[170px] sm:min-h-[190px] flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`font-display font-black text-3xl sm:text-4xl ${step.color} mb-2`}
                  >
                    {step.num}
                  </div>
                  <h4 className="font-bold text-[#172554] text-sm sm:text-base mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
