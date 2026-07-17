# Undangan Tasyakuran Aqiqah — Nadia Humaira

Website undangan digital satu halaman (single page), dibuat dengan HTML, CSS, dan JavaScript murni — tanpa framework, siap di-upload ke GitHub Pages atau Netlify.

## Struktur File

```
/index.html          -> struktur & konten halaman
/style.css            -> semua styling, animasi, responsive
/script.js            -> loading screen, countdown, galeri, form doa, musik, confetti
/assets/img/          -> taruh foto anak & foto galeri di sini
/assets/music/        -> taruh file musik islami (mp3) di sini
```

## Cara Kustomisasi Cepat

1. **Nama anak & data acara** — edit langsung di `index.html`:
   - Bagian `<h1 class="hero-name">Nadia Humaira</h1>`
   - Bagian `#detail` untuk tanggal, waktu, lokasi
   - Bagian `#profil` untuk data anak
   - Bagian `#gift` untuk nama bank & nomor rekening

2. **Tanggal countdown** — edit di `script.js`, baris:
   ```js
   const eventDate = new Date('2026-08-16T09:00:00').getTime();
   ```
   Sesuaikan dengan tanggal & jam acara Anda.

3. **Foto anak & galeri**
   - Simpan file foto ke folder `assets/img/`
   - Di `index.html`, ganti:
     ```html
     <span class="photo-placeholder">👶🏻</span>
     ```
     menjadi:
     ```html
     <img src="assets/img/foto-anak.jpg" alt="Foto Nadia Humaira">
     ```
   - Lakukan hal yang sama untuk 4 slide di bagian `#galeri` (ganti isi `<div class="gallery-slide">` dengan tag `<img>`).

4. **Musik latar**
   - Simpan file mp3 ke `assets/music/islamic-music.mp3` (atau ganti nama file dan sesuaikan `src` pada tag `<audio>` di `index.html`).
   - Musik hanya diputar setelah pengguna menekan tombol "Buka Undangan" (sesuai kebijakan autoplay browser).

5. **Warna & Font**
   - Semua warna diatur lewat CSS variables di bagian atas `style.css` (`:root { --peach: ...; --pink: ...; }`) — mudah diubah di satu tempat.

## Fitur

- Loading screen dengan animasi bulan & bintang
- Hero section dengan gradasi peach–pink & ilustrasi bayi
- Kartu ayat Al-Qur'an & hadits (glassmorphism)
- Detail acara dengan tombol Google Maps
- Profil anak dengan bingkai bunga
- Galeri foto slider otomatis (fade)
- Countdown timer real-time (hari/jam/menit/detik)
- Form ucapan & doa tersimpan di LocalStorage (tanpa server)
- Kartu hadiah dengan tombol salin nomor rekening
- Animasi confetti lembut, floating hearts, sparkle, lentera, kambing berjalan, balon naik
- Tombol musik play/pause
- Responsive penuh: 320px, 360–480px, 768px, 1024px, 1440px+
- Fade-in on scroll, smooth scroll, parallax ringan, glassmorphism

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, upload seluruh isi folder ini.
2. Buka **Settings > Pages**, pilih branch `main` dan folder `/root`.
3. Website akan aktif di `https://username.github.io/nama-repo/`.

## Deploy ke Netlify

1. Buka [netlify.com](https://netlify.com), pilih "Add new site > Deploy manually".
2. Drag & drop folder ini (atau file zip-nya).
3. Selesai — Netlify akan memberikan URL otomatis.

---
Dibuat dengan 🤍 untuk momen aqiqah yang berkesan.
