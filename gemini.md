# ATURAN WAJIB UNTUK AI AGENT
1. KEAMANAN GIT: JANGAN PERNAH menggunakan perintah `git reset --hard`, `git clean`, atau `git push --force`. 
2. KONFIRMASI PENGHAPUSAN: Jika Anda merasa perlu menghapus sebuah file, Anda WAJIB meminta izin eksplisit dari saya terlebih dahulu.
3. JELASKAN PERINTAH: Sebelum meminta eksekusi terminal, selalu jelaskan apa fungsi perintah tersebut di chat.

# Project Rules: Modern Next.js & Anti-AI Slop UI

## 1. Tech Stack & Library Freshness (Anti-Jadul)
- **Wajib Cek `package.json`:** Sebelum menulis atau mengubah kode, selalu baca `package.json` untuk memastikan versi Next.js, React, dan Tailwind CSS yang terpasang.
- **Gunakan Context7 MCP:** Selalu panggil tool `context7` (`resolve-library-id` dan `query-docs`) saat mengimplementasikan fitur Next.js App Router, Tailwind CSS v4, atau library eksternal. Jangan mengandalkan memori internal.
- **Standar Next.js Modern:**
  - Gunakan App Router (`src/app/`), React Server Components (RSC) secara default, dan Server Actions untuk mutasi data.
  - Di Next.js 15+, `params`, `searchParams`, `cookies()`, dan `headers()` bersifat asynchronous—wajib gunakan `await`.
  - Gunakan CLI `npx shadcn@latest add ...` (BUKAN `shadcn-ui` yang sudah deprecated).

## 2. Strict Anti-AI Slop UI/UX Rules
DILARANG KERAS menggunakan pola desain rata-rata AI ("AI Slop") berikut:
- ❌ **Warna:** Dilarang memakai gradien ungu/indigo/violet generik (`from-purple-500 to-indigo-600`) atau neon cyan di atas background gelap kecuali diminta spesifik. Gunakan palet warna monokromatik yang tajam (zinc/slate/stone) dengan maksimal 1 warna aksen yang terukur.
- ❌ **Tipografi:** Dilarang menggunakan font `Inter` untuk seluruh elemen. Gunakan pasangan font berkarakter dari `next/font/google` (contoh: *Plus Jakarta Sans* atau *Geist* untuk UI/body, dipadukan dengan *Instrument Serif*, *Space Grotesk*, atau *Syne* untuk heading, serta *Geist Mono* untuk angka/data).
- ❌ **Layout Monoton:** Jangan mengulang anatomi section yang sama berturut-turut (seperti Hero rata tengah lalu diikuti 3 kartu fitur simetris dengan ikon di dalam lingkaran). Gunakan asymmetric grid, bento dengan proporsi bervariasi, atau editorial split-layout.
- ❌ **Dekorasi Berlebihan:**
  - Jangan gunakan `rounded-2xl` di semua elemen. Gunakan skala radius yang tegas (`rounded-md` untuk input/button, `rounded-lg` untuk card).
  - Dilarang memakai `hover:scale-105` pada kartu atau menaruh emoji (🚀, ⚡, ✨) sebagai pengganti ikon di dalam UI maupun copywriting.
  - Gunakan border tipis (`border-border/60` atau `1px solid`) dan whitespace yang lega, bukan `shadow-xl` yang tebal dan kabur.
- ❌ **Copywriting:** Dilarang menulis teks placeholder klise seperti *"Supercharge your workflow"*, *"Unlock the power of..."*, atau *"Seamless integration"*. Tulis microcopy yang spesifik, lugas, dan sesuai konteks produk.