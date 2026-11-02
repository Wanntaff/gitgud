"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  MessageCircle,
  Wifi,
  Zap,
  Wind,
  Copy,
  Check,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    soundEffects.playButtonClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        "Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta 55225"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="location"
      className="scroll-mt-[58px] py-8 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Venue Details & Primary Action */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Section Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-sans text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>Lokasi &amp; Jam Buka</span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-[1.75rem] md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] text-[#172554] mt-2.5 sm:mt-3 tracking-tight sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
                LOKASI &amp; JAM OPERASIONAL
              </h2>
              <p className="text-[#475569] text-xs sm:text-base mt-1.5 sm:mt-2 leading-relaxed">
                Terletak di Baciro, Gondokusuman — area tenang dengan akses mudah,
                parkir aman, dan meja bermain kayu yang lega.
              </p>

              {/* Address Card with Instant Copy for Ride-Hailing (Gojek/Grab) */}
              <div className="mt-4 sm:mt-6 bg-[#F8FAFC] p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#172554] text-xs sm:text-base">
                        Alamat Lengkap:
                      </h4>
                      <p className="text-xs sm:text-sm text-[#334155] mt-1 sm:mt-1.5 leading-relaxed font-sans">
                        Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta 55225
                      </p>
                    </div>
                  </div>

                  {/* One-tap Copy Button */}
                  <button
                    type="button"
                    onClick={copyAddress}
                    title="Salin alamat ke clipboard"
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-sans font-bold text-[#172554] transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hours Table */}
              <div className="mt-3.5 sm:mt-5 bg-[#F8FAFC] p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-bold text-[#172554] text-sm sm:text-base mb-3.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span>Jadwal Buka:</span>
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm font-sans">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-2.5 border-b border-slate-200/80 gap-1 sm:gap-2">
                    <span className="text-[#475569]">Senin - Kamis (Coffee Bar)</span>
                    <span className="text-[#172554] font-bold whitespace-nowrap">
                      07.00 - 00.00 WIB
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-2.5 border-b border-slate-200/80 gap-1 sm:gap-2">
                    <span className="text-[#475569]">
                      Senin - Kamis (Board Game)
                    </span>
                    <span className="text-[#172554] font-bold whitespace-nowrap">
                      10.00 - 23.00 WIB
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-2.5 bg-[#FFF5F0] border border-brand-orange/20 px-3 rounded-lg text-brand-orange font-bold gap-1 sm:gap-2">
                    <span className="whitespace-nowrap">Jumat - Minggu (Weekend)</span>
                    <span className="whitespace-nowrap inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>24 JAM NON-STOP</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue Facility Grid: Balanced 3-column micro-strip */}
              <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-2">
                <div className="tabletop-card flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-default">
                  <Wifi className="w-4 h-4 text-brand-orange mb-1 shrink-0" strokeWidth={1.8} />
                  <span className="font-semibold text-[11px] sm:text-xs text-[#172554] leading-tight">Wi-Fi Kencang</span>
                  <span className="text-[9.5px] text-[#64748B] font-sans mt-0.5">Fiber Optic</span>
                </div>
                <div className="tabletop-card flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-default">
                  <Zap className="w-4 h-4 text-brand-orange mb-1 shrink-0" strokeWidth={1.8} />
                  <span className="font-semibold text-[11px] sm:text-xs text-[#172554] leading-tight">Colokan Meja</span>
                  <span className="text-[9.5px] text-[#64748B] font-sans mt-0.5">Tiap Sudut</span>
                </div>
                <div className="tabletop-card flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs cursor-default">
                  <Wind className="w-4 h-4 text-brand-orange mb-1 shrink-0" strokeWidth={1.8} />
                  <span className="font-semibold text-[11px] sm:text-xs text-[#172554] leading-tight">AC &amp; Smoking</span>
                  <span className="text-[9.5px] text-[#64748B] font-sans mt-0.5">Area Terpisah</span>
                </div>
              </div>
            </div>

            {/* Primary Google Maps & WhatsApp Direct Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://share.google/u0UPT7njRoXYm9kZc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playButtonClick()}
                className="luxury-btn luxury-sheen inline-flex items-center justify-center flex-1 gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold py-3 sm:py-3.5 px-4 rounded-lg shadow-sm transition-all text-xs tracking-wider uppercase whitespace-nowrap cursor-pointer active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>BUKA GOOGLE MAPS</span>
              </a>
              <a
                href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20tanya%20arah%20lokasi%20atau%20reservasi!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playSuccessChime()}
                className="luxury-btn inline-flex items-center justify-center flex-1 gap-2 bg-white hover:bg-slate-50 text-[#172554] font-display font-bold py-3 sm:py-3.5 px-4 rounded-lg border border-slate-200 shadow-xs transition-all text-xs tracking-wider uppercase whitespace-nowrap cursor-pointer active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-brand-orange shrink-0" />
                <span>CHAT WA (+62 851-1748-4483)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Spacious Google Maps Viewport with Full Mobile Interactivity */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="min-h-[340px] sm:min-h-[520px] lg:min-h-[580px] h-[340px] sm:h-full bg-white border border-slate-200 rounded-xl overflow-hidden relative shadow-xs flex flex-col">
              {/* Google Maps Embed Iframe - Bulletproof Universal Embed for Mobile & Desktop */}
              <iframe
                title="Google Maps Lokasi Gitgud Board Game & Cafe Baciro"
                src="https://maps.google.com/maps?q=Gitgud+Board+Game+%26+Cafe,+Jl.+Soka+No.+44,+Baciro,+Gondokusuman,+Yogyakarta&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 [contain:paint] pointer-events-auto"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Minimalist Floating Top Header Bar */}
              <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-slate-200 text-[#172554] font-sans text-[11px] font-bold rounded-lg shadow-xs pointer-events-auto">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>BACIRO, YOGYAKARTA</span>
                </span>

                {/* Secondary Map Direct Action Link */}
                <a
                  href="https://share.google/u0UPT7njRoXYm9kZc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playButtonClick()}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-[#172554] hover:text-brand-orange font-sans text-[11px] font-bold rounded-lg border border-slate-200 shadow-xs backdrop-blur-md transition-all cursor-pointer active:scale-95"
                >
                  <Navigation className="w-3 h-3 text-brand-orange" />
                  <span>Buka Aplikasi</span>
                  <ExternalLink className="w-3 h-3 text-[#64748B]" />
                </a>
              </div>

              {/* Mobile-only Bottom Quick Control Overlay Strip */}
              <div className="relative z-10 mt-auto p-2.5 sm:hidden flex items-center justify-between gap-2 pointer-events-none">
                <span className="pointer-events-auto inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[#475569] shadow-2xs">
                  <span>Sentuh &amp; geser peta</span>
                </span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Gitgud+Board+Game+%26+Cafe+Baciro+Yogyakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playButtonClick()}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange text-white text-[11px] font-display font-bold rounded-md shadow-xs active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Rute / Arah</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
