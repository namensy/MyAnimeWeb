import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";

const Allmovies = () => {
  const [animeList, setAnimeList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const getMovieApi = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/anime");
      const {data: {data}} = response
      setAnimeList(data)
    } catch (error) {
      // alert('Error fetching the anime data')
      console.log('Error =>', error);
    }
  };

  const handleRightClick = () => {
    if (currentIndex + 6 < animeList.length) {
      setCurrentIndex(currentIndex + 6)
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
  }, [])

  return (
    <div>
      <div className={`absolute left-2 bottom-32 w-12 cursor-pointer ${currentIndex == 0 ? 'hidden' : ''}`} onClick={handleLeftClick}><img src={assets.back} alt="Back arrow" /></div>
      <div className={`absolute right-2 bottom-32 w-12 cursor-pointer ${currentIndex == 24 ? 'hidden' : ''}`} onClick={handleRightClick}><img src={assets.next} alt="Right arrow" /></div>
      <div className="container max-w-11/12 mx-auto -mt-[400px] absolute left-20 overflow-hidden  ">
        <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
        <div className="w-full text-center whitespace-nowrap ">
          {animeList && animeList.slice(currentIndex, currentIndex + 6).map((items) => (
            <div key={items.mal_id} className="py-4 rounded-sm inline-block space-x-9 transition-all duration-300 ease-in ">
              <div>
                <img src={items.images.jpg.image_url} alt="image" className="block mx-auto w-[260px] h-[325px] rounded-sm" />
                </div>
              <p>
              {items.title}
                </p></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allmovies;
