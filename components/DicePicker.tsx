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

  const renderDiceIcon = (num: number) => {
    const props = { className: "w-4 h-4 text-[#1B64B4] shrink-0" };
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
    <div className="bg-white border-2 border-[#1B64B4]/20 border-t-4 border-t-[#E84A27] rounded-xl p-4 sm:p-5 lg:p-5 xl:p-5 relative overflow-hidden shadow-md">
      {/* Header Card */}
      <div className="pb-3 mb-3 border-b-2 border-[#1B64B4]/15 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-md bg-[#E84A27] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Dices
              className={`w-4 h-4 transition-transform ${
                isRolling ? "animate-spin" : ""
              }`}
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#172554] truncate leading-tight">
              Gud Game Picker
            </h3>
            <p className="text-[10.5px] font-mono text-[#475569] truncate">
              Baciro Tabletop Roulette
            </p>
          </div>
        </div>

        {/* Re-roll Control & Counter */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0F7FF] border border-[#1B64B4]/25 text-[10.5px] font-mono">
            <span className="text-[#475569]">Kocokan</span>
            <span className="font-bold text-[#E84A27]">#{rollCount}</span>
          </div>

          <button
            type="button"
            onClick={handleRollClick}
            disabled={isRolling}
            title="Kocok dadu kembali"
            aria-label="Kocok dadu kembali"
            className="p-1.5 rounded-md bg-[#F8FAFC] hover:bg-[#F0F7FF] border border-[#1B64B4]/25 text-[#1B64B4] hover:text-[#172554] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-[#1B64B4] ${
                isRolling ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Body Display: Physical Board Game Box Cover Mockup */}
      <div className="space-y-3 sm:space-y-3.5">
        {/* Physical Box Frame */}
        <div className="relative rounded-xl bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F0F7FF] border-2 border-[#1B64B4]/20 p-3 sm:p-4 shadow-xs overflow-hidden transition-all">
          <div
            className="absolute -right-8 -top-8 w-28 h-28 rounded-full pointer-events-none blur-2xl opacity-15"
            style={{ backgroundColor: selectedGame.boxAccent }}
          />

          <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
            {/* Box Header Strip */}
            <div className="flex items-center justify-between gap-2 border-b border-[#1B64B4]/15 pb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-mono text-[10px] text-[#475569] uppercase tracking-wider shrink-0 font-bold">
                  D{currentDiceNumber}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B64B4]/30 shrink-0" />
                <span className="font-mono text-[10.5px] text-[#172554] font-semibold truncate">
                  {selectedGame.boxSubtitle}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#172554] bg-white px-1.5 py-0.5 rounded border border-[#1B64B4]/25 shrink-0 font-medium shadow-2xs">
                <Award className="w-3 h-3 text-[#E84A27]" />
                <span>{selectedGame.badgeLabel}</span>
              </span>
            </div>

            {/* Physical Box Cover Art Slot (Mockup Cover Game Fisik) */}
            <div className="rounded-lg border-2 border-[#1B64B4]/20 bg-white p-2.5 sm:p-3 flex items-center justify-between gap-2.5 shadow-xs relative overflow-hidden">
              {/* Box spine color accent bar on left */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-md"
                style={{ backgroundColor: selectedGame.boxAccent }}
              />

              <div className="flex items-center gap-2.5 min-w-0 pl-1">
                {/* Physical Game Cover Artwork Badge */}
                <div
                  className="w-10 h-11 sm:w-11 sm:h-12 rounded-md border-2 border-[#1B64B4]/20 flex flex-col items-center justify-center p-0.5 shrink-0 relative overflow-hidden shadow-xs bg-[#F8FAFC]"
                  style={{
                    borderColor: `${selectedGame.boxAccent}50`,
                  }}
                >
                  <selectedGame.Icon
                    className="w-5 h-5 shrink-0"
                    style={{ color: selectedGame.boxAccent }}
                  />
                  <span className="text-[7px] font-mono font-bold tracking-wider uppercase text-[#475569] mt-0.5">
                    BOX
                  </span>
                </div>

                {/* Game Title & Physical Copy Label */}
                <div className="min-w-0">
                  <h4 className="font-display font-black text-xs sm:text-[13px] xl:text-sm text-[#172554] tracking-tight leading-snug truncate">
                    {selectedGame.name}
                  </h4>
                  <p className="text-[10px] sm:text-[10.5px] font-mono text-[#475569] mt-0.5 truncate">
                    Edisi Meja Fisik Gitgud Cafe
                  </p>
                </div>
              </div>

              {/* Physical Dice Token */}
              <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-md bg-[#F0F7FF] border border-[#1B64B4]/30 flex items-center justify-center shrink-0 shadow-xs">
                {renderDiceIcon(currentDiceNumber)}
              </div>
            </div>

            {/* Tag Info Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Tag: Pastel Pink #F7B5CB */}
              <span className="bg-[#FFF0F5] text-[#C2185B] border border-[#F7B5CB] font-bold text-[10px] sm:text-[10.5px] px-2 py-0.5 rounded-md">
                {selectedGame.categoryTag}
              </span>

              {/* Players: Light Blue #5BB5F8 */}
              <span className="bg-[#EBF5FF] text-[#1B64B4] border border-[#5BB5F8] font-bold text-[10px] sm:text-[10.5px] px-2 py-0.5 rounded-md flex items-center gap-1">
                <Users className="w-3 h-3 shrink-0" />
                <span>{selectedGame.players}</span>
              </span>

              {/* Duration */}
              <span className="border border-[#1B64B4]/25 bg-white text-[#475569] font-mono text-[10px] sm:text-[10.5px] px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E84A27] shrink-0" />
                <span>{selectedGame.duration}</span>
              </span>
            </div>

            {/* Quote Rekomendasi Game Master */}
            <div className="border-l-3 border-[#E84A27] bg-[#FFF8F5] p-2 sm:p-2.5 rounded-r-md">
              <div className="font-mono text-[9px] font-bold text-[#E84A27] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <span>Catatan Game Master</span>
              </div>
              <p className="text-[10.5px] sm:text-[11px] text-[#334155] italic leading-snug font-sans line-clamp-2">
                &ldquo;{selectedGame.gmQuote}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Trigger Button: Cobalt Blue #1B64B4 */}
        <button
          type="button"
          onClick={handleRollClick}
          disabled={isRolling}
          className="w-full bg-[#1B64B4] hover:bg-[#154E8E] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white font-display font-bold py-2.5 sm:py-3 px-4 rounded-md transition-all text-xs tracking-wide cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#5BB5F8]"
        >
          <Dices
            className={`w-4 h-4 shrink-0 ${isRolling ? "animate-spin" : ""}`}
          />
          <span>{isRolling ? "Mengacak Game..." : "Roll Game Lain"}</span>
        </button>
      </div>
    </div>
  );
}
