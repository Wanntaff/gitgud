"use client";

import { soundEffects } from "@/lib/soundEffects";

export default function CtaBanner() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-brand-orange text-white border-b-2 border-[#D83B13]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] tracking-tight leading-tight">
            SIAP NONGKRONG DAN BIKIN KENANGAN BARU?
          </h2>
          <p className="font-medium text-sm sm:text-base mt-2.5 text-white/90 max-w-xl">
            Booking meja untuk tim kamu sekarang atau langsung datang ke Gitgud
            Jogja!
          </p>
        </div>
        <a
          href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20tanya%20meja%20untuk%20malam%20ini"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEffects.playSuccessChime()}
          className="bg-white hover:bg-[#F0F7FF] text-[#E84A27] border-2 border-white px-7 py-3.5 sm:py-4 rounded font-display font-black text-xs sm:text-sm md:text-base tracking-wide shadow-[3px_3px_0px_0px_#1B64B4] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0 whitespace-nowrap cursor-pointer"
        >
          HUBUNGI VIA WHATSAPP
        </a>
      </div>
    </section>
  );
}
