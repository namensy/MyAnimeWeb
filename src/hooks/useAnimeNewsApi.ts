import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

interface AnimeNewsItem {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: {
    jpg: {
      image_url: string;
    }
  };
  comments: number;
  excerpt: string;
}

interface AnimeNewsResponse {
  data: AnimeNewsItem[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  }
}

export const useAnimeNewsApi = (animeId: string | undefined) => {
  const { setLoading } = useAppContext();
  const [animeNews, setAnimeNews] = useState<AnimeNewsItem[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getAnimeNews = async () => {
    if (!animeId) return;
    setLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const endpoint = await axios.get<AnimeNewsResponse>(
        `https://api.jikan.moe/v4/anime/${animeId}/news`
      );
      const { data } = endpoint;

      setAnimeNews(data.data);
    } catch (error) {
      console.error("Error fetching anime news:", error);
      setIsError(true);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("เกิดข้อผิดพลาดในการดึงข้อมูลข่าว");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ดึงข้อมูลข่าวเมื่อ ID ของอนิเมะมีการเปลี่ยนแปลง
    getAnimeNews();
  }, [animeId]);

  return { 
    animeNews, 
    isError, 
    errorMessage, 
    getAnimeNews,
    refreshNews: getAnimeNews // ฟังก์ชันสำหรับรีเฟรชข้อมูลข่าวในกรณีที่ต้องการ
  };
}; 