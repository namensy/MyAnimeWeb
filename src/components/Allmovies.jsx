import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";

const Allmovies = () => {
  const [animeList, setAnimeList] = useState([])
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

  useEffect(() => {
    getMovieApi();
  }, [])

  return (
    <div className="container max-w-11/12 mx-auto -mt-[400px] absolute left-20   ">
      <h1 className=" text-3xl font-bold tracking-wide">Anime Watchlist</h1>
      <p className="text-[#9d9d9d]">Unwind this weekend with your top anime picks</p>
      <div className="w-full text-center whitespace-nowrap">
        <div className="absolute -left-17"><img src={assets.back} alt="Back arrow" className="" /></div>
        <div><img src={assets.next} alt="Right arrow" /></div>
        {animeList && animeList.map((items) => (
          <div key={items.mal_id} className="py-4 rounded-sm inline-block space-x-9">
            <div>
              <img src={items.images.jpg.image_url} alt="image" className="block mx-auto w-[260px] h-[325px] rounded-sm" />
              </div>
            <p>
            {items.title}
              </p></div>
        ))}
      </div>
    </div>
  );
};

export default Allmovies;
