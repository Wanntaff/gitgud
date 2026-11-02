"use client";

import { soundEffects } from "@/lib/soundEffects";

export default function CtaBanner() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-brand-orange text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] tracking-tight leading-tight">
            MEJA SIAP, KOPI DISEDUH, GAME TINGGAL DIPILIH.
          </h2>
          <p className="font-medium text-xs sm:text-base mt-2 sm:mt-2.5 text-white/90 max-w-xl font-sans">
            Langsung mampir ke Baciro atau hubungi tim kami via WhatsApp buat tanya ketersediaan meja squad kamu.
          </p>
        </div>
        <a
          href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20tanya%20meja%20untuk%20malam%20ini"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEffects.playSuccessChime()}
          className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-brand-orange px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-display font-bold text-xs sm:text-sm md:text-base tracking-wide shadow-xs active:scale-[0.98] transition-all shrink-0 whitespace-nowrap cursor-pointer"
        >
          HUBUNGI KAMI VIA WHATSAPP
        </a>
      </div>
    </section>
  );
}
