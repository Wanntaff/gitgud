"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Berapa biaya main board game di Gitgud?",
    a: "Cukup pesan menu F&B (makanan atau minuman) favoritmu mulai dari 15 ribuan! Tidak ada tiket masuk terpisah, dan kamu bebas pilih 300+ board game sepuasnya dipandu Game Master kami.",
  },
  {
    q: "Bisa datang sendirian tanpa teman (Solo Player)?",
    a: "Tentu saja bisa! Banyak komunitas dan squad open-table yang siap menyambut teman baru. Tim Game Master kami juga siap menemani dan mengenalkan kamu ke sesama board gamers.",
  },
  {
    q: "Kapan jadwal Blood on the Clocktower (BOTC) diadakan?",
    a: "Sesi Blood on the Clocktower diadakan setiap hari Kamis malam mulai pukul 19.00 WIB. Mainnya GRATIS! Cukup RSVP tempatmu melalui DM Instagram @letsgitgud karena seat terbatas.",
  },
  {
    q: "Beneran buka 24 jam non-stop saat weekend?",
    a: "Iya, 100% beneran! Mulai Jumat pagi pukul 07.00 WIB sampai Minggu tengah malam, Gitgud buka 24 jam non-stop buat kamu yang mau main atau nongkrong maraton bareng squad.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    soundEffects.playCardSnap();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-[58px] py-8 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-5 sm:mb-10 lg:mb-12 scroll-reveal">
          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-sans text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>Bantuan &amp; Info Praktis</span>
          </div>

          <h2 className="font-display font-bold text-xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] tracking-tight mt-2.5 sm:mt-3">
            PERTANYAAN SEPUTAR GITGUD
          </h2>
          <p className="text-[#475569] text-xs sm:text-base mt-1.5 sm:mt-2.5 max-w-xl font-sans">
            Informasi praktis seputar biaya, alur main, jam operasional, dan sesi komunitas di Baciro HQ:
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`tabletop-card bg-white border rounded-xl overflow-hidden transition-all duration-200 scroll-reveal stagger-${index + 1} ${
                  isOpen
                    ? "border-slate-300 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base md:text-lg text-[#172554] leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-[#FFF5F0] text-brand-orange"
                        : "bg-slate-100 text-[#475569]"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-3 text-[13px] sm:text-sm text-[#475569] font-sans leading-relaxed border-t border-slate-100 bg-[#F8FAFC] animate-fade-in-up">
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
