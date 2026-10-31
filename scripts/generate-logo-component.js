const fs = require('fs');

const svgContent = fs.readFileSync('public/logo.svg', 'utf8');

// Extract the two path 'd' attributes
const orangePath = svgContent.match(/<!-- Orange GITGUD Letters -->\s*<path\s+d="([^"]+)"/)[1];
const bluePath = svgContent.match(/<!-- Blue BOARDGAME AND CAFE Letters -->\s*<path\s+d="([^"]+)"/)[1];

const componentContent = `"use client";

import React, { useId } from "react";
import { soundEffects } from "@/lib/soundEffects";

interface LogoProps {
  className?: string;
  priority?: boolean;
  interactiveAudio?: boolean;
}

/**
 * Gitgud Board Game & Cafe Official High-Fidelity Vector SVG Logo
 * Features:
 * - 100% exact vector paths with crisp counter holes in all letterforms
 * - Dynamic instance-scoped gradient IDs (zero DOM collisions)
 * - Tabletop Collector's Edition holographic foil glint & kinetic spring elevation
 * - Playful tabletop lucky star / meeple twinkle that reveals on hover
 * - Full accessibility with prefers-reduced-motion support
 */
export default function Logo({
  className = "h-8 sm:h-9 md:h-10 w-auto",
  interactiveAudio = true,
}: LogoProps) {
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const orangeGradientId = \`gitgud-orange-foil-\${uniqueId}\`;
  const blueGradientId = \`gitgud-blue-foil-\${uniqueId}\`;

  const handleMouseEnter = () => {
    if (interactiveAudio) {
      soundEffects.playTileTap();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="relative inline-flex items-center group cursor-pointer select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3580 1120"
        fill="none"
        className={\`\${className} transition-all duration-300 ease-out group-hover:drop-shadow-[0_6px_20px_rgba(232,74,39,0.25)] motion-reduce:transition-none motion-reduce:group-hover:drop-shadow-none\`}
        aria-label="Gitgud Board Game & Cafe"
        role="img"
      >
        <defs>
          {/* Brand Orange Holographic Tabletop Foil Glint */}
          <linearGradient
            id={orangeGradientId}
            x1="-100%"
            y1="0%"
            x2="200%"
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E84A27" />
            <stop offset="35%" stopColor="#E84A27" />
            <stop offset="50%" stopColor="#FFA085" />
            <stop offset="65%" stopColor="#E84A27" />
            <stop offset="100%" stopColor="#E84A27" />
            <animate
              attributeName="x1"
              from="-100%"
              to="150%"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="0%"
              to="250%"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Deep Navy/Cobalt Tabletop Shimmer for Secondary Arc Text */}
          <linearGradient
            id={blueGradientId}
            x1="-100%"
            y1="0%"
            x2="200%"
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1B64B4" />
            <stop offset="38%" stopColor="#1B64B4" />
            <stop offset="52%" stopColor="#70B8F9" />
            <stop offset="68%" stopColor="#1B64B4" />
            <stop offset="100%" stopColor="#1B64B4" />
            <animate
              attributeName="x1"
              from="-100%"
              to="150%"
              dur="4.5s"
              begin="0.35s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="0%"
              to="250%"
              dur="4.5s"
              begin="0.35s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Primary Orange "GITGUD" Letters - Kinetic Tabletop Lift */}
        <g className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1.5 motion-reduce:transform-none">
          <path
            d="${orangePath}"
            fill={\`url(#\${orangeGradientId})\`}
            fillRule="evenodd"
          />
        </g>

        {/* Secondary Blue "BOARDGAME AND CAFE" Arced Letters - Kinetic Floating Drift */}
        <g className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 group-hover:-translate-y-2 group-hover:translate-x-1 motion-reduce:transform-none">
          <path
            d="${bluePath}"
            fill={\`url(#\${blueGradientId})\`}
            fillRule="evenodd"
          />

          {/* Tabletop Lucky Sparkle Pip (reveals and twinkles charmingly on hover) */}
          <g className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out origin-[3500px_40px] motion-reduce:opacity-100">
            {/* 4-point golden tabletop sparkle */}
            <path
              d="M 3500 20 Q 3500 40 3520 40 Q 3500 40 3500 60 Q 3500 40 3480 40 Q 3500 40 3500 20 Z"
              fill="#FFA085"
            />
            <circle cx="3500" cy="40" r="3" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('components/Logo.tsx', componentContent);
console.log('components/Logo.tsx successfully created! Length:', componentContent.length);
