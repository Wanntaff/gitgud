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
  Search,
  X,
  Sparkles,
  Heart,
  Swords,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { ALL_GAMES, NotionGame } from "@/data/games";
import { soundEffects } from "@/lib/soundEffects";

type CategoryFilter =
  | "all"
  | "party"
  | "casual"
  | "strategy"
  | "social-deduction"
  | "family"
  | "battle"
  | "coop"
  | "great-for-2";

type DifficultyFilter =
  | "all"
  | "Piece of Cake!"
  | "Tough Nut"
  | "Brainburner"
  | "GITGUD";

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
    vibe: "Koleksi lengkap 362 board game fisik siap dimainkan kapan saja di Gitgud Baciro.",
    activeClass:
      "bg-[#E84A27] text-white border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F2] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-orange shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-brand-orange",
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
    key: "casual",
    label: "Casual Santai",
    icon: Sparkles,
    vibe: "Gameplay rileks, cocok untuk ngobrol santai sambil ngopi tanpa mikir berat.",
    activeClass:
      "bg-[#5BB5F8] text-[#172554] border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#F0F7FF] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-lightblue shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-[#1B64B4]/15 text-[#172554]",
    vibeBarColor: "bg-[#5BB5F8]",
  },
  {
    key: "strategy",
    label: "Strategi & Taktik",
    icon: Compass,
    vibe: "Rancang taktik, kelola resource, dan rebut kemenangan dengan perhitungan matang.",
    activeClass:
      "bg-[#1B64B4] text-white border-2 border-[#5BB5F8] shadow-[2.5px_2.5px_0px_0px_#5BB5F8] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#F0F7FF] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-blue shadow-[2.5px_2.5px_0px_0px_#1B64B4]/25 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-[#1B64B4]",
  },
  {
    key: "social-deduction",
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
    key: "battle",
    label: "Battle & Duel",
    icon: Swords,
    vibe: "Pertarungan langsung head-to-head, adu hero, dan dominasi arena.",
    activeClass:
      "bg-[#E84A27] text-white border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F2] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-orange shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-white/25 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "coop",
    label: "Co-op & Kerjasama",
    icon: ShieldCheck,
    vibe: "Menang bersama atau kalah bersama! Saling bantu melawan tantangan game.",
    activeClass:
      "bg-[#5BB5F8] text-[#172554] border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#F0F7FF] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-lightblue shadow-[2.5px_2.5px_0px_0px_#5BB5F8]/30 hover:-translate-y-0.5",
    badgeClass: "bg-[#1B64B4]/15 text-[#172554]",
    vibeBarColor: "bg-[#1B64B4]",
  },
  {
    key: "great-for-2",
    label: "Khusus 2 Pemain",
    icon: Heart,
    vibe: "52 game yang terbukti paling seru untuk kencan, ngedrop bareng bestie, atau duel 1v1.",
    activeClass:
      "bg-[#F7B5CB] text-[#172554] border-2 border-[#1B64B4] shadow-[2.5px_2.5px_0px_0px_#1B64B4] translate-x-0.5 translate-y-0.5",
    inactiveClass:
      "bg-white hover:bg-[#FFF5F8] text-[#475569] hover:text-[#172554] border-2 border-[#1B64B4]/20 hover:border-brand-pink shadow-[2.5px_2.5px_0px_0px_#F7B5CB]/40 hover:-translate-y-0.5",
    badgeClass: "bg-[#1B64B4]/15 text-[#172554]",
    vibeBarColor: "bg-[#C2185B]",
  },
];

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; badgeClass: string; bgGradient: string }
> = {
  "Piece of Cake!": {
    label: "Santai / Pemula",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-300",
    bgGradient: "from-emerald-50/70 via-teal-50/40 to-white",
  },
  "Tough Nut": {
    label: "Taktik Menengah",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-300",
    bgGradient: "from-amber-50/70 via-orange-50/40 to-white",
  },
  Brainburner: {
    label: "Mikir Keras",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-300",
    bgGradient: "from-rose-50/70 via-red-50/40 to-white",
  },
  GITGUD: {
    label: "GITGUD (Hardcore)",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-300",
    bgGradient: "from-purple-50/70 via-indigo-50/40 to-white",
  },
};

const ITEMS_PER_PAGE = 12;

export default function GameCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeDifficulty, setActiveDifficulty] =
    useState<DifficultyFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(ITEMS_PER_PAGE);

  // Filter games based on search query, category, and difficulty
  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter((game: NotionGame) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesCategory =
          game.category?.toLowerCase().includes(query) ?? false;
        if (!matchesTitle && !matchesCategory) return false;
      }

      // 2. Category Filter
      if (activeCategory === "great-for-2") {
        if (!game.greatFor2p) return false;
      } else if (activeCategory !== "all") {
        const catStr = (game.category || "").toLowerCase();
        if (activeCategory === "party" && !catStr.includes("party")) return false;
        if (activeCategory === "casual" && !catStr.includes("casual")) return false;
        if (activeCategory === "strategy" && !catStr.includes("strategy"))
          return false;
        if (
          activeCategory === "social-deduction" &&
          !catStr.includes("deduction")
        )
          return false;
        if (activeCategory === "family" && !catStr.includes("family"))
          return false;
        if (activeCategory === "battle" && !catStr.includes("battle"))
          return false;
        if (activeCategory === "coop" && !catStr.includes("co-op")) return false;
      }

      // 3. Difficulty Filter
      if (activeDifficulty !== "all") {
        if (game.difficulty !== activeDifficulty) return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, activeDifficulty]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    return {
      all: ALL_GAMES.length,
      party: ALL_GAMES.filter((g) => (g.category || "").includes("Party")).length,
      casual: ALL_GAMES.filter((g) => (g.category || "").includes("Casual"))
        .length,
      strategy: ALL_GAMES.filter((g) => (g.category || "").includes("Strategy"))
        .length,
      "social-deduction": ALL_GAMES.filter((g) =>
        (g.category || "").toLowerCase().includes("deduction")
      ).length,
      family: ALL_GAMES.filter((g) => (g.category || "").includes("Family"))
        .length,
      battle: ALL_GAMES.filter((g) => (g.category || "").includes("Battle"))
        .length,
      coop: ALL_GAMES.filter((g) => (g.category || "").includes("Co-op")).length,
      "great-for-2": ALL_GAMES.filter((g) => g.greatFor2p).length,
    };
  }, []);

  const activeMeta = useMemo(() => {
    return (
      CATEGORY_DEFINITIONS.find((c) => c.key === activeCategory) ??
      CATEGORY_DEFINITIONS[0]
    );
  }, [activeCategory]);

  const visibleGames = useMemo(() => {
    return filteredGames.slice(0, displayCount);
  }, [filteredGames, displayCount]);

  const handleCategoryChange = (key: CategoryFilter) => {
    soundEffects.playTileTap();
    setActiveCategory(key);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleDifficultyChange = (diff: DifficultyFilter) => {
    soundEffects.playTileTap();
    setActiveDifficulty(diff);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleClearSearch = () => {
    soundEffects.playButtonClick();
    setSearchQuery("");
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    soundEffects.playButtonClick();
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredGames.length));
  };

  return (
    <section
      id="games"
      className="scroll-mt-16 content-visibility-auto py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#F0F7FF] border-2 border-brand-lightblue text-[#1B64B4] rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#5BB5F8] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-lightblue text-[#172554] flex items-center justify-center shrink-0 border border-brand-lightblue shadow-xs font-mono font-black text-xs group-hover:scale-110 transition-transform select-none">
              ♠
            </span>
            <span className="text-[#475569] font-bold text-[10px]">DECK 02</span>
            <span className="text-brand-lightblue select-none">•</span>
            <span className="text-[#172554]">362 VAULT ARCHIVE</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
            362 KOLEKSI BOARD GAME GITGUD
          </h2>
          <p className="text-[#475569] text-sm sm:text-base mt-2 max-w-2xl">
            Cari game favoritmu atau jelajahi ratusan judul meja fisik asli Baciro, dari santai bareng teman hingga duel strategi tingkat tinggi:
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1B64B4]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari dari 362 game... (contoh: Catan, Azul, Werewolf, Wingspan)"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border-2 border-[#1B64B4]/25 focus:border-[#E84A27] focus:outline-none text-[#172554] placeholder-[#94A3B8] font-mono text-xs sm:text-sm shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Bersihkan pencarian"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#E84A27] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono font-bold text-[#475569] whitespace-nowrap shrink-0 mr-1">
              Kesulitan:
            </span>
            {(
              [
                ["all", "Semua"],
                ["Piece of Cake!", "Santai"],
                ["Tough Nut", "Taktik"],
                ["Brainburner", "Mikir"],
                ["GITGUD", "Hardcore"],
              ] as const
            ).map(([diffKey, diffLabel]) => {
              const isSelected = activeDifficulty === diffKey;
              return (
                <button
                  key={diffKey}
                  type="button"
                  onClick={() => handleDifficultyChange(diffKey as DifficultyFilter)}
                  className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#172554] text-white border-[#172554] shadow-xs"
                      : "bg-white text-[#475569] border-[#1B64B4]/20 hover:border-[#1B64B4] hover:text-[#172554]"
                  }`}
                >
                  {diffLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Cartridge Category Tabs */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const isActive = activeCategory === cat.key;
              const Icon = cat.icon;
              const count = categoryCounts[cat.key];

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`relative p-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex flex-col justify-between min-h-[78px] text-left active:translate-y-0.5 ${
                    isActive ? cat.activeClass : cat.inactiveClass
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        isActive
                          ? "bg-white/40 text-current"
                          : "bg-[#F8FAFC] text-[#475569]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-[9.5px] font-mono font-black px-1.5 py-0.5 rounded border border-current/20 ${
                        isActive ? cat.badgeClass : "bg-[#F0F7FF] text-[#475569]"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-display font-black tracking-tight text-[11px] sm:text-xs leading-tight line-clamp-1">
                      {cat.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rotate-45 bg-current shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Category Vibe Bar */}
          <div className="mt-4 p-3.5 sm:p-4 bg-[#F8FAFC] rounded-xl border-2 border-[#1B64B4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-3 min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-[#1B64B4]/20 shadow-2xs shrink-0">
                <activeMeta.icon
                  className={`w-3.5 h-3.5 ${activeMeta.vibeBarColor.replace(
                    "bg-",
                    "text-"
                  )} shrink-0`}
                />
                <span className="text-[10px] font-mono font-black tracking-widest text-[#172554] uppercase">
                  VIBE
                </span>
              </div>
              <span className="text-[#172554] font-semibold truncate leading-relaxed">
                {activeMeta.vibe}
              </span>
            </div>
            <div className="text-[#475569] self-end sm:self-auto shrink-0 font-medium text-xs">
              Menampilkan{" "}
              <strong className="text-brand-orange">{filteredGames.length}</strong>{" "}
              dari {ALL_GAMES.length} total game
            </div>
          </div>
        </div>

        {/* Games Grid or Empty State */}
        {filteredGames.length === 0 ? (
          <div className="py-16 text-center bg-[#F8FAFC] rounded-2xl border-2 border-dashed border-[#1B64B4]/20 p-8">
            <Search className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-[#172554]">
              Tidak ada board game yang cocok
            </h3>
            <p className="text-[#475569] text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Coba gunakan kata kunci lain atau reset filter untuk melihat koleksi lengkap lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                soundEffects.playButtonClick();
                setSearchQuery("");
                setActiveCategory("all");
                setActiveDifficulty("all");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#E84A27] text-white font-mono text-xs font-bold hover:bg-[#D83B13] transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-fade-in-up">
            {visibleGames.map((game: NotionGame) => {
              const diffConfig = game.difficulty
                ? DIFFICULTY_CONFIG[game.difficulty] || {
                    label: game.difficulty,
                    badgeClass: "bg-blue-50 text-blue-700 border-blue-300",
                    bgGradient: "from-blue-50/70 via-indigo-50/40 to-white",
                  }
                : null;

              return (
                <div
                  key={game.id}
                  data-testid="game-card"
                  className="bg-white border-2 border-[#1B64B4]/15 rounded-xl overflow-hidden hover:border-brand-orange transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top Strip with Title & Badges */}
                    <div
                      className={`min-h-[100px] sm:min-h-[110px] bg-gradient-to-br ${
                        diffConfig ? diffConfig.bgGradient : "from-slate-50 to-white"
                      } border-b border-[#1B64B4]/15 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {diffConfig ? (
                          <span
                            className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border shadow-2xs ${diffConfig.badgeClass} flex items-center gap-1`}
                          >
                            <span>{diffConfig.label}</span>
                          </span>
                        ) : (
                          <span className="text-[9.5px] font-mono text-[#94A3B8]">
                            Standard
                          </span>
                        )}

                        {game.greatFor2p && (
                          <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border border-[#F7B5CB] bg-[#FFF0F5] text-[#C2185B] flex items-center gap-1 shadow-2xs">
                            <Heart className="w-2.5 h-2.5 fill-current" />
                            <span>Great for 2p</span>
                          </span>
                        )}
                      </div>

                      {/* Game Title */}
                      <h3
                        data-testid="game-title"
                        className="font-display font-black text-base sm:text-lg text-[#172554] tracking-tight leading-snug group-hover:text-brand-orange transition-colors"
                      >
                        {game.title}
                      </h3>
                    </div>

                    {/* Card Body: Category Tags & Specs */}
                    <div className="p-4 sm:p-4.5 bg-white space-y-3">
                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] font-mono">
                        {game.players && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#1B64B4]/15 text-[10.5px]">
                            <Users className="w-3 h-3 text-[#1B64B4] shrink-0" />
                            <span>{game.players} Pemain</span>
                          </span>
                        )}
                        {game.playtime && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FFF8F5] border border-[#E84A27]/20 text-[10.5px] text-[#E84A27]">
                            <Clock className="w-3 h-3 text-[#E84A27] shrink-0" />
                            <span>{game.playtime}m</span>
                          </span>
                        )}
                      </div>

                      {/* Categories Badges */}
                      {game.category && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                          {game.category.split(",").map((catItem, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#F0F7FF] text-[#1B64B4] border border-[#1B64B4]/15"
                            >
                              #{catItem.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleGames.length < filteredGames.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F7FF] text-[#1B64B4] border-2 border-[#1B64B4] font-display font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_#1B64B4] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <span>
                Muat Lebih Banyak (+{Math.min(ITEMS_PER_PAGE, filteredGames.length - visibleGames.length)} Game)
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <p className="text-[#94A3B8] font-mono text-xs mt-2">
              Menampilkan {visibleGames.length} dari {filteredGames.length} game yang cocok
            </p>
          </div>
        )}

        {/* WhatsApp Inquiry Link */}
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
