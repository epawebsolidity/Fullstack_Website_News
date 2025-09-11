"use client";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NewsContext from "@/context/NewsContext"; // sesuaikan path

const News: React.FC = () => {
  const { news, loading, error } = useContext(NewsContext)!;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate(); // ✅ React Router

  // Filter data
  const filteredNews = news.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const truncateWords = (text: string, limit: number) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  const oldestNews = [...news].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0]; // ambil index 0 = berita dengan tanggal terlamaxx

  return (
    <div className="min-h-screen bg-gray-50 p-10 md:p-12 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Search input */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-3/5 p-3 rounded-lg border bg-white border-blue-400 shadow-sm"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading berita...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
            {/* Kolom kiri: daftar berita */}
            <div className="grid gap-8">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-justify text-base mb-4">
                        {truncateWords(item.description, 18)}
                      </p>
                      <p className="text-sm text-gray-400 italic">
                        {item.date}
                      </p>
                      <button
                        onClick={() => navigate(`/detailnews/${item.id}`)}
                      >
                        Detail →
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Tidak ada berita ditemukan
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center space-x-2 mt-10">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Prev
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-full ${
                          currentPage === page
                            ? "bg-red-600 text-white"
                            : "bg-red-200 text-gray-700 hover:bg-red-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              )}
            </div>

            {/* Kolom kanan: berita terlama */}
            <div className="hidden md:block">
              <h2 className="text-2xl font-semibold text-gray-600 tracking-tight mb-4">
                Berita Terlama
              </h2>

              {oldestNews && (
                <div className="w-full bg-white shadow-lg overflow-hidden flex flex-col md:flex-row rounded-xl">
                  {/* Gambar kiri */}
                  <img
                    src={oldestNews.image}
                    alt={oldestNews.title}
                    className="w-full md:w-1/2 h-42 object-cover"
                  />

                  {/* Konten kanan */}
                  <div className="p-4 flex flex-col justify-between md:w-1/2">
                    <div>
                      <h3 className="text-xs font-bold text-gray-800 mb-2">
                        {oldestNews.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {oldestNews.date}
                      </p>
                    </div>

                    {/* Tombol dipaksa di bawah */}
                    <button className="mt-4 md:mt-auto text-blue-500 w-full text-xs py-2 px-4 rounded-lg hover:text-blue-700 transition">
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
