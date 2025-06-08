import { useAnimeApi } from '@/hooks/useAnimeApi'
import { useAnimeNewsApi } from '@/hooks/useAnimeNewsApi'
import { useMultipleApi } from '@/hooks/useMultipleApi'
import { formatSiUnit } from 'format-si-unit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL } from '@/constants/api'
import { json } from 'stream/consumers'

const Details = () => {
  const { id } = useParams()
  const { animeList } = useAnimeApi(id as string)
  const [activeTab, setActiveTab] = useState('overview')
  const [showVideo, setShowVideo] = useState(false)
  const { animeNews } = useAnimeNewsApi(id as string)
  const episodeUrl = `/anime/${id}/episodes`
  const { data, errorMessage } = useMultipleApi(BASE_URL, episodeUrl)

  console.log(data)

  const handleYear = (year: string) => {
    const regex = /\b\d{4}\b/
    const result = year.match(regex)
    return result
  }

  const handleMonth = (month: string) => {
    const allMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const regex = /\b\d{2}\b/
    const monthResult = month.match(regex)?.toString()

    if (monthResult) {
      const monthIndex = Number(monthResult) - 1
      const monthName = allMonth[monthIndex]
      return monthName
    }
    return 'Unknown Month'
  }

  const handleDay = (day: string) => {
    const result = day.match(/-(\d{2})T/)
    return result ? result[1] : 'Unknow'
  }

  const handleChange = () => {
    setShowVideo(activeTab === 'overview')
  }

  useEffect(() => {
    handleChange()
  }, [activeTab])

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {animeList ? (
          animeList.map(
            ({
              mal_id,
              images,
              title_english,
              duration,
              status,
              genres,
              score,
              scored_by,
              year,
              season,
              rating,
              synopsis,
              aired,
              episodes,
              members,
              rank,
              favorites,
              studios,
              producers,
              themes,
              demographics,
              trailer,
            }) => (
              <div key={mal_id}>
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="relative">
                    <div className="sticky top-8 flex flex-col gap-4">
                      <div className="group shadow-lg: relative overflow-hidden rounded-lg">
                        <img
                          src={images.webp.large_image_url}
                          alt={title_english}
                          className="h-auto w-full object-cover"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 md:col-span-2">
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold">{title_english}</h1>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="hover:bg-secondary/80 flex items-center gap-1 rounded-full border border-transparent bg-[#1e293b] px-2 py-1 text-xs font-semibold text-[#f8fafc] transition-colors focus:ring-2 focus:outline-none">
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
                            className="lucide lucide-star h-3 w-3 fill-yellow-500 text-yellow-500"
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                          </svg>
                          <span className="font-bold">
                            {score ? score : 'N/A'}
                          </span>
                          <span className="text-xs text-[#94a3b8]">{`(${formatSiUnit(scored_by ? scored_by : 0)})`}</span>
                        </div>
                        <div className="focus:ring-ring text-foreground inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                          {rating ? rating : 'N/A'}
                        </div>
                        <div className="focus:ring-ring inline-flex items-center rounded-full border bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none dark:bg-blue-900 dark:text-blue-300">
                          {status ? status : 'N/A'}
                        </div>
                        <div className="focus:ring-ring text-foreground inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold capitalize transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">{`${season ? season : 'N/A'} ${year ? year : 'N/A'}`}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{synopsis}</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-calendar text-primary h-5 w-5"
                          >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Aired</h3>
                            <p className="text-muted-foreground text-sm">
                              {aired.string}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-clock text-primary h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Duration</h3>
                            <p className="text-muted-foreground text-sm">
                              {duration}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-play text-primary h-5 w-5"
                          >
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Episodes</h3>
                            <p className="text-muted-foreground text-sm">
                              {episodes}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-users text-primary h-5 w-5"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Members</h3>
                            <p className="text-muted-foreground text-sm">{`${formatSiUnit(members ? members : 0)}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-award text-primary h-5 w-5"
                          >
                            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                            <circle cx="12" cy="8" r="6"></circle>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Rank</h3>
                            <p className="text-muted-foreground text-sm">{`#${rank}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 p-4">
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
                            className="lucide lucide-heart text-primary h-5 w-5"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                          </svg>
                          <div>
                            <h3 className="text-sm font-medium">Favorites</h3>
                            <p className="text-muted-foreground text-sm">{`${formatSiUnit(favorites ? favorites : 0)}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Studios</h3>
                      <div className="flex flex-wrap gap-2">
                        {studios.map((studio) => (
                          <button
                            key={studio.mal_id}
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-full border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp_svg]:pointer-events-none [&amp_svg_svg]:size-4 [&amp_svg_svg]:shrink-0"
                          >
                            {studio.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Producers</h3>
                      <div className="flex flex-wrap gap-2">
                        {producers.map((producer) => (
                          <button
                            type="button"
                            key={producer.mal_id}
                            className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-full border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp_svg]:pointer-events-none [&amp_svg_svg]:size-4 [&amp_svg_svg]:shrink-0"
                          >
                            {producer.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 flex items-center gap-1.5 font-semibold">
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
                            className="lucide lucide-tag h-4 w-4"
                          >
                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                            <circle
                              cx="7.5"
                              cy="7.5"
                              r=".5"
                              fill="currentColor"
                            ></circle>
                          </svg>
                          Genres
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {genres.map((genre) => (
                            <div
                              key={genre.mal_id}
                              className="inline-flex cursor-pointer items-center rounded-full border bg-[#f6a53b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#f6a53b] transition-colors hover:bg-[#f6a53b]/20 focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2 focus:outline-none"
                            >
                              {genre.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 flex items-center gap-1.5 font-semibold">
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
                            className="lucide lucide-bookmark h-4 w-4"
                          >
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                          </svg>
                          Themes
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {themes.map((theme) => (
                            <div
                              key={theme.mal_id}
                              className="inline-flex cursor-pointer items-center rounded-full border bg-[#f6a53b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#f6a53b] transition-colors hover:bg-[#f6a53b]/20 focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2 focus:outline-none"
                            >
                              {theme.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 flex items-center gap-1.5 font-semibold">
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
                            className="lucide lucide-users h-4 w-4"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          Demographics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {demographics.map((demographic) => (
                            <div
                              key={demographic.mal_id}
                              className="inline-flex cursor-pointer items-center rounded-full border bg-[#f6a53b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#f6a53b] transition-colors hover:bg-[#f6a53b]/20 focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2 focus:outline-none"
                            >
                              {demographic.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  dir="ltr"
                  data-orientation="horizontal"
                  className="mb-12 w-full space-y-8"
                >
                  <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="text-muted-foreground mb-6 grid h-10 w-full grid-cols-2 items-center justify-center rounded-md bg-[#1e293b] p-1 outline-0 md:grid-cols-4"
                    tabIndex={0}
                    data-orientation="horizontal"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected="true"
                      aria-controls="overview"
                      onClick={() => setActiveTab('overview')}
                      className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap focus:bg-[#020817]"
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
                        className="lucide lucide-info mr-2 h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Overview
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="episodes"
                      onClick={() => setActiveTab('episodes')}
                      className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap focus:bg-[#020817]"
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
                        className="lucide lucide-list mr-2 h-4 w-4"
                      >
                        <path d="M3 12h.01"></path>
                        <path d="M3 18h.01"></path>
                        <path d="M3 6h.01"></path>
                        <path d="M8 12h13"></path>
                        <path d="M8 18h13"></path>
                        <path d="M8 6h13"></path>
                      </svg>
                      Episodes
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="characters"
                      onClick={() => setActiveTab('characters')}
                      className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap focus:bg-[#020817]"
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
                        className="lucide lucide-users mr-2 h-4 w-4"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Characters
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="true"
                      aria-controls="related"
                      onClick={() => setActiveTab('related')}
                      className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap focus:bg-[#020817]"
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
                        className="lucide lucide-tag mr-2 h-4 w-4"
                      >
                        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </svg>
                      Related
                    </button>
                  </div>
                  <div
                    data-state="active"
                    data-orientation="horizontal"
                    className={`w-full space-y-8 ${activeTab === 'overview' ? '' : 'hidden'}`}
                  >
                    <div>
                      <h2 className="mb-4 flex items-center text-2xl font-bold">
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
                          className="lucide lucide-play mr-2 h-5 w-5"
                        >
                          <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>
                        Trailer
                      </h2>
                      <div>
                        {showVideo && trailer.embed_url ? (
                          <iframe
                            title="trailer"
                            width="100%"
                            height="auto"
                            src={trailer.embed_url}
                            className="mx-auto aspect-video lg:max-w-7/12"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          'Trailer not avaliable'
                        )}
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-4 flex items-center text-2xl font-bold">
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
                          className="lucide lucide-info mr-2 h-5 w-5"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                        News
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        {animeNews &&
                          animeNews.slice(0, 5).map((item) => (
                            <div key={`mal_id_${uuidv4()}`}>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-lg border p-4 transition-all hover:shadow-md"
                              >
                                <h3 className="mb-2 text-lg font-bold">
                                  {item.title}
                                </h3>
                                <div className="text-muted-foreground flex justify-between text-sm">
                                  <span>
                                    {handleMonth(item.date)}{' '}
                                    {handleYear(item.date)}
                                  </span>
                                  <span>
                                    {item.author_username
                                      ? ` by ${item.author_username}`
                                      : ''}
                                  </span>
                                </div>
                                <p className="text-muted-foreground mt-2 line-clamp-2">
                                  {item.excerpt}
                                </p>
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    data-state="inactive"
                    data-orientation="horizontal"
                    className={`w-full ${activeTab === 'episodes' ? '' : 'hidden'}`}
                  >
                    <h3 className="mb-6 flex items-center text-2xl font-bold">
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
                        className="lucide lucide-list mr-2 h-4 w-4"
                      >
                        <path d="M3 12h.01"></path>
                        <path d="M3 18h.01"></path>
                        <path d="M3 6h.01"></path>
                        <path d="M8 12h13"></path>
                        <path d="M8 18h13"></path>
                        <path d="M8 6h13"></path>
                      </svg>
                      Episodes
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {data &&
                        data.map((item) => (
                          <div
                            key={item.mal_id + uuidv4()}
                            className='className="bg-card text-card-foreground hover:showdow-md transition-all" cursor-pointer overflow-hidden rounded-lg border shadow-sm'
                          >
                            <div className="p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="inline-flex items-center rounded-full border border-[#94a3b8] px-2.5 py-0.5 text-xs font-semibold transition-colors">
                                  EP {item.mal_id}
                                </div>
                                <div className="flex gap-1"></div>
                              </div>
                              <h3 className="mb-2 line-clamp-2 text-sm font-bold">
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground flex items-center text-xs">
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
                                  className="lucide lucide-calendar mr-1 h-3 w-3"
                                >
                                  <path d="M8 2v4"></path>
                                  <path d="M16 2v4"></path>
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                  ></rect>
                                  <path d="M3 10h18"></path>
                                </svg>
                                {`${handleMonth(item.aired.toString())} ${handleDay(item.aired.toString())}, ${handleYear(item.aired.toString())}`}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    data-state="inactive"
                    data-orientation="horizontal"
                    className={`w-full ${activeTab === 'characters' ? '' : 'hidden'}`}
                  >
                    Characters
                  </div>
                  <div
                    data-state="inactive"
                    data-orientation="horizontal"
                    className={`w-full ${activeTab === 'related' ? '' : 'hidden'}`}
                  >
                    Related
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div>{errorMessage}</div>
        )}
      </div>
    </main>
  )
}

export default Details
