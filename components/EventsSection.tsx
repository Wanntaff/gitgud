"use client";

import { CheckCircle, CalendarDays, Ticket } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function EventsSection() {
  const events = [
    {
      day: "RABU",
      dayColor: "bg-[#FFF0EB] text-[#E84A27] border border-[#E84A27]/30",
      title: "Trivia Night & Pop Quiz",
      desc: "Uji pengetahuan umum, pop culture, anime & gaming bareng tim kamu berhadiah treat khusus!",
      badge: "Open for Public",
      badgeColor: "text-[#1B64B4] bg-[#EBF5FF] border border-[#5BB5F8]/40",
      borderAccent: "border-brand-lightblue",
    },
    {
      day: "SABTU",
      dayColor: "bg-[#EBF5FF] text-[#1B64B4] border border-[#1B64B4]/30",
      title: "D&D One-Shot Campaign",
      desc: "Sesi petualangan Dungeons & Dragons ramah pemula. Disediakan lembar karakter & dadu.",
      badge: "By Registration",
      badgeColor: "text-[#E84A27] bg-[#FFF0EB] border border-brand-orange/40",
      borderAccent: "border-brand-orange",
    },
    {
      day: "MINGGU",
      dayColor: "bg-[#FFF0F5] text-[#C2185B] border border-[#F7B5CB]",
      title: "Midnight Gaming Chill",
      desc: "Nongkrong santai 24 jam dengan diskon minuman khusus midnight players.",
      badge: "24 Hours",
      badgeColor: "text-[#C2185B] bg-[#FFF0F5] border border-[#F7B5CB]",
      borderAccent: "border-brand-pink",
    },
  ];

  return (
    <section
      id="events"
      className="scroll-mt-16 content-visibility-auto py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#F8FAFC] border-b-2 border-[#1B64B4]/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Event Poster Style Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-gradient-to-b from-[#FFF5F8] via-[#FFF9F6] to-white border-3 border-brand-orange rounded-2xl p-6 sm:p-8 shadow-brutal-orange relative overflow-hidden">
              {/* Tactile Tabletop Perforated Ticket Punch Badge */}
              <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-brand-orange text-white font-mono font-black text-[10px] sm:text-[11px] tracking-wider uppercase border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] mb-3.5 select-none before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FFF5F8] after:absolute after:-right-1.5 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-[#FFF5F8]">
                <Ticket className="w-3.5 h-3.5 text-white shrink-0 animate-pulse-subtle" />
                <span>TICKET // SPECIAL EVENT MINGGUAN</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#172554] leading-snug mb-3 tracking-tight break-words">
                BLOOD ON THE
                <br />
                <span>CLOCKTOWER</span>{" "}
                <span className="text-brand-orange">NIGHT</span>
              </h3>
              <p className="text-[#C2185B] font-mono font-bold text-xs sm:text-sm mb-3.5 inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 shrink-0 text-[#C2185B]" />
                <span>SETIAP KAMIS MALAM — GRATIS!</span>
              </p>
              <p className="text-[#334155] text-xs sm:text-sm leading-relaxed mb-5">
                Desa kembali penuh dengan kecurigaan... Siapa yang jujur? Siapa
                yang berbohong? Game deduksi sosial nomor 1 di dunia hadir
                gratis untuk kamu dan teman-teman!
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm font-mono text-[#172554] mb-6">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B64B4] shrink-0" />
                  <span>Semua pemain punya ability unik</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B64B4] shrink-0" />
                  <span>Yang mati tetap bisa bicara &amp; ikut voting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1B64B4] shrink-0" />
                  <span>Seat terbatas (Wajib RSVP duluan)</span>
                </div>
              </div>

              <a
                href="https://ig.me/m/letsgitgud"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playSuccessChime()}
                className="w-full block text-center bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-black py-3 sm:py-3.5 px-5 rounded-lg border-2 border-[#1B64B4] shadow-[3px_3px_0px_0px_#F7B5CB] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
              >
                DAFTAR VIA DM INSTAGRAM
              </a>
            </div>
          </div>

          {/* Right: Other Events & Schedule */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <div>
              {/* Creative Tabletop Admission Ticket Pass Token */}
              <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF0F5] border-2 border-brand-pink text-[#C2185B] rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#F7B5CB] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
                <span className="w-6 h-6 rounded-full bg-brand-pink text-[#172554] flex items-center justify-center shrink-0 border border-brand-pink shadow-xs font-mono font-black text-xs group-hover:rotate-12 transition-transform">
                  <Ticket className="w-3.5 h-3.5 text-[#172554] shrink-0" />
                </span>
                <span className="text-[#475569] font-bold text-[10px]">PASS 03</span>
                <span className="text-brand-pink select-none">•</span>
                <span className="text-[#172554]">COMMUNITY SESSIONS</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
                SELALU ADA KESERUAN TIAP PEKAN
              </h2>
              <p className="text-[#475569] text-sm sm:text-base mt-2">
                Gitgud bukan cuma tempat main pasif, kami punya jadwal event
                komunitas seru yang bisa kamu ikuti:
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-4.5 mt-1">
              {events.map((evt) => (
                <div
                  key={evt.day}
                  className="bg-white p-5 sm:p-6 rounded-xl border-2 border-[#1B64B4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#1B64B4]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${evt.dayColor} flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0`}
                    >
                      <span>{evt.day}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-[#172554]">
                        {evt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">{evt.desc}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold ${evt.badgeColor} border-l-2 ${evt.borderAccent} px-2.5 py-1 rounded-r-xs shrink-0 whitespace-nowrap self-start sm:self-auto tracking-wider uppercase`}
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
