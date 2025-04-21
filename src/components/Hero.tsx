import { assets } from '@/assets/assets'
import { useState, useEffect } from 'react'


const Hero: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const getBackgroundImage = () => {
    if (window.innerWidth < 768 && imageIndex === 1) return `${assets.solomobile}`;
    if (window.innerWidth < 768 && imageIndex === 2) return `${assets.rezeromobile}`;
    if (window.innerWidth < 768 && imageIndex === 3) return `${assets.cotemobile}`;
    if (window.innerWidth > 768 && imageIndex === 1) return `${assets.solo}`;
    if (window.innerWidth > 768 && imageIndex === 2) return `${assets.rezero}`;
    if (window.innerWidth > 768 && imageIndex === 3) return `${assets.cote}`;
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
      className={` h-full flex justify-center items-center scale-[1] transition-all ease duration-400 lg:bg-cover bg-no-repeat`}
    >
      <div className=" w-full h-full text-9xl lg:mobile-gradient double-gradient">
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start container max-w-11/12 mx-auto">
          <div className="w-4/7 md:w-3/7 lg:w-2/7 h-full mt-[330px] lg:mt-[70px] mb-5 lg:mb-10 ">
            {imageIndex === 1 ? (
              <img src={assets.qwerty} alt="Sololeveling text" className='inline-block w-full h-full' />
            ) : imageIndex === 2 ? (
              <img src={assets.retext} className="inline-block w-full h-full mt-10" alt="Rezero text" />
            ) : (
              <img className=" inline-block w-full h-full mt-30" src={assets.cote_text} alt="Cote text" />
            )}
          </div>
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center md:items-start md:justify-start">
            <p className="text-sm text-[#9b9ba0] ">
              <span className="text-white inline-block px-[5px] bg-[#34373e] -skew-x-12">
                16+
              </span>{" "}
              • Sub | Dub • Action, Adventure, Fantasy
            </p>
            <div className="hidden lg:block h-[97px]">
              {imageIndex === 1 ? (
                <p className="text-base text-white text-justify line-clamp-4">
                  They say whatever doesn't kill you makes you stronger, but
                  that's not the case for the world's weakest hunter Sung
                  Jinwoo. After being brutally slaughtered by monsters in a
                  high-ranking dungeon, Jinwoo came back with the System, a
                  program only he could see, that's leveling him up in every
                  way. Now, he's...
                </p>
              ) : imageIndex === 2 ? (
                <p className="text-base text-white text-justify line-clamp-4">
                  Natsuki Subaru, an ordinary high school student, is on his way
                  home from the convenience store when he finds himself
                  transported to another world. As he's lost and confused in a
                  new world where he doesn't even know left from right, the only
                  person to reach out to him was a beautiful girl with silver
                  hair.
                </p>
              ) : (
                <p className="text-base text-white text-justify line-clamp-4">
                  Kiyotaka Ayanokoji has just enrolled at Tokyo Koudo Ikusei
                  Senior High School, where it's said that 100% of students go
                  on to college or find employment. But he ends up in Class 1-D,
                  which is full of all the school's problem children.
                </p>
              )}
            </div>
            <div className='w-full min-w-[200px] md:max-w-[200px] md:w-2/5 text-black text-[16px] cursor-pointer py-1 pr-5 pl-2 mt-4 font-bold tracking-wide bg-[#ff640a] hover:bg-[#ff7b2e] transition-all'>
              <button className="w-full h-full flex justify-center items-center gap-1 cursor-pointer">
                <img
                  className="w-8 h-8 "
                  src={assets.caret_right}
                  alt="caret right"
                />
                <p className='text-black text-sm'>START WATCHING</p>
              </button>
            </div>
            <div className="flex gap-2 h-full items-end mt-8 lg:mt-15">
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
