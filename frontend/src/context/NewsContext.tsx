"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/utils/useAxios";

// Definisi tipe berita
export interface NewsType {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  writer?: string;
  category?: string;
  source?: string;
  status?: string;
  user?: any;
}

// Definisi tipe komentar
export interface CommentType {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  usersId?: number; // ✅ untuk identifikasi user login
}

// Definisi tipe context
interface NewsContextType {
  news: NewsType[];
  newsall: NewsType[];
  comments: CommentType[];
  loading: boolean;
  error: string | null;
  refreshNews: () => void;
  fetchNewsAll: () => void;
  getNewsById: (id: number) => Promise<NewsType | null>;
  setNewsAll: React.Dispatch<React.SetStateAction<NewsType[]>>;
  getCommentByNewsId: (id: number) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [newsall, setNewsAll] = useState<NewsType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch hanya yang status konfirmasi
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/news/");
      const { data } = res.data;

      const mapped: NewsType[] = data
        .map((item: any) => ({
          id: item.id,
          title: item.Title_News,
          description: item.News_Content,
          image: item.News_Image,
          date: item.Tanggal_News,
          writer: item.Writer,
          category: item.Category,
          source: item.News_Source,
          status: item.Status,
          user: item.user,
        }))
        .filter((item: any) => item.status === "Konfirmasi");

      setNews(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch semua berita
  const fetchNewsAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/news/");
      const { data } = res.data;

      const mapped: NewsType[] = data.map((item: any) => ({
        id: item.id,
        title: item.Title_News,
        description: item.News_Content,
        image: item.News_Image,
        date: item.Tanggal_News,
        writer: item.Writer,
        category: item.Category,
        source: item.News_Source,
        status: item.Status,
        user: item.user,
      }));

      setNewsAll(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get komentar by news id
  const getCommentByNewsId = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/news/comment/${id}`);
      const { data } = res.data;

      const commentsData = Array.isArray(data) ? data : data.comments;

      const mapped: CommentType[] = Array.isArray(commentsData)
        ? commentsData.map((item: any) => ({
            id: item.id,
            user: item.user?.Username || "Anonim",
            avatar: "https://i.pravatar.cc/40",
            text: item.Comment_News,
            time: `${item.Date_Comment} Pukul ${item.Time}`,
            usersId: item.user?.id,
          }))
        : [];

      setComments(mapped);
    } catch (err) {
      console.error("Gagal ambil komentar:", err);
      setComments([]);
    }
  };

  // get detail news by id
  const getNewsById = async (id: number): Promise<NewsType | null> => {
    try {
      const res = await axiosInstance.get(`/news/${id}`);
      const { data } = res.data;

      const news: NewsType = {
        id: data.id,
        title: data.Title_News,
        description: data.News_Content,
        image: data.News_Image,
        date: data.Tanggal_News,
        writer: data.Writer,
        category: data.Category,
        source: data.News_Source,
        status: data.Status,
        user: data.user,
      };

      const mappedComments: CommentType[] = Array.isArray(data.comments)
        ? data.comments.map((item: any) => ({
            id: item.id,
            user: item.user?.Username || "Anonim",
            avatar: "https://i.pravatar.cc/40",
            text: item.Comment_News,
            time: `${item.Date_Comment} ${item.Time}`,
            usersId: item.user?.id,
          }))
        : [];

      setComments(mappedComments);

      return news;
    } catch (err) {
      console.error("Gagal fetch detail berita:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        news,
        newsall,
        comments,
        loading,
        error,
        refreshNews: fetchNews,
        fetchNewsAll,
        getNewsById,
        setNewsAll,
        getCommentByNewsId,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
