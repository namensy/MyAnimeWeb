import React from 'react'
import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAppContext } from '@/context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import Loading from '@/components/Loading'

const New: React.FC = () => {
  const { searchTerm, loading } = useAppContext()
  const { animeList } = useAnimeApi(searchTerm)


  return (
    <div className=' bg-black'>
      <div className='mx-auto text-white container max-w-7/12'>
        <h1 className='text-3xl my-12'>Newly Added Anime </h1>
        <div className='grid grid-cols-6 gap-6'>
          {loading ? (
            <Loading />
          ) : (
            animeList.map((item) => (
              <div key={`${item.mal_id}-${uuidv4()}`}>
                <div className='w-[150px] h-[220px]'>
                  <img src={item.images.jpg.image_url} alt={item.title} className='w-full h-full object-cover' />
                </div>
                <h2 className='text-sm line-clamp-3'>{item.title}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default New