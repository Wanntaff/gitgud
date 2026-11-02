"use client";

import { CheckCircle, CalendarDays, Ticket } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function EventsSection() {
  const events = [
    {
      day: "RABU",
      dayColor: "bg-[#F8FAFC] text-[#172554] border border-slate-200",
      title: "Trivia Night & Pop Quiz",
      desc: "Uji pengetahuan umum, pop culture, anime & gaming bareng tim kamu berhadiah treat khusus!",
      badge: "Open for Public",
    },
    {
      day: "SABTU",
      dayColor: "bg-[#FFF5F0] text-brand-orange border border-brand-orange/20",
      title: "D&D One-Shot Campaign",
      desc: "Sesi petualangan Dungeons & Dragons ramah pemula. Disediakan lembar karakter & dadu.",
      badge: "By Registration",
    },
    {
      day: "MINGGU",
      dayColor: "bg-[#F0F7FF] text-[#172554] border border-slate-200",
      title: "Midnight Gaming Chill",
      desc: "Nongkrong santai 24 jam dengan diskon minuman khusus midnight players.",
      badge: "24 Hours Non-stop",
    },
  ];

  return (
    <section
      id="events"
      className="scroll-mt-20 py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Event Poster Style Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-brand-orange/30 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-mono font-bold text-xs tracking-wide uppercase mb-3">
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                <span>Special Event Mingguan</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#172554] leading-snug mb-2 sm:mb-3 tracking-tight break-words">
                BLOOD ON THE
                <br />
                <span>CLOCKTOWER</span>{" "}
                <span className="text-brand-orange">NIGHT</span>
              </h3>
              <p className="text-brand-orange font-mono font-bold text-xs sm:text-sm mb-3 inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>SETIAP KAMIS MALAM — GRATIS!</span>
              </p>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                Desa kembali penuh dengan kecurigaan... Siapa yang jujur? Siapa
                yang berbohong? Game deduksi sosial nomor 1 di dunia hadir
                gratis untuk kamu dan teman-teman!
              </p>

              <div className="space-y-2 text-xs sm:text-sm font-mono text-[#172554] mb-5 sm:mb-6">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Semua pemain punya ability unik</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Yang mati tetap bisa bicara &amp; ikut voting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Seat terbatas (Wajib RSVP duluan)</span>
                </div>
              </div>

              <a
                href="https://ig.me/m/letsgitgud"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playSuccessChime()}
                className="w-full block text-center bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.98] text-white font-display font-bold py-3 sm:py-3.5 px-5 rounded-lg shadow-xs transition-all text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
              >
                DAFTAR VIA DM INSTAGRAM
              </a>
            </div>
          </div>

          {/* Right: Other Events & Schedule */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            <div>
              {/* Section Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-mono text-xs font-semibold">
                <CalendarDays className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>Jadwal Komunitas</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-[1.65rem] md:text-[1.75rem] lg:text-2xl xl:text-[1.85rem] 2xl:text-[2.15rem] text-[#172554] mt-2.5 sm:mt-3 tracking-tight leading-tight">
                JADWAL MAIN BARENG <br className="hidden sm:inline" />
                KOMUNITAS BACIRO
              </h2>
              <p className="text-[#475569] text-xs sm:text-base mt-1.5 sm:mt-2 leading-relaxed font-sans">
                Terbuka untuk umum. Datang sendirian pun langsung dapat meja dan teman main baru:
              </p>
            </div>

            {/* Mobile Swipe Notice */}
            <div className="flex lg:hidden items-center justify-between text-xs font-mono text-[#64748B] mb-0.5 px-0.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
                <span>Geser jadwal mingguan</span>
                <span className="text-brand-orange font-bold">→</span>
              </span>
              <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium text-[#475569]">
                3 Sesi Rutin
              </span>
            </div>

            {/* Events: Mobile Touch-Friendly Snap Track / Desktop Vertical List */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-4.5 mt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 lg:pb-0 scroll-pl-4 scroll-pr-4">
              {events.map((evt) => (
                <div
                  key={evt.day}
                  className="w-[84vw] sm:w-[70vw] max-w-[320px] shrink-0 snap-start lg:w-full lg:max-w-none bg-white p-4.5 sm:p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg ${evt.dayColor} flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0`}
                    >
                      <span>{evt.day}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#172554]">
                        {evt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#475569] mt-0.5 leading-relaxed">{evt.desc}</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold bg-[#F8FAFC] border border-slate-200 text-[#475569] px-2.5 py-1 rounded shrink-0 whitespace-nowrap self-start sm:self-auto tracking-wider uppercase"
                  >
                    {evt.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
