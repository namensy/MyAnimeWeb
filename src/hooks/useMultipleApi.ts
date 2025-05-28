import { AnimeItems, Root } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useMultipleApi = (baseURL: string, url: string) => {
  const [data, setData] = useState<{ [key: number]: AnimeItems }>({})
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // เราต้องการรับ Api ที่แตกต่างกันออกมา
  // ฉนั้นเราต้องรับ arg เป็นทั้ง Api แล้วก็ baseURL ของ API ก่อน

  // https://api.jikan.moe/v4/anime/9253/episodes
  //ลองใช้งานดูก่อน
  const fetchApi = async () => {
    setLoading(true)
    setIsError(false)
    try {
      const endpoint = await axios.get(`${baseURL}${url}`)
      // เราสามารถทำ Pagination ได้
      const {
        data: { data },
      } = endpoint
      setData(data)
    } catch (error) {
      console.log('This is error', error)
    }
  }
  
  useEffect(() => {
    fetchApi()
  }, [])
  
  return {
    data,
    isLoading,
    isError
  }
}
