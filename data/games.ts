import rawGames from "./games.json";

export interface NotionGame {
  id: string;
  title: string;
  category: string | null;
  difficulty: "Piece of Cake!" | "Tough Nut" | "Brainburner" | "GITGUD" | string | null;
  players: string | null;
  playtime: string | null;
  description: string | null;
  greatFor2p: boolean;
  detailUrl: string | null;
  cover: string | null;
}

export const ALL_GAMES: NotionGame[] = rawGames as NotionGame[];

export const GAME_CATEGORIES = [
  "Semua",
  "Party",
  "Casual",
  "Strategy",
  "Family",
  "Battle",
  "Co-op",
  "Card Game",
  "Social Deduction",
  "Classic",
  "Dexterity",
  "Deduction",
] as const;

export const DIFFICULTY_LEVELS = [
  "Piece of Cake!",
  "Tough Nut",
  "Brainburner",
  "GITGUD",
] as const;
