import { v4 as uuid } from 'uuid';
import { useState } from "react";
import { assets } from "@/assets/assets";
import { useAnimeApi } from "@/hooks/useAnimeApi";
import { useAppContext } from '@/context/AppContext';
import { formatSiUnit } from "format-si-unit"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Loading from '@/components/Loading';

const Allmovies: React.FC = () => {
  const { searchTerm, loading } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { animeList } = useAnimeApi(searchTerm)

  const handleRightClick = () => {
    const maxIndex = Math.max(0, animeList.length - 7);
    if (currentIndex < maxIndex) {
      setCurrentIndex(Math.min(currentIndex + 6, maxIndex));
    }
  }

  const handleLeftClick = () => {
    if (currentIndex - 6 >= 0) {
      setCurrentIndex(currentIndex - 6)
    } else {
      setCurrentIndex(0)
    }
  }


  return (
    <section className='w-full min-h-screen relativ mt-11 '>
      <div className={` absolute left-0 bottom-0 w-10 md:w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleLeftClick}>
        <img src={assets.back} alt="Back arrow" />
      </div>
      <div className={`absolute right-0 bottom-0 w-9 md:w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 18 ? 'hidden' : ''}`} onClick={handleRightClick}>
        <img src={assets.next} alt="Right arrow" />
      </div>
      <div className=" container w-11/12 mt-15 absolute left-4 sm:left-8 lg:left-12 xl:left-16 2xl:left-20 ">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className=" w-full h-full whitespace-nowrap transition-transform duration-1000 ease-in-out " style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}  >
          {loading ? (
            <Loading />
          ) : (
            animeList?.map((items) => (
              <div key={`${items.mal_id}-${uuid()}`} className="w-2/6 md:w-1/6 h-full relative py-4 rounded-sm inline-block mr-2 md:mr-4 lg:mr-6 mt-5">
                <div className="w-full h-auto aspect-[2/3] hover:bg-opacity-75 transition-all duration-300 ease-in-out">
                  <img src={items.images.webp.image_url} alt="image" decoding='async' loading='lazy' className="block w-full h-full mx-auto rounded-sm object-cover" />
                </div>
                <p className="line-clamp-1 w-full text-white whitespace-normal mt-2 text-sm">{items.title}</p>
                <p className="text-[#9d9d9d] text-sm">{items.year ? items.year : 'No-info'}</p>
                <div className='absolute top-2 right-0 w-full h-full opacity-0 hover:opacity-95 hover:bg-[#17161c] transition-opacity duration-100 hover:scale-105'>
                  <div className='whitespace-normal text-white text-sm line-clamp-10 md:line-clamp-8 lg:line-clamp-6 m-2 select-none'>
                    <p className='mb-2'>{items.title}</p>
                    <p className='text-[#9d9d9d]'>{`${items.score} ★ (${formatSiUnit(items.scored_by)})`}</p>
                    <p className='text-[#9d9d9d]'>{`${items.episodes} episodes`}</p>
                    <p className='mt-2'>{items.synopsis}</p>
                  </div>
                  <div className='absolute bottom-4 left-4 flex gap-4'>
                    <div className="relative group">
                      <FontAwesomeIcon icon={faPlay} className='text-xl text-orange-500' />
                      <span className="absolute transform left-1/2 -translate-x-1/2 -translate-y-3/2 bg-[#535364] text-white text-sm lg:text-defualt rounded py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Play
                        <span className="absolute transform left-1/2 -translate-x-1/2 translate-y-7 lg:translate-y-6 bg-[#535364] w-2 h-2 lg:w-4 lg:h-4   rotate-45" />
                      </span>
                    </div>
                    <div className="relative group">
                      <FontAwesomeIcon icon={faBookmark} className='text-orange-500 text-xl' />
                      <span className="absolute transform left-1/2 -translate-x-1/2 -translate-y-3/2 bg-[#535364] text-white text-sm lg:text-defualt rounded py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Add to Watchlist
                        <span className="absolute transform left-1/2 -translate-x-1/2 translate-y-7 lg:translate-y-6 bg-[#535364] w-2 h-2 lg:w-4 lg:h-4   rotate-45" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            ))
          )}
        </div>
      </div>
      <div className="w-full h-full -mt-11 bg-black"></div>
    </section>
  );
};

export default Allmovies;
