import { useAnimeApi } from "@/hooks/useAnimeApi";
import { formatSiUnit } from "format-si-unit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const { id } = useParams();
  const { animeList } = useAnimeApi(id as string);
  const [activeTab, setActiveTab] = useState('overview')
  const [showVideo, setShowVideo] = useState(false)

  const handleChange = () => {
    if (activeTab === 'overview') {
      setShowVideo(true)
    } else {
      setShowVideo(false)
    }
  }

  useEffect(() => {
    handleChange()
  }, [activeTab])

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {animeList.map(({ mal_id, images, title_english, duration, status, genres, score, scored_by, year, season, rating, synopsis, aired, episodes, members, rank, favorites, studios, producers, themes, demographics, trailer }) => (
          <div key={mal_id}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="relative">
                <div className="sticky top-8 flex flex-col gap-4">
                  <div className="relative group rounded-lg overflow-hidden shadow-lg:">
                    <img src={images.webp.large_image_url} alt={title_english} className="w-full h-auto object-cover" decoding="async" loading="lazy" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold">{title_english}</h1>
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 border-transparent bg-[#1e293b] text-[#f8fafc] hover:bg-secondary/80 flex items-center gap-1 px-2 py-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                      <span className="font-bold">{score ? score : 'N/A'}</span>
                      <span className="text-xs text-[#94a3b8]">{`(${formatSiUnit(scored_by ? scored_by : 0)})`}</span>
                    </div>
                    <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-1">{rating ? rating : 'N/A'}</div>
                    <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">{status ? status : 'N/A'}</div>
                    <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-1 capitalize">{`${season ? season : 'N/A'} ${year ? year : 'N/A'}`}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{synopsis}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-5 w-5 text-primary"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                      <div>
                        <h3 className="text-sm font-medium">Aired</h3>
                        <p className="text-sm text-muted-foreground">{aired.string}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-5 w-5 text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <div>
                        <h3 className="text-sm font-medium">Duration</h3>
                        <p className="text-sm text-muted-foreground">{duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-5 w-5 text-primary"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                      <div>
                        <h3 className="text-sm font-medium">Episodes</h3>
                        <p className="text-sm text-muted-foreground">{episodes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-5 w-5 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      <div>
                        <h3 className="text-sm font-medium">Members</h3>
                        <p className="text-sm text-muted-foreground">{`${formatSiUnit(members ? members : 0)}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-5 w-5 text-primary"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                      <div>
                        <h3 className="text-sm font-medium">Rank</h3>
                        <p className="text-sm text-muted-foreground">{`#${rank}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-5 w-5 text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                      <div>
                        <h3 className="text-sm font-medium">Favorites</h3>
                        <p className="text-sm text-muted-foreground">{`${formatSiUnit(favorites ? favorites : 0)}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Studios</h3>
                  <div className="flex flex-wrap gap-2">
                    {studios.map((studio) => (
                      <button key={studio.mal_id} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp_svg]:pointer-events-none [&amp_svg_svg]:size-4 [&amp_svg_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-full">{studio.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Producers</h3>
                  <div className="flex flex-wrap gap-2">
                    {producers.map((producer) => (
                      <button key={producer.mal_id} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp_svg]:pointer-events-none [&amp_svg_svg]:size-4 [&amp_svg_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-full">{producer.name}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="flex items-center font-semibold mb-2 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag h-4 w-4"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
                      Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <div key={genre.mal_id} className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold rounded-full cursor-pointer transition-colors bg-[#f6a53b]/10 hover:bg-[#f6a53b]/20 text-[#f6a53b] focus:outline-none focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2">{genre.name}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="flex items-center font-semibold mb-2 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-4 w-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                      Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme) => (
                        <div key={theme.mal_id} className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold rounded-full cursor-pointer transition-colors bg-[#f6a53b]/10 hover:bg-[#f6a53b]/20 text-[#f6a53b] focus:outline-none focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2">{theme.name}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="flex items-center font-semibold mb-2 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Demographics</h3>
                    <div className="flex flex-wrap gap-2">
                      {demographics.map((demographic) => (
                        <div key={demographic.mal_id} className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold rounded-full cursor-pointer transition-colors bg-[#f6a53b]/10 hover:bg-[#f6a53b]/20 text-[#f6a53b] focus:outline-none focus:ring-2 focus:ring-[#f6a53b] focus:ring-offset-2">{demographic.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div dir="ltr" data-orientation="horizontal" className="w-full mb-12 space-y-8">
              <div role="tablist" aria-orientation="horizontal" className="h-10 items-center justify-center rounded-md bg-[#1e293b] p-1 text-muted-foreground grid w-full grid-cols-2 md:grid-cols-4 mb-6 outline-0" tabIndex={0} data-orientation="horizontal">
                <button type="button" role="tab" aria-selected="true" aria-controls="trailer" onClick={() => setActiveTab('overview')} className="inline-flex items-center justify-center whitespace-nowrap focus:bg-[#020817] rounded-sm text-sm font-medium px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  Overview
                </button>
                <button type="button" role="tab" aria-selected="false" aria-controls="episodes" onClick={() => setActiveTab('episodes')} className="inline-flex items-center justify-center whitespace-nowrap focus:bg-[#020817] rounded-sm text-sm font-medium px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list h-4 w-4 mr-2"><path d="M3 12h.01"></path><path d="M3 18h.01"></path><path d="M3 6h.01"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M8 6h13"></path></svg>
                  Episodes</button>
                <button type="button" role="tab" aria-selected="false" aria-controls="characters" onClick={() => setActiveTab('characters')} className="inline-flex items-center justify-center whitespace-nowrap focus:bg-[#020817] rounded-sm text-sm font-medium px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Characters</button>
                <button type="button" role="tab" aria-selected="true" aria-controls="trailer" onClick={() => setActiveTab('related')} className="inline-flex items-center justify-center whitespace-nowrap focus:bg-[#020817] rounded-sm text-sm font-medium px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag h-4 w-4 mr-2"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
                  Related
                </button>
              </div>
              <div data-state="active" data-orientation="horizontal" className={`w-full space-y-8 ${activeTab === 'overview' ? '' : 'hidden'}`}>
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play mr-2 h-5 w-5"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    Trailer</h2>
                  <div>
                    {showVideo && trailer.embed_url ? <iframe loading="lazy" width="100%" height="auto" src={trailer.embed_url} className="aspect-video mx-auto lg:max-w-7/12" allowFullScreen ></iframe> : 'Trailer not avaliable'}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-2 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                    News</h2>
                    <div className="grid grid-cols-1 gap-4">

                    </div>
                </div>
              </div>
              <div data-state="inactive" data-orientation="horizontal" className={`w-full ${activeTab === 'episodes' ? '' : 'hidden'}`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list h-4 w-4 mr-2"><path d="M3 12h.01"></path><path d="M3 18h.01"></path><path d="M3 6h.01"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M8 6h13"></path></svg>
                  Episodes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                </div>
              </div>
              <div data-state="inactive" data-orientation="horizontal" className={`w-full ${activeTab === 'characters' ? '' : 'hidden'}`}>Characters</div>
              <div data-state="inactive" data-orientation="horizontal" className={`w-full ${activeTab === 'related' ? '' : 'hidden'}`}>Related</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Details 