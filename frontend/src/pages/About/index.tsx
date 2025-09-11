import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br p-10 from-blue-50 to-white pt-24 px-6 sm:px-10 md:px-20 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Gambar di kiri */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="Tim Berita"
            className="rounded-xl object-cover w-full h-72 md:h-auto"
          />
        </div>

        {/* Konten teks di kanan */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-extrabold text-red-900 leading-tight">
            Tentang Website Berita Kami
          </h1>
          <p className="text-gray-700 exo-2-400 text-lg leading-relaxed">
            Kami berdedikasi memberikan berita akurat dan terpercaya dari
            seluruh puloampel, dengan integritas tinggi dan kecepatan update
            yang optimal.
          </p>
          <p className="text-gray-700 text-lg exo-2-400 leading-relaxed">
            Situs ini didesain responsif agar Anda dapat mengakses berita
            favorit dengan mudah dari perangkat apapun tanpa gangguan.
          </p>
          <p className="text-gray-700 text-lg exo-2-400 leading-relaxed">
            Terima kasih telah memilih kami sebagai sumber informasi utama Anda.
            Kami akan terus berusaha meningkatkan kualitas berita dan pengalaman
            Anda.
          </p>

          <button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
