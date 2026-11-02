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
      className="scroll-mt-[58px] py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Event Poster Style Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-brand-orange/30 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-sans font-bold text-xs tracking-wide uppercase mb-3">
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                <span>Special Event Mingguan</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#172554] leading-snug mb-2 sm:mb-3 tracking-tight break-words">
                BLOOD ON THE
                <br />
                <span>CLOCKTOWER</span>{" "}
                <span className="text-brand-orange">NIGHT</span>
              </h3>
              <p className="text-brand-orange font-sans font-bold text-xs sm:text-sm mb-3 inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>SETIAP KAMIS MALAM: GRATIS!</span>
              </p>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                Desa kembali penuh dengan kecurigaan. Siapa yang jujur? Siapa
                yang berbohong? Game deduksi sosial nomor 1 di dunia hadir
                gratis untuk kamu dan teman-teman!
              </p>

              <div className="space-y-2 text-xs sm:text-sm font-sans text-[#172554] mb-5 sm:mb-6">
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
                className="luxury-btn luxury-sheen w-full block text-center bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.98] text-white font-display font-bold py-3 sm:py-3.5 px-5 rounded-lg shadow-sm transition-all text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
              >
                DAFTAR VIA DM INSTAGRAM
              </a>
            </div>
          </div>

          {/* Right: Other Events & Schedule */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            <div>
              {/* Section Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-sans text-xs font-semibold">
                <CalendarDays className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>Jadwal Komunitas</span>
              </div>
              <h2 className="font-display font-bold text-[clamp(0.82rem,3.7vw,1.85rem)] text-[#172554] mt-2.5 sm:mt-3 tracking-tight leading-tight whitespace-nowrap">
                JADWAL MAIN BARENG KOMUNITAS BACIRO
              </h2>
              <p className="text-[#475569] text-xs sm:text-base mt-1.5 sm:mt-2 leading-relaxed font-sans">
                Terbuka untuk umum. Datang sendirian pun langsung dapat meja dan teman main baru:
              </p>
            </div>

            {/* Events: Clean Vertical Stack on Mobile & Desktop */}
            <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-1">
              {events.map((evt) => (
                <div
                  key={evt.day}
                  className="tabletop-card w-full bg-white hover:bg-slate-50/60 p-3.5 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs cursor-default"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`min-w-[54px] sm:min-w-[58px] px-2 h-10 sm:h-12 rounded-lg ${evt.dayColor} flex flex-col items-center justify-center font-sans font-bold text-[11px] sm:text-xs tracking-wider shrink-0`}
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
                    className="text-[10px] font-sans font-semibold bg-[#F8FAFC] border border-slate-200 text-[#475569] px-2.5 py-1 rounded shrink-0 whitespace-nowrap self-start sm:self-auto tracking-wider uppercase"
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
