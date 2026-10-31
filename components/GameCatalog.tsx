"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Clock,
  ArrowRight,
  LayoutGrid,
  Eye,
  Compass,
  Flame,
  Scroll,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

interface GameItem {
  id: string;
  name: string;
  category: "bluffing" | "strategy" | "party" | "rpg";
  badge: string;
  badgeBg: string;
  gradient: string;
  hoverBorder: string;
  players: string;
  duration: string;
  desc: string;
}

const GAMES: GameItem[] = [
  {
    id: "botc",
    name: "BLOOD ON THE CLOCKTOWER",
    category: "bluffing",
    badge: "FAVORIT JOGJA",
    badgeBg: "bg-brand-orange text-white",
    gradient: "from-orange-100 via-rose-50 to-white",
    hoverBorder: "hover:border-brand-orange",
    players: "5-20 Pemain",
    duration: "60-90 Menit",
    desc: "Game deduksi sosial paling intens. Bahkan yang sudah mati pun masih bisa bersuara dan ikut voting strategi!",
  },
  {
    id: "codenames",
    name: "CODENAMES",
    category: "party",
    badge: "SERU BANGET",
    badgeBg: "bg-[#EBF5FF] text-[#1B64B4] border border-[#5BB5F8]",
    gradient: "from-sky-100 via-blue-50 to-white",
    hoverBorder: "hover:border-brand-lightblue",
    players: "4-8+ Pemain",
    duration: "15-30 Menit",
    desc: "Tebak kata rahasia agen tim kamu hanya dari satu kata petunjuk sang Spymaster. Hati-hati jebakan Assassin!",
  },
  {
    id: "splendor",
    name: "SPLENDOR",
    category: "strategy",
    badge: "MID-STRATEGY",
    badgeBg: "bg-[#FFF0F5] text-[#C2185B] border border-[#F7B5CB]",
    gradient: "from-pink-100 via-rose-50 to-white",
    hoverBorder: "hover:border-brand-pink",
    players: "2-4 Pemain",
    duration: "30 Menit",
    desc: "Koleksi batu permata, bangun rute perdagangan, dan menangkan simpati para bangsawan era Renaisans.",
  },
  {
    id: "exploding-kittens",
    name: "EXPLODING KITTENS",
    category: "party",
    badge: "CHAOTIC",
    badgeBg: "bg-brand-orange text-white",
    gradient: "from-amber-100 via-orange-50 to-white",
    hoverBorder: "hover:border-brand-orange",
    players: "2-5 Pemain",
    duration: "15 Menit",
    desc: "Versi Russian Roulette bertema kucing bertenaga laser. Bikin temen ketar-ketir pas narik kartu dari tumpukan!",
  },
  {
    id: "dnd",
    name: "DUNGEONS & DRAGONS",
    category: "rpg",
    badge: "TABLETOP RPG",
    badgeBg: "bg-[#1B64B4] text-white",
    gradient: "from-blue-100 via-indigo-50 to-white",
    hoverBorder: "hover:border-brand-blue",
    players: "3-6 Pemain",
    duration: "2-4 Jam",
    desc: "Buat karakter fantasi kamu sendiri dan jelajahi petualangan tanpa batas yang dipandu oleh Dungeon Master kami.",
  },
  {
    id: "secret-hitler",
    name: "SECRET HITLER",
    category: "bluffing",
    badge: "BLUFFING",
    badgeBg: "bg-[#FFF0F5] text-[#C2185B] border border-[#F7B5CB]",
    gradient: "from-rose-100 via-red-50 to-white",
    hoverBorder: "hover:border-brand-pink",
    players: "5-10 Pemain",
    duration: "45 Menit",
    desc: "Game intrik politik cepat penuh tuduhan dan manipulasi. Siapa liberal sejati dan siapa fasis yang menyamar?",
  },
];

type CategoryFilter = "all" | "bluffing" | "strategy" | "party" | "rpg";

interface CategoryMeta {
  key: CategoryFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  vibe: string;
  activeClass: string;
  inactiveClass: string;
  badgeClass: string;
  vibeBarColor: string;
}

const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    key: "all",
    label: "Semua Game",
    icon: LayoutGrid,
    vibe: "Koleksi lengkap 300+ board game siap dimainkan kapan saja.",
    activeClass:
      "bg-[#E84A27] text-white border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F2] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-orange shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "bluffing",
    label: "Sosial Deduksi",
    icon: Eye,
    vibe: "Adu intrik, tuduhan rahasia, dan sandiwara paling seru bareng squad.",
    activeClass:
      "bg-[#F7B5CB] text-[#172554] border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F8] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-pink shadow-[2.5px_2.5px_0px_0px_#F7B5CB]/40 hover:-translate-y-0.5",
    badgeClass: "bg-[#1B64B4]/15 text-[#172554]",
    vibeBarColor: "bg-[#C2185B]",
  },
  {
    key: "strategy",
    label: "Strategi",
    icon: Compass,
    vibe: "Rancang taktik, kelola resource, dan rebut kemenangan dengan perhitungan matang.",
    activeClass:
      "bg-[#5BB5F8] text-[#172554] border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#F0F7FF] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-lightblue shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-[#1B64B4]/15 text-[#172554]",
    vibeBarColor: "bg-[#1B64B4]",
  },
  {
    key: "party",
    label: "Party & Fun",
    icon: Flame,
    vibe: "Aturan gampang, tempo cepat, dan dijamin bikin meja ramai ketawa lepas.",
    activeClass:
      "bg-[#E84A27] text-white border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F2] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-orange shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "rpg",
    label: "D&D / RPG",
    icon: Scroll,
    vibe: "Petualangan tabletop imajinatif dengan pemandu Dungeon Master berpengalaman.",
    activeClass:
      "bg-[#1B64B4] text-white border-2 border-[#5BB5F8] shadow-[2.5px_2.5px_0px_0px_#5BB5F8] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#F0F7FF] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-blue shadow-[2.5px_2.5px_0px_0px_#1B64B4]/25 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-[#1B64B4]",
  },
];

export default function GameCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const categoryCounts = useMemo(() => {
    return {
      all: GAMES.length,
      bluffing: GAMES.filter((g) => g.category === "bluffing").length,
      strategy: GAMES.filter((g) => g.category === "strategy").length,
      party: GAMES.filter((g) => g.category === "party").length,
      rpg: GAMES.filter((g) => g.category === "rpg").length,
    };
  }, []);

  const activeMeta = useMemo(() => {
    return (
      CATEGORY_DEFINITIONS.find((c) => c.key === activeCategory) ??
      CATEGORY_DEFINITIONS[0]
    );
  }, [activeCategory]);

  const filteredGames = useMemo(() => {
    return activeCategory === "all"
      ? GAMES
      : GAMES.filter((g) => g.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="games"
      className="scroll-mt-16 content-visibility-auto py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          {/* Creative Tabletop Playing Card Suit Token Chip */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#F0F7FF] border-2 border-brand-lightblue text-[#1B64B4] rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#5BB5F8] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-lightblue text-[#172554] flex items-center justify-center shrink-0 border border-brand-lightblue shadow-xs font-mono font-black text-xs group-hover:scale-110 transition-transform select-none">
              ♠
            </span>
            <span className="text-[#475569] font-bold text-[10px]">DECK 02</span>
            <span className="text-brand-lightblue select-none">•</span>
            <span className="text-[#172554]">300+ VAULT ARCHIVE</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
            BEBERAPA GAME POPULER KAMI
          </h2>
          <p className="text-[#475569] text-sm sm:text-base mt-2">
            Pilih suasana bermain yang kamu inginkan bersama squad malam ini:
          </p>
        </div>

        {/* Interactive Tabletop Cartridge Deck */}
        <div className="mb-10">
          {/* Cartridge Tabs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const isActive = activeCategory === cat.key;
              const Icon = cat.icon;
              const count = categoryCounts[cat.key];

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    soundEffects.playTileTap();
                    setActiveCategory(cat.key);
                  }}
                  className={`relative p-4 sm:p-4.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex flex-col justify-between min-h-[88px] sm:min-h-[96px] text-left active:translate-y-0.5 ${
                    isActive ? cat.activeClass : cat.inactiveClass
                  }`}
                >
                  {/* Top Row: Icon & Dynamic Count Badge */}
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? "bg-white/40 text-current"
                          : "bg-[#F8FAFC] text-[#475569]"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono font-black px-2 py-0.5 rounded border border-current/20 ${
                        isActive ? cat.badgeClass : "bg-[#F0F7FF] text-[#475569]"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  {/* Bottom Row: Label & Tabletop Diamond Pip Active Notch */}
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black tracking-wide text-xs sm:text-sm md:text-base">
                      {cat.label}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rotate-45 bg-current shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Category Vibe Bar */}
          <div className="mt-5 p-4 sm:p-5 bg-[#F8FAFC] rounded-xl border-2 border-[#1B64B4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-3">
              {/* Tabletop Cafe Atmosphere Indicator with Animated Kinetic Waves */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white border-2 border-[#1B64B4]/20 shadow-xs shrink-0">
                <div className="flex items-end gap-[3px] h-3.5 shrink-0" aria-hidden="true">
                  <span className={`w-[3px] h-3.5 rounded-xs transition-colors duration-300 ${activeMeta.vibeBarColor} animate-vibe-1`} />
                  <span className={`w-[3px] h-3.5 rounded-xs transition-colors duration-300 ${activeMeta.vibeBarColor} animate-vibe-2`} />
                  <span className={`w-[3px] h-3.5 rounded-xs transition-colors duration-300 ${activeMeta.vibeBarColor} animate-vibe-3`} />
                  <span className={`w-[3px] h-3.5 rounded-xs transition-colors duration-300 ${activeMeta.vibeBarColor} animate-vibe-4`} />
                </div>
                <activeMeta.icon className={`w-3.5 h-3.5 ${activeMeta.vibeBarColor.replace('bg-', 'text-')} animate-pulse-subtle shrink-0`} />
                <span className="text-[10px] font-mono font-black tracking-widest text-[#172554] uppercase">
                  VIBE MEJA
                </span>
              </div>
              <span className="text-[#172554] font-bold leading-relaxed">{activeMeta.vibe}</span>
            </div>
            <div className="text-[#475569] self-end sm:self-auto shrink-0 font-medium">
              Menampilkan{" "}
              <strong className="text-brand-orange">{filteredGames.length}</strong>{" "}
              dari {GAMES.length} pilihan game
            </div>
          </div>
        </div>

        {/* Games Grid with dynamic entrance animation */}
        <div
          key={activeCategory}
          id="games-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fade-in-up"
        >
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className={`bg-white border-2 border-[#1B64B4]/15 rounded-xl overflow-hidden ${game.hoverBorder} transition-all shadow-xs hover:shadow-md flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`h-44 sm:h-52 bg-gradient-to-br ${game.gradient} border-b-2 border-[#1B64B4]/15 flex items-center justify-center p-5 sm:p-6 text-center relative overflow-hidden`}
                >
                  <span
                    className={`absolute top-3 left-3 ${game.badgeBg} text-[10px] font-mono font-black px-2.5 py-1 rounded-sm border border-[#1B64B4]/20 shadow-[2px_2px_0px_0px_rgba(27,100,180,0.2)] whitespace-nowrap z-10 flex items-center gap-1 uppercase tracking-wider`}
                  >
                    <span className="text-[8px] opacity-80 select-none">◆</span>
                    <span>{game.badge}</span>
                  </span>
                  <div className="font-display font-black text-xl sm:text-2xl text-[#172554] px-3 leading-snug break-words text-center">
                    {game.name}
                  </div>
                </div>
                <div className="p-5 sm:p-6 bg-white">
                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#475569] font-mono mb-3.5 font-medium">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Users className="w-4 h-4 text-[#1B64B4]" />{" "}
                      {game.players}
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="w-4 h-4 text-brand-orange" />{" "}
                      {game.duration}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {game.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://wa.me/?text=Halo%20Gitgud,%20apakah%20ada%20game%20..."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playSuccessChime()}
            className="inline-flex items-center gap-2 text-brand-orange hover:text-[#1B64B4] font-mono text-sm font-bold underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>
              Mau tanya ketersediaan board game tertentu? Chat kami di WhatsApp
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
