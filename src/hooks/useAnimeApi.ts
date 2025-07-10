import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { AnimeItems } from '@/types'
import { useAppContext } from '@/context/AppContext'
import { useLocation, useParams } from 'react-router-dom'

export const useAnimeApi = (searchTerm: string | string[]) => {
  const location = useLocation()
  const { id } = useParams()

  const isMainRoute = location.pathname === '/'
  const isNewRoute = location.pathname === '/videos/new'
  const isPopularRoute = location.pathname === '/videos/popular'
  const isSearchRoute = location.pathname === '/videos/search'
  const isDetailsRoute = location.pathname.startsWith('/watch/')

  const { setLoading, loading } = useAppContext()
  const [animeList, setAnimeList] = useState<AnimeItems[]>([])
  const [debouncedText] = useDebounce(
    typeof searchTerm === 'string' ? searchTerm : '',
    500
  )
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getMovieApi = async () => {
    setLoading(true)
    try {
      const endpoint = await axios.get(
        debouncedText && isSearchRoute
          ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
              debouncedText
            )}`
          : isNewRoute
            ? `https://api.jikan.moe/v4/seasons/now`
            : isPopularRoute
              ? 'https://api.jikan.moe/v4/top/anime?type=&filter=bypopularity'
              : isMainRoute
                ? `https://api.jikan.moe/v4/top/anime`
                : isDetailsRoute
                  ? `https://api.jikan.moe/v4/anime/${id}`
                  : ''
      )
      const {
        data: { data },
      } = endpoint

      if (data.length > 1) {
        setAnimeList(
          Array.from(
            new Map(data.map((item: AnimeItems) => [item.title, item])).values()
          ) as AnimeItems[]
        )
      } else {
        setAnimeList([data])
      }
    } catch (error) {
      setIsError(true)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Failed to fetch Anime')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovieApi()
  }, [debouncedText, ...(isDetailsRoute ? [id] : [])])

  return {
    animeList,
    isError,
    errorMessage,
    loading,
    getMovieApi,
    refreshAnime: getMovieApi,
  }
}
