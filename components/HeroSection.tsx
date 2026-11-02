"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Dices,
  MapPin,
  Users,
  Coffee,
  Compass,
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
  tabLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const heroSlides: HeroSlide[] = [
  {
    id: "gathering",
    src: "/cafe/cafe-gathering-v2.png",
    alt: "Empat teman bermain board game sambil menikmati kopi di suasana kafe yang hangat",
    badge: "01 // MEJA SQUAD",
    title: "Meja penuh. HP turun.",
    description: "Board game, kopi artisan, dan obrolan seru yang nggak kelar-kelar.",
    tag: "Baciro / Jogja",
    tabLabel: "Meja Squad",
    icon: Users,
  },
  {
    id: "lounge",
    src: "/cafe/hero-lounge.jpg",
    alt: "Suasana malam hangat dan koleksi 300+ game di Gitgud Lounge",
    badge: "02 // 300+ KOLEKSI",
    title: "Tinggal tunjuk, langsung main.",
    description: "Koleksi board game fisik terlengkap di Jogja dari party game santai sampai strategi berat.",
    tag: "Koleksi Terlengkap",
    tabLabel: "300+ Game",
    icon: Dices,
  },
  {
    id: "coffee",
    src: "/cafe/hero-coffee.jpg",
    alt: "Espresso bar dan manual brew fresh di Gitgud Cafe",
    badge: "03 // ARTISAN BAR",
    title: "Kopi fresh. Gak bikin berminyak.",
    description: "Seduhan artisan kopi dan snack yang ramah kartu board game selama sesi main.",
    tag: "Brewed Fresh Daily",
    tabLabel: "Artisan Bar",
    icon: Coffee,
  },
  {
    id: "gamemaster",
    src: "/cafe/hero-gamemaster.jpg",
    alt: "Game Master siap memandu dan mengajarkan aturan game langsung di meja",
    badge: "04 // GAME MASTER READY",
    title: "Baru pertama kali? Santai.",
    description: "Game Master kami siap memandu aturan langsung di meja tanpa perlu pusing baca rulebook.",
    tag: "100% Diajarin",
    tabLabel: "Game Master",
    icon: Compass,
  },
];

const SLIDE_DURATION = 5500; // 5.5s per slide on desktop

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
    if (typeof window === "undefined") return;
    // Hanya auto-slide pada layar desktop (lg breakpoint >= 1024px)
    // Pada mobile, berikan user kendali sentuh penuh tanpa slide otomatis yang mengagetkan
    if (window.innerWidth < 1024) return;

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

  {/* Bespoke Luxury Editorial Mobile Hero Showcase - Replaces Generic Slider */}
  const renderMobileHeroShowcase = () => {
    const activeSlide = heroSlides[currentSlide] ?? heroSlides[0];

    return (
      <div className="my-3.5 select-none animate-fade-in w-full">
        {/* Curated Atmosphere Scene Selector Tabs (Tactile Segmented Bar) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs overflow-x-auto scrollbar-none mb-2.5">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const Icon = slide.icon;
            return (
              <button
                key={`mobile-tab-${slide.id}`}
                type="button"
                onClick={() => {
                  soundEffects.playCardSnap();
                  setCurrentSlide(idx);
                }}
                className={`flex-1 min-w-[76px] py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center justify-center gap-1 ${
                  isActive
                    ? "bg-[#172554] text-white font-bold shadow-xs"
                    : "text-[#475569] hover:text-[#172554] hover:bg-slate-100 font-medium text-[10.5px]"
                }`}
              >
                <Icon className={`w-3 h-3 shrink-0 ${isActive ? "text-brand-orange" : "text-[#64748B]"}`} />
                <span className="font-sans text-[10.5px] tracking-tight">{slide.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Museum-Grade Double-Framed Visual Showcase */}
        <div
          className="relative rounded-2xl bg-white border border-slate-200/90 p-2 shadow-sm overflow-hidden"
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
            if (Math.abs(diffX) > 40) {
              soundEffects.playCardSnap();
              if (diffX < 0) {
                nextSlide();
              } else {
                prevSlide();
              }
            }
            touchStartXRef.current = null;
          }}
        >
          <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-[#1C211D]">
            {/* Photos Layer with High-Quality Crossfade */}
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={`mobile-photo-${slide.id}`}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-[52%_50%]"
                  />
                </div>
              );
            })}

            {/* Floating Top Venue Status Badges */}
            <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-sans text-[9.5px] font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BACIRO HQ • LIVE</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 font-sans text-[9px] font-semibold">
                <span>{activeSlide.tag}</span>
              </span>
            </div>

            {/* Frosted Bottom Editorial Caption Plate */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 bg-gradient-to-t from-[#0A1120]/95 via-[#0A1120]/75 to-transparent pt-8 text-white">
              <div key={`caption-${activeSlide.id}`} className="animate-caption-switch min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#FF8566] font-bold">
                    {activeSlide.badge}
                  </span>
                  <span className="text-[9px] font-sans font-bold text-white/70">
                    0{currentSlide + 1} / 0{heroSlides.length}
                  </span>
                </div>
                <p className="font-display font-bold text-sm tracking-tight text-white leading-tight">
                  {activeSlide.title}
                </p>
                <p className="text-white/85 font-sans text-[11px] leading-snug mt-0.5">
                  {activeSlide.description}
                </p>
              </div>

              {/* Scene Indicator Dots + Interactive Hint */}
              <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-white/10">
                {heroSlides.map((s, idx) => (
                  <button
                    key={`dot-${s.id}`}
                    type="button"
                    onClick={() => {
                      soundEffects.playCardSnap();
                      setCurrentSlide(idx);
                    }}
                    aria-label={`Buka scene ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide
                        ? "w-6 bg-brand-orange"
                        : "w-2 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
                <span className="text-[8.5px] text-white/50 ml-auto font-sans">
                  Geser untuk ganti sudut →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  {/* Desktop Editorial Photo Carousel - Full Height & Interactive Tilt */}
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
        <div className="absolute z-30 flex items-center gap-2 top-4 inset-x-4 sm:inset-x-8">
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
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1120]/95 via-[#0A1120]/50 to-transparent z-15 h-48"
        aria-hidden="true"
      />

      {/* Sleek Arrow Controls (Hover-reveal on desktop) */}
      {heroSlides.length > 1 && (
        <div className="pointer-events-none absolute inset-y-0 z-25 flex items-center justify-between inset-x-3 sm:inset-x-5">
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

      {/* Dynamic Editorial Caption with Smooth Switch Animation */}
      <figcaption className="hero-photo-caption absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 text-white p-5 sm:p-7 lg:p-8">
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
      className="relative flex flex-col overflow-hidden border-b border-slate-200 bg-[#F3F0E9] lg:min-h-[calc(100svh-112px)]"
    >
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Left Column (Desktop) / Main Column (Mobile) */}
        <div className="hero-copy relative z-10 flex flex-col justify-center px-4 py-5 sm:px-8 sm:py-10 lg:py-10 xl:py-12">
          <div className="max-w-[650px]">
            {/* Location & Concept Eyebrow */}
            <div className="mb-2.5 sm:mb-6 flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#475569]">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[#172554]">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-orange" strokeWidth={1.8} />
                Baciro, Yogyakarta
              </span>
              <span className="h-px w-5 sm:w-7 bg-[#A8A196]" aria-hidden="true" />
              <span>Board game &amp; cafe</span>
            </div>

            {/* Responsive Editorial Headline */}
            <h1 className="font-display text-[1.75rem] sm:text-4xl lg:text-[clamp(2.65rem,4.7vw,4.6rem)] font-bold uppercase leading-[1.08] lg:leading-[0.96] tracking-tight lg:tracking-[-0.045em] text-[#172554]">
              {/* Mobile Presentation: 2 punchy, cohesive lines */}
              <span className="block lg:hidden overflow-hidden">
                <span className="hero-title-line block">
                  Bosan Main HP?
                </span>
              </span>
              <span className="block lg:hidden overflow-hidden">
                <span className="hero-title-line block text-[#172554]" style={{ animationDelay: "60ms" }}>
                  Adu taktik <span className="text-brand-orange">di Gitgud.</span>
                </span>
              </span>

              {/* Desktop Presentation: 4 staggered poster lines */}
              <span className="hidden lg:block overflow-hidden">
                <span className="hero-title-line block whitespace-nowrap">
                  Bosan
                </span>
              </span>
              <span className="hidden lg:block overflow-hidden">
                <span
                  className="hero-title-line block whitespace-nowrap"
                  style={{ animationDelay: "60ms" }}
                >
                  Main HP?
                </span>
              </span>
              <span className="hidden lg:block overflow-hidden">
                <span
                  className="hero-title-line block whitespace-nowrap"
                  style={{ animationDelay: "120ms" }}
                >
                  Adu taktik
                </span>
              </span>
              <span className="hidden lg:block overflow-hidden">
                <span
                  className="hero-title-line block whitespace-nowrap text-brand-orange"
                  style={{ animationDelay: "180ms" }}
                >
                  di Gitgud.
                </span>
              </span>
            </h1>

            {/* Mobile Visual Showcase Card: Bespoke Curated Atmosphere Lookbook */}
            <div className="block lg:hidden">
              {renderMobileHeroShowcase()}
            </div>

            {/* Description Paragraph */}
            <p className="mt-3 sm:mt-6 max-w-[520px] text-xs sm:text-sm lg:text-base leading-relaxed text-[#475569] font-sans">
              Pilih satu dari 300+ board game, pesan kopi, lalu main bareng
              sampai lupa cek HP. Baru pertama kali? Game Master kami siap
              ngajarin di meja.
            </p>

            {/* Responsive Call-to-Actions (Full touch targets on mobile) */}
            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-6">
              <a
                href="#games"
                onClick={(e) => scrollTo(e, "games")}
                className="group luxury-btn luxury-sheen w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl sm:rounded-md border border-brand-orange bg-brand-orange px-5 py-3 sm:py-3 font-display text-xs sm:text-sm font-bold text-white transition-colors duration-150 hover:border-brand-orange-hover hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange shadow-sm text-center"
              >
                <Dices className="h-4 w-4" strokeWidth={1.8} />
                <span>Pilih Game Buat Squad</span>
              </a>
              <a
                href="#events"
                onClick={(e) => scrollTo(e, "events")}
                className="group w-full sm:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl sm:rounded-none border border-slate-300 sm:border-0 sm:border-b sm:border-[#172554]/30 bg-white/70 sm:bg-transparent px-4 py-2.5 sm:px-0 sm:py-0 sm:pb-1 font-display text-xs sm:text-sm font-bold text-[#172554] transition-colors duration-150 hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange text-center shadow-2xs sm:shadow-none"
              >
                <span>Event BOTC Kamis</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </a>
            </div>

            {/* Micro Stats (Balanced 3-column micro-strip on mobile) */}
            <dl
              data-testid="hero-stats"
              className="mt-5 sm:mt-10 grid max-w-[540px] grid-cols-3 gap-2 sm:gap-6 border-t border-[#172554]/15 sm:border-[#172554]/20 pt-3 sm:pt-4"
            >
              <div className="flex flex-col rounded-lg sm:rounded-none bg-white/60 sm:bg-transparent p-2 sm:p-0 border border-slate-200/60 sm:border-0 text-center sm:text-left">
                <dd className="order-1 font-display text-lg sm:text-2xl font-bold text-[#172554]">
                  300+
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[9.5px] sm:text-xs leading-tight text-[#5D626B] font-sans">
                  Koleksi board game
                </dt>
              </div>
              <div className="flex flex-col rounded-lg sm:rounded-none bg-white/60 sm:bg-transparent p-2 sm:p-0 border border-slate-200/60 sm:border-0 text-center sm:text-left">
                <dd className="order-1 font-display text-lg sm:text-2xl font-bold text-[#172554]">
                  24 Jam
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[9.5px] sm:text-xs leading-tight text-[#5D626B] font-sans">
                  Jumat s/d Minggu
                </dt>
              </div>
              <div className="flex flex-col rounded-lg sm:rounded-none bg-white/60 sm:bg-transparent p-2 sm:p-0 border border-slate-200/60 sm:border-0 text-center sm:text-left">
                <dd className="order-1 font-display text-lg sm:text-2xl font-bold text-[#172554]">
                  100%
                </dd>
                <dt className="order-2 mt-0.5 sm:mt-1 text-[9.5px] sm:text-xs leading-tight text-[#5D626B] font-sans">
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
