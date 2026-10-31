"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Dices,
  RotateCw,
  Users,
  Clock,
  Award,
  Moon,
  Trees,
  KeyRound,
  Gem,
  Swords,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

export interface GameSuggestion {
  id: string;
  name: string;
  categoryTag: string;
  players: string;
  duration: string;
  gmQuote: string;
  dice: number;
  boxSubtitle: string;
  badgeLabel: string;
  boxAccent: string;
  Icon: LucideIcon;
}

export const GAME_SUGGESTIONS: GameSuggestion[] = [
  {
    id: "botc",
    name: "Blood on the Clocktower",
    categoryTag: "#SocialDeduction",
    players: "5-20 Pemain",
    duration: "Waktu: 60-90m",
    gmQuote:
      "Mirip Werewolf, tapi 10x lebih adil & dramatis karena yang mati tetap bisa voting!",
    dice: 6,
    boxSubtitle: "Ravenswood Bluff Mystery",
    badgeLabel: "Koleksi Favorit GM",
    boxAccent: "#E84A27",
    Icon: Moon,
  },
  {
    id: "cascadia",
    name: "Cascadia",
    categoryTag: "#TileDrafting",
    players: "1-4 Pemain",
    duration: "Waktu: 30-45m",
    gmQuote:
      "Bikin habitat satwa liar Pasifik Barat. Santai, estetik, tapi adu taktik poinnya dalem!",
    dice: 5,
    boxSubtitle: "Pacific Northwest Habitats",
    badgeLabel: "Spiel des Jahres",
    boxAccent: "#1B64B4",
    Icon: Trees,
  },
  {
    id: "codenames",
    name: "Codenames",
    categoryTag: "#PartyWordGame",
    players: "4-8+ Pemain",
    duration: "Waktu: 15-30m",
    gmQuote:
      "Satu kata petunjuk, tebak semua agen rahasiamu tanpa kena jebakan kartu pembunuh bayaran!",
    dice: 1,
    boxSubtitle: "Top Secret Word Game",
    badgeLabel: "Seru Rame-Rame",
    boxAccent: "#F7B5CB",
    Icon: KeyRound,
  },
  {
    id: "splendor",
    name: "Splendor",
    categoryTag: "#EngineBuilding",
    players: "2-4 Pemain",
    duration: "Waktu: 30m",
    gmQuote:
      "Koleksi keping permata, borong kartu tambang, dan rebut simpati bangsawan renaissance!",
    dice: 2,
    boxSubtitle: "Renaissance Gem Trade",
    badgeLabel: "Ramah Pemula",
    boxAccent: "#E84A27",
    Icon: Gem,
  },
  {
    id: "root",
    name: "Root",
    categoryTag: "#AsymmetricWar",
    players: "2-4 Pemain",
    duration: "Waktu: 60-90m",
    gmQuote:
      "Hutan lucu tapi perang taktik sengit! Tiap faksi hewan punya aturan main & cara menang beda.",
    dice: 4,
    boxSubtitle: "Woodland Might & Right",
    badgeLabel: "Taktik Ahli",
    boxAccent: "#1B64B4",
    Icon: Swords,
  },
  {
    id: "exploding-kittens",
    name: "Exploding Kittens",
    categoryTag: "#PartyCardGame",
    players: "2-5 Pemain",
    duration: "Waktu: 15m",
    gmQuote:
      "Russian roulette versi kucing ledak. Kocak, rusuh, dan seru buat sabotase teman se-meja!",
    dice: 3,
    boxSubtitle: "High-Powered Card Game",
    badgeLabel: "Party Rusuh",
    boxAccent: "#F7B5CB",
    Icon: Flame,
  },
];

export default function DicePicker() {
  const [selectedGame, setSelectedGame] = useState<GameSuggestion>(
    GAME_SUGGESTIONS[0]
  );
  const [currentDiceNumber, setCurrentDiceNumber] = useState<number>(6);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(1);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);
  const isRollingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      isRollingRef.current = false;
    };
  }, []);

  const rollDice = () => {
    if (isRollingRef.current) return;
    isRollingRef.current = true;
    setIsRolling(true);
    setHasRevealed(false);
    soundEffects.playCardSnap();

    let step = 0;
    const totalSteps = 8;

    const tick = () => {
      step++;
      const randDice = Math.floor(Math.random() * 6) + 1;
      setCurrentDiceNumber(randDice);
      soundEffects.playDiceTick(step);

      if (step >= totalSteps) {
        const availableGames = GAME_SUGGESTIONS.filter(
          (g) => g.id !== selectedGame.id
        );
        const finalItem =
          availableGames[Math.floor(Math.random() * availableGames.length)] ||
          GAME_SUGGESTIONS[0];

        setSelectedGame(finalItem);
        setCurrentDiceNumber(finalItem.dice);
        setRollCount((prev) => prev + 1);
        isRollingRef.current = false;
        setIsRolling(false);
        setHasRevealed(true);
        soundEffects.playTileTap();
      } else {
        const delay = step < 5 ? 75 : step < 7 ? 120 : 180;
        timeoutRef.current = setTimeout(tick, delay);
      }
    };

    tick();
  };

  const handleRollClick = () => {
    if (isRollingRef.current) return;
    soundEffects.playButtonClick();
    rollDice();
  };

  const renderDiceIcon = (num: number, className?: string) => {
    const props = { className: className || "w-4 h-4 text-[#1B64B4] shrink-0" };
    switch (num) {
      case 1:
        return <Dice1 {...props} />;
      case 2:
        return <Dice2 {...props} />;
      case 3:
        return <Dice3 {...props} />;
      case 4:
        return <Dice4 {...props} />;
      case 5:
        return <Dice5 {...props} />;
      case 6:
      default:
        return <Dice6 {...props} />;
    }
  };

  return (
    <div className="relative group/card">
      {/* Stacked card depth layers behind */}
      <div
        className="absolute inset-x-2 bottom-[-6px] h-full rounded-xl bg-[#1B64B4]/[0.06] border border-[#1B64B4]/10 -z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-1 bottom-[-3px] h-full rounded-xl bg-[#1B64B4]/[0.03] border border-[#1B64B4]/[0.07] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-5 xl:p-5 relative overflow-hidden shadow-[0_4px_24px_-4px_rgba(27,100,180,0.12),0_1px_3px_-1px_rgba(27,100,180,0.06)] border border-[#1B64B4]/15">
        {/* Animated top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E84A27] via-[#F7B5CB] to-[#1B64B4]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer-sweep_3s_ease-in-out_infinite]" />
        </div>

        {/* Decorative corner dot grid (top-right) */}
        <div className="absolute top-3 right-3 grid grid-cols-3 gap-[3px] opacity-[0.12] pointer-events-none" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#1B64B4]" />
          ))}
        </div>

        {/* Subtle radial glow behind content */}
        <div
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-10 transition-colors duration-700"
          style={{ backgroundColor: selectedGame.boxAccent }}
          aria-hidden="true"
        />

        {/* ─── Header ─── */}
        <div className="pb-3 mb-3 border-b border-[#1B64B4]/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Dice Icon with glow ring */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-lg bg-[#E84A27]/15 blur-sm pointer-events-none" aria-hidden="true" />
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#E84A27] to-[#D83B13] text-white flex items-center justify-center shadow-sm">
                <Dices
                  className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${
                    isRolling ? "animate-spin" : ""
                  }`}
                />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-extrabold text-sm sm:text-[15px] text-[#172554] truncate leading-tight tracking-tight">
                Gud Game Picker
              </h3>
              <p className="text-[10px] sm:text-[10.5px] font-mono text-[#64748B] truncate tracking-wide uppercase">
                Baciro Tabletop Roulette
              </p>
            </div>
          </div>

          {/* Counter & Re-roll */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-b from-[#F8FAFC] to-[#F0F7FF] border border-[#1B64B4]/20 text-[10px] sm:text-[10.5px] font-mono shadow-2xs">
              <span className="text-[#64748B] font-medium">Kocokan</span>
              <span className="font-black text-[#E84A27] tabular-nums">#{rollCount}</span>
            </div>

            <button
              type="button"
              onClick={handleRollClick}
              disabled={isRolling}
              title="Kocok dadu kembali"
              aria-label="Kocok dadu kembali"
              className="p-1.5 sm:p-2 rounded-md bg-white hover:bg-[#F0F7FF] border border-[#1B64B4]/20 text-[#1B64B4] hover:text-[#172554] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-2xs"
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${
                  isRolling ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ─── Body: Game Result ─── */}
        <div className="space-y-3 sm:space-y-3.5">
          {/* Physical Box Frame */}
          <div
            className={`relative rounded-lg bg-gradient-to-br from-white via-[#FAFBFD] to-[#F0F7FF] border border-[#1B64B4]/15 p-3.5 sm:p-4 overflow-hidden transition-all duration-500 ${
              hasRevealed ? "shadow-sm" : "shadow-xs"
            }`}
          >
            {/* Dynamic accent orb */}
            <div
              className="absolute -right-10 -top-10 w-32 h-32 rounded-full pointer-events-none blur-3xl opacity-10 transition-all duration-700"
              style={{ backgroundColor: selectedGame.boxAccent }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-3 sm:gap-3.5">
              {/* Box Header Strip — more refined */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-dashed border-[#1B64B4]/12">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#F0F7FF] border border-[#1B64B4]/15 font-mono text-[9px] text-[#1B64B4] font-black shrink-0">
                    D{currentDiceNumber}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#1B64B4]/25 shrink-0" />
                  <span className="font-mono text-[10.5px] text-[#334155] font-semibold truncate">
                    {selectedGame.boxSubtitle}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#172554] bg-gradient-to-b from-white to-[#F8FAFC] px-2 py-0.5 rounded-md border border-[#1B64B4]/15 shrink-0 font-semibold shadow-2xs">
                  <Award className="w-3 h-3 text-[#E84A27]" />
                  <span>{selectedGame.badgeLabel}</span>
                </span>
              </div>

              {/* Physical Box Cover Art — elevated design */}
              <div className="rounded-lg border border-[#1B64B4]/15 bg-white p-3 sm:p-3.5 flex items-center justify-between gap-3 relative overflow-hidden shadow-2xs">
                {/* Box spine accent */}
                <div
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                  style={{ backgroundColor: selectedGame.boxAccent }}
                />

                <div className="flex items-center gap-3 min-w-0 pl-1.5">
                  {/* Cover Artwork Badge — larger & more premium */}
                  <div className="relative shrink-0">
                    <div
                      className="absolute -inset-0.5 rounded-lg blur-sm opacity-25 pointer-events-none"
                      style={{ backgroundColor: selectedGame.boxAccent }}
                      aria-hidden="true"
                    />
                    <div
                      className="relative w-11 h-12 sm:w-12 sm:h-[52px] rounded-lg border-2 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC] shadow-xs"
                      style={{
                        borderColor: `${selectedGame.boxAccent}40`,
                      }}
                    >
                      <selectedGame.Icon
                        className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0"
                        style={{ color: selectedGame.boxAccent }}
                      />
                      <span className="text-[6.5px] font-mono font-black tracking-[0.15em] uppercase text-[#94A3B8] mt-0.5">
                        BOX
                      </span>
                    </div>
                  </div>

                  {/* Game Title */}
                  <div className="min-w-0">
                    <h4 className="font-display font-black text-[13px] sm:text-sm xl:text-[15px] text-[#172554] tracking-tight leading-snug truncate">
                      {selectedGame.name}
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] font-mono text-[#64748B] mt-0.5 truncate tracking-wide">
                      Edisi Meja Fisik Gitgud Cafe
                    </p>
                  </div>
                </div>

                {/* Physical Dice Token — refined */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-b from-[#F8FAFC] to-[#F0F7FF] border border-[#1B64B4]/20 flex items-center justify-center shrink-0 shadow-2xs">
                  {renderDiceIcon(currentDiceNumber)}
                </div>
              </div>

              {/* Tag Badges — refined spacing */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F5] text-[#C2185B] border border-[#F7B5CB]/80 font-bold text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md shadow-2xs">
                  {selectedGame.categoryTag}
                </span>

                <span className="bg-gradient-to-b from-[#F0F7FF] to-[#EBF5FF] text-[#1B64B4] border border-[#93C5FD]/60 font-bold text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-2xs">
                  <Users className="w-3 h-3 shrink-0" />
                  <span>{selectedGame.players}</span>
                </span>

                <span className="border border-[#1B64B4]/15 bg-white text-[#64748B] font-mono text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-2xs">
                  <Clock className="w-3 h-3 text-[#E84A27] shrink-0" />
                  <span>{selectedGame.duration}</span>
                </span>
              </div>

              {/* GM Quote — editorial style with decorative mark */}
              <div className="relative bg-gradient-to-r from-[#FFF8F5] to-[#FFFBF9] border-l-[3px] border-[#E84A27] p-2.5 sm:p-3 rounded-r-lg overflow-hidden">
                {/* Large decorative quote mark */}
                <svg
                  className="absolute top-1 right-2 w-8 h-8 text-[#E84A27]/[0.07] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.204 11 15c0 1.933-1.567 3.5-3.5 3.5-1.199 0-2.344-.611-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.204 21 15c0 1.933-1.567 3.5-3.5 3.5-1.199 0-2.344-.611-2.917-1.179z" />
                </svg>
                <div className="font-mono text-[8px] sm:text-[9px] font-bold text-[#E84A27] uppercase tracking-[0.15em] mb-1 flex items-center gap-1.5">
                  <span className="w-3 h-[1.5px] bg-[#E84A27]/40 rounded-full" />
                  <span>Catatan Game Master</span>
                </div>
                <p className="text-[10.5px] sm:text-[11px] text-[#475569] italic leading-snug font-sans line-clamp-2 relative z-10">
                  &ldquo;{selectedGame.gmQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* ─── Roll Button — premium with shimmer ─── */}
          <button
            type="button"
            onClick={handleRollClick}
            disabled={isRolling}
            className="group/btn relative w-full bg-[#1B64B4] hover:bg-[#154E8E] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white font-display font-bold py-3 sm:py-3.5 px-4 rounded-lg transition-all text-xs sm:text-[13px] tracking-wide cursor-pointer flex items-center justify-center gap-2 overflow-hidden shadow-[0_2px_8px_-2px_rgba(27,100,180,0.4)]"
          >
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <Dices
              className={`w-4 h-4 shrink-0 relative z-10 ${isRolling ? "animate-spin" : ""}`}
            />
            <span className="relative z-10">{isRolling ? "Mengacak Game..." : "Roll Game Lain"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
