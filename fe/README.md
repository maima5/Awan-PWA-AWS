# 🖥️ Frontend: Progressive Web App (PWA)

Frontend aplikasi berbasis **React + Vite** yang sudah dikonfigurasi sebagai **Progressive Web App** (bisa di-install dan tetap bisa dibuka saat offline).

## 🧰 Tech Stack

| Kebutuhan | Library |
|---|---|
| UI Framework | [React](https://react.dev/) |
| Build tool / dev server | [Vite](https://vite.dev/) |
| PWA (manifest + service worker) | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) |
| Routing halaman | [React Router](https://reactrouter.com/) |
| HTTP client ke backend | [Axios](https://axios-http.com/) |

## ✅ Yang Harus Di-install Terlebih Dahulu

1. **Node.js versi 20 atau lebih baru** (disarankan versi LTS terbaru)
   - Download: https://nodejs.org/
   - Cek instalasi di terminal:
     ```powershell
     node -v
     npm -v
     ```
2. **Git**: https://git-scm.com/
3. **Google Chrome / Microsoft Edge** untuk mengecek fitur PWA lewat DevTools.
4. (Opsional) **VS Code** + extension *ES7+ React snippets*.

## 🚀 Cara Inisialisasi (Pertama Kali)

Jalankan dari root repository:

```powershell
cd fe
npm install
copy .env.example .env
```

- `npm install` mengunduh semua dependency yang tercatat di `package.json` ke folder `node_modules/`. Tidak perlu install library satu per satu.
- File `.env` berisi URL backend. Default-nya `http://localhost:3000`, jadi tidak perlu diubah untuk development lokal.

> ⚠️ Folder `node_modules/`, `dist/`, dan file `.env` **tidak** ikut di-push ke GitHub (sudah diatur di `.gitignore`).

## ▶️ Cara Menjalankan

### 1. Mode Development (untuk coding sehari-hari)

```powershell
npm run dev
```

Buka http://localhost:5173. Halaman otomatis reload setiap kali file disimpan.

> Supaya halaman bisa mengambil data, **jalankan juga backend** di terminal lain (lihat [`../be/README.md`](../be/README.md)).
> Kalau backend mati, halaman Home akan menampilkan status "tidak terhubung".

### 2. Mode Production / Tes Fitur PWA

Service worker (fitur offline & install) **hanya aktif di hasil build**, bukan saat `npm run dev`.

```powershell
npm run build
npm run preview
```

Buka http://localhost:4173, lalu cek:
1. Buka **DevTools (F12) → tab Application**
   - **Manifest**: nama aplikasi & icon harus muncul tanpa error.
   - **Service Workers**: status harus *activated and is running*.
2. Klik ikon **Install** di address bar Chrome untuk meng-install aplikasi.
3. Tes offline: DevTools → tab **Network** → ubah *No throttling* menjadi **Offline**, lalu refresh. Aplikasi harus tetap terbuka.
4. (Opsional) Jalankan audit **Lighthouse** dari DevTools.

## 📜 Daftar Script

| Command | Fungsi |
|---|---|
| `npm run dev` | Menjalankan dev server di port 5173 |
| `npm run build` | Build production ke folder `dist/` (+ generate service worker) |
| `npm run preview` | Menjalankan hasil build di port 4173 |

## 🗂️ Struktur Folder

```
fe/
├── public/
│   ├── favicon.svg
│   └── icons/              # Icon PWA (192, 512, maskable, apple-touch)
├── src/
│   ├── components/         # Komponen reusable (Navbar, OfflineBanner, ...)
│   ├── pages/              # Satu file per halaman (Home, Items, ...)
│   ├── services/api.js     # Axios instance untuk memanggil backend
│   ├── App.jsx             # Daftar route halaman
│   ├── main.jsx            # Entry point React
│   └── index.css           # Styling global
├── .env.example            # Contoh environment variable
├── index.html
├── vite.config.js          # Konfigurasi Vite + PWA (manifest, caching)
└── package.json
```

## 🧩 Panduan Menambah Fitur

- **Halaman baru**: buat file di `src/pages/`, lalu daftarkan di `src/App.jsx`:
  ```jsx
  <Route path="/profile" element={<Profile />} />
  ```
  Tambahkan juga link-nya di `src/components/Navbar.jsx` bila perlu.
- **Memanggil backend**: selalu gunakan `api` dari `src/services/api.js`, jangan `fetch` dengan URL hardcode:
  ```js
  import api from '../services/api.js'
  const res = await api.get('/api/items')
  ```
- **Menambah library**: `npm install nama-library`, lalu commit `package.json` **dan** `package-lock.json`.
- **Mengganti nama/warna/icon aplikasi**: ubah bagian `manifest` di `vite.config.js` dan file di `public/icons/`.

## ☁️ Deploy ke AWS (Gambaran)

Hasil `npm run build` (folder `dist/`) adalah file statis, sehingga bisa di-host di:
- **AWS Amplify Hosting**: hubungkan repo GitHub, set *base directory* `fe`, build command `npm run build`, output `dist`.
- **Amazon S3 + CloudFront**: upload isi `dist/` ke bucket S3, lalu sajikan lewat CloudFront (HTTPS wajib untuk PWA).

Jangan lupa ubah `VITE_API_URL` ke URL backend production (API Gateway / EC2) **sebelum** build.

## 🛠️ Troubleshooting

| Masalah | Solusi |
|---|---|
| `'vite' is not recognized` | Belum `npm install` di folder `fe` |
| Status backend "tidak terhubung" | Backend belum jalan, atau `VITE_API_URL` di `.env` salah |
| Error CORS di console | Tambahkan origin frontend ke `CORS_ORIGIN` di `be/.env` |
| Perubahan tidak muncul setelah build | Service worker masih menyimpan versi lama. DevTools → Application → Service Workers → **Unregister**, lalu hard refresh (Ctrl+Shift+R) |
| Port 5173 sudah dipakai | Tutup terminal lain yang menjalankan `npm run dev` |
