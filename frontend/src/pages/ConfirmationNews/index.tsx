import React, { useContext, useEffect, useState } from "react";
import NewsContext from "@/context/NewsContext";

const ConfirmationNews: React.FC = () => {
  const { newsall, loading, error, fetchNewsAll } = useContext(NewsContext)!;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNewsAll();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // filter berita sesuai search
  const filteredNews = newsall.filter((n) => {
    const title = n.title?.toLowerCase() || "";
    const writer = n.writer?.toLowerCase() || "";
    const status = n.status?.toLowerCase() || "";
    const keyword = search.toLowerCase();

    return (
      title.includes(keyword) ||
      writer.includes(keyword) ||
      status.includes(keyword)
    );
  });


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Input cari */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Cari Pengguna..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-3/5 p-3 rounded-lg border bg-white border-blue-400 shadow-sm"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
            >
              {/* Gambar */}
              <div className="relative h-40 w-full">
                <img
                  src={n.image || "/placeholder.jpg"}
                  alt={n.title}
                  className="w-full h-full object-cover"
                />
                {/* Badge status */}
                <span
                  className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    n.status.toLowerCase() === "konfirmasi"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {n.status}
                </span>
              </div>

              {/* Konten */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {n.description}
                </p>

                {/* Info tambahan */}
                <div className="text-xs text-gray-500 mb-4">
                  <p className="mb-1">
                    <span className="font-medium">Tanggal:</span> {n.date}
                  </p>
                  <p>
                    <span className="font-medium">Penulis:</span>{" "}
                    {n.writer || "-"}
                  </p>
                </div>

                {/* Tombol aksi */}
                {n.status.toLowerCase() === "konfirmasi" ? (
                  <button
                    disabled
                    className="mt-auto block w-full bg-gray-400 text-white py-2 rounded-lg transition 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sudah Dikonfirmasi
                  </button>
                ) : (
                  <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Konfirmasi
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationNews;
