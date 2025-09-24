# PRD — Recipe Share Platform

**Ringkasan singkat**
Aplikasi web berbagi resep dimana pengguna dapat mengunggah, menelusuri, menyimpan (bookmark), dan memberi rating/komentar pada resep. Backend dan otentikasi menggunakan **Supabase**. Frontend menggunakan **Next.js (App Router)** dengan React, Tailwind CSS.

---

## Tujuan produk
- Memfasilitasi pengguna membuat dan berbagi resep masakan.
- Menyediakan pengalaman browsing yang cepat dan intuitif.
- Menyediakan fitur komunitas ringan: komentar, rating, favoriting.
- Monetisasi di masa depan: iklan, fitur premium (opsional).

## Persona pengguna
1. **Irfan, 28 — Home cook**: Ingin mencari resep cepat dan menyimpan favorit.
2. **Siti, 35 — Food blogger amatir**: Ingin mempublikasikan resep dengan foto dan langkah rinci.
3. **Aldi, 22 — Mahasiswa**: Mencari resep murah dan mudah.

## Scope MVP (harus ada)
- Registrasi / login (email + magic link atau OAuth) via Supabase
- CRUD resep (judul, deskripsi, bahan, langkah, durasi, porsi, kategori, foto)
- Upload gambar (menggunakan Supabase Storage)
- Halaman browse / list dengan filter dan search full-text
- Halaman detail resep + komentar + rating bintang
- Bookmark / favorite resep (user private list)
- Basic responsive UI untuk mobile & desktop

## Fitur yang bisa ditambahkan nanti (post-MVP)
- Social sharing (Instagram, WhatsApp)
- Sistem follow antar pengguna
- Moderation dashboard / report abuse
- Import/Export resep (PDF)
- Monetisasi: premium content, ads

---

## Tech stack rekomendasi
- Frontend: **Next.js (App Router)** + React
- Styling: **Tailwind CSS**
- Backend/auth & database: **Supabase** (Postgres) — authentication, Row Level Security, Storage
- State management: React Query (TanStack Query) atau SWR
- Forms: React Hook Form + Zod (validasi)
- Image handling: Supabase Storage + `next/image` (external domains set) atau upload presigned
- Deployment: Vercel (Next.js friendly) atau Netlify (jika perlu)
- CI/CD: GitHub Actions (opsional)

---

## Arsitektur data (tabel utama di Supabase)
- **users** (supabase auth users + profile table)
  - id (uuid, PK)
  - display_name
  - username (unique)
  - avatar_url
  - bio
  - created_at

- **recipes**
  - id (uuid, PK)
  - user_id (FK -> users.id)
  - title
  - slug (unique)
  - description
  - ingredients (jsonb array) — atau table terpisah jika kompleks
  - steps (jsonb array)
  - prep_time (int, minutes)
  - cook_time (int)
  - servings (int)
  - category (text)
  - cover_url (text)
  - is_public (boolean)
  - created_at, updated_at

- **recipe_images** (opsional)
  - id, recipe_id, url, order

- **comments**
  - id, recipe_id, user_id, content, parent_id (nullable), created_at

- **ratings**
  - id, recipe_id, user_id, rating (int 1-5), created_at

- **bookmarks**
  - id, user_id, recipe_id, created_at

- **tags** (opsional)
  - id, name

- **recipe_tags** (many-to-many)
  - recipe_id, tag_id

> Gunakan index dan full-text search di kolom `title` dan `description`.

---

## Keamanan & aturan akses
- Gunakan Supabase Auth untuk otentikasi.
- Row Level Security (RLS):
  - `recipes` public: boleh dibaca oleh semua, ditulis hanya oleh owner.
  - `comments`, `bookmarks`, `ratings`: user harus terautentikasi untuk menulis.
- Validasi file upload: batasi tipe (jpeg/png/webp) dan ukuran maksimal.
- Sanitasi input komentar (hindari XSS) — sanitasi pada server atau filternya di client + server.

---

## Struktur project (saran)
```
/app
  /layout.tsx
  /page.tsx    # home / browse
  /recipes
    /page.tsx  # list
    /[slug]
      /page.tsx # detail
      /edit
        /page.tsx
  /profile
    /[username]/page.tsx
/components
  RecipeCard.tsx
  RecipeForm.tsx
  CommentList.tsx
/lib
  supabaseClient.ts
  utils.ts
/styles
/public
```

---

## API & interaksi Supabase
- Gunakan Supabase Client di server components (Server Actions / route handlers) untuk operasi sensitif.
- Untuk upload gambar: gunakan Supabase Storage `from('recipes').upload()` dari server (atau client) dan simpan path di `recipes.cover_url`.
- Gunakan `edge` or serverless functions hanya jika butuh private key (mis. signed upload) — tetapi hati-hati menyimpan kunci.

---

## Step-by-step implementation guide (high level)
Berikut langkah implementasi dari nol ke MVP. Setiap langkah menyertakan poin teknis dan contoh perintah.

### 1) Init project & tooling
- Buat project Next.js (App Router):
  ```bash
  npx create-next-app@latest recipe-share --experimental-app
  cd recipe-share
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install @supabase/supabase-js react-hook-form zod @tanstack/react-query
  ```
- Setup Tailwind (ikuti official Tailwind + Next.js config)

### 2) Siapkan Supabase project
- Buat project di Supabase (console).
- Aktifkan Auth providers yang diinginkan (email/magic link, Google).
- Buat bucket Storage `recipes`.
- Buat tabel-tabel sesuai desain (recipes, comments, ratings, bookmarks, profiles).
- Konfigurasi RLS policies minimal: owner bisa insert/update/delete; semua bisa select public recipes.

### 3) Integrasi Supabase ke Next.js
- Tambah file `/lib/supabaseClient.ts` (pakai anon key untuk client, service_role key hanya di server):
  ```ts
  import { createClient } from '@supabase/supabase-js'
  export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  ```
- Simpan ENV vars di Vercel atau `.env.local` (jangan commit service_role key!).

### 4) Otentikasi & profile
- Buat halaman login (magic link atau OAuth) menggunakan Supabase Auth UI atau menulis custom flow.
- Setelah login, simpan/migrate user ke `profiles` table (trigger di serverless atau supabase function) agar bisa menambahkan username/bio.

### 5) Page: Browse & Search
- Buat server component untuk fetch daftar resep.
- Implementasi pencarian: simple SQL `ilike` atau full-text search Postgres (`to_tsvector` / `tsquery`).
- Tambah filter: kategori, waktu masak, rating.

### 6) Page: Recipe detail
- Tampilkan resep lengkap, gambar, bahan, langkah.
- Tampilkan rating rata-rata (hitung di query atau materialized view).
- Tampilkan komentar (paginated).
- Tombol bookmark & tombol edit (jika owner).

### 7) CRUD resep (form)
- Gunakan `React Hook Form` + `Zod` untuk validasi.
- Upload gambar ke Supabase Storage; setelah upload, simpan URL ke kolom `cover_url`.
- Untuk steps/ingredients gunakan dynamic fields (array of strings) dan simpan sebagai `jsonb`.

### 8) Komentar & rating
- Endpoint untuk menambah komentar: hanya terautentikasi.
- Rating: upsert (jika user sudah memberi rating, update nilainya).

### 9) Bookmarks
- Implementasikan tabel `bookmarks` dan endpoint untuk toggle bookmark.
- Tampilkan daftar bookmarks di halaman profile.

### 10) Testing & QA
- Test upload gambar dengan file besar / tipe tidak valid.
- Test RLS policy: pastikan user tidak bisa edit resep orang lain.
- Penanganan error dan UX (toast, loader).

### 11) Optimisasi & deploy
- Atur `next/image` domain ke Supabase storage domain.
- Build & deploy ke Vercel; set ENV vars di dashboard Vercel.

---

## Contoh snippet – membuat resep (simplified)
```ts
// server action (app/recipes/new/page.tsx)
import { supabase } from '@/lib/supabaseClient'
export async function createRecipe(userId, payload) {
  const { data, error } = await supabase.from('recipes').insert([{ ...payload, user_id: userId }])
  if (error) throw error
  return data
}
```

---

## Checklist peluncuran MVP
- [ ] Auth & profile working
- [ ] CRUD resep + image upload
- [ ] Browse/search + filters
- [ ] Comments + ratings
- [ ] Bookmarks
- [ ] Responsive UI
- [ ] Deployment & ENV configured

---

Jika kamu mau, aku bisa:
- Men-generate struktur database SQL untuk Supabase.
- Membuat contoh komponen React + form lengkap untuk create/edit resep.
- Membuat contoh GitHub Actions untuk CI/CD.

Katakan mana yang mau kamu lanjut dan aku buatkan lebih detail.

