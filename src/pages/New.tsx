import React from 'react'
import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAppContext } from '@/context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const New: React.FC = () => {
  const { searchTerm, loading } = useAppContext()
  const { animeList, isError } = useAnimeApi(searchTerm)

  return (
    <div>
      <div className='mx-auto text-white container lg:max-w-11/12 xl:max-w-10/12'>
        <h1 className='text-3xl my-12'>Newly Added Anime</h1>
        {loading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6'>
            {animeList.map(({ mal_id, images, title_english, title}) => (
              <Link to={`/watch/${mal_id}`} key={`${mal_id}-${uuidv4()}`}>
                <div className='w-full h-auto'>
                  <div className="relative w-full h-full">
                    <img src={images.jpg.image_url} alt={title_english || title} className={`w-full h-full object-cover`} />
                  </div>
                </div>
                <h2 className='text-sm line-clamp-3'>{title_english || title}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default New

