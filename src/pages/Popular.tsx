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
    <div>
      <div className='mx-auto text-white container'>
        <h1 className='text-3xl my-12'>Popular Anime</h1>
        <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6'>
          {loading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : (animeList.map(({ mal_id, images, title_english, title }) => (
            <Link to={`/watch/${mal_id}`} key={`${mal_id}-${uuidv4()}`}>
              <div className='w-full h-auto'>
                <img src={images.jpg.image_url} alt={title_english || title} className='w-full h-auto aspect-[2/3] object-cover' />
              </div>
              <h2 className='text-sm line-clamp-3'>{title_english || title}</h2>
            </Link>
          ))
          )}
        </div>
      </div>
    </div>
  )
}

export default New