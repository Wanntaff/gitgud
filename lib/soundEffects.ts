"use client";

import { useSyncExternalStore } from "react";

/**
 * Gitgud Board Game & Cafe - Tabletop Web Audio Sound System
 * 
 * Synthesized using native Web Audio API:
 * - Zero external dependencies & zero network latency
 * - Zero external mp3/wav files to fail or load
 * - Tactile, analog tabletop acoustics (wooden meeples, card snaps, tumbling dice, tavern chimes)
 */

class TabletopAudioManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gitgud_sfx_muted");
        this.muted = saved === "true";
      } catch {
        this.muted = false;
      }

      // Synchronize mute state across browser tabs
      window.addEventListener("storage", (e) => {
        if (e.key === "gitgud_sfx_muted") {
          this.muted = e.newValue === "true";
          window.dispatchEvent(
            new CustomEvent("gitgud_sfx_change", { detail: { muted: this.muted } })
          );
        }
      });

      // Warm up / unlock AudioContext on very first user interaction
      const unlock = () => {
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      };
      window.addEventListener("pointerdown", unlock, { passive: true, once: true });
      window.addEventListener("keydown", unlock, { passive: true, once: true });
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      } catch (err) {
        console.warn("Web Audio API is not supported in this environment:", err);
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("gitgud_sfx_muted", String(mute));
        window.dispatchEvent(
          new CustomEvent("gitgud_sfx_change", { detail: { muted: mute } })
        );
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  public toggleMute(): boolean {
    const next = !this.muted;
    this.setMuted(next);
    if (!next) {
      this.playToggleClick(true);
    }
    return next;
  }

  /**
   * Sound 1: Wooden Meeple / Tabletop Tile Tap
   * Warm acoustic wood transient, like placing a wooden Carcassonne / Catan token
   */
  public playTileTap(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // Body of the wood piece (decaying sine wave)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);

      // Tactile impact click transient
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(1200, now);
      clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

      clickGain.gain.setValueAtTime(0.25, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      clickOsc.connect(clickGain);
      clickGain.connect(this.masterGain);

      clickOsc.start(now);
      clickOsc.stop(now + 0.03);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Sound 2: Playing Card Snap / Flip
   * Snappy high-frequency snap like flicking a playing card onto a playmat
   */
  public playCardSnap(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // Snappy frequency drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);

      filter.type = "highpass";
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);

      // Short subtle noise burst for card friction
      const bufferSize = Math.floor(ctx.sampleRate * 0.025);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(2400, now);
      noiseFilter.Q.setValueAtTime(2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.03);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Sound 3: Dice Tumbling Tick
   * Hollow acrylic/wooden die click with slight pitch variation
   */
  public playDiceTick(step: number = 0): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const baseFreq = 950 + (step % 5) * 110 + (Math.random() * 80 - 40);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.03);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(baseFreq * 0.8, now);
      filter.Q.setValueAtTime(5, now);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Sound 4: Tactile Button Switch Click
   * Crisp microswitch click for standard buttons and navigation links
   */
  public playButtonClick(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.03);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Sound 5: Level-Up / Victory Chime
   * Warm 3-note harmonic chime for reservation CTA / WhatsApp conversions
   */
  public playSuccessChime(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      // Notes: E5 (659Hz), G#5 (830Hz), B5 (988Hz)
      const notes = [659.25, 830.61, 987.77];

      notes.forEach((freq, idx) => {
        const noteStart = now + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(noteStart);
        osc.stop(noteStart + 0.36);
      });
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Sound 6: Audio Toggle Switch
   */
  public playToggleClick(enabled: boolean): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (enabled) {
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.04);
      } else {
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      }

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Audio playback failsafe
    }
  }
}

export const soundEffects = new TabletopAudioManager();

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("gitgud_sfx_change", callback);
  return () => window.removeEventListener("gitgud_sfx_change", callback);
}

function getSnapshot() {
  return soundEffects.isMuted();
}

function getServerSnapshot() {
  return false;
}

export function useSoundSettings() {
  const muted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    soundEffects.toggleMute();
  };

  return { muted, toggle };
}
