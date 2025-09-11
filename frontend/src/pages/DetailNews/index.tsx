"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NewsContext from "@/context/NewsContext";
import AuthContext from "@/context/AuthContext";
interface News {
  id: number;
  title: string;
  author?: string;
  date: string;
  image: string;
  content: string[];
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

const defaultAvatar = "https://i.pravatar.cc/40";
const ITEMS_PER_PAGE = 5;

const DetailNews: React.FC = () => {
  const { id } = useParams();
  const { getNewsById } = useContext(NewsContext)!; // ✅ ambil dari context
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [inputText, setInputText] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [page, setPage] = useState(1);
  const { isAuthorization, usersCheck } = useContext(AuthContext);
  // ✅ Fetch data berita dari context
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await getNewsById(Number(id));
        if (data) {
          setNews({
            id: data.id,
            title: data.title,
            author: data.writer, // mapping ke author
            date: data.date,
            image: data.image,
            content: [data.description], // kalau string tunggal → bungkus array
          });
        }
      } catch (err) {
        console.error("Gagal ambil detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, getNewsById]);

  // --- Komentar dummy & logika tetap sama ---
  const defaultComments: Comment[] = [
    {
      id: 1,
      user: "Budi",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "Komentar pertama",
      time: "2025-08-27 10:00",
    },
    {
      id: 2,
      user: "Siti",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Komentar kedua",
      time: "2025-08-27 10:05",
    },
  ];

  const allComments = [...comments, ...defaultComments].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const totalPages = Math.ceil(allComments.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentComments = allComments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUser.trim() && inputText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        user: inputUser.trim(),
        avatar: defaultAvatar,
        text: inputText.trim(),
        time: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      setInputText("");
      setInputUser("");
      setPage(1);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!news)
    return (
      <p className="text-center mt-10 text-red-500">Berita tidak ditemukan.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          {news.title}
        </h1>

        <div className="text-xs sm:text-sm text-gray-500 mb-6">
          Ditulis oleh{" "}
          <span className="font-semibold">{news.author || "Anonim"}</span> |{" "}
          {new Date(news.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <img
          src={news.image}
          alt={news.title}
          className="w-full rounded-md mb-6 shadow-sm"
        />

        <div className="text-gray-700 text-base text-justify sm:text-lg leading-relaxed space-y-5 sm:space-y-6">
          {news.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* --- Komentar tetap --- */}
        <div className="my-10 border-t border-gray-300" />
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Komentar Pengguna
          </h2>
          {allComments.length === 0 ? (
            <p className="text-gray-500">Belum ada komentar.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {currentComments.map(({ id, user, avatar, text, time }) => (
                  <li key={id} className="flex items-start space-x-3">
                    <img
                      src={avatar}
                      alt={user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user}</p>
                      <p className="text-gray-600 text-xs">
                        {formatTime(time)}
                      </p>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end space-x-2 mt-4 text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}>
                  Prev
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* Form Komentar */}
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <input
              type="text"
              value={isAuthorization?.UserId || ""}
              readOnly
              disabled={!isAuthorization}
              placeholder="Login dulu..."
              className="w-full mb-2 p-3 border rounded bg-gray-100"
            />
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
              }`}>
              Kirim Komentar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DetailNews;
