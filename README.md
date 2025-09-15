# 🚀 Website News Or Sistem Informasi Berita

---

## 📝 Deskripsi Sistem Informasi Berita (News Website)

Sistem Informasi Berita atau Website News adalah sebuah aplikasi berbasis web yang dirancang untuk menyajikan informasi berita secara digital, sehingga memudahkan pengguna dalam mengakses berita terbaru kapan saja dan di mana saja. Sistem ini dibangun dengan arsitektur frontend dan backend yang saling terhubung melalui API, sehingga data dapat dikelola dengan baik serta ditampilkan secara dinamis kepada pengguna.

## 🎨 Frontend

Bagian frontend dikembangkan menggunakan teknologi web modern untuk menghadirkan tampilan yang interaktif, responsif, dan ramah pengguna. Pengguna dapat:

Melihat daftar berita terbaru maupun terpopuler.

Membaca detail berita lengkap dengan gambar, penulis, dan tanggal publikasi.

Memberikan komentar pada berita (dengan login terlebih dahulu).

Menggunakan fitur pagination, pencarian, dan navigasi yang mudah.

## ⚙️ Backend

Bagian backend berfungsi sebagai pengelola data dan pusat logika bisnis sistem. Backend dibangun menggunakan framework server-side modern dengan dukungan database relasional. Fitur utama backend meliputi:

Manajemen data berita (tambah, ubah, hapus, tampilkan).

Sistem autentikasi dan otorisasi pengguna.

Penyimpanan serta pengelolaan komentar berita.

Penyediaan REST API dalam format JSON untuk kebutuhan frontend.

## 🔗 Integrasi

Frontend dan backend terhubung melalui API sehingga proses pengambilan, pengiriman, serta pembaruan data dapat dilakukan secara real-time. Keamanan sistem dijaga dengan autentikasi berbasis token (JWT).

## 🚀 Manfaat

Memberikan akses berita secara cepat, mudah, dan efisien kepada pengguna.

Menyediakan platform interaktif dengan fitur komentar.

Memudahkan admin atau pengelola dalam mengatur konten berita.

Dapat dikembangkan lebih lanjut dengan fitur kategori, pencarian lanjutan, maupun integrasi multimedia.
---

## ⚙️ Instalasi

### Persyaratan

- Node.js versi 14 atau lebih baru  
  Download: [https://nodejs.org/](https://nodejs.org/)

### Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/epawebsolidity/Fullstack_Website_News.git
cd Fullstack_Website_News

# Install dependencies
npm install

#Run Application
frontend
npm run dev
backend
go run main.go

```


## 🧪 Testing Application

Berikut langkah-langkah pengujian aplikasi agar kamu bisa mencoba fitur utama dengan lancar.

---
### 1. Tampilan Pengujian Bagian Users
### Pertama Ada Menu Home

Saat pertama kali membuka website kamu akan mendapatkan menu home

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Home_Users.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>

### Kedua Ada Menu Berita

Yang Kedua Ada menu Bagian Berita User dapat melihat berita para penulis yang sudah dikonfirmasi dengan benar dan baik oleh para admin dan kepada desa, kita dapat melihat berita tanpa harus melakukan sebuah login pada website.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Berita_Users.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>


### Ketiga Ada Menu Dokumentasi

Menu ini merupakan sebuah dokumentasi penggunaan website. kita dapat melihat bagaimana cara penggunaan sistem dan baik dan benar pada menu dokumentasi ini.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Dosc_Users.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>

### Keempat Ada Menu Tentang

Menu ini merupakan tentang siapa yang membuat dan anda dapat menghubungi developer pada menu ini tinggal klik hubungi kami.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_tentang_Users.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>
---

---
### 2. Tampilan Pengujian Bagian Penulis
### Pertama Ada Menu Daftar
Pada tampilan ini, sistem menampilkan daftar pengguna atau penulis pada website berita, Tujuannya adalah agar penulis dapat membuat sebuah berita yang valid.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Penulis_Register.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>


### Kedua Ada Menu Login

Ketika Penulis Berhasil Mendaftar maka dia harus melakukan login untuk membuat sebuah berita

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Penulis_Login.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>

### Ketiga Ada Menu Pengajuan Berita

Pada Menu Ini Penulis harus menginput berita dengan benar sesuai dengan realita, agar berita ini dapat di konfirmasi oleh admin.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Penulis_Pengajuan_Berita.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>


### Keempat Ada Menu Pemberitahuan

Pada Menu ini ketika penulis berhasil melakukan sebuah penginputan berita ataupun berita telah dikonfirmasi oleh admin namun jika tidak ada pemberitahuan berita telah di konfirmasi mungkin berita anda tidak di konfirmasi admin karna tidak benar atau tidak valid.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Penulis_Pemberitahuan.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>

### Kelima Ada Menu Komentar

Penulis data berkomtar pada berita yang di upload atau berita penulis lainnya yang di upload, dan bukan hanya penulis admin juga dapat membuat sebuah komentar pada berita. jadi kita dapat berkomunikasi lewat berita antara penulis lain dan admin.

<p align="center">
  <img src="https://github.com/epawebsolidity/Fullstack_Website_News/blob/main/backend/utils/result/News_Penulis_Komentar.PNG" alt="Connect Wallet MetaMask" width="400" />
</p>