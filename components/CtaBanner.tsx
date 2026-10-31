"use client";

import { soundEffects } from "@/lib/soundEffects";

export default function CtaBanner() {
  return (
    <section className="py-8 sm:py-10 px-4 lg:px-12 bg-brand-orange text-white border-b-2 border-[#D83B13]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight">
            SIAP NONGKRONG DAN BIKIN KENANGAN BARU?
          </h2>
          <p className="font-medium text-xs sm:text-sm mt-1.5 text-white/90">
            Booking meja untuk tim kamu sekarang atau langsung datang ke Gitgud
            Jogja!
          </p>
        </div>
        <a
          href="https://wa.me/?text=Halo%20Gitgud,%20mau%20tanya%20meja%20untuk%20malam%20ini"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEffects.playSuccessChime()}
          className="bg-white hover:bg-[#F0F7FF] text-[#E84A27] border-2 border-white px-6 py-3 rounded font-display font-black text-xs sm:text-sm tracking-wide shadow-[3px_3px_0px_0px_#1B64B4] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0 whitespace-nowrap cursor-pointer"
        >
          HUBUNGI VIA WHATSAPP
        </a>
      </div>
    </section>
  );
}
