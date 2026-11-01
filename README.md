# Gitgud Board Game & Cafe — Yogyakarta

Website resmi dan landing page interaktif untuk **Gitgud Board Game & Cafe**, berlokasi di Baciro, Gondokusuman, Yogyakarta.

---

## 🎲 Fitur Utama Website

- **Hero & Gud Game Picker Roulette:** Pemilih board game acak interaktif dengan dadu fisik digital dan catatan rekomendasi Game Master.
- **Katalog 360+ Board Game:** Database lengkap dengan pencarian real-time, filter kategori (Party, Casual, Strategi, Deduksi, Duel 2P), dan indikator tingkat kesulitan (*Piece of Cake* hingga *GITGUD*).
- **Menu Cafe & Tavern Bites:** Menu lengkap makanan dan minuman (Espresso artisan, Matcha, 'Canos, Coolers, Donburi, Snacks) dengan toggle Thirsty/Hungry dan filter rekomendasi barista.
- **Jadwal Event Mingguan & Komunitas:** Informasi sesi Blood on the Clocktower (BOTC) Kamis malam dan komunitas D&D.
- **Panduan Pemula (How to Play) & FAQ:** Alur kunjungan bagi pemain baru dan protokol bermain di cafe.
- **Peta Lokasi & Jam Operasional:** Integrasi Google Maps, status buka (24 jam saat weekend), dan tautan langsung ke WhatsApp (+62 851-1748-4483).
- **Mobile-First UX Standar Industri:** Navigasi sentuh halus, touch-friendly snap carousels, scroll budgeting, dan floating quick bar.
- **Efek Suara Fisik (Sound Effects):** Suara sentuhan kartu, kocokan dadu, dan notifikasi yang dapat dibisukan (*mute/unmute*).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Plus Jakarta Sans, Syne, Space Grotesk via `next/font/google`
- **Linting:** ESLint 9 (Strict Next.js & React Hooks config)

---

## 📁 Struktur Direktori

```text
gitgud/
├── app/                  # Next.js App Router (layout, page, globals.css)
├── components/           # Komponen UI modular (Hero, Navbar, Catalog, Menu, dll.)
├── data/                 # Database statis board game (games.json & games.ts)
├── lib/                  # Utilities (soundEffects.ts, useIsMobile.ts)
├── public/               # Aset statis publik (logo SVG/PNG, icon, cover board game)
├── scripts/              # Skrip otomasi, scraping data Notion, dan pengujian
├── next.config.ts        # Konfigurasi Next.js
├── package.json          # Manajemen dependensi dan scripts npm
└── tsconfig.json         # Konfigurasi TypeScript
```

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/Wanntaff/gitgud.git
   cd gitgud
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

4. **Build untuk produksi:**
   ```bash
   npm run build
   npm run start
   ```

5. **Linting & Code Quality:**
   ```bash
   npm run lint
   ```

---

## 🌐 Deployment

Proyek ini telah dikonfigurasi untuk deployment instan di platform **[Vercel](https://vercel.com/)** melalui branch `main`.

---

© 2026 Gitgud Board Game & Cafe. Jl. Soka No. 44 Baciro, Yogyakarta.
