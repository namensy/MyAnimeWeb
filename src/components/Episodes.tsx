import { BASE_URL } from '@/constants/api'
import { useDateFormatter } from '@/hooks/useDateFormatter'
import { useMultipleApi } from '@/hooks/useMultipleApi'
import { AnimeItems } from '@/types'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface EpisodesProp {
  activeTab: string
}

const Episodes = ({ activeTab }: EpisodesProp) => {
  const { formatDay, formatMonth, formatYear } = useDateFormatter()
  const { id } = useParams()
  const episodeUrl = `/anime/${id}/episodes`
  const { data: dataEpisodes } = useMultipleApi<AnimeItems[]>(
    BASE_URL,
    episodeUrl
  )

  return (
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
        {dataEpisodes &&
          dataEpisodes.map((item) => (
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
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                  {`${formatMonth(item.aired.toString())} ${formatDay(item.aired.toString())}, ${formatYear(item.aired.toString())}`}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Episodes
