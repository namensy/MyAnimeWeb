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
      Related
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
