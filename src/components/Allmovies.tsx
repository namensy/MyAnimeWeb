import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { SearchProps } from "../types";

interface AnimeItems  {
  mal_id: boolean
  images: {
    jpg: {
      image_url: string
    }
  }
  title: string
}

const Allmovies: React.FC<SearchProps> = ({ searchTerm }) => {
  const [animeList, setAnimeList] = useState<AnimeItems[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [debouncedText] = useDebounce(searchTerm, 300);


  const getMovieApi = async () => {
    try {
      const endpoint = await axios.get(
        debouncedText 
        ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}`
        : 'https://api.jikan.moe/v4/top/anime'
        );
      const {data: {data}} = endpoint
      setAnimeList(data)      
    } catch (error) {
      // alert('Error fetching the anime data')
      console.log('Error', error);
    }
  };

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

  useEffect(() => {
    getMovieApi();
  }, [debouncedText])

  return (
    <section >
      <div className={`absolute left-0 bottom-0 w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleLeftClick}>
        <img src={assets.back} alt="Back arrow" />
      </div>
      <div className={`absolute right-0 bottom-0 w-12 cursor-pointer z-10 py-37.5 px-3 bg-gradient-to-r from-[#0000002c] from-70% to-transparent ${currentIndex === 18 ? 'hidden' : ''}`} onClick={handleRightClick}>
        <img src={assets.next} alt="Right arrow" />
      </div>
      <div className="container max-w-11/12 mx-auto -mt-[400px] absolute left-20">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className="">
          <div className="w-full text-center whitespace-nowrap transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100/6)}%)` }}  >
            {animeList && animeList.map((items) => (
              <div key={`${items.mal_id}-${uuid()}`} className="py-4 rounded-sm inline-block mr-6 transition-all duration-300 ease-in" >
                <div className="w-[260px] h-[325px] ">
                  <img src={items.images.jpg.image_url} alt="image" className="block w-full h-full mx-auto rounded-sm" />
                  </div>
                <p className="line-clamp-1 w-[260px] text-black whitespace-normal">
                {items.title}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Allmovies;
