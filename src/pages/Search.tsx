import React from 'react'
import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAppContext } from '@/context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import Loading from '@/components/Loading'
import { Link } from 'react-router-dom'
import { useSearchContext } from '@/context/SearchContext'

const New: React.FC = () => {
  const { loading, searchTerm } = useAppContext()
  // const { searchTerm } = useSearchContext()
  const { animeList } = useAnimeApi(searchTerm)

  return (
    <div className="bg-black">
      <div className="container mx-auto max-w-7/12 text-white">
        <h1 className="my-12 text-3xl">Waiting for search results</h1>
        <div className="grid grid-cols-6 gap-6">
          {loading ? (
            <Loading />
          ) : (
            animeList.map((item) => (
              <Link
                to={`/watch/${item.mal_id}`}
                key={`${item.mal_id}-${uuidv4()}`}
              >
                <div className="h-[220px] w-[150px]">
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title_english}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="line-clamp-3 text-sm">{item.title_english}</h2>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default New
