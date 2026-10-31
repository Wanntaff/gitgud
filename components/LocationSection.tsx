"use client";

import { MapPin, Clock, Navigation, Check, ExternalLink } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export default function LocationSection() {
  return (
    <section
      id="location"
      className="scroll-mt-16 content-visibility-auto min-h-[calc(100vh-4rem)] flex flex-col py-6 sm:py-8 lg:py-10 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Venue Details & Primary Action */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Creative Tabletop Basecamp Map Pin Token Chip */}
              <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#F0F7FF] border-2 border-brand-lightblue text-[#1B64B4] rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_0px_#5BB5F8] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
                <span className="w-6 h-6 rounded-full bg-brand-lightblue text-white flex items-center justify-center shrink-0 border border-brand-lightblue shadow-xs group-hover:scale-110 transition-transform">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                </span>
                <span className="text-[#64748B] font-bold text-[10px]">BASECAMP 06</span>
                <span className="text-brand-lightblue select-none">•</span>
                <span className="text-[#172554]">BACIRO HEADQUARTERS</span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#172554] mt-2.5 tracking-tight">
                LOKASI & JAM OPERASIONAL
              </h2>
              <p className="text-[#475569] text-xs sm:text-sm mt-1.5 leading-relaxed">
                Lokasi strategis di pusat kota Yogyakarta, suasana tenang di
                Baciro yang nyaman buat main game lama bareng teman.
              </p>

              {/* Address Card */}
              <div className="mt-5 bg-[#F8FAFC] p-4 rounded-xl border-2 border-[#1B64B4]/15 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#172554] text-xs sm:text-sm">
                      Alamat Lengkap:
                    </h4>
                    <p className="text-xs text-[#334155] mt-1 leading-relaxed">
                      Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta 55225
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours Table */}
              <div className="mt-3.5 bg-[#F8FAFC] p-4 rounded-xl border-2 border-[#1B64B4]/15 shadow-sm">
                <h4 className="font-bold text-[#172554] text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span>Jadwal Buka:</span>
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-[#1B64B4]/10 gap-1 sm:gap-2">
                    <span className="text-[#475569]">Senin - Kamis (Coffee)</span>
                    <span className="text-[#172554] font-bold whitespace-nowrap">
                      07.00 - 00.00 WIB
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-[#1B64B4]/10 gap-1 sm:gap-2">
                    <span className="text-[#475569]">
                      Senin - Kamis (Boardgame)
                    </span>
                    <span className="text-[#172554] font-bold whitespace-nowrap">
                      10.00 - 23.00 WIB
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 bg-[#FFF0EB] border border-[#E84A27]/30 px-2.5 rounded text-[#E84A27] font-bold gap-1 sm:gap-2">
                    <span className="whitespace-nowrap">Jumat - Minggu (Weekend)</span>
                    <span className="whitespace-nowrap inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>24 JAM NON-STOP!</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue Facility Badges */}
              <div className="mt-3.5 flex flex-wrap gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#1B64B4]/20 text-[#334155] text-[11px] shadow-xs">
                  <Check className="w-3 h-3 text-[#1B64B4] shrink-0" />
                  <span>Free Wi-Fi Kencang</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#1B64B4]/20 text-[#334155] text-[11px] shadow-xs">
                  <Check className="w-3 h-3 text-[#1B64B4] shrink-0" />
                  <span>Colokan Banyak</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#1B64B4]/20 text-[#334155] text-[11px] shadow-xs">
                  <Check className="w-3 h-3 text-[#1B64B4] shrink-0" />
                  <span>Smoking & AC Area</span>
                </span>
              </div>
            </div>

            {/* Primary Google Maps Direct Action Button */}
            <div className="mt-5">
              <a
                href="https://share.google/u0UPT7njRoXYm9kZc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playButtonClick()}
                className="inline-flex items-center justify-center w-full gap-2 bg-brand-blue hover:bg-blue-600 text-white font-display font-bold py-2.5 sm:py-3 px-5 rounded border-2 border-[#1B64B4] shadow-brutal-orange transition-all text-xs tracking-wider uppercase whitespace-nowrap cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>BUKA DI GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Spacious Google Maps Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] bg-white border-2 border-[#1B64B4]/25 rounded-xl overflow-hidden relative shadow-brutal-lightblue">
              {/* Google Maps Embed Iframe - Clear and unobstructed */}
              <iframe
                title="Google Maps Lokasi Gitgud Board Game & Cafe Baciro"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sGitgud+Board+Game+%26+Cafe+Baciro+Yogyakarta!6i16"
                className="absolute inset-0 w-full h-full border-0 [contain:paint]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Minimalist Floating Top Header Bar */}
              <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-[#1B64B4]/20 text-[#172554] font-mono text-[11px] font-bold rounded-lg shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>BACIRO, YOGYAKARTA</span>
                </span>

                {/* Secondary Map Link: Sleek, compact top-right pill */}
                <a
                  href="https://share.google/u0UPT7njRoXYm9kZc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playButtonClick()}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-brand-orange hover:text-white text-[#172554] font-mono text-[11px] font-bold rounded-lg border border-[#1B64B4]/20 shadow-sm backdrop-blur-md transition-all cursor-pointer"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
