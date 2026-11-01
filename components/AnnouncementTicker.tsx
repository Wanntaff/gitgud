import { Dices, Clock, Coffee, UserCheck, MapPin } from "lucide-react";

export default function AnnouncementTicker() {
  const tickerItems = [
    {
      icon: Dices,
      text: "Blood on the Clocktower — Gratis Setiap Kamis!",
    },
    {
      icon: Clock,
      text: "Jumat - Minggu Buka 24 Jam Non-Stop",
    },
    {
      icon: Coffee,
      text: "Brewing Starts 07.00 WIB",
    },
    {
      icon: UserCheck,
      text: "Game Master Ready to Guide",
    },
    {
      icon: MapPin,
      text: "Baciro, Yogyakarta",
    },
  ];

  return (
    <div className="bg-brand-orange text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider py-1.5 sm:py-2 overflow-hidden border-b border-[#D83B13]/60 select-none shadow-xs max-w-full [contain:paint]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`t1-${index}`}
              className="mx-5 flex items-center gap-2 whitespace-nowrap"
            >
              <item.icon className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span>{item.text}</span>
            </span>
          ))}
        </div>
        {/* Track 2 (Identical duplicate for seamless continuous loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`t2-${index}`}
              className="mx-5 flex items-center gap-2 whitespace-nowrap"
            >
              <item.icon className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span>{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
