# Portofolio Pribadi

Website ini saya buat untuk merangkum seluruh perjalanan saya sebagai mahasiswa Informatika, mulai dari biodata, riwayat organisasi, skill, sampai pencapaian dan sertifikat yang sudah saya dapatkan. Selain sebagai pajangan proyek, website ini juga punya fitur *Community Feed* supaya pengunjung bisa langsung kasih masukan atau sekadar menyapa secara *real-time*.

Semuanya saya bangun dengan desain simple, dengan menggunakan kombinasi **HTML, CSS, dan JavaScript** untuk tampilan, serta **PHP dan MySQL** untuk mengelola data di bagian *backend*.

## Apa saja isi di dalamnya?

* **Biodata Singkat**: Perkenalan diri dan latar belakang 
* **Riwayat & Pengalaman**: Catatan organisasi.
* **Skill & Sertifikat**: Daftar keahlian dan prestasi 
* **Galeri Proyek**: Dokumentasi hasil karya saya 
* **Pesan Komunitas**: Fitur interaktif untuk saling bertukar pesan antar pengunjung web.

## Teknologi yang Digunakan

* **Frontend**: HTML5, Vanilla CSS3, dan JavaScript (ES6+).
* **Backend**: PHP untuk mengolah logika server dan data.
* **Database**: MySQL untuk menyimpan riwayat pesan dan data lainnya.
* **Design**: Figma (untuk riset tampilan sebelum masuk ke tahap *coding*).

## Struktur Folder

```text
├── assets/         # Foto, icon, dan dokumen sertifikat
├── css/            # Styling utama (style.css)
├── js/             # Logika interaksi dan fetch data
├── backend/        # File PHP untuk database dan form
├── database/       # Script SQL untuk struktur tabel
└── index.php       # Halaman utama website
```

## Cara Menjalankan di Lokal

1.  **Siapkan Server Lokal**: Gunakan XAMPP, Laragon, atau sejenisnya.
2.  **Import Database**: Masukkan file `.sql` dari folder `database/` ke phpMyAdmin.
3.  **Atur Koneksi**: Sesuaikan pengaturan database kamu di file koneksi PHP (di dalam folder `backend/`).
4.  **Buka Browser**: Pindahkan folder proyek ke `htdocs`, lalu akses lewat `localhost/nama-folder`.

---
**Rijaluddin Abdul Ghani**
