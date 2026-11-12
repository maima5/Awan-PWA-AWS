# 📚 Repository Tugas Komputasi Awan

Repository ini digunakan sebagai tempat penyimpanan dan dokumentasi arsitektur web-application berbasis PWA dengan AWS sebagai bentuk tugas akhir dari Komputasi Awan.

Repository ini berfungsi sebagai **repository utama untuk pengembangan (*development*) tugas besar akademik kelompok 2 Listener 2 Yapper.**

## 👥 Identitas Kelompok

| Informasi | Keterangan |
|---|---|
| Mata Kuliah | Komputasi Awan dan Terdistribusi |
| Kelas | IF-48-11 |
| Proyek | [need discussion] |

### Anggota Kelompok

| No. | Nama Anggota | NIM |
|---|---|---|
| 1 | Servina | 103012400187 |
| 2 | Kayla Balqis Syahira | 103012400288 |
| 3 | Athaya Putri Khaira | 103012400251 |
| 4 | Husnul Khotimah | 103012430019 |


## 📄 Deskripsi Isi Repository

### 1. README.md
Dokumen utama yang menjelaskan tujuan repository, identitas kelompok, struktur folder, serta daftar dokumentasi yang tersedia.


## 🗂️ Panduan Pengelolaan Tugas

Agar repository tetap rapi, terstruktur, dan memudahkan proses integrasi kode, setiap anggota yang mendapatkan jobdesk terkait **development fitur** diwajibkan mengikuti ketentuan berikut:

1. **Gunakan Branch Masing-Masing**
   - Setiap anggota wajib membuat dan menggunakan branch baru untuk setiap fitur yang dikerjakan.
   - Format penamaan branch:
     `fe/be-Nama-feat.NamaFitur`
   - `fe` digunakan untuk Frontend dan `be` untuk Backend.
   - Contoh: `fe-Ima-feat.Login`

2. **Buat dan Pindah ke Branch Baru**

   Sebelum mulai melakukan coding, buat branch sesuai format yang telah ditentukan menggunakan command:
   ```powershell
   git switch -c namabranch
   ```

3. **Push Hasil Pengerjaan ke Repository**

   Setelah development fitur selesai, lakukan proses upload kode ke branch masing-masing. Jalankan command berikut **satu per satu**:

   ```powershell
   git add .
   git commit -m "deskripsi perubahan"
   git remote add origin <repository-url>
   git push origin nama-branch
   ```

   *Catatan:*
   - Ganti `deskripsi perubahan` dengan keterangan singkat mengenai perubahan yang dilakukan.
   - Ganti `nama-branch` dengan nama branch yang digunakan.
   - `git remote add origin` hanya perlu dijalankan jika remote `origin` belum terdaftar pada repository lokal. Jika sudah terdaftar, langsung lanjutkan ke command berikutnya.

4. **Pastikan Hasil Pengerjaan Berada di Branch yang Sesuai**
   - Jangan melakukan push hasil development langsung ke branch `main` atau branch utama lainnya.
   - Pastikan kode yang di-push sesuai dengan jobdesk dan fitur yang menjadi tanggung jawab masing-masing.

5. **Jaga Konsistensi Repository**
   - Gunakan format penamaan branch yang telah ditentukan.
   - Hindari mencampurkan pengerjaan beberapa fitur yang berbeda dalam satu branch.
   - Pastikan perubahan sudah di-commit sebelum melakukan push.

**Seluruh anggota diharapkan mengikuti panduan ini agar pengerjaan setiap fitur dapat dipantau, dikelola, dan diintegrasikan dengan lebih mudah.**

## 🎯 Tujuan Repository

- Mengembangkan dan mengarsipkan seluruh hasil pengerjaan tugas komputasi awan secara terstruktur.
- Menjadi pusat penyimpanan source code dan dokumentasi pengembangan Web App berbasis Progressive Web App (PWA) dengan memanfaatkan layanan Amazon Web Services (AWS).
- Mendokumentasikan proses pengembangan aplikasi, mulai dari perancangan, implementasi, hingga deployment.
- Menyimpan file konfigurasi, dokumentasi teknis, laporan, serta file pendukung proyek dalam satu repository.
- Memudahkan seluruh anggota kelompok dalam berkolaborasi, mengakses, dan meninjau hasil pengerjaan masing-masing.
- Memastikan perkembangan proyek dapat dipantau dan ditelusuri berdasarkan tahapan pengerjaan tugas perkuliahan.

---

**Repository ini dikelola bersama oleh anggota kelompok sebagai arsip pengembangan utama** Setiap anggota bertanggung jawab menjaga kerapian, kelengkapan, dan keterbaruan berkas yang diunggah.