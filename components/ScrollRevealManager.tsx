"use client";

import { useEffect } from "react";

/**
 * ScrollRevealManager
 * High-performance, butter-smooth IntersectionObserver controller
 * that adds scroll-reveal entrance animations to any element with `.scroll-reveal`.
 * Supports stagger delays, dynamic DOM mutations, and prefers-reduced-motion.
 */
export default function ScrollRevealManager() {
  useEffect(() => {
    // 1. Accessibility: immediate display for users requesting reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    // 2. High-performance IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -36px 0px",
      }
    );

    // Initial batch observation
    const observeAll = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.revealed)");
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // 3. MutationObserver for dynamic sub-tabs (Menu, GameCatalog filters)
    let mutationObserver: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        observeAll();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // 4. Safety reveal fallback so content is never stuck hidden on fast scrolls/lag
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll(".scroll-reveal:not(.revealed)").forEach((el) => {
        el.classList.add("revealed");
      });
    }, 2800);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  return null;
}
