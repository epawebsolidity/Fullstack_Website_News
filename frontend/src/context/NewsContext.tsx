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

// Definisi tipe context
interface NewsContextType {
  news: NewsType[]; // berita terkonfirmasi
  newsall: NewsType[]; // semua berita
  loading: boolean;
  error: string | null;
  refreshNews: () => void;
  fetchNewsAll: () => void;
  getNewsById: (id: number) => Promise<NewsType | null>;
  setNewsAll: React.Dispatch<React.SetStateAction<NewsType[]>>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [newsall, setNewsAll] = useState<NewsType[]>([]);
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

  // get detail by id
  const getNewsById = async (id: number): Promise<NewsType | null> => {
    try {
      const res = await axiosInstance.get(`/news/${id}`);
      const { data } = res.data;
      return {
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
    } catch (err) {
      console.error("Gagal fetch detail berita:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchNews(); // default ambil berita konfirmasi
  }, []);

  return (
    <NewsContext.Provider
      value={{
        news,
        newsall,
        loading,
        error,
        refreshNews: fetchNews,
        fetchNewsAll,
        getNewsById,
        setNewsAll,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
