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

enum ErrorType {
  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOW_ERROR',
}

const controller = new AbortController()
const signal = controller.signal

export const useMultipleApi = <T = unknown>(
  defaultPath: string,
  path: string
) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Request made and server responded
        setErrorMessage('Response error:' + error.response.data)
        return ErrorType.CLIENT_ERROR
      } else if (error.request) {
        // Request made but no response received
        setErrorMessage('Request error:' + error.request)
        return ErrorType.NETWORK_ERROR
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      setErrorMessage('Unknown error:' + error.message)
      return ErrorType.UNKNOWN_ERROR
    }
  }

  const fetchApi = async () => {
    setLoading(true)
    try {
      const endpoint = await axios.get(`${defaultPath}${path}`, { signal })
      // เราสามารถทำ Pagination ได้
      const {
        data: { data },
      } = endpoint
      setData(data as T)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [defaultPath, path])

  return {
    data,
    isLoading,
    isError,
    errorMessage,
  }
}
