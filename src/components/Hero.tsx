import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { backgrounds, icons } from '@/assets/images'
import { useMultipleAnimeApi } from '@/hooks/useMultipleAnimeApi';

const Hero: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(1);
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const { animes } = useMultipleAnimeApi([58567, 31240, 35507])


  const getBackgroundImage = () => {
    if (window.innerWidth < 768 && imageIndex === 1) {
      return `${backgrounds.solo}`
    } else if (window.innerWidth < 768 && imageIndex === 2) {
      return `${backgrounds.rezeromobile}`
    } else if (window.innerWidth > 768 && imageIndex === 1) {
      return `${backgrounds.solomobile}`
    } else if (window.innerWidth > 768 && imageIndex === 2) {
      return `${backgrounds.rezero}`
    } else if (imageIndex === 3) {
      return `${backgrounds.cotemobile}`
    }
  };

  const handleResize = () => {
    setBackgroundImage(getBackgroundImage() as string)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 3 ? 1 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function extractAge(rating: string | undefined) {
    if (!rating) return "N/A";
    // ตัวอย่าง: "PG-13 - Teens 13 or older"
    const match = rating.match(/(\d{1,2})\s*\+/) // ตรงกับ "13+" "17+" ฯลฯ
      || rating.match(/(\d{1,2})\s*or older/)   // ตรงกับ "13 or older"
      || rating.match(/(\d{1,2})\s*\+/)         // ตรงกับ "13+"
      || rating.match(/(\d{1,2})/)              // ตรงกับ "13" "17" เฉยๆ
    ;
    if (match) {
      return `${match[1]}+`;
    }
    // กรณีพิเศษ
    if (rating.includes("All Ages")) return "ทุกวัย";
    if (rating.includes("G")) return "ทุกวัย";
    return "N/A";
  }

  return (
    <main
      className={`mx-auto w-4/4 lg:w-full h-full flex justify-center items-center transition-all ease duration-400 
        ${imageIndex === 1 && `bg-[left_20%_top]`} ${imageIndex === 3 && `bg-[left_45%_top]`} lg:bg-top bg-cover bg-no-repeat`}
      style={{ backgroundImage: `url('${getBackgroundImage()}')`, }}
    >
      <div className="w-full h-full text-9xl double-gradient lg:pt-70">
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start container max-w-11/12 mx-auto">
          <div className="w-4/7 md:w-3/7 lg:w-2/7 h-full mt-[330px] md:mt-20 lg:mt-0 mb-5 lg:mb-10 ">
            {imageIndex === 1 ? (
              <img src={backgrounds.qwerty} alt="Sololeveling text" className='inline-block w-full h-full' decoding='async' loading='lazy' />
            ) : imageIndex === 2 ? (
              <img src={backgrounds.retext} className="inline-block w-full h-full mt-10" alt="Rezero text" decoding='async' loading='lazy' />
            ) : (
              <img className=" inline-block w-full h-full mt-30" src={backgrounds.cote_text} alt="Cote text" decoding='async' loading='lazy' />
            )}
          </div>
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center md:items-start md:justify-start">
            <p className="text-sm text-[#9b9ba0] w-full h-full ">
              <span className="text-white inline-block px-[5px] bg-[#34373e] -skew-x-12 mb-3 lg:mb-5">
                {imageIndex === 1 ? extractAge(animes?.[58567]?.rating) : imageIndex === 2 ? extractAge(animes?.[31240]?.rating) : extractAge(animes?.[35507]?.rating)}
              </span>{" • Sub | Dub • "}
              {imageIndex === 1 ? (
                animes?.[58567]?.genres?.map((genre) => genre.name).join(' ,')
              ) : imageIndex === 2 ? (
                animes?.[31240]?.genres?.map((genre) => genre.name).join(' ,')
              ) : (
                animes?.[35507]?.genres?.map((genre) => genre.name).join(' ,')
              )}
            </p>
            <div className="hidden lg:block h-[97px]">
              {imageIndex === 1 ? (
                <p className="text-base text-white text-justify line-clamp-4">
                  {animes?.[58567]?.synopsis}
                </p>
              ) : imageIndex === 2 ? (
                <p className="text-base text-white text-justify line-clamp-4">
                  {animes?.[31240]?.synopsis}
                </p>
              ) : (
                <p className="text-base text-white text-justify line-clamp-4">
                  {animes?.[35507]?.synopsis}
                </p>
              )}
            </div>
            <div className='w-full min-w-[200px] md:max-w-[200px] md:w-2/5 text-black text-[16px] cursor-pointer py-1 pr-5 pl-2 mt-4 font-bold tracking-wide bg-[#ff640a] hover:bg-[#ff7b2e] transition-all'>
              <Link to={`/watch/58567`} className="w-full h-full flex justify-center items-center gap-1 cursor-pointer">
                <img
                  className="w-8 h-8 "
                  src={icons.caret_right}
                  alt="caret right"
                />
                <p className='text-black text-sm'>START WATCHING</p>
              </Link>
            </div>
            <div className="flex gap-2 h-full items-end mt-8 lg:mt-15">
              <button
                type='button'
                onClick={() => setImageIndex(1)}
                className={`btn-style transition-all duration-400  ${imageIndex === 1 ? "bg-orange-400 w-12" : ""
                  }`}
                aria-label="Show Solo Leveling"
              ></button>
              <button
                type='button'
                onClick={() => setImageIndex(2)}
                className={`btn-style transition-all duration-400  ${imageIndex === 2 ? "bg-orange-400 w-12" : ""
                  }`}
                aria-label="Show Re:Zero"
              ></button>
              <button
                type='button'
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
