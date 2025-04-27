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
      const {
        data: { data },
      } = endpoint;
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieApi();
    // getNewMovieApi();
  }, [debouncedText, id]);

  // For API testing purposes
  // const getNewMovieApi = async () => {
  //   setLoading(true);
  //   try {
  //     const endpoint = await axios.get('https://api.jikan.moe/v4/anime/58567');
  //     const { data: { data } } = endpoint;
  //     console.log(data);
  //   } catch (error) {
  //     console.log('Error', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { animeList, loading, getMovieApi };
};
