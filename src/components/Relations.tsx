import { BASE_URL } from '@/constants/api'
import { useMultipleApi } from '@/hooks/useMultipleApi'
import { Daum } from '@/types'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface RelationsProps {
  activeTab: string
}

function Relations({ activeTab }: RelationsProps) {
  const { id } = useParams()
  const relationsUrl = `/anime/${id}/relations`
  const { data: dataRelations } = useMultipleApi<Daum[]>(BASE_URL, relationsUrl)

  return (
    <div
      data-state="inactive"
      data-orientation="horizontal"
      className={`w-full ${activeTab === 'related' ? '' : 'hidden'}`}
    >
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
          className="lucide lucide-tag mr-2 h-4 w-4"
        >
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
        </svg>
        Related
      </h2>

      <div className="space-y-6">
        {dataRelations &&
          dataRelations.map((item) => (
            <div key={uuidv4()} className="space-y-4">
              <h3 className="text-lg font-semibold">{item.relation}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a
                  className="block rounded-lg border p-3 transition-all hover:border-blue-950 hover:shadow-md"
                  href="#"
                >
                  <h4 className="line-clamp-2 font-medium">
                    {item.entry[0].name}
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs capitalize">
                    {item.entry[0].type}
                  </p>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Relations
