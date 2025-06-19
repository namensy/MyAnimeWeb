import { useAnimeNewsApi } from '@/hooks/useAnimeNewsApi'
import { useParams } from 'react-router-dom'
import { Trailer } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { useDateFormatter } from '@/hooks/useDateFormatter'

interface OverviewProp {
  activeTab: string
  showVideo: boolean
  trailer: Trailer
}

const Overview = ({ activeTab, showVideo, trailer }: OverviewProp) => {
  const { id } = useParams()
  const { animeNews } = useAnimeNewsApi(id as string)
  const { formatMonth, formatYear } = useDateFormatter()

  return (
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
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>
                      {formatMonth(item.date)} {formatYear(item.date)}
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
  )
}

export default Overview
