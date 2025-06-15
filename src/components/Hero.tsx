import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { backgrounds } from '@/assets/images'
import { useMultipleAnimeApi } from '@/hooks/useMultipleAnimeApi'

const Hero: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(1)
  const [backgroundImage, setBackgroundImage] = useState<string>()

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
  }

  const handleResize = () => {
    setBackgroundImage(getBackgroundImage() ?? '')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 3 ? 1 : prev + 1))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  function extractAge(rating: string | undefined) {
    if (!rating) return 'N/A'
    const match =
      rating.match(/(\d{1,2})\s*\+/) ||
      rating.match(/(\d{1,2})\s*or older/) ||
      rating.match(/(\d{1,2})\s*\+/) ||
      rating.match(/(\d{1,2})/)
    if (match) {
      return `${match[1]}+`
    }
    if (rating.includes('All Ages')) return 'ทุกวัย'
    if (rating.includes('G')) return 'ทุกวัย'
    return 'N/A'
  }

  const animeIdMap: Record<number, number> = {
    1: 58567,
    2: 31240,
    3: 35507,
  }

  const animeBgMap: Record<number, string> = {
    1: backgrounds.qwerty,
    2: backgrounds.retext,
    3: backgrounds.cote_text,
  }

  const animesId = animeIdMap[imageIndex] || 35507
  const animesBg = animeBgMap[imageIndex]

  return (
    <main
      className={`ease mx-auto flex h-full w-4/4 items-center justify-center transition-all duration-400 lg:w-full ${imageIndex === 1 && `bg-[left_20%_top]`} ${imageIndex === 3 && `bg-[left_45%_top]`} bg-cover bg-no-repeat lg:bg-top`}
      style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
    >
      <div className="double-gradient h-full w-full text-9xl lg:pt-70">
        <div className="container mx-auto flex max-w-11/12 flex-col items-center justify-center md:items-start md:justify-start">
          <div className="mt-[330px] mb-5 h-full w-4/7 md:mt-20 md:w-3/7 lg:mt-0 lg:mb-10 lg:w-2/7">
            <div className="h-[200px]">
              <img
                src={animesBg}
                alt={animesBg}
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center md:w-2/5 md:items-start md:justify-start">
            <p className="h-full w-full text-sm text-[#9b9ba0]">
              <span className="mb-3 inline-block -skew-x-12 bg-[#34373e] px-[5px] text-white lg:mb-5">
                {extractAge(animes?.[animesId]?.rating)}
              </span>
              {' • Sub | Dub • '}
              {animes?.[animesId]?.genres
                ?.map((genre) => genre.name)
                .join(' ,')}
            </p>
            <div className="hidden h-[97px] lg:block">
              <p className="line-clamp-4 text-justify text-base text-white">
                {animes?.[animesId]?.synopsis}
              </p>
            </div>
            <div className="mt-4 w-full min-w-[200px] cursor-pointer bg-[#ff640a] py-1 pr-5 pl-2 text-[16px] font-bold tracking-wide text-black transition-all hover:bg-[#ff7b2e] md:w-2/5 md:max-w-[200px]">
              <Link
                to={`/watch/${animesId}`}
                className="flex h-full w-full cursor-pointer items-center justify-center gap-1 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play mr-2 h-5 w-5 text-xl text-black"
                >
                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                </svg>
                <p className="text-sm text-black">START WATCHING</p>
              </Link>
            </div>
            <div className="mt-8 flex h-full items-end gap-2 lg:mt-15">
              <button
                type="button"
                onClick={() => setImageIndex(1)}
                className={`btn-style transition-all duration-400 ${
                  imageIndex === 1 ? 'w-12 bg-orange-400' : ''
                }`}
                aria-label="Show Solo Leveling"
              ></button>
              <button
                type="button"
                onClick={() => setImageIndex(2)}
                className={`btn-style transition-all duration-400 ${
                  imageIndex === 2 ? 'w-12 bg-orange-400' : ''
                }`}
                aria-label="Show Re:Zero"
              ></button>
              <button
                type="button"
                onClick={() => setImageIndex(3)}
                className={`btn-style transition-all duration-400 ${
                  imageIndex === 3 ? 'w-12 bg-orange-400' : ''
                }`}
                aria-label="Show Classroom of the Elite"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
