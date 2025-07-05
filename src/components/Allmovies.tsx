import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'
import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAppContext } from '@/context/AppContext'
import { formatSiUnit } from 'format-si-unit'
import Loading from '@/components/Loading'
import { Link } from 'react-router-dom'

const Allmovies = () => {
  const { searchTerm, loading, addBookmark } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windows, setWindows] = useState(0)
  const itemsPerPage = 6
  const cardWidth = 250 // px
  const { animeList } = useAnimeApi(searchTerm)

  const configObject = [
    { breakpoint: 640, step: 1.6, maxItemPage: 14 },
    { breakpoint: 768, step: 1.8, maxItemPage: 14 },
    { breakpoint: 1024, step: 3.47, maxItemPage: 15 },
    { breakpoint: 1280, step: 4, maxItemPage: 9 },
    { breakpoint: 1536, step: 5, maxItemPage: 10 },
  ]

  const handleRightClick = () => {
    // 25 - 6 = 19 // 0 , 19 = 19

    let stepToUse = 6
    let itemsPerPage = 6

    for (let i = 0; i < configObject.length; i++) {
      if (window.innerWidth <= configObject[i].breakpoint) {
        stepToUse = configObject[i].step
        itemsPerPage = configObject[i].maxItemPage
        console.log('maxItemPage', configObject[i].maxItemPage)
        break
      }
    }

    const maxIndex = Math.max(0, animeList.length - itemsPerPage)
    if (currentIndex >= maxIndex) return

    console.log('itemsPerPage =>', itemsPerPage)

    // เราจำเป็นต้องใช้ min หรอ
    const newIndex = Math.min(currentIndex + stepToUse, maxIndex)
    setCurrentIndex(newIndex)

    // if (currentIndex < maxIndex) {
    //   if (window.innerWidth <= (element.md as number)) {
    //     if (currentIndex >= animeList.length - 14) {
    //       setCurrentIndex(13.5)
    //     } else {
    //       setCurrentIndex(currentIndex + 1.8)
    //     }
    //   } else if (window.innerWidth <= 1024) {
    //     if (currentIndex >= animeList.length - 15) {
    //       setCurrentIndex(14)
    //     } else {
    //       setCurrentIndex(currentIndex + 3.47)
    //     }
    //   } else if (window.innerWidth <= 1280) {
    //     if (currentIndex >= animeList.length - 9) {
    //       setCurrentIndex(16)
    //     } else {
    //       setCurrentIndex(currentIndex + 4)
    //     }
    //   } else if (window.innerWidth >= 1281 && window.innerWidth < 1920) {
    //     if (currentIndex >= animeList.length - 10) {
    //       setCurrentIndex(20)
    //     } else {
    //       setCurrentIndex(currentIndex + 5)
    //     }
    //   } else if (window.innerWidth >= 1920) {
    //     if (currentIndex >= animeList.length) {
    //       setCurrentIndex(maxIndex)
    //     } else {
    //       setCurrentIndex(currentIndex + itemsPerPage)
    //     }
    //   }
    // }
  }

  const handleLeftClick = () => {
    if (currentIndex - itemsPerPage >= 0) {
      if (window.innerWidth <= 768) {
        setCurrentIndex(currentIndex - 2)
      } else if (window.innerWidth <= 1024) {
        setCurrentIndex(currentIndex - 3.3)
      } else if (window.innerWidth <= 1280) {
        setCurrentIndex(currentIndex - 4)
      } else if (window.innerWidth <= 1536) {
        setCurrentIndex(currentIndex - 5)
      } else if (window.innerWidth <= 1920) {
        setCurrentIndex(currentIndex - itemsPerPage)
      }
    } else {
      setCurrentIndex(0)
    }
  }

  const handleResize = () => {
    setWindows(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relativ mt-11 h-[600px] w-full">
      <div
        className={`absolute bottom-232 left-0 z-10 cursor-pointer bg-gradient-to-l from-[#00000088] from-100% to-transparent md:bottom-195 md:py-28 lg:bottom-200 lg:px-3 lg:py-43 ${currentIndex === 0 ? 'hidden' : ''}`}
        onClick={handleLeftClick}
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
          className="lucide lucide-chevron-left size-8 cursor-pointer text-neutral-300"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </div>
      <div
        className={`absolute right-0 bottom-232 z-10 cursor-pointer bg-gradient-to-r from-[#00000088] from-100% to-transparent md:bottom-195 md:py-28 lg:bottom-200 lg:px-3 lg:py-43 ${currentIndex === 18 ? 'hidden' : ''}`}
        onClick={handleRightClick}
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
          className="lucide lucide-chevron-right size-8 cursor-pointer text-neutral-300"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
      <div className="absolute left-4 container mt-15 w-11/12 sm:left-8 lg:left-12 xl:left-16 2xl:left-20">
        <h1 className="text-3xl font-bold tracking-wide">Anime Watchlist</h1>
        <p className="text-[#9d9d9d]">
          Unwind this weekend with your top anime picks
        </p>
        <div className="relative w-screen overflow-hidden">
          <div
            className="grid auto-cols-[145px] grid-flow-col gap-4 transition-transform duration-700 ease-in-out md:auto-cols-[170px] lg:auto-cols-[200px] xl:auto-cols-[250px]"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + 17)}px)`,
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              animeList?.map((items) => (
                <div className="relative mt-5 h-auto w-full rounded-sm">
                  <Link to={`/watch/${items.mal_id}`}>
                    <div
                      key={`${items.mal_id}-${uuid()}`}
                      className="hover:bg-opacity-75 aspect-[2/3] w-full transition-all duration-300 ease-in-out"
                    >
                      <img
                        src={items.images.webp.image_url}
                        alt="image"
                        decoding="async"
                        loading="lazy"
                        className="mx-auto block h-full w-full rounded-sm object-cover"
                      />
                    </div>
                    <p className="mt-2 line-clamp-1 w-full text-sm whitespace-normal text-white">
                      {items.title}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">
                      {items.year ? items.year : 'No-info'}
                    </p>
                    <div className="absolute top-2 right-0 h-full w-full p-1 opacity-0 transition-opacity duration-100 hover:scale-105 hover:bg-[#17161c] hover:opacity-95">
                      <div className="m-2 line-clamp-10 text-sm whitespace-normal text-white select-none md:line-clamp-8 lg:line-clamp-6">
                        <p className="mb-2 text-nowrap">{items.title}</p>
                        <p className="text-[#9d9d9d]">{`${items.score} ★ (${formatSiUnit(items.scored_by)})`}</p>
                        <p className="text-[#9d9d9d]">{`${items.episodes} episodes`}</p>
                        <p className="mt-2 line-clamp-4">{items.synopsis}</p>
                      </div>
                      <div className="absolute bottom-4 left-4 mb-4 flex gap-2">
                        <div className="group relative">
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
                            className="lucide lucide-play mr-2 h-5 w-5 text-xl text-orange-500"
                          >
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                          </svg>
                          <span className="lg:text-default absolute left-2 -translate-x-1/2 -translate-y-4/2 transform rounded bg-[#535364] px-4 py-3 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            Play
                            <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 translate-y-7 rotate-45 transform bg-[#535364] lg:h-4 lg:w-4 lg:translate-y-6" />
                          </span>
                        </div>
                        <div className="group relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              addBookmark(items.mal_id, items.title)
                            }}
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
                              className="lucide lucide-bookmark h-5 w-5 text-xl text-orange-500"
                            >
                              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                            </svg>
                          </button>
                          <span className="lg:text-default absolute left-1/2 -translate-x-1/2 -translate-y-4/2 transform rounded bg-[#535364] px-4 py-3 text-sm text-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            Add to Watchlist
                            <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 translate-y-7 rotate-45 transform bg-[#535364] lg:h-4 lg:w-4 lg:translate-y-6" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="-mt-11 h-full w-full bg-black"></div>
    </section>
  )
}

export default Allmovies
