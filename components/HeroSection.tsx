"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Dices,
  MapPin,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  description: string;
  tag: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "gathering",
    src: "/cafe/cafe-squad-table.png",
    alt: "Komunitas dan squad bermain board game dan TTRPG di meja kayu Gitgud Kafe Baciro",
    badge: "01 // MEJA SQUAD",
    title: "Nongkrong seru bareng teman.",
    description: "Main board game seru sambil ngopi santai dan ngobrol bareng teman.",
    tag: "Baciro / Jogja",
  },
  {
    id: "collection",
    src: "/cafe/cafe-game-collection.png",
    alt: "Koleksi rak board game fisik terlengkap di Gitgud Kafe Yogyakarta",
    badge: "02 // 300+ KOLEKSI",
    title: "Koleksi 300+ board game.",
    description: "Koleksi game fisik lengkap dari party game santai sampai game strategi yang seru.",
    tag: "Koleksi Terlengkap",
  },
  {
    id: "facade",
    src: "/cafe/cafe-facade.png",
    alt: "Fasad kaca dan suasana kafe Gitgud Board Game & Cafe Baciro Yogyakarta",
    badge: "03 // BACIRO HQ",
    title: "Suasana nyaman dan meja luas.",
    description: "Tempat nongkrong asyik di Baciro dengan meja kayu yang lega dan nyaman.",
    tag: "Baciro / Jogja",
  },
  {
    id: "cozy",
    src: "/cafe/cafe-cozy-corner.png",
    alt: "Sudut santai dengan sofa dan suasana nyaman di Gitgud Cafe",
    badge: "04 // COZY CORNER",
    title: "Kopi fresh dan minuman segar.",
    description: "Pilihan kopi racikan barista dan aneka minuman segar untuk menemani sesi mainmu.",
    tag: "Baciro / Jogja",
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide auto-transition

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchStartXRef.current - touchEndX;
    const dy = (touchStartYRef.current ?? touchEndY) - touchEndY;
    // Gesture swipe detection: minimum 35px horizontal travel with predominantly horizontal angle
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      soundEffects.playTileTap();
      if (dx > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const goToSlide = (index: number) => {
    soundEffects.playButtonClick();
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (heroSlides.length <= 1 || isPaused) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    soundEffects.playButtonClick();
    const element = document.getElementById(sectionId);
    if (element) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;
      const top = Math.round(
        element.getBoundingClientRect().top + window.scrollY - navHeight
      );
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  const movePhoto = (e: React.PointerEvent<HTMLElement>) => {
    if (
      e.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    e.currentTarget.style.setProperty("--photo-x", `${x * -12}px`);
    e.currentTarget.style.setProperty("--photo-y", `${y * -10}px`);
  };

  const resetPhoto = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--photo-x", "0px");
    e.currentTarget.style.setProperty("--photo-y", "0px");
  };

  const activeSlideData = heroSlides[currentSlide] ?? heroSlides[0];

  {/* Desktop Editorial Carousel: Preserves full-height presentation and cursor parallax */ }
  const renderDesktopCarousel = () => (
    <figure
      className="hero-photo-shell group relative min-h-[580px] h-full overflow-hidden bg-[#1C211D] select-none"
      onPointerMove={movePhoto}
      onPointerLeave={(e) => {
        resetPhoto(e);
        setIsPaused(false);
      }}
      onPointerEnter={() => setIsPaused(true)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri Suasana Kafe Gitgud"
    >
      {/* Segmented iOS-Style Story Progress Bars */}
      {heroSlides.length > 1 && (
        <div className="absolute z-30 flex items-center gap-2 top-4 inset-x-8">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const isPassed = idx < currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Buka slide ${idx + 1}: ${slide.title}`}
                className="relative h-[3.5px] flex-1 rounded-full bg-white/25 backdrop-blur-sm overflow-hidden transition-all hover:h-[5px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
              >
                <span
                  key={`${slide.id}-${isActive ? currentSlide : "inactive"}`}
                  className={`absolute inset-0 bg-white rounded-full ${isPassed
                      ? "w-full"
                      : isActive
                        ? "w-full origin-left"
                        : "w-0"
                    }`}
                  style={
                    isActive
                      ? {
                        animation: `slide-progress ${SLIDE_DURATION}ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }
                      : undefined
                  }
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Slide Photos Layer */}
      <div className="hero-photo-settle absolute inset-0">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 1023px) 100vw, 56vw"
                className="hero-photo-image object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* Soft Dark Gradient Base for Caption Legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1120]/95 via-[#0A1120]/50 to-transparent z-15 h-48"
        aria-hidden="true"
      />

      {/* Sleek Arrow Controls (hover-reveal on desktop) */}
      {heroSlides.length > 1 && (
        <div className="pointer-events-none absolute inset-y-0 z-25 flex items-center justify-between inset-x-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundEffects.playButtonClick();
              prevSlide();
            }}
            aria-label="Foto sebelumnya"
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundEffects.playButtonClick();
              nextSlide();
            }}
            aria-label="Foto selanjutnya"
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Dynamic Editorial Caption */}
      <figcaption className="hero-photo-caption absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 text-white p-6 sm:p-8">
        <div key={activeSlideData.id} className="animate-caption-switch min-w-0">
          {heroSlides.length > 1 && (
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#FF8566] font-bold block mb-1">
              {activeSlideData.badge}
            </span>
          )}
          <p className="font-display font-bold tracking-tight text-white text-xl sm:text-2xl">
            {activeSlideData.title}
          </p>
          <p className="text-white/85 font-sans mt-1 max-w-[340px] text-xs sm:text-sm leading-relaxed">
            {activeSlideData.description}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1 font-sans text-[10px] uppercase tracking-[0.18em] text-white/80">
          <span>{activeSlideData.tag}</span>
          {heroSlides.length > 1 && (
            <span className="rounded-full bg-black/35 backdrop-blur-sm px-2 py-0.5 border border-white/10 text-[9px] text-white/50 tracking-wider">
              0{currentSlide + 1} / 0{heroSlides.length}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden border-b border-slate-200 bg-[#F3F0E9] min-h-[calc(100svh-94px)] sm:min-h-[calc(100svh-96px)] lg:min-h-[calc(100svh-112px)]"
    >
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Left Column (Desktop) / Main Full-Viewport Column (Mobile) */}
        <div className="hero-copy relative z-10 flex flex-col justify-between flex-1 px-4 py-5 sm:px-8 sm:py-8 lg:py-10 xl:py-12">
          {/* Top Block: Eyebrow, Headline, Mobile Editorial Frame, & Description */}
          <div className="max-w-[650px] w-full">
            {/* Mobile Presentation: Swiss-Editorial Tabletop Lookbook (Clean, Expensive, Zero Frosted Slop) */}
            <div className="block lg:hidden w-full">
              {/* Architectural Masthead Eyebrow (Same exact copy as Desktop) */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#172554]/12 font-sans text-[10px] xs:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#475569]">
                <span className="inline-flex items-center gap-1.5 text-[#172554]">
                  <MapPin
                    className="h-3.5 w-3.5 text-brand-orange shrink-0"
                    strokeWidth={1.8}
                  />
                  Baciro, Yogyakarta
                </span>
                <span className="h-px flex-1 max-w-8 bg-[#A8A196]/70" aria-hidden="true" />
                <span className="text-[#172554]/75">Board game &amp; cafe</span>
              </div>

              {/* Editorial Display Headline (Mirrors Desktop Authority & Copy) */}
              <div className="flex items-end justify-between gap-4">
                <h1 className="font-display text-[2.25rem] xs:text-[2.55rem] sm:text-[3rem] font-bold uppercase leading-[0.96] tracking-[-0.04em] text-[#172554]">
                  <span className="block">Bosan Main HP?</span>
                  <span className="block mt-0.5">
                    Adu taktik{" "}
                    <span className="text-brand-orange whitespace-nowrap">
                      di Gitgud.
                    </span>
                  </span>
                </h1>
              </div>

              {/* Curated Visual Lookbook Showcase (Clean, Minimal, Touch-Swipe Enabled) */}
              <figure
                className="mt-4 relative rounded-xl overflow-hidden bg-[#1C211D] border border-[#172554]/15 shadow-sm select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                role="region"
                aria-roledescription="carousel"
                aria-label="Galeri Suasana Kafe Gitgud Mobile"
              >
                {/* Segmented Story Progress Bars */}
                {heroSlides.length > 1 && (
                  <div className="absolute z-30 flex items-center gap-1.5 top-3 inset-x-3.5">
                    {heroSlides.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      const isPassed = idx < currentSlide;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => goToSlide(idx)}
                          aria-label={`Buka slide ${idx + 1}: ${slide.title}`}
                          className="relative h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden cursor-pointer"
                        >
                          <span
                            key={`${slide.id}-${isActive ? currentSlide : "inactive"}`}
                            className={`absolute inset-0 bg-white rounded-full ${isPassed
                                ? "w-full"
                                : isActive
                                  ? "w-full origin-left"
                                  : "w-0"
                              }`}
                            style={
                              isActive
                                ? {
                                  animation: `slide-progress ${SLIDE_DURATION}ms linear forwards`,
                                  animationPlayState: isPaused
                                    ? "paused"
                                    : "running",
                                }
                                : undefined
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Single Minimalist Editorial Badge in Pojok Kiri Only */}
                <div className="absolute z-20 top-6 left-3.5 pointer-events-none">
                  <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#FF8566] font-bold bg-[#0A1120]/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 shadow-xs">
                    {activeSlideData.badge}
                  </span>
                </div>

                {/* Crisp 16:10 Photography Viewport */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                  {heroSlides.map((slide, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                          }`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          priority={idx === 0}
                          sizes="100vw"
                          className="object-cover object-center"
                        />
                      </div>
                    );
                  })}
                </div>
              </figure>

              {/* Editorial Description Paragraph (Exact Desktop Copy) */}
              <p className="mt-4 text-[13px] sm:text-sm leading-relaxed text-[#334155] font-sans font-medium pl-3 border-l-2 border-[#172554]/25">
                Pilih satu dari 300+ board game, pesan kopi, lalu main bareng
                sampai lupa cek HP. Baru pertama kali? Game Master kami siap
                ngajarin di meja.
              </p>
            </div>

            {/* Desktop Presentation: 100% Preserved Original Editorial Layout */}
            <div className="hidden lg:block">
              {/* Location & Concept Eyebrow */}
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#475569]">
                <span className="inline-flex items-center gap-2 text-[#172554]">
                  <MapPin className="h-4 w-4 text-brand-orange" strokeWidth={1.8} />
                  Baciro, Yogyakarta
                </span>
                <span className="h-px w-7 bg-[#A8A196]" aria-hidden="true" />
                <span>Board game &amp; cafe</span>
              </div>

              {/* Responsive Editorial Headline */}
              <h1 className="font-display text-[clamp(2.65rem,4.7vw,4.6rem)] font-bold uppercase leading-[0.96] tracking-[-0.045em] text-[#172554]">
                <span className="block overflow-hidden">
                  <span className="hero-title-line block whitespace-nowrap">
                    Bosan
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="hero-title-line block whitespace-nowrap"
                    style={{ animationDelay: "60ms" }}
                  >
                    Main HP?
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="hero-title-line block whitespace-nowrap"
                    style={{ animationDelay: "120ms" }}
                  >
                    Adu taktik
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="hero-title-line block whitespace-nowrap text-brand-orange"
                    style={{ animationDelay: "180ms" }}
                  >
                    di Gitgud.
                  </span>
                </span>
              </h1>

              {/* Description Paragraph */}
              <p className="mt-6 max-w-[520px] text-base leading-relaxed text-[#334155] font-sans font-medium">
                Pilih satu dari 300+ board game, pesan kopi, lalu main bareng
                sampai lupa cek HP. Baru pertama kali? Game Master kami siap
                ngajarin di meja.
              </p>
            </div>
          </div>

          {/* Bottom Block: CTAs and Micro-Stats pinned above screen bottom */}
          <div className="max-w-[650px] mt-5 sm:mt-8">
            {/* Responsive Call-to-Actions (Clean architectural buttons on mobile, exact original on sm/desktop) */}
            <div className="grid grid-cols-[1.15fr_0.85fr] sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-6">
              <a
                href="#games"
                onClick={(e) => scrollTo(e, "games")}
                className="group luxury-btn luxury-sheen w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-brand-orange bg-brand-orange px-3.5 sm:px-5 py-3 font-display text-xs sm:text-sm font-bold text-white transition-colors duration-150 hover:border-brand-orange-hover hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange shadow-sm text-center"
              >
                <Dices className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                <span className="truncate">Pilih Game Buat Squad</span>
              </a>
              <a
                href="#events"
                onClick={(e) => scrollTo(e, "events")}
                className="group w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-md sm:rounded-none border border-[#172554]/20 sm:border-0 sm:border-b sm:border-[#172554]/30 bg-white/60 sm:bg-transparent px-3 py-3 sm:px-0 sm:py-0 sm:pb-1 font-display text-xs sm:text-sm font-bold text-[#172554] transition-colors duration-150 hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange text-center"
              >
                <span className="truncate">Event BOTC Kamis</span>
                <ArrowRight
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </a>
            </div>

            {/* Micro Stats (Architectural Hairline Ledger on Mobile, 100% Original on Desktop) */}
            <dl
              data-testid="hero-stats"
              className="mt-5 sm:mt-10 grid max-w-[540px] grid-cols-3 divide-x divide-[#172554]/12 sm:divide-x-0 gap-0 sm:gap-6 border-y sm:border-y-0 sm:border-t border-[#172554]/15 sm:border-[#172554]/20 py-3 sm:py-0 sm:pt-4"
            >
              <div className="flex flex-col pr-3 sm:pr-0 text-left">
                <dd className="order-1 font-display text-lg xs:text-xl sm:text-2xl font-bold text-[#172554] whitespace-nowrap">
                  300+
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-tight text-[#5D626B] font-sans">
                  Koleksi board game
                </dt>
              </div>
              <div className="flex flex-col px-3 sm:px-0 text-left">
                <dd className="order-1 font-display text-lg xs:text-xl sm:text-2xl font-bold text-[#172554] whitespace-nowrap">
                  24 Jam
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-tight text-[#5D626B] font-sans">
                  Jumat s/d Minggu
                </dt>
              </div>
              <div className="flex flex-col pl-3 sm:pl-0 text-left">
                <dd className="order-1 font-display text-lg xs:text-xl sm:text-2xl font-bold text-[#172554] whitespace-nowrap">
                  100%
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-tight text-[#5D626B] font-sans">
                  Diajarin Game Master
                </dt>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column (Desktop Only): Full-height editorial photo showcase */}
        <div className="hidden lg:block h-full">
          {renderDesktopCarousel()}
        </div>
      </div>
    </section>
  );
} 