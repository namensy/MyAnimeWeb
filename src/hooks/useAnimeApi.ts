import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { AnimeItems } from '@/types';
import { useAppContext } from '@/context/AppContext';

export const useAnimeApi = (searchTerm: string | string[]) => {
  const { setLoading, loading } = useAppContext();
  const [animeList, setAnimeList] = useState<AnimeItems[]>([]);
  const [debouncedText] = useDebounce(typeof searchTerm === 'string' ? searchTerm : '', 300);
  const getMovieApi = async () => {
    setLoading(true);
    try {
      const endpoint = await axios.get(
        debouncedText
        ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(debouncedText)}`
        : 'https://api.jikan.moe/v4/seasons/now'
      );
      const { data: { data } } = endpoint;
      setAnimeList(data);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getMovieApi();
  }, [debouncedText])

  return { animeList, loading, getMovieApi };
};
