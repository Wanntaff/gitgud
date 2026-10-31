---
name: modern-ui
description: Panduan wajib saat membuat, mendesain, atau merombak halaman dan komponen UI Next.js/Tailwind agar terlihat profesional, modern, dan bebas dari tampilan template AI generik (anti-AI slop).
---

# Modern Web UI & Anti-AI Slop Design System

Gunakan aturan desain ini setiap kali membuat atau mengedit komponen `.tsx` dan styling Tailwind CSS:

## 1. Estetika & Layout (Bento & Editorial, Bukan Template SaaS)
- **Asymmetric & Bento Grid:** Gunakan CSS Grid dengan proporsi bervariasi (misalnya kombinasi `col-span-12 md:col-span-7` dan `md:col-span-5`), bukan 3 kartu identik yang berjajar terus-menerus.
- **Whitespace & Struktur Tegas:** Gunakan jarak antar section yang lega (`py-20` hingga `py-32`) dan batasi lebar kontainer utama (`max-w-6xl mx-auto px-6`).
- **Garis Pembatas Halus (Hairline Borders):** Gunakan border tipis (`border border-zinc-200 dark:border-zinc-800`) untuk memisahkan elemen, bukan bayangan tebal (`shadow-xl` atau `shadow-2xl`).

## 2. Tipografi Berkarakter
- Dilarang menggunakan font `Inter` sendirian untuk seluruh website.
- Gunakan kombinasi font dari `next/font/google` di `layout.tsx`:
  - **Heading:** Gunakan font dengan karakter kuat seperti `Plus Jakarta Sans`, `Syne`, `Space Grotesk`, atau `Instrument Serif` dengan `tracking-tight` dan ukuran kontras (`text-4xl md:text-6xl font-semibold`).
  - **Body:** Gunakan `Plus Jakarta Sans` atau `Geist` dengan warna teks sedikit diredam (`text-zinc-600 dark:text-zinc-400`) agar nyaman dibaca.
  - **Label Kecil / Nomor / Badge:** Gunakan font monospace (`Geist_Mono` atau `JetBrains_Mono`) dengan ukuran `text-xs uppercase tracking-widest`.

## 3. Palet Warna Terukur
- **Dilarang Keras:** Gradien ungu-biru (`from-purple-500 to-indigo-600`), background neon menyala, atau efek kaca (`backdrop-blur`) yang berlebihan di semua kartu.
- **Standar Warna:** Gunakan dasar monokromatik hangat atau netral (`zinc`, `stone`, atau `neutral`) dengan **maksimal 1 warna aksen** yang tegas (misalnya `emerald-600`, `orange-600`, atau hitam/putih kontras tinggi).

## 4. Interaksi & Micro-Details
- Hindari animasi `hover:scale-105` pada kartu besar. Gunakan transisi halus seperti perubahan warna border (`hover:border-zinc-400 dark:hover:border-zinc-600`) atau pergeseran ikon panah kecil (`group-hover:translate-x-1 transition-transform`).
- Gunakan ikon dari `lucide-react` dengan ukuran konsisten (`w-4 h-4` atau `w-5 h-5`, `strokeWidth={1.5}`). Dilarang menaruh emoji (🚀, ✨, 🔥) sebagai ikon fitur.