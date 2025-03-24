import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    // ต้องการ Adjust image-postion โดยใช้ Tailwindcss
      <div
        style={{
          background: `url(${assets.solo})`,
          backgroundPosition: "left 30%",
        }}
        className=" h-[900px] flex justify-center items-center scale-[1] "
      >
        <div className=" w-full h-full text-9xl bg-gradient-to-r from-black to-transparen ">
          <div>
            <img
              src={assets.qwerty}
              alt="solotext"
              className="mt-[150px] ml-[50px] w-[450px] "
            />
          </div>
          <div className="max-w-md ml-15">
            <p className="text-sm text-[#9b9ba0] my-2">
              16+ • Sub | Dub • Action, Adventure, Fantasy
            </p>
            <p className="text-sm text-white">
              They say whatever doesn’t kill you makes you stronger, but that’s
              not the case for the world’s weakest hunter Sung Jinwoo. After being
              brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo
              came back with the System, a program only he could see, that’s
              leveling him up in every way. Now, he’s...
            </p>
            <button className="text-sm cursor-pointer py-1 px-2 flex items-center gap-3 mt-5 bg-[#ff640a] font-bold tracking-wide hover:bg-[#ff7b2e] transition-all">
              <img className="w-4" src={assets.caret_right} alt="caret right" />
              START WATCHING
            </button>
          </div>
        </div>
      </div>

  );
};

export default Hero;
