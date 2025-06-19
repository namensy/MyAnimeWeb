import { BASE_URL } from '@/constants/api'
import { useMultipleApi } from '@/hooks/useMultipleApi'
import { CharacterItems } from '@/types/characterTypes'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface CharactersProp {
  activeTab: string
}

const Characters = ({ activeTab }: CharactersProp) => {
  const { id } = useParams()
  const charactersUrl = `/anime/${id}/characters`
  const { data: dataCharacters } = useMultipleApi<CharacterItems[]>(
    BASE_URL,
    charactersUrl
  )

  return (
    <div
      data-state="inactive"
      data-orientation="horizontal"
      className={`w-full ${activeTab === 'characters' ? '' : 'hidden'}`}
    >
      <div>
        <h2 className="mb-6 flex items-center text-2xl font-bold">
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
            className="lucide lucide-users mr-2 h-5 w-5"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Characters
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {dataCharacters &&
            dataCharacters.map((item) => (
              <div
                key={uuidv4()}
                className="bg-card text-card-foreground hover:shadow:md overflow-hidden rounded-lg border shadow-sm transition-all"
              >
                <div className="flex p-4">
                  <div className="relative h-24 w-16">
                    <img
                      src={item.character.images.webp.image_url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full rounded-md object-cover text-transparent"
                    />
                  </div>
                  <div className="ml-4 flex-grow">{item.character.name}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Characters
