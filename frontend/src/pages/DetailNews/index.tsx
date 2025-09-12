"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/useAxios";
import NewsContext, { NewsType } from "@/context/NewsContext";
import AuthContext from "@/context/AuthContext";

const ITEMS_PER_PAGE = 5;

const DetailNews: React.FC = () => {
  const { id } = useParams();
  const { getNewsById, getCommentByNewsId, comments } =
    useContext(NewsContext)!;
  const { isAuthorization } = useContext(AuthContext);

  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [news, setNews] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const now = new Date();
    setTanggal(
      now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    setWaktu(
      now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  // fetch berita + komentar
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await getNewsById(Number(id));
        if (data) {
          setNews(data);
          await getCommentByNewsId(Number(id));
        }
      } catch (err) {
        console.error("Gagal ambil detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // submit komentar
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorization || !id) return;

    try {
      const payload = {
        comment_news: inputText,
        date_comment: tanggal,
        time: waktu,
        newsId: String(id),
        usersId: String(isAuthorization.UserId),
      };

      console.log("Payload komentar:", payload);

      const res = await axiosInstance.post("/news/comment/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Komentar terkirim:", res.data);

      await getCommentByNewsId(Number(id));
      setInputText("");
    } catch (err) {
      console.error("Gagal kirim komentar:", err);
    }
  };

  const totalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentComments = comments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!news)
    return (
      <p className="text-center mt-10 text-red-500">Berita tidak ditemukan.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          {news.title}
        </h1>

        {/* Info penulis + tanggal */}
        <div className="text-xs sm:text-sm text-gray-500 mb-6">
          Ditulis oleh{" "}
          <span className="font-semibold">{news.writer || "Anonim"}</span> |{" "}
          {new Date(news.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* Gambar */}
        <img
          src={news.image}
          alt={news.title}
          className="w-full rounded-md mb-6 shadow-sm"
        />

        {/* Konten */}
        <div className="text-gray-700 text-base text-justify sm:text-lg leading-relaxed space-y-5 sm:space-y-6">
          <p>{news.description}</p>
        </div>

        {/* --- Komentar --- */}
        <div className="my-10 border-t border-gray-300" />
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Komentar Pengguna
          </h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">Belum ada komentar.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {currentComments.map((comment) => {
                  const isCurrentUser =
                    isAuthorization &&
                    isAuthorization?.UserId === comment.usersId;

                  return (
                    <li
                      key={comment.id}
                      className={`flex mb-2 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isCurrentUser && (
                        <img
                          src={
                            comment.avatar && comment.avatar !== ""
                              ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                          }
                          alt={comment.user}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div className="max-w-xs p-3 border rounded-lg bg-white shadow-sm">
                        <p className="font-semibold">{comment.user}</p>
                        <p>{comment.text}</p>
                        <small className="text-sm opacity-70">
                          {comment.time}
                        </small>
                      </div>
                      {isCurrentUser && (
                        <img
                          src={
                            comment.avatar && comment.avatar !== ""
                              ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                          }
                          alt={comment.user}
                          className="w-10 h-10 rounded-full ml-3"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Pagination */}
              <div className="flex justify-end space-x-2 mt-4 text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Form Komentar */}
          <form className="mt-6" onSubmit={handleSubmitComment}>
            <input
              type="text"
              value={isAuthorization?.UserId || ""}
              readOnly
              hidden
            />
            <input type="text" value={tanggal} readOnly hidden />
            <input type="text" value={waktu} readOnly hidden />

            <textarea
              rows={4}
              placeholder={
                isAuthorization
                  ? "Tulis komentar kamu..."
                  : "Login dulu untuk komentar"
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={!isAuthorization}
              className="w-full p-3 border rounded"
            />
            <button
              type="submit"
              disabled={!isAuthorization}
              className={`mt-2 px-4 py-2 rounded ${
                isAuthorization
                  ? "bg-red-400 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Kirim Komentar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DetailNews;
