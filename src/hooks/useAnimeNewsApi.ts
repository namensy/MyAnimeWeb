import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchAnimeNews = async (animeId: string) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime/${animeId}/news`
  )
  return response.data.data
}

export const useAnimeNewsApi = (animeId: string) => {
  const {
    data: animeNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['animeNews', animeId],
    queryFn: ({ queryKey }) => fetchAnimeNews(queryKey[1]),
    enabled: !!animeId,
  })

  return {
    animeNews: animeNews ?? [],
    error,
    isError,
    isLoading,
  }
}
