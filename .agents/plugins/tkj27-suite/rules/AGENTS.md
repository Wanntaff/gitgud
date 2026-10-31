# TKJ 27 Workspace Rules

## 1. Aturan Wajib
1. **KEAMANAN GIT:** JANGAN PERNAH menggunakan perintah `git reset --hard`, `git clean`, atau `git push --force`.
2. **KONFIRMASI PENGHAPUSAN:** Jika Anda merasa perlu menghapus sebuah file, Anda WAJIB meminta izin eksplisit dari user terlebih dahulu.
3. **JELASKAN PERINTAH:** Sebelum meminta eksekusi terminal, selalu jelaskan apa fungsi perintah tersebut di chat.

## 2. Tech Stack & Modern Next.js Guidelines
- **Wajib Cek `package.json`:** Sebelum menulis atau mengubah kode, selalu baca `package.json` untuk memastikan versi Next.js, React, dan Tailwind CSS yang terpasang.
- **Next.js Modern Standard:**
  - Gunakan App Router (`src/app/`), React Server Components (RSC) secara default, dan Server Actions untuk mutasi data.
  - Di Next.js 15+, `params`, `searchParams`, `cookies()`, dan `headers()` bersifat asynchronous—wajib gunakan `await`.
  - Gunakan CLI `npx shadcn@latest add ...` (BUKAN `shadcn-ui` yang sudah deprecated).

## 3. Strict Anti-AI Slop UI/UX Rules
- ❌ **Warna:** Dilarang memakai gradien ungu/indigo/violet generik (`from-purple-500 to-indigo-600`) atau neon cyan di atas background gelap kecuali diminta spesifik. Gunakan palet warna monokromatik yang tajam (zinc/slate/stone) dengan maksimal 1 warna aksen yang terukur.
- ❌ **Tipografi:** Dilarang menggunakan font `Inter` untuk seluruh elemen. Gunakan pasangan font berkarakter dari `next/font/google`.
- ❌ **Layout Monoton:** Jangan mengulang anatomi section yang sama berturut-turut. Gunakan asymmetric grid, bento dengan proporsi bervariasi, atau editorial split-layout.
- ❌ **Dekorasi Berlebihan:**
  - Jangan gunakan `rounded-2xl` di semua elemen. Gunakan skala radius yang tegas (`rounded-md` untuk input/button, `rounded-lg` untuk card).
  - Dilarang memakai `hover:scale-105` pada kartu atau menaruh emoji (🚀, ⚡, ✨) sebagai pengganti ikon di dalam UI maupun copywriting.
  - Gunakan border tipis (`border-border/60` atau `1px solid`) dan whitespace yang lega, bukan `shadow-xl` yang tebal dan kabur.
- ❌ **Copywriting:** Dilarang menulis teks placeholder klise seperti *"Supercharge your workflow"*, *"Unlock the power of..."*, atau *"Seamless integration"*. Tulis microcopy yang spesifik, lugas, dan sesuai konteks produk.
