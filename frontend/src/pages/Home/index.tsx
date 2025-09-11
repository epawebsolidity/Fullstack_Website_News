import React from "react";
import LogoLanding from "@/assets/landing.png";
import LogoPuloampel from "@/assets/logo-puloampel.png";
import LogoKarangTaruna from "@/assets/logo-karang-taruna.png";
import LogoBakrie from "@/assets/logo-bakrie.png";
import LogoConch from "@/assets/conch-pt.png";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-400 via-red-400 to-red-400 pt-24 px-6 md:px-16 font-sans text-white">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold mb-4">
            NewsApp
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Berita Terbaru & Terpercaya untuk Kamu
          </h1>
          <p className="mb-6 text-yellow-100 exo-2-400 leading-relaxed text-lg">
            Dapatkan update terbaru seputar teknologi, bisnis, dan inovasi dari
            seluruh kecamatan puloampel setiap hari.
          </p>
          <Link to="/news" className="bg-yellow-400  text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition shadow-lg">
            Lihat Semua Berita
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={LogoLanding}
            alt="News Hero"
            className="rounded-lg object-cover w-full"
            loading="lazy"
          />
        </div>
      </section>
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Mengapa Memilih NewsApp?</h2>
        <p className="text-yellow-100 mb-8 exo-2-400">
          Kami berkomitmen untuk memberikan berita yang akurat, terpercaya, dan
          relevan dengan kebutuhan Anda. Dengan tim jurnalis profesional dan
          teknologi terkini, kami memastikan Anda selalu mendapatkan informasi
          terbaik.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-500 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Akurat & Terpercaya</h3>
            <p className="text-yellow-100 exo-2-400">
              Setiap berita diverifikasi oleh tim kami untuk memastikan
              keasliannya.
            </p>
          </div>
          <div className="bg-yellow-500 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Update Harian</h3>
            <p className="text-yellow-100 exo-2-400">
              Dapatkan berita terbaru setiap hari langsung di ujung jari Anda.
            </p>
          </div>
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Mudah Diakses</h3>
            <p className="text-yellow-100 exo-2-400">
              Akses berita kapan saja dan di mana saja melalui perangkat Anda.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Didukung oleh Instansi & Perusahaan
        </h2>
        <p className="text-white mb-10 exo-2-400">
          Berbagai instansi pemerintah desa dan perusahaan yang berada di
          Kecamatan Puloampel, Banten.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={LogoPuloampel}
              alt="Desa Puloampel"
              className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>

          <div className="flex items-center justify-center">
            <img
              src={LogoKarangTaruna}
              alt="BUMDes Puloampel"
              className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>

          <div className="flex items-center justify-center">
            <img
              src={LogoBakrie}
              alt="PT Krakatau"
              className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>

          <div className="flex items-center justify-center">
            <img
              src={LogoConch}
              alt="Perusahaan Lokal"
              className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto mt-20 px-6 text-center rounded-lg py-12">
        <h2 className="text-3xl font-extrabold text-white mb-6">
          Terima Kasih atas Dukungan & Kerja Sama Anda
        </h2>
        <p className="text-white text-lg max-w-3xl mx-auto leading-relaxed exo-2-400">
          Kami mengucapkan rasa terima kasih yang sebesar-besarnya kepada
          seluruh instansi pemerintah desa, perusahaan di wilayah Puloampel,
          serta para pengguna setia NewsApp. Dukungan dan kerja sama Anda adalah
          sumber inspirasi dan kekuatan kami untuk terus menghadirkan berita
          terbaik dan terpercaya.
        </p>
      </section>
    </div>
  );
};

export default Home;
