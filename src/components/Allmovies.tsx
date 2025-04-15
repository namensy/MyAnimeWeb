import { v4 as uuid } from 'uuid';
import { useState } from "react";
import { assets } from "@/assets/assets";
import { useAnimeApi } from "@/hooks/useAnimeApi";
import { useAppContext } from '@/context/AppContext';
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
    <section>
      <div className={`absolute left-0 bottom-0 w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleLeftClick}>
        <img src={assets.back} alt="Back arrow" />
      </div>
      <div className={`absolute right-0 bottom-0 w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 18 ? 'hidden' : ''}`} onClick={handleRightClick}>
        <img src={assets.next} alt="Right arrow" />
      </div>
      <div className="container max-w-11/12 mx-auto -mt-[370px] absolute left-20 ">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className="w-full whitespace-nowrap transition-transform duration-1000 ease-in-out " style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}  >
          {loading ? (
            <Loading />
          ) : (
            animeList?.map((items) => (
              <div key={`${items.mal_id}-${uuid()}`} className="relative py-4 rounded-sm inline-block mr-6 mt-5">
                <div className="w-[250px] h-[375px]  hover:bg-opacity-75 transition-all duration-300 ease-in-out ">
                  <img src={items.images.jpg.image_url} alt="image" className="block w-full h-full mx-auto rounded-sm object-cover" />
                </div>
                <p className="line-clamp-1 w-[260px] text-white whitespace-normal mt-2 text-sm">{items.title}</p>
                <p className="text-[#9d9d9d] text-sm">{items.year ? items.year : 'No-info'}</p>
                <div className='absolute top-2 right-0 w-[267px] h-[425px] opacity-0 hover:opacity-95 hover:bg-[#17161c] transition-opacity duration-100 hover:scale-105'>
                  <div className='whitespace-normal text-white text-sm line-clamp-10 m-2 select-none'>
                    <p className='mb-2'>{items.title}</p>
                    <p className=''>{items.synopsis}</p>
                  </div>
                </div>
              </div>

            ))
          )}
        </div>
      </div>
      <div className="w-full h-[200px] -mt-11 bg-black"></div>
    </section>
  );
};

export default Allmovies;
