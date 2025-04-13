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
      <div className="container max-w-11/12 mx-auto -mt-[370px] absolute left-20">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className="w-full text-center whitespace-nowrap transition-transform duration-1000 ease-in-out " style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}  >
          {loading ? (
            <Loading />
          ) : (
            animeList.map((items) => (
            <div key={`${items.mal_id}-${uuid()}`} className="py-4 rounded-sm inline-block mr-6 transition-all duration-300 ease-in ">
              <div className="w-[265px] h-[425px] ">
                <img src={items.images.jpg.image_url} alt="image" className="block w-full h-full mx-auto rounded-sm object-cover" />
              </div>
              <p className="line-clamp-1 w-[260px] text-white whitespace-normal">
                {items.title}
              </p>
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
