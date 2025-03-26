import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(1);

  return (
    <div
      style={{
        background:
          imageIndex === 1 ? `url(${assets.solo})` : `url(${assets.rezero})`,
        backgroundPosition: imageIndex === 1 ? "left 30%" : "",
      }}
      className={`h-[900px] flex justify-center items-center scale-[1]`}
    >
      <div className=" w-full h-full text-9xl bg-gradient-to-r from-black to-transparent ">
        <div>
          <img
            src={imageIndex === 1 ? assets.qwerty : assets.retext}
            alt="solotext"
            className="mt-[150px] ml-[50px] w-[450px] "
          />
        </div>
        <div className="max-w-xl ml-15">
          <p className="text-sm text-[#9b9ba0] my-2">
            <span className="text-white inline-block px-[5px] bg-[#34373e] -skew-x-12">
              16+
            </span>{" "}
            • Sub | Dub • Action, Adventure, Fantasy
          </p>
          {imageIndex === 1 ? (
            <p className="text-base text-white text-justify">
              They say whatever doesn’t kill you makes you stronger, but that’s
              not the case for the world’s weakest hunter Sung Jinwoo. After
              being brutally slaughtered by monsters in a high-ranking dungeon,
              Jinwoo came back with the System, a program only he could see,
              that’s leveling him up in every way. Now, he’s...
            </p>
          ) : (
            <p className="text-base text-white text-justify">
              Natsuki Subaru, an ordinary high school student, is on his way
              home from the convenience store when he finds himself transported
              to another world. As he's lost and confused in a new world where
              he doesn't even know left from right, the only person to reach out
              to him was a beautiful girl with silver hair.
            </p>
          )}
          <button className="text-[16px] cursor-pointer py-1 px-2 flex items-center gap-3 mt-8 bg-[#ff640a] font-bold tracking-wide hover:bg-[#ff7b2e] transition-all">
            <img className="w-4" src={assets.caret_right} alt="caret right" />
            START WATCHING
          </button>
          <div className="flex gap-2 h-[80px] items-end">
            <button
              onClick={() => setImageIndex(1)}
              className="w-8 h-2 cursor-pointer bg-[#9b9ba0] hover:bg-[#b34607] rounded-sm"
            ></button>
            <button
              onClick={() => setImageIndex(2)}
              className="w-8 h-2 cursor-pointer bg-[#9b9ba0] hover:bg-[#b34607] rounded-sm"
            ></button>
            <button className="w-8 h-2 cursor-pointer bg-[#9b9ba0] hover:bg-[#b34607] rounded-sm"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
