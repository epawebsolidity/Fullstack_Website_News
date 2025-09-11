import React from "react";

const steps = [
  {
    title: "Melihat Berita Terbaru",
    description:
      "Lihat daftar berita terbaru di halaman News, klik cek detail berita untuk membaca detail lengkap.",
    color: "bg-blue-500",
  },
  {
    title: "Berita Terlama dan Arsip",
    description:
      "Telusuri berita lama yang masih relevan dan dapat dijadikan referensi tambahan.",
    color: "bg-green-500",
  },
  {
    title: "Mencari Berita",
    description:
      "Gunakan fitur pencarian untuk menemukan berita berdasarkan kata kunci atau topik.",
    color: "bg-yellow-400",
  },
  {
    title: "Navigasi dan Responsif",
    description:
      "Nikmati pengalaman browsing yang nyaman di berbagai perangkat, termasuk mobile dan tablet.",
    color: "bg-purple-500",
  },
  {
    title: "Kontak dan Feedback",
    description:
      "Hubungi kami lewat halaman kontak untuk pertanyaan atau masukan.",
    color: "bg-pink-500",
  },
];

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-50 to-white pt-20 px-6 sm:px-10 md:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-12 tracking-tight text-center">
          Dokumentasi Penggunaan Website Berita
        </h1>

        <ol className="relative border-l-4 border-gray-300">
          {steps.map(({ title, description, color }, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span
                className={`absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full ${color} ring-8 ring-white text-white font-bold`}
              >
                {idx + 1}
              </span>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 p-6 bg-blue-100 rounded-3xl shadow-md text-center text-blue-900 font-semibold text-lg">
          Tips: Gunakan menu navigasi di atas untuk memudahkan eksplorasi berita
          dan fitur website.
        </div>
      </div>
    </div>
  );
};

export default Documentation;
