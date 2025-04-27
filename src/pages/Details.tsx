
import { useAnimeApi } from "@/hooks/useAnimeApi";
import { formatSiUnit } from "format-si-unit";
import { useParams } from "react-router-dom";
const Details = () => {
  const { id } = useParams();
  const { animeList } = useAnimeApi(id as string);

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {animeList.map(({ mal_id, images, title_english, duration, status, genres, score, scored_by, year, season, rating, synopsis }) => (
          <div key={mal_id} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="relative">
              <div className="sticky top-8 flex flex-col gap-4">
                <div className="relative group rounded-lg overflow-hidden shadow-lg:">
                  <img src={images.webp.large_image_url} alt={title_english} className="w-[400px] h-[600px]" decoding="async" loading="lazy" /></div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{title_english}</h1>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#1e293b] text-[#f8fafc] hover:bg-secondary/80 flex items-center gap-1 px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    <span className="font-bold">{score}</span>
                    <span className="text-xs text-[#94a3b8]">{`(${formatSiUnit(scored_by)})`}</span>
                  </div>
                  <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-1">{rating}</div>
                  <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">{status}</div>
                  <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-1 capitalize">{`${season} ${year}`}</div>
                </div>
                <div className="text-muted-foreground">
                  <p>{synopsis}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Details 