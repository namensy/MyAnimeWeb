import { AnimeItems } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useMultipleAnimeApi = (ids: number[]) => {
  const [animes, setAnimes] = useState<{ [key: number]: AnimeItems }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchMultipleAnime = async (ids: number[]) => {
    const response = await Promise.all(
      ids.map((id) => axios.get(`https://api.jikan.moe/v4/anime/${id}`))
    )

    return response.map((item) => item.data.data)
  }

  const fetchAll = async () => {
    try {
      setLoading(true)
      const response = await Promise.all(
        ids.map((id) => axios.get(`https://api.jikan.moe/v4/anime/${id}`))
      )

      const animeData = response.reduce<{ [key: number]: AnimeItems }>(
        (acc, curr, index) => {
          acc[ids[index]] = curr.data.data
          return acc
        },
        {}
      )
      setAnimes(animeData)
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setErrorMessage('Error fetching Anime ID')
      } else {
        setErrorMessage('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
    fetchMultipleAnime([58567, 31240, 35507])
  }, [])

  return { animes, loading, errorMessage }
}
