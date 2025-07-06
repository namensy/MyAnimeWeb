import React from 'react'
import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAppContext } from '@/context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import Loading from '@/components/Loading'
import { Link } from 'react-router-dom'
import Error from '@/components/Error'

const New: React.FC = () => {
  const { searchTerm, loading } = useAppContext()
  const { animeList, isError } = useAnimeApi(searchTerm)

  return (
    <div className="container mx-auto text-white lg:max-w-11/12 xl:max-w-9/12">
      <h1 className="my-12 text-3xl">Popular Anime</h1>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-5 xl:grid-cols-6">
        {loading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          animeList.map(({ mal_id, images, title_english, title }) => (
            <Link to={`/watch/${mal_id}`} key={`${mal_id}-${uuidv4()}`}>
              <div className="h-auto w-full">
                <img
                  src={images.jpg.image_url}
                  alt={title_english || title}
                  className="aspect-[2/3] h-auto w-full object-cover"
                />
              </div>
              <h2 className="line-clamp-3 text-sm">{title_english || title}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default New
