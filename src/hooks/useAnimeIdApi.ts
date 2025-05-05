import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { AnimeItems } from "@/types";

export const useAnimeIdApi = (Id: number | undefined) => {
  const { setLoading } = useAppContext();
  const [animeId, setAnimeId] = useState<AnimeItems | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getAnimeId = async () => {
    if (!Id) return;

    setLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const endpoint = await axios.get<{ data: AnimeItems }>(
        `https://api.jikan.moe/v4/anime/${Id}`
      );

      const {
        data: { data },
      } = endpoint;
      setAnimeId(data);
    } catch (error) {
      console.error("Error fetching anime id:", error);
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
    getAnimeId();
  }, [Id]);

  return {
    animeId,
    isError,
    errorMessage,
    getAnimeId,
    refreshId: getAnimeId,
  };
};
