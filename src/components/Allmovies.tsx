import { v4 as uuid } from 'uuid';
import { useState } from "react";
import { useAnimeApi } from "@/hooks/useAnimeApi";
import { useAppContext } from '@/context/AppContext';
import { formatSiUnit } from "format-si-unit"
import Loading from '@/components/Loading';
import { Link } from 'react-router-dom';

const Allmovies: React.FC = () => {
  const { searchTerm, loading } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 6;
  const cardWidth = 250; // px
  const { animeList } = useAnimeApi(searchTerm)

  const handleRightClick = () => {
    const maxIndex = Math.max(0, animeList.length - itemsPerPage);
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  }

  const handleLeftClick = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  }


  return (
    <section className='w-full h-[600px] relativ mt-11 '>
      <div className={` absolute left-0 bottom-82 md:bottom-51 lg:bottom-21 cursor-pointer z-10 md:py-28 lg:py-43 lg:px-3 bg-gradient-to-r from-[#00000088] from-100% to-transparent ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleLeftClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left size-8 text-neutral-300 cursor-pointer"><path d="m15 18-6-6 6-6"></path></svg>
      </div>
      <div className={`absolute right-0 bottom-82 md:bottom-51 lg:bottom-21 cursor-pointer z-10 md:py-28 lg:py-43 lg:px-3 bg-gradient-to-r from-[#00000088] from-100% to-transparent ${currentIndex === 18 ? 'hidden' : ''}`} onClick={handleRightClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-8 text-neutral-300 cursor-pointer"><path d="m9 18 6-6-6-6"></path></svg>
      </div>
      <div className="container w-11/12 mt-15 absolute left-4 sm:left-8 lg:left-12 xl:left-16 2xl:left-20 ">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className="w-screen overflow-hidden relative">
          <div
            className="grid grid-flow-col auto-cols-[145px] md:auto-cols-[170px] lg:auto-cols-[200px] xl:auto-cols-[250px] gap-4 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (cardWidth + 17)}px)` }}
          >
            {loading ? (
              <Loading />
            ) : (
              animeList?.map((items) => (
                <Link key={`${items.mal_id}-${uuid()}`} to={`/watch/${items.mal_id}`} className="w-full h-auto relative rounded-sm mt-5 ">
                  <div className="w-full aspect-[2/3] hover:bg-opacity-75 transition-all duration-300 ease-in-out">
                    <img src={items.images.webp.image_url} alt="image" decoding='async' loading='lazy' className="block w-full h-full mx-auto rounded-sm object-cover" />
                  </div>
                  <p className="line-clamp-1 w-full text-white whitespace-normal mt-2 text-sm">{items.title}</p>
                  <p className="text-[#9d9d9d] text-sm">{items.year ? items.year : 'No-info'}</p>
                  <div className='absolute top-2 right-0 w-full h-full p-1 opacity-0 hover:opacity-95 hover:bg-[#17161c] transition-opacity duration-100 hover:scale-105'>
                    <div className='whitespace-normal text-white text-sm line-clamp-10 md:line-clamp-8 lg:line-clamp-6 m-2 select-none'>
                      <p className='mb-2 text-nowrap'>{items.title}</p>
                      <p className='text-[#9d9d9d] '>{`${items.score} ★ (${formatSiUnit(items.scored_by)})`}</p>
                      <p className='text-[#9d9d9d]'>{`${items.episodes} episodes`}</p>
                      <p className='mt-2 line-clamp-4 '>{items.synopsis}</p>
                    </div>
                    <div className='absolute bottom-4 left-4 flex gap-2 mb-4'>
                      <div className="relative group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play mr-2 h-5 w-5 text-orange-500 text-xl"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                        <span className="absolute transform left-2 -translate-x-1/2 -translate-y-4/2 bg-[#535364] text-white text-sm lg:text-default rounded py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Play
                          <span className="absolute transform left-1/2 -translate-x-1/2 translate-y-7 lg:translate-y-6 bg-[#535364] w-2 h-2 lg:w-4 lg:h-4 rotate-45" />
                        </span>
                      </div>
                      <div className="relative group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-5 w-5 text-orange-500 text-xl"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                        <span className="absolute transform left-1/2 -translate-x-1/2 -translate-y-4/2 bg-[#535364] text-white text-sm lg:text-default rounded py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-nowrap ">
                          Add to Watchlist
                          <span className="absolute transform left-1/2 -translate-x-1/2 translate-y-7 lg:translate-y-6 bg-[#535364] w-2 h-2 lg:w-4 lg:h-4 rotate-45" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full -mt-11 bg-black"></div>
    </section>
  );
};

export default Allmovies;
