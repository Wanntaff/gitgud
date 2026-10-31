"use client";

import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] py-8 sm:py-10 px-4 lg:px-12 text-[#475569] text-xs font-mono border-t-2 border-[#1B64B4]/15">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-10 px-3 py-1 bg-white rounded-xl border-2 border-brand-orange shadow-brutal-orange flex items-center justify-center shrink-0 w-fit">
            <Image
              src="/logo.png"
              alt="Gitgud Board Game & Cafe"
              width={120}
              height={38}
              className="h-6 w-auto object-contain"
            />
          </div>
          <div>
            <span className="text-[#172554] font-bold font-display text-sm tracking-wide flex items-center gap-1.5 whitespace-nowrap">
              GITGUD <span className="text-brand-orange">BOARDGAME & CAFE</span>
            </span>
            <p className="text-[11px] text-[#475569]">
              Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta 55225
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/letsgitgud"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playButtonClick()}
            className="text-[#1B64B4] hover:text-brand-orange font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4 shrink-0" />
            <span>@letsgitgud</span>
          </a>
          <a
            href="https://linktr.ee/letsgitgud"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playButtonClick()}
            className="text-[#1B64B4] hover:text-brand-orange font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <LinkIcon className="w-4 h-4 shrink-0" />
            <span>Linktree</span>
          </a>
        </div>

        <div className="text-[#64748B] text-center md:text-right">
          Gitgud Boardgame & Cafe &copy; 2026. Yogyakarta.
        </div>
      </div>
    </footer>
  );
}
