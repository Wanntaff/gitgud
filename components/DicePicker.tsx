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

export interface DicePickerProps {
  compact?: boolean;
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

export default function DicePicker({ compact = false }: DicePickerProps) {
  const [selectedGame, setSelectedGame] = useState<GameSuggestion>(
    GAME_SUGGESTIONS[0]
  );
  const [currentDiceNumber, setCurrentDiceNumber] = useState<number>(6);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(1);
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

  if (compact) {
    return (
      <div className="relative group/card bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange/80" />

        {/* Header Strip */}
        <div className="pb-2.5 mb-2.5 border-b border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 shadow-xs">
              <Dices
                className={`w-4 h-4 transition-transform ${
                  isRolling ? "animate-spin" : ""
                }`}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-xs sm:text-[13px] text-[#172554] truncate leading-tight">
                Gud Game Picker
              </h3>
              <p className="text-[9px] font-sans font-medium text-[#64748B] truncate tracking-wide uppercase">
                Baciro Roulette
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-sans text-[9.5px] text-brand-orange font-bold px-2 py-0.5 rounded bg-[#FFF5F0] border border-brand-orange/20">
              #{rollCount}
            </span>
            <button
              type="button"
              onClick={handleRollClick}
              disabled={isRolling}
              title="Kocok dadu kembali"
              aria-label="Kocok dadu kembali"
              className="p-1 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-[#475569] hover:text-[#172554] transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-xs"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRolling ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Compact Result Card & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F8FAFC] border border-slate-200/90 p-2.5 sm:p-3 rounded-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border flex flex-col items-center justify-center bg-white shrink-0 shadow-xs"
              style={{ borderColor: `${selectedGame.boxAccent}40` }}
            >
              <selectedGame.Icon
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
                style={{ color: selectedGame.boxAccent }}
              />
              <span className="text-[6.5px] font-sans font-bold text-[#94A3B8]">D{currentDiceNumber}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#172554] truncate">
                  {selectedGame.name}
                </h4>
                <span className="text-[9px] font-sans font-semibold text-[#172554] bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                  {selectedGame.badgeLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#64748B] font-sans font-medium mt-0.5">
                <span>{selectedGame.categoryTag}</span>
                <span>•</span>
                <span>{selectedGame.players}</span>
                <span>•</span>
                <span>{selectedGame.duration}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRollClick}
            disabled={isRolling}
            className="sm:w-auto shrink-0 bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.98] text-white font-display font-bold py-2 px-3.5 rounded-lg text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Dices className={`w-3.5 h-3.5 ${isRolling ? "animate-spin" : ""}`} />
            <span>{isRolling ? "Mengacak..." : "Roll Game Lain"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/card">
      {/* Main Card */}
      <div className="bg-white rounded-xl p-3.5 sm:p-5 lg:p-5 xl:p-5 relative overflow-hidden shadow-xs border border-slate-200">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange/80" />

        {/* Subtle radial glow behind content */}
        <div
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-5 transition-colors duration-700"
          style={{ backgroundColor: selectedGame.boxAccent }}
          aria-hidden="true"
        />

        {/* ─── Header ─── */}
        <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Dice Icon */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FFF5F0] border border-brand-orange/20 text-brand-orange flex items-center justify-center shadow-xs">
                <Dices
                  className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${
                    isRolling ? "animate-spin" : ""
                  }`}
                />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm sm:text-[15px] text-[#172554] truncate leading-tight tracking-tight">
                Gud Game Picker
              </h3>
              <p className="text-[10px] sm:text-[10.5px] font-sans font-medium text-[#64748B] truncate tracking-wide uppercase">
                Baciro Tabletop Roulette
              </p>
            </div>
          </div>

          {/* Counter & Re-roll */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#F8FAFC] border border-slate-200 text-[10px] sm:text-[10.5px] font-sans">
              <span className="text-[#64748B] font-medium">Kocokan</span>
              <span className="font-bold text-brand-orange tabular-nums">#{rollCount}</span>
            </div>

            <button
              type="button"
              onClick={handleRollClick}
              disabled={isRolling}
              title="Kocok dadu kembali"
              aria-label="Kocok dadu kembali"
              className="p-1.5 sm:p-2 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-[#475569] hover:text-[#172554] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-xs"
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
            className="relative rounded-lg bg-[#F8FAFC] border border-slate-200 p-3.5 sm:p-4 overflow-hidden transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col gap-3 sm:gap-3.5">
              {/* Box Header Strip */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-white border border-slate-200 font-sans text-[9px] text-[#172554] font-bold shrink-0">
                    D{currentDiceNumber}
                  </span>
                  <span className="text-slate-300 select-none">•</span>
                  <span className="font-sans text-[10.5px] text-[#475569] font-medium truncate">
                    {selectedGame.boxSubtitle}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-sans text-[9px] text-[#172554] bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0 font-semibold shadow-xs">
                  <Award className="w-3 h-3 text-brand-orange" />
                  <span>{selectedGame.badgeLabel}</span>
                </span>
              </div>

              {/* Physical Box Cover Art */}
              <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-3.5 flex items-center justify-between gap-3 relative overflow-hidden shadow-xs">
                {/* Box spine accent */}
                <div
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                  style={{ backgroundColor: selectedGame.boxAccent }}
                />

                <div className="flex items-center gap-3 min-w-0 pl-1.5">
                  <div className="relative shrink-0">
                    <div
                      className="relative w-11 h-12 sm:w-12 sm:h-[52px] rounded-lg border flex flex-col items-center justify-center overflow-hidden bg-[#F8FAFC]"
                      style={{
                        borderColor: `${selectedGame.boxAccent}35`,
                      }}
                    >
                      <selectedGame.Icon
                        className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0"
                        style={{ color: selectedGame.boxAccent }}
                      />
                      <span className="text-[6.5px] font-sans font-bold tracking-[0.15em] uppercase text-[#94A3B8] mt-0.5">
                        BOX
                      </span>
                    </div>
                  </div>

                  {/* Game Title */}
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-[13px] sm:text-sm xl:text-[15px] text-[#172554] tracking-tight leading-snug truncate">
                      {selectedGame.name}
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] font-sans text-[#64748B] mt-0.5 truncate tracking-wide">
                      Edisi Meja Fisik Gitgud Cafe
                    </p>
                  </div>
                </div>

                {/* Dice Icon */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F8FAFC] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  {renderDiceIcon(currentDiceNumber)}
                </div>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="bg-white text-[#172554] border border-slate-200 font-medium text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md shadow-xs">
                  {selectedGame.categoryTag}
                </span>

                <span className="bg-white text-[#172554] border border-slate-200 font-medium text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Users className="w-3 h-3 text-[#64748B] shrink-0" />
                  <span>{selectedGame.players}</span>
                </span>

                <span className="bg-white text-[#64748B] font-sans text-[10px] sm:text-[10.5px] px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-200 shadow-xs">
                  <Clock className="w-3 h-3 text-brand-orange shrink-0" />
                  <span>{selectedGame.duration}</span>
                </span>
              </div>

              {/* GM Quote */}
              <div className="relative bg-[#FFF9F6] border-l-[3px] border-brand-orange p-2.5 sm:p-3 rounded-r-lg overflow-hidden">
                <div className="font-sans text-[8px] sm:text-[9px] font-bold text-brand-orange uppercase tracking-[0.15em] mb-1 flex items-center gap-1.5">
                  <span className="w-3 h-[1.5px] bg-brand-orange/40 rounded-full" />
                  <span>Catatan Game Master</span>
                </div>
                <p className="text-[10.5px] sm:text-[11px] text-[#475569] italic leading-snug font-sans line-clamp-2 relative z-10">
                  &ldquo;{selectedGame.gmQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* ─── Roll Button ─── */}
          <button
            type="button"
            onClick={handleRollClick}
            disabled={isRolling}
            className="group/btn relative w-full bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white font-display font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all text-xs sm:text-[13px] tracking-wide cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
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
