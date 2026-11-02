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
  Smile,
  Heart,
  Swords,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { ALL_GAMES, NotionGame } from "@/data/games";
import { soundEffects } from "@/lib/soundEffects";
import { useIsMobile } from "@/lib/useIsMobile";

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
    label: "Semua",
    icon: LayoutGrid,
    vibe: "Koleksi lengkap 362 board game fisik siap dimainkan kapan saja di Gitgud Baciro.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "party",
    label: "Party",
    icon: Flame,
    vibe: "Aturan gampang, tempo cepat, dan dijamin bikin meja ramai ketawa lepas.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "casual",
    label: "Casual",
    icon: Smile,
    vibe: "Gameplay rileks, cocok untuk ngobrol santai sambil ngopi tanpa mikir berat.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "strategy",
    label: "Strategi",
    icon: Compass,
    vibe: "Rancang taktik, kelola resource, dan rebut kemenangan dengan perhitungan matang.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "social-deduction",
    label: "Deduksi",
    icon: Eye,
    vibe: "Adu intrik, tuduhan rahasia, dan sandiwara paling seru bareng squad.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "battle",
    label: "Battle",
    icon: Swords,
    vibe: "Pertarungan langsung head-to-head, adu hero, dan dominasi arena.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "coop",
    label: "Co-op",
    icon: ShieldCheck,
    vibe: "Menang bersama atau kalah bersama! Saling bantu melawan tantangan game.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
  },
  {
    key: "great-for-2",
    label: "2 Pemain",
    icon: Heart,
    vibe: "52 game yang terbukti paling seru untuk kencan, ngedrop bareng bestie, atau duel 1v1.",
    activeClass:
      "bg-brand-orange text-white border-brand-orange shadow-xs",
    inactiveClass:
      "bg-white hover:bg-slate-50 text-[#475569] hover:text-[#172554] border border-slate-200 hover:border-slate-300 shadow-2xs",
    badgeClass: "bg-white/20 text-white",
    vibeBarColor: "bg-brand-orange",
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
const MOBILE_INITIAL_COUNT = 6;

export default function GameCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeDifficulty, setActiveDifficulty] =
    useState<DifficultyFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(ITEMS_PER_PAGE);
  const isMobile = useIsMobile();
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  const getStepCount = () => {
    return isMobile ? 6 : ITEMS_PER_PAGE;
  };

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
    setMobileExpanded(false);
  };

  const handleDifficultyChange = (diff: DifficultyFilter) => {
    soundEffects.playTileTap();
    setActiveDifficulty(diff);
    setDisplayCount(ITEMS_PER_PAGE);
    setMobileExpanded(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayCount(ITEMS_PER_PAGE);
    setMobileExpanded(false);
  };

  const handleClearSearch = () => {
    soundEffects.playButtonClick();
    setSearchQuery("");
    setDisplayCount(ITEMS_PER_PAGE);
    setMobileExpanded(false);
  };

  const handleLoadMore = () => {
    soundEffects.playButtonClick();
    if (isMobile && !mobileExpanded) {
      setMobileExpanded(true);
      return;
    }
    setDisplayCount((prev) => Math.min(prev + getStepCount(), filteredGames.length));
  };

  const handleCollapseMobile = () => {
    soundEffects.playButtonClick();
    setMobileExpanded(false);
    setDisplayCount(ITEMS_PER_PAGE);
    const el = document.getElementById("games");
    if (el) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;
      const top = Math.round(el.getBoundingClientRect().top + window.scrollY - navHeight);
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <section
      id="games"
      className="scroll-mt-[58px] py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange font-sans text-xs font-semibold">
            <LayoutGrid className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>Katalog Meja Fisik</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-2.5 sm:mt-3 tracking-tight leading-tight">
            362 KOLEKSI BOARD GAME GITGUD
          </h2>
          <p className="text-[#475569] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-2xl font-sans">
            Koleksi game fisik original yang siap dimainkan langsung di meja. Gunakan filter pencarian untuk menemukan judul yang pas dengan suasana squad kamu:
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mb-5 sm:mb-6 flex flex-col md:flex-row gap-3 sm:gap-3.5 items-stretch md:items-center justify-between">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari dari 362 game (contoh: Catan, Azul, Werewolf, Wingspan)"
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 focus:border-brand-orange focus:outline-none text-[#172554] placeholder-[#94A3B8] font-sans text-xs sm:text-sm shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Bersihkan pencarian"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-brand-orange transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-sans font-bold text-[#475569] whitespace-nowrap shrink-0 mr-1">
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
                  className={`text-[11px] font-sans font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#172554] text-white border-[#172554] shadow-xs"
                      : "bg-white text-[#475569] border-slate-200 hover:border-slate-300 hover:text-[#172554]"
                  }`}
                >
                  {diffLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Cartridge Category Tabs */}
        <div className="mb-6 sm:mb-10">
          {/* Mobile Swipe Notice */}
          <div className="flex md:hidden items-center justify-between text-xs font-sans text-[#64748B] mb-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
              <span>Geser kategori game</span>
              <span className="text-brand-orange font-bold">→</span>
            </span>
            <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium text-[#475569]">
              8 Kategori
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-8 overflow-x-auto md:overflow-visible scrollbar-none gap-2 sm:gap-3 -mx-4 px-4 md:mx-0 md:px-0 pb-1.5 md:pb-0 scroll-pl-4 scroll-pr-4">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const isActive = activeCategory === cat.key;
              const Icon = cat.icon;
              const count = categoryCounts[cat.key];

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`w-[110px] min-w-[110px] shrink-0 md:w-auto md:min-w-0 relative p-2.5 sm:p-3 rounded-xl font-sans text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between min-h-[76px] sm:min-h-[86px] text-left active:translate-y-0.5 ${
                    isActive ? cat.activeClass : cat.inactiveClass
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1 sm:mb-1.5">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center ${
                        isActive
                          ? "bg-white/40 text-current"
                          : "bg-[#F8FAFC] text-[#475569]"
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span
                      className={`text-[9px] sm:text-[9.5px] font-sans font-bold px-1.5 py-0.5 rounded border border-current/20 ${
                        isActive ? cat.badgeClass : "bg-[#F0F7FF] text-[#475569]"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="font-display font-black tracking-tight text-xs sm:text-[13px] leading-tight whitespace-nowrap">
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
          <div className="mt-4 p-3 sm:p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5 sm:mt-0">
                <activeMeta.icon
                  className={`w-3.5 h-3.5 ${activeMeta.vibeBarColor.replace(
                    "bg-",
                    "text-"
                  )} shrink-0`}
                />
                <span className="text-[10px] font-sans font-bold tracking-widest text-[#172554] uppercase">
                  VIBE
                </span>
              </div>
              <p className="text-[#172554] font-semibold text-xs sm:text-sm leading-relaxed">
                {activeMeta.vibe}
              </p>
            </div>
            <div className="text-[#64748B] text-[11px] sm:text-xs font-medium shrink-0 pt-1 sm:pt-0 border-t border-slate-200/60 sm:border-0 self-start sm:self-auto">
              Menampilkan{" "}
              <strong className="text-brand-orange font-bold">{filteredGames.length}</strong>{" "}
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
              className="mt-4 px-4 py-2 rounded-lg bg-[#E84A27] text-white font-sans text-xs font-bold hover:bg-[#D83B13] transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
            {visibleGames.map((game: NotionGame, idx: number) => {
              const diffConfig = game.difficulty
                ? DIFFICULTY_CONFIG[game.difficulty] || {
                    label: game.difficulty,
                    badgeClass: "bg-blue-50 text-blue-700 border-blue-300",
                    bgGradient: "from-blue-50/70 via-indigo-50/40 to-white",
                  }
                : null;

              const isInitialHiddenOnMobile = idx >= MOBILE_INITIAL_COUNT && !mobileExpanded;

              return (
                <div
                  key={game.id}
                  data-testid="game-card"
                  className={`tabletop-card bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand-orange/50 hover:shadow-md transition-all shadow-xs flex-col justify-between group ${
                    isInitialHiddenOnMobile ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div>
                    {/* Card Top Strip with Title & Badges */}
                    <div
                      className={`min-h-[85px] sm:min-h-[110px] bg-gradient-to-br ${
                        diffConfig ? diffConfig.bgGradient : "from-slate-50 to-white"
                      } border-b border-slate-100 p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        {diffConfig ? (
                          <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-[#334155] shadow-2xs">
                            {diffConfig.label}
                          </span>
                        ) : (
                          <span className="text-[10px] font-sans font-medium text-[#94A3B8]">
                            Semua Level
                          </span>
                        )}

                        {game.greatFor2p && (
                          <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-md border border-rose-200/90 bg-white text-[#BE123C] flex items-center gap-1 shadow-2xs">
                            <Heart className="w-2.5 h-2.5 fill-current text-rose-500" />
                            <span>Cocok 2 Orang</span>
                          </span>
                        )}
                      </div>

                      {/* Game Title */}
                      <h3
                        data-testid="game-title"
                        className="font-display font-black text-sm sm:text-lg text-[#172554] tracking-tight leading-snug group-hover:text-brand-orange transition-colors"
                      >
                        {game.title}
                      </h3>
                    </div>

                    {/* Card Body: Specs & Clean Category Tags */}
                    <div className="p-3.5 sm:p-4 bg-white space-y-2.5">
                      {/* Specs Row: Refined Tabular Metrics (No loud pastel bubble buttons) */}
                      <div className="flex items-center gap-3 text-xs text-[#64748B] font-sans">
                        {game.players && (
                          <span className="inline-flex items-center gap-1.5 text-[#334155] font-medium text-[11px]">
                            <Users className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" strokeWidth={1.8} />
                            <span>{game.players} Pemain</span>
                          </span>
                        )}
                        {game.playtime && (
                          <>
                            <span className="text-slate-300 select-none">•</span>
                            <span className="inline-flex items-center gap-1.5 text-[#334155] font-medium text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" strokeWidth={1.8} />
                              <span>{game.playtime} mnt</span>
                            </span>
                          </>
                        )}
                      </div>

                      {/* Categories: Minimalist Editorial Tags (No baby-blue or #hashtags) */}
                      {game.category && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                          {game.category.split(",").map((catItem, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-slate-50 border border-slate-200/70 text-[#475569]"
                            >
                              {catItem.trim()}
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

        {/* Load More & Expandable/Collapsible Controls */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {(visibleGames.length < filteredGames.length || (!mobileExpanded && filteredGames.length > MOBILE_INITIAL_COUNT)) && (
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#172554] border border-slate-200 font-display font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span className="md:hidden">
                Muat Lebih Banyak (+{Math.min(6, filteredGames.length - (mobileExpanded ? displayCount : MOBILE_INITIAL_COUNT))} Game)
              </span>
              <span className="hidden md:inline">
                Muat Lebih Banyak (+{Math.min(ITEMS_PER_PAGE, filteredGames.length - visibleGames.length)} Game)
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Collapsible Control: Sembunyikan Sebagian */}
          {mobileExpanded && (
            <button
              type="button"
              onClick={handleCollapseMobile}
              className="md:hidden inline-flex items-center gap-2 bg-[#F8FAFC] hover:bg-white text-[#64748B] hover:text-[#172554] border border-slate-200 font-display font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-xs active:translate-y-0.5"
            >
              <span>Sembunyikan Sebagian (Kembali ke 6)</span>
            </button>
          )}
        </div>
        <p className="text-[#94A3B8] font-sans text-xs mt-2 text-center">
          <span className="md:hidden">
            Menampilkan {mobileExpanded ? Math.min(displayCount, filteredGames.length) : Math.min(MOBILE_INITIAL_COUNT, filteredGames.length)} dari {filteredGames.length} game yang cocok
          </span>
          <span className="hidden md:inline">
            Menampilkan {visibleGames.length} dari {filteredGames.length} game yang cocok
          </span>
        </p>

        {/* WhatsApp Inquiry Link */}
        <div className="mt-14 text-center">
          <a
            href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20apakah%20ada%20game%20"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playSuccessChime()}
            className="inline-flex items-center gap-2 text-brand-orange hover:text-[#1B64B4] font-sans text-sm font-bold underline underline-offset-4 transition-colors cursor-pointer"
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
