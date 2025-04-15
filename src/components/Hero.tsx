import { assets } from '@/assets/assets'
import { useState, useEffect } from 'react'


const Hero: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const getBackgroundImage = () => {
    if (imageIndex === 1) return `${assets.solo}`;
    if (imageIndex === 2) return `${assets.rezero}`;
    return `${assets.cote}`;
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 3 ? 1 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
      className={`h-[1200px] flex justify-center items-center scale-[1] transition-all ease duration-400 bg-center bg-cover bg-no-repeat`}
    >
      <div className=" w-full h-full text-9xl double-gradient">
        <div className="container max-w-11/12 mx-auto">
          <div className="w-[400px] h-[250px] mt-[150px] ">
            {imageIndex === 1 ? (
              <img src={assets.qwerty} alt="Sololeveling text" />
            ) : imageIndex === 2 ? (
              <img src={assets.retext} className="inline-block mt-10" alt="Rezero text" />
            ) : (
              <img className=" inline-block mt-30" src={assets.cote_text} alt="Cote text" />
            )}
          </div>
          <div className="max-w-xl ">
            <p className="text-sm text-[#9b9ba0] my-2">
              <span className="text-white inline-block px-[5px] bg-[#34373e] -skew-x-12">
                16+
              </span>{" "}
              • Sub | Dub • Action, Adventure, Fantasy
            </p>
            <div className="h-[97px]">
              {imageIndex === 1 ? (
                <p className="text-base text-white text-justify">
                  They say whatever doesn't kill you makes you stronger, but
                  that's not the case for the world's weakest hunter Sung
                  Jinwoo. After being brutally slaughtered by monsters in a
                  high-ranking dungeon, Jinwoo came back with the System, a
                  program only he could see, that’s leveling him up in every
                  way. Now, he’s...
                </p>
              ) : imageIndex === 2 ? (
                <p className="text-base text-white text-justify">
                  Natsuki Subaru, an ordinary high school student, is on his way
                  home from the convenience store when he finds himself
                  transported to another world. As he's lost and confused in a
                  new world where he doesn't even know left from right, the only
                  person to reach out to him was a beautiful girl with silver
                  hair.
                </p>
              ) : (
                <p className="text-base text-white text-justify">
                  Kiyotaka Ayanokoji has just enrolled at Tokyo Koudo Ikusei
                  Senior High School, where it's said that 100% of students go
                  on to college or find employment. But he ends up in Class 1-D,
                  which is full of all the school's problem children.
                </p>
              )}
            </div>
            <button className="text-[16px] cursor-pointer py-1 pr-5 pl-2 flex items-center gap-1 mt-8 bg-[#ff640a] font-bold tracking-wide hover:bg-[#ff7b2e] transition-all">
              <img
                className="w-8 h-8 "
                src={assets.caret_right}
                alt="caret right"
              />
              START WATCHING
            </button>
            <div className="flex gap-2 h-[80px] items-end">
              <button
                onClick={() => setImageIndex(1)}
                className={`btn-style transition-all duration-400  ${imageIndex === 1 ? "bg-orange-400 w-12" : ""
                  }`}
                aria-label="Show Solo Leveling"
              ></button>
              <button
                onClick={() => setImageIndex(2)}
                className={`btn-style transition-all duration-400  ${imageIndex === 2 ? "bg-orange-400 w-12" : ""
                  }`}
                aria-label="Show Re:Zero"
              ></button>
              <button
                onClick={() => setImageIndex(3)}
                className={`btn-style transition-all duration-400  ${imageIndex === 3 ? "bg-orange-400 w-12" : ""
                  }`}
                aria-label="Show Classroom of the Elite"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
