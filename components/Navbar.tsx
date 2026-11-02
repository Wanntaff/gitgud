"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { MessageCircle, Menu as MenuIcon, X, Volume2, VolumeX, Clock, MapPin, Navigation } from "lucide-react";
import MeepleIcon from "./MeepleIcon";
import { soundEffects, useSoundSettings } from "@/lib/soundEffects";

interface NavItem {
  id: string;
  label: string;
  mobileLabel: string;
  stepNumber: string;
  accentColor: string;
  activeClasses: string;
  activeMobileClasses: string;
  activeIconClass: string;
  activeBadgeClasses: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "about",
    label: "Tentang",
    mobileLabel: "Tentang Gitgud",
    stepNumber: "01",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
  {
    id: "games",
    label: "Koleksi Game",
    mobileLabel: "Koleksi Game",
    stepNumber: "02",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
  {
    id: "events",
    label: "Event & BOTC",
    mobileLabel: "Event Mingguan & BOTC",
    stepNumber: "03",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
  {
    id: "menu",
    label: "Menu Cafe",
    mobileLabel: "Menu Cafe & Bites",
    stepNumber: "04",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
  {
    id: "faq",
    label: "FAQ",
    mobileLabel: "FAQ & Tanya Jawab",
    stepNumber: "05",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
  {
    id: "location",
    label: "Lokasi",
    mobileLabel: "Lokasi Baciro & Jam Buka",
    stepNumber: "06",
    accentColor: "#E84A27",
    activeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeMobileClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30 shadow-xs",
    activeIconClass: "text-brand-orange",
    activeBadgeClasses:
      "bg-[#FFF5F0] text-brand-orange border-brand-orange/30",
  },
];

export default function Navbar() {
  const { muted, toggle } = useSoundSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const activeSectionRef = useRef<string>("");
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Guarded state updater so React does not re-render unless active section actually changes
  const applyActiveSection = (newId: string) => {
    if (activeSectionRef.current !== newId) {
      activeSectionRef.current = newId;
      setActiveSection(newId);
    }
  };

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "games",
      "events",
      "menu",
      "faq",
      "location",
    ];

    const navOrder = [
      "about",
      "games",
      "events",
      "menu",
      "faq",
      "location",
    ];

    // 1. Initial hash handling on page load
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const targetEl = document.getElementById(id);
      if (targetEl) {
        setTimeout(() => {
          if (navOrder.includes(id)) {
            applyActiveSection(id);
          }
          const nav = document.querySelector("nav");
          const navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 58;
          const top = Math.round(
            targetEl.getBoundingClientRect().top + window.scrollY - navHeight
          );
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }, 150);
      }
    }

    const hasIntersectionObserver =
      typeof window !== "undefined" && "IntersectionObserver" in window;

    // Zero-DOM-read tracking of currently visible sections
    const visibleEntries = new Map<string, IntersectionObserverEntry>();

    const updateActiveSectionFromEntries = () => {
      const scrollY = window.scrollY;

      // Top of page / Hero boundary
      if (scrollY < 120 || (visibleEntries.has("hero") && scrollY < 320)) {
        applyActiveSection("");
        return;
      }

      // Bottom of page lock
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      if (docHeight > 0 && winHeight + scrollY >= docHeight - 80) {
        applyActiveSection("location");
        return;
      }

      // Filter intersecting sections matching the navigation track
      const visibleKeys = navOrder.filter((id) => visibleEntries.has(id));

      if (visibleKeys.length > 0) {
        let candidate = visibleKeys[0];
        for (const id of visibleKeys) {
          const entry = visibleEntries.get(id);
          // Highlight the section whose heading or content is actively in view
          if (entry && entry.boundingClientRect.top <= 280) {
            candidate = id;
          }
        }
        applyActiveSection(candidate);
      }
    };

    // 2. High-performance IntersectionObserver as primary driver
    let observer: IntersectionObserver | null = null;

    if (hasIntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibleEntries.set(entry.target.id, entry);
            } else {
              visibleEntries.delete(entry.target.id);
            }
          }

          // Do not override user's explicitly clicked target while smooth scroll is animating
          if (isManualScrollRef.current) return;

          updateActiveSectionFromEntries();
        },
        {
          root: null,
          rootMargin: "-75px 0px -40% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer?.observe(el);
      });
    }

    // 3. Fallback measurement cache (used strictly when IntersectionObserver is unsupported)
    let cachedOffsets: { id: string; top: number }[] = [];
    const updateCachedOffsets = () => {
      cachedOffsets = navOrder
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
    };

    if (!hasIntersectionObserver) {
      updateCachedOffsets();
    }

    // 4. Lightweight scroll handler:
    // With IntersectionObserver: handles only top/bottom extreme boundaries, zero DOM queries.
    // Without IntersectionObserver: fallback to cached section offsets.
    let ticking = false;
    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          const scrollY = window.scrollY;

          // Top boundary
          if (scrollY < 120) {
            applyActiveSection("");
            return;
          }

          // Bottom boundary lock
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;
          if (docHeight > 0 && winHeight + scrollY >= docHeight - 80) {
            applyActiveSection("location");
            return;
          }

          // Fallback matching against cached section offsets if IO is unsupported
          if (!hasIntersectionObserver) {
            for (let i = cachedOffsets.length - 1; i >= 0; i--) {
              const sec = cachedOffsets[i];
              if (scrollY >= sec.top - 240) {
                applyActiveSection(sec.id);
                return;
              }
            }
            applyActiveSection("");
          }
        });
        ticking = true;
      }
    };

    // Debounced resize handler for fallback measurements
    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!hasIntersectionObserver) {
          updateCachedOffsets();
        }
        handleScroll();
      }, 150);
    };

    const handlePopState = () => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        if (navOrder.includes(id)) {
          applyActiveSection(id);
          return;
        }
      }
      handleScroll();
    };

    // Immediate manual override on user touch/wheel during programmatic smooth scroll
    const handleUserInteraction = () => {
      if (isManualScrollRef.current) {
        isManualScrollRef.current = false;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
        if (hasIntersectionObserver) {
          updateActiveSectionFromEntries();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    soundEffects.playTileTap();
    applyActiveSection(sectionId);
    setMobileMenuOpen(false);

    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const onScrollEnd = () => {
      isManualScrollRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    };
    window.addEventListener("scrollend", onScrollEnd, { once: true });

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    }, 1000);

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

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-12 py-2.5 [transform:translateZ(0)] will-change-transform shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Official Client Logo as unboxed pure vector SVG */}
        <Link
          href="/"
          onClick={(e) => {
            soundEffects.playTileTap();
            if (window.location.pathname === "/") {
              e.preventDefault();
              applyActiveSection("");
              setMobileMenuOpen(false);
              isManualScrollRef.current = true;
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
              }
              const onScrollEnd = () => {
                isManualScrollRef.current = false;
                window.removeEventListener("scrollend", onScrollEnd);
              };
              window.addEventListener("scrollend", onScrollEnd, { once: true });
              scrollTimeoutRef.current = setTimeout(() => {
                isManualScrollRef.current = false;
                window.removeEventListener("scrollend", onScrollEnd);
              }, 1000);
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
            }
          }}
          className="flex items-center group shrink-0 py-0.5"
          aria-label="Gitgud Board Game and Cafe - Beranda"
        >
          <Logo className="h-7.5 sm:h-8.5 md:h-9 w-auto" priority />
        </Link>

        {/* Desktop Links - Tabletop Board Track Active State */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 font-sans text-xs xl:text-sm font-semibold shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? item.activeClasses
                    : "border-transparent text-[#475569] hover:text-[#172554] hover:bg-slate-50"
                }`}
              >
                {/* Fixed 14x14px Meeple Slot: Zero Layout Shift (CLS = 0) */}
                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  <MeepleIcon
                    className={`w-3.5 h-3.5 ${item.activeIconClass} transition-all duration-200 ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50 group-hover:opacity-30 group-hover:scale-75 text-[#94A3B8]"
                    }`}
                  />
                </span>

                <span
                  className={
                    isActive
                      ? "font-bold tracking-tight"
                      : "text-[#475569] group-hover:text-[#172554] transition-colors"
                  }
                >
                  {item.label}
                </span>

                {/* Active bottom line */}
                {isActive && (
                  <span
                    className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Sound Toggle, Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Subtle Tabletop SFX Sound Toggle Button */}
          <button
            type="button"
            onClick={toggle}
            aria-label={muted ? "Aktifkan efek suara" : "Matikan efek suara"}
            title={
              muted
                ? "Efek suara nonaktif — Klik untuk aktifkan"
                : "Efek suara aktif — Klik untuk bisukan"
            }
            className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center active:scale-90 ${
              muted
                ? "bg-[#F8FAFC] border-slate-200 text-[#64748B] hover:text-[#172554] hover:bg-slate-100"
                : "bg-[#FFF5F0] border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10 shadow-xs"
            }`}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 shrink-0 transition-transform" />
            ) : (
              <Volume2 className="w-4 h-4 shrink-0 transition-transform hover:scale-110" />
            )}
          </button>

          <a
            href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20reservasi%20meja%20boardgame%20dong!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playSuccessChime()}
            className="bg-brand-orange hover:bg-brand-orange-hover active:scale-[0.98] text-white px-3 sm:px-4 py-1.5 sm:py-2 font-display font-bold text-xs tracking-wide rounded-lg shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>RESERVASI</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playCardSnap();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-1.5 sm:p-2 text-[#172554] hover:text-brand-orange bg-[#F8FAFC] border border-slate-200 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 mt-2.5 pt-3 pb-3 flex flex-col gap-3 font-sans text-sm bg-white animate-fade-in-up max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Quick Header */}
          <div className="flex items-center justify-between px-1 text-[10px] font-sans font-bold uppercase tracking-widest text-[#64748B]">
            <span>Navigasi Halaman</span>
            <span>Baciro HQ • Jogja</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer active:scale-[0.99] ${
                    isActive
                      ? item.activeMobileClasses
                      : "border-transparent bg-[#F8FAFC] text-[#475569] hover:text-[#172554] hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Step Number Token */}
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors ${
                        isActive
                          ? `${item.activeBadgeClasses} shadow-xs`
                          : "border-slate-200 bg-white text-[#64748B]"
                      }`}
                    >
                      {isActive ? (
                        <MeepleIcon
                          className={`w-3.5 h-3.5 ${item.activeIconClass} shrink-0 animate-fade-in-up`}
                        />
                      ) : (
                        item.stepNumber
                      )}
                    </span>
                    <span
                      className={
                        isActive
                          ? "font-bold tracking-tight text-brand-orange"
                          : "text-[#334155] font-medium"
                      }
                    >
                      {item.mobileLabel}
                    </span>
                  </div>

                  {isActive ? (
                    <span
                      className={`inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-md border font-black ${item.activeBadgeClasses}`}
                    >
                      <span>✓</span>
                      <span>DI SINI</span>
                    </span>
                  ) : (
                    <span className="text-[#94A3B8] font-sans text-xs pr-1">→</span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Venue Practical Info Card */}
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs text-[#334155]">
              <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div className="font-sans leading-tight">
                <p className="font-bold text-[#172554]">Jam Buka Kafe:</p>
                <p className="text-[11px] text-[#475569] mt-0.5">Senin - Kamis: 07.00 - 00.00 WIB</p>
                <p className="text-[11px] font-bold text-brand-orange mt-0.5">Jumat - Minggu: 24 Jam Non-Stop</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#334155] pt-2 border-t border-slate-200/70">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div className="font-sans leading-tight">
                <p className="font-bold text-[#172554]">Lokasi Baciro:</p>
                <p className="text-[11px] text-[#475569] mt-0.5">Jl. Soka no. 44 Baciro, Gondokusuman, Yogyakarta</p>
              </div>
            </div>
          </div>

          {/* Quick External Actions Strip */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20tanya%20info%20kafe%20dong!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playButtonClick()}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-[#172554] hover:text-brand-orange text-[11px] font-semibold shadow-2xs active:scale-95 transition-all text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com/letsgitgud"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playButtonClick()}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-[#172554] hover:text-brand-orange text-[11px] font-semibold shadow-2xs active:scale-95 transition-all text-center"
            >
              <span>Instagram</span>
            </a>
            <a
              href="https://share.google/u0UPT7njRoXYm9kZc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playButtonClick()}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200 text-[#172554] hover:text-brand-orange text-[11px] font-semibold shadow-2xs active:scale-95 transition-all text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-[#1B64B4] shrink-0" />
              <span>Buka Peta</span>
            </a>
          </div>

          {/* Full-Width Reservation Action Button */}
          <a
            href="https://wa.me/6285117484483?text=Halo%20Gitgud,%20mau%20reservasi%20meja%20boardgame%20dong!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              soundEffects.playSuccessChime();
              setMobileMenuOpen(false);
            }}
            className="luxury-btn luxury-sheen w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-sm uppercase active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>RESERVASI MEJA VIA WHATSAPP</span>
          </a>
        </div>
      )}
    </nav>
  );
}
