"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

interface FaqItem {
  q: string;
  a: string;
  accent: "orange" | "blue" | "pink" | "lightblue";
}

const FAQS: FaqItem[] = [
  {
    q: "Berapa biaya main board game di Gitgud?",
    a: "Cukup pesan menu F&B (makanan atau minuman) favoritmu mulai dari 15 ribuan! Tidak ada tiket masuk terpisah, dan kamu bebas pilih 300+ board game sepuasnya dipandu Game Master kami.",
    accent: "orange",
  },
  {
    q: "Bisa datang sendirian tanpa teman (Solo Player)?",
    a: "Tentu saja bisa! Banyak komunitas dan squad open-table yang siap menyambut teman baru. Tim Game Master kami juga siap menemani dan mengenalkan kamu ke sesama board gamers.",
    accent: "lightblue",
  },
  {
    q: "Kapan jadwal Blood on the Clocktower (BOTC) diadakan?",
    a: "Sesi Blood on the Clocktower diadakan setiap hari Kamis malam mulai pukul 19.00 WIB. Mainnya GRATIS! Cukup RSVP tempatmu melalui DM Instagram @letsgitgud karena seat terbatas.",
    accent: "pink",
  },
  {
    q: "Beneran buka 24 jam non-stop saat weekend?",
    a: "Iya, 100% beneran! Mulai Jumat pagi pukul 07.00 WIB sampai Minggu tengah malam, Gitgud buka 24 jam non-stop buat kamu yang mau main atau nongkrong maraton bareng squad.",
    accent: "blue",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    soundEffects.playCardSnap();
    setOpenIndex(openIndex === index ? null : index);
  };

  const getBorderColor = (accent: FaqItem["accent"]) => {
    switch (accent) {
      case "orange":
        return "border-brand-orange hover:shadow-brutal-orange";
      case "lightblue":
        return "border-brand-lightblue hover:shadow-brutal-lightblue";
      case "pink":
        return "border-brand-pink hover:shadow-brutal-pink";
      case "blue":
      default:
        return "border-brand-blue hover:shadow-brutal-blue";
    }
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 content-visibility-auto min-h-[calc(100vh-4rem)] flex flex-col py-6 sm:py-8 lg:py-10 px-4 lg:px-12 bg-[#F8FAFC] border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-4xl mx-auto w-full my-auto">
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-8">
          {/* Creative Tabletop Rulebook Codex Stamp Token */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF5F2] border-2 border-brand-orange text-brand-orange rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_0px_#E84A27] mb-2.5 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 cursor-default group">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 border border-brand-orange shadow-xs group-hover:rotate-12 transition-transform">
              <BookOpen className="w-3.5 h-3.5 text-white shrink-0" />
            </span>
            <span className="text-[#64748B] font-bold text-[10px]">CODEX</span>
            <span className="text-brand-orange select-none">•</span>
            <span className="text-[#172554]">FAQ & GAME PROTOCOLS</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#172554] tracking-tight mt-1.5">
            PERTANYAAN SERING DITANYAKAN
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm mt-1.5 max-w-lg">
            Semua hal yang perlu kamu tahu sebelum nongkrong dan duel game di Gitgud Jogja:
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-200 ${getBorderColor(
                  item.accent
                )}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-xs sm:text-sm md:text-base text-[#172554] leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-brand-orange text-white"
                        : "bg-[#F0F7FF] text-[#1B64B4]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-3 text-xs sm:text-sm text-[#334155] font-sans leading-relaxed border-t border-[#1B64B4]/10 bg-[#FAFCFF]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
