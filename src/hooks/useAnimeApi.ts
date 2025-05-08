import axios from "axios";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { AnimeItems } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useMatch, useParams } from "react-router-dom";

export const useAnimeApi = (searchTerm: string | string[]) => {
  const isMainRoute = useMatch("/");
  const isNewRoute = useMatch("/videos/new");
  const isPopularRoute = useMatch("/videos/popular");
  const isSearchRoute = useMatch("/videos/search");
  const isDetailsRoute = useMatch("/watch/:id");
  const { id } = useParams();

  const { setLoading, loading } = useAppContext();
  const [animeList, setAnimeList] = useState<AnimeItems[]>([]);
  const [debouncedText] = useDebounce(
    typeof searchTerm === "string" ? searchTerm : "",
    300
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getMovieApi = async () => {
    setLoading(true);
    try {
      const endpoint = await axios.get(
        debouncedText && isSearchRoute
          ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
              debouncedText
            )}`
          : isNewRoute
          ? `https://api.jikan.moe/v4/seasons/now`
          : isPopularRoute
          ? "https://api.jikan.moe/v4/top/anime?type=&filter=bypopularity"
          : isMainRoute
          ? `https://api.jikan.moe/v4/top/anime`
          : isDetailsRoute
          ? `https://api.jikan.moe/v4/anime/${id}`
          : ""
      );
      const {data: { data } } = endpoint;
      
      if (data.length > 1) {
        setAnimeList(
          Array.from(
            new Map(data.map((item: AnimeItems) => [item.title, item])).values()
          ) as AnimeItems[]
        );
      } else {
        setAnimeList([data]);
      }
    } catch (error) {
      setIsError(true)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Failed to fetch Anime')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieApi();
  }, [debouncedText, id]);


  return { 
    animeList, 
    isError,
    errorMessage,
    loading, 
    getMovieApi,
    refreshAnime: getMovieApi
  };
};
