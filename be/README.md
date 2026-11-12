# ⚙️ Backend: REST API

Backend aplikasi berbasis **Node.js + Express** yang menyediakan REST API untuk frontend PWA. Struktur kode sudah disiapkan agar bisa dijalankan di **lokal**, **EC2 / Elastic Beanstalk**, maupun **AWS Lambda + API Gateway** tanpa mengubah kode.

## 🧰 Tech Stack

| Kebutuhan | Library |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Web framework | [Express 5](https://expressjs.com/) |
| CORS (izin akses dari frontend) | [cors](https://www.npmjs.com/package/cors) |
| Environment variable | [dotenv](https://www.npmjs.com/package/dotenv) |
| Database | Amazon DynamoDB via [AWS SDK v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/) |
| Verifikasi login | Amazon Cognito via [aws-jwt-verify](https://www.npmjs.com/package/aws-jwt-verify) |
| Adapter Lambda | [serverless-http](https://www.npmjs.com/package/serverless-http) |
| Auto-restart saat development | [nodemon](https://www.npmjs.com/package/nodemon) |

## ✅ Yang Harus Di-install Terlebih Dahulu

1. **Node.js versi 20 atau lebih baru** (disarankan versi LTS terbaru)
   - Download: https://nodejs.org/
   - Cek instalasi:
     ```powershell
     node -v
     npm -v
     ```
2. **Git**: https://git-scm.com/
3. (Opsional) **Postman** atau extension **Thunder Client** di VS Code untuk mencoba API.
4. (Opsional, saat mulai pakai AWS) **AWS CLI**: https://aws.amazon.com/cli/
   ```powershell
   aws configure
   ```
   Isi *Access Key*, *Secret Key*, dan region `ap-southeast-1` (Singapore).

> 💡 **Akun AWS tidak wajib** untuk development. Jika `DYNAMODB_TABLE` di `.env` kosong, backend otomatis memakai **database in-memory** (data hilang saat server di-restart).

## 🚀 Cara Inisialisasi (Pertama Kali)

Jalankan dari root repository:

```powershell
cd be
npm install
copy .env.example .env
```

- `npm install` mengunduh semua dependency di `package.json` ke folder `node_modules/`.
- File `.env` berisi konfigurasi (port, CORS, AWS). Untuk development lokal, nilai default sudah cukup.

> ⚠️ File `.env` **jangan pernah di-push** ke GitHub karena bisa berisi kredensial AWS. Sudah diatur di `.gitignore`.

## ▶️ Cara Menjalankan

### Mode Development (auto-restart saat file disimpan)

```powershell
npm run dev
```

### Mode Production

```powershell
npm start
```

Jika berhasil, terminal akan menampilkan:

```
Backend berjalan di http://localhost:3000
Database: in-memory (data hilang saat server restart)
```

Cek di browser: http://localhost:3000/api/health. Hasilnya harus `{"status":"ok", ...}`.

## 🔌 Daftar Endpoint

| Method | Endpoint | Keterangan | Body |
|---|---|---|---|
| GET | `/api/health` | Cek status server | |
| GET | `/api/items` | Ambil semua item | |
| GET | `/api/items/:id` | Ambil satu item | |
| POST | `/api/items` | Tambah item | `{ "name": "Contoh" }` |
| DELETE | `/api/items/:id` | Hapus item | |

Contoh tes cepat dengan PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/items -Method Post -ContentType "application/json" -Body '{"name":"Item pertama"}'
Invoke-RestMethod http://localhost:3000/api/items
```

> Endpoint `items` hanyalah **contoh**. Silakan ganti atau tambah sesuai fitur proyek.

## 📜 Daftar Script

| Command | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server dengan nodemon (auto-restart) |
| `npm start` | Menjalankan server dengan node biasa |

## 🗂️ Struktur Folder

```
be/
├── src/
│   ├── routes/             # Definisi URL endpoint (health, items, ...)
│   ├── controllers/        # Logika tiap endpoint (validasi, response)
│   ├── services/db.js      # Akses database (DynamoDB / in-memory)
│   ├── middleware/
│   │   ├── auth.js         # Verifikasi token Cognito
│   │   └── errorHandler.js # Penanganan error global
│   ├── app.js              # Setup Express (CORS, JSON, routes)
│   ├── server.js           # Entry point lokal / EC2 (app.listen)
│   └── lambda.js           # Entry point AWS Lambda
├── .env.example            # Contoh environment variable
└── package.json
```

Alur request: **route → (middleware) → controller → service → database**.

## 🧩 Panduan Menambah Fitur (contoh: fitur `users`)

1. Buat `src/controllers/user.controller.js` berisi fungsi `list`, `create`, dll.
2. Buat `src/routes/user.routes.js` yang menghubungkan URL ke controller.
3. Daftarkan di `src/app.js`:
   ```js
   app.use('/api/users', require('./routes/user.routes'))
   ```
4. Kalau butuh akses database baru, tambahkan fungsinya di `src/services/` (bisa buat file baru, misal `user.service.js`).
5. Kalau endpoint harus login dulu, pasang middleware `auth`:
   ```js
   const auth = require('../middleware/auth')
   router.post('/', auth, controller.create) // req.user berisi data user dari Cognito
   ```

## ☁️ Menghubungkan ke AWS

### DynamoDB
1. Buka AWS Console → DynamoDB → **Create table**.
2. Nama tabel misal `Items`, *partition key* `id` (String).
3. Isi `.env`:
   ```
   AWS_REGION=ap-southeast-1
   DYNAMODB_TABLE=Items
   ```
4. Pastikan kredensial AWS sudah diset (`aws configure`) atau, jika di EC2/Lambda, gunakan **IAM Role** dengan izin DynamoDB.

### Cognito (Login)
1. AWS Console → Cognito → buat **User Pool** + **App client**.
2. Isi `COGNITO_USER_POOL_ID` dan `COGNITO_CLIENT_ID` di `.env`.

### Deploy
- **AWS Lambda + API Gateway**: zip folder `be` (termasuk `node_modules`), upload ke Lambda dengan handler `src/lambda.handler`, lalu buat HTTP API di API Gateway yang mengarah ke Lambda tersebut.
- **EC2 / Elastic Beanstalk**: clone repo, `npm install --omit=dev`, buat `.env`, lalu jalankan `npm start` (disarankan memakai `pm2` agar tetap berjalan).

Setelah deploy, tambahkan domain frontend (CloudFront / Amplify) ke `CORS_ORIGIN`.

## 🛠️ Troubleshooting

| Masalah | Solusi |
|---|---|
| `Cannot find module 'express'` | Belum `npm install` di folder `be` |
| `EADDRINUSE: port 3000` | Port dipakai proses lain. Tutup terminal lain atau ubah `PORT` di `.env` |
| Frontend kena error CORS | Tambahkan URL frontend ke `CORS_ORIGIN` di `.env`, lalu restart server |
| Data hilang setelah restart | Normal untuk mode in-memory. Isi `DYNAMODB_TABLE` untuk data permanen |
| `CredentialsProviderError` | Kredensial AWS belum diset. Jalankan `aws configure` |
