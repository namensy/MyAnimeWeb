import { AnimeItems, Root } from '@/types'
import { fail } from 'assert'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Config<T> {
  baseURL: string
  url: string
  data?: T
}

interface AnimeResponse {
  title: string
  episode: number
}

const ResultAnimeResponse = (config: Config<AnimeResponse>) => {
  return {
    baseURL: 'hello',
    url: 'its me',
    data: {
      title: 'hi',
      episode: 23,
    },
  }
}

const controller = new AbortController()
const signal = controller.signal

export const useMultipleApi = (iknow: string, url: string) => {
  const [data, setData] = useState<AnimeItems[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<String>('')

  // เราต้องการรับ Api ที่แตกต่างกันออกมา
  // ฉนั้นเราต้องรับ arg เป็นทั้ง Api แล้วก็ baseURL ของ API ก่อน

  // https://api.jikan.moe/v4/anime/9253/episodes
  //ลองใช้งานดูก่อน
  const fetchApi = async () => {
    setLoading(true)
    try {
      const endpoint = await axios.get(`${iknow}${url}okman`, { signal })
      // เราสามารถทำ Pagination ได้
      const {
        data: { data },
      } = endpoint
      setData(data)
    } catch (error) {
      setIsError(true)
      setLoading(false)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || error.message)
        console.log(error.message)
        console.log(error.response?.data)
      } else {
        setErrorMessage('An unexpected error occured')
        console.log('An unexpected error occured')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [iknow, url])

  return {
    data,
    isLoading,
    isError,
  }
}
