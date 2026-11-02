"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Dices, MapPin } from "lucide-react";
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
    src: "/cafe/cafe-gathering-v2.png",
    alt: "Empat teman bermain board game sambil menikmati kopi di suasana kafe yang hangat",
    badge: "01 // MEJA SQUAD",
    title: "Meja penuh. HP turun.",
    description: "Board game, kopi, dan cerita yang nggak kelar-kelar.",
    tag: "Baciro / Jogja",
  },
  {
    id: "lounge",
    src: "/cafe/hero-lounge.jpg",
    alt: "Suasana malam hangat dan koleksi 300+ game di Gitgud Lounge",
    badge: "02 // 300+ KOLEKSI",
    title: "Tinggal tunjuk, langsung main.",
    description: "Koleksi board game fisik terlengkap di Jogja dari party game santai sampai strategi berat.",
    tag: "Koleksi Terlengkap",
  },
  {
    id: "coffee",
    src: "/cafe/hero-coffee.jpg",
    alt: "Espresso bar dan manual brew fresh di Gitgud Cafe",
    badge: "03 // ARTISAN BAR",
    title: "Kopi fresh. Gak bikin berminyak.",
    description: "Seduhan artisan kopi dan snack yang ramah kartu board game selama sesi main.",
    tag: "Brewed Fresh Daily",
  },
  {
    id: "gamemaster",
    src: "/cafe/hero-gamemaster.jpg",
    alt: "Game Master siap memandu dan mengajarkan aturan game langsung di meja",
    badge: "04 // GAME MASTER READY",
    title: "Baru pertama kali? Santai.",
    description: "Game Master kami siap memandu aturan langsung di meja tanpa perlu pusing baca rulebook.",
    tag: "100% Diajarin",
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

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

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden border-b border-slate-200 bg-[#F3F0E9] lg:min-h-[calc(100svh-112px)]"
    >
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="hero-copy relative z-10 flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-12 lg:py-10 xl:py-12">
          <div className="max-w-[650px]">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#475569] sm:mb-7">
              <span className="inline-flex items-center gap-2 text-[#172554]">
                <MapPin className="h-4 w-4 text-brand-orange" strokeWidth={1.8} />
                Baciro, Yogyakarta
              </span>
              <span className="h-px w-7 bg-[#A8A196]" aria-hidden="true" />
              <span>Board game &amp; cafe</span>
            </div>

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

            <p className="mt-5 max-w-[520px] text-sm leading-relaxed text-[#475569] sm:mt-6 sm:text-base font-sans">
              Pilih satu dari 300+ board game, pesan kopi, lalu main bareng
              sampai lupa cek HP. Baru pertama kali? Game Master kami siap
              ngajarin di meja.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
              <a
                href="#games"
                onClick={(e) => scrollTo(e, "games")}
                className="group luxury-btn luxury-sheen inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-brand-orange bg-brand-orange px-5 py-3 font-display text-sm font-bold text-white transition-colors duration-150 hover:border-brand-orange-hover hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange shadow-sm"
              >
                <Dices className="h-4 w-4" strokeWidth={1.8} />
                Pilih Game Buat Squad
              </a>
              <a
                href="#events"
                onClick={(e) => scrollTo(e, "events")}
                className="group inline-flex cursor-pointer items-center gap-2 border-b border-[#172554]/30 pb-1 font-display text-sm font-bold text-[#172554] transition-colors duration-150 hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
              >
                Event BOTC Kamis
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </a>
            </div>

            <dl
              data-testid="hero-stats"
              className="mt-8 grid max-w-[540px] grid-cols-3 gap-3 border-t border-[#172554]/20 pt-4 sm:mt-10 sm:gap-6"
            >
              <div className="flex flex-col">
                <dd className="order-1 font-display text-xl font-bold text-[#172554] sm:text-2xl">
                  300+
                </dd>
                <dt className="order-2 mt-1 text-[10px] leading-snug text-[#5D626B] sm:text-xs">
                  Koleksi board game
                </dt>
              </div>
              <div className="flex flex-col">
                <dd className="order-1 font-display text-xl font-bold text-[#172554] sm:text-2xl">
                  24 Jam
                </dd>
                <dt className="order-2 mt-1 text-[10px] leading-snug text-[#5D626B] sm:text-xs">
                  Jumat sampai Minggu
                </dt>
              </div>
              <div className="flex flex-col">
                <dd className="order-1 font-display text-xl font-bold text-[#172554] sm:text-2xl">
                  100%
                </dd>
                <dt className="order-2 mt-1 text-[10px] leading-snug text-[#5D626B] sm:text-xs">
                  Diajarin Game Master
                </dt>
              </div>
            </dl>
          </div>
        </div>

        <figure
          className="hero-photo-shell group relative min-h-[360px] overflow-hidden bg-[#1C211D] sm:min-h-[440px] lg:min-h-[580px] select-none"
          onPointerMove={movePhoto}
          onPointerLeave={(e) => {
            resetPhoto(e);
            setIsPaused(false);
          }}
          onPointerEnter={() => setIsPaused(true)}
          onTouchStart={(e) => {
            setIsPaused(true);
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            setIsPaused(false);
            if (touchStartXRef.current === null) return;
            const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
            if (Math.abs(diffX) > 40) {
              if (diffX < 0) {
                nextSlide();
              } else {
                prevSlide();
              }
            }
            touchStartXRef.current = null;
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Galeri Suasana Kafe Gitgud"
        >
          {/* Segmented iOS-Style Story Progress Bars */}
          {heroSlides.length > 1 && (
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex items-center gap-1.5 sm:gap-2">
              {heroSlides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                const isPassed = idx < currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Buka slide ${idx + 1}: ${slide.title}`}
                    className="relative h-[3px] sm:h-[3.5px] flex-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden transition-all hover:h-[5px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
                  >
                    <span
                      key={`${slide.id}-${isActive ? currentSlide : "inactive"}`}
                      className={`absolute inset-0 bg-white rounded-full ${
                        isPassed
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
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1023px) 100vw, 56vw"
                    className="hero-photo-image object-cover object-[52%_50%]"
                  />
                </div>
              );
            })}
          </div>

          {/* Soft Dark Gradient Base for Caption Legibility */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A1120]/95 via-[#0A1120]/50 to-transparent z-15"
            aria-hidden="true"
          />

          {/* Sleek Minimal Arrow Controls (reveal on hover for desktop) */}
          {heroSlides.length > 1 && (
            <div className="pointer-events-none absolute inset-y-0 inset-x-3 sm:inset-x-5 z-25 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEffects.playButtonClick();
                  prevSlide();
                }}
                aria-label="Foto sebelumnya"
                className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all cursor-pointer shadow-md active:scale-90"
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
                className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all cursor-pointer shadow-md active:scale-90"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {/* Dynamic Editorial Caption with Smooth Switch Animation */}
          <figcaption className="hero-photo-caption absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-5 text-white sm:p-7 lg:p-8">
            <div key={activeSlideData.id} className="animate-caption-switch">
              {heroSlides.length > 1 && (
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#FF8566] font-bold block mb-1">
                  {activeSlideData.badge}
                </span>
              )}
              <p className="font-display text-xl font-bold tracking-tight sm:text-2xl text-white">
                {activeSlideData.title}
              </p>
              <p className="mt-1 max-w-[340px] text-xs leading-relaxed text-white/85 sm:text-sm font-sans">
                {activeSlideData.description}
              </p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 font-sans text-[10px] uppercase tracking-[0.18em] text-white/80 sm:flex">
              <span>{activeSlideData.tag}</span>
              {heroSlides.length > 1 && (
                <span className="text-[9px] text-white/50 tracking-wider">
                  0{currentSlide + 1} / 0{heroSlides.length}
                </span>
              )}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
