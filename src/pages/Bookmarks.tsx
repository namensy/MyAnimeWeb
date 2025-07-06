import { useAppContext } from '@/context/AppContext'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Bookmarks = () => {
  const { bookmarks } = useAppContext()

  return (
    <div className="container mx-auto text-white lg:max-w-11/12 xl:max-w-9/12">
      <h1 className="my-12 text-3xl">Your Most Favourite </h1>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-5 xl:grid-cols-6">
        {bookmarks.map(({ id, image, title }) => (
          <Link to={`/watch/${id}`} key={`${id}-${uuidv4()}`}>
            <div className="h-auto w-full">
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={title}
                  className={`h-full w-full object-cover`}
                />
              </div>
            </div>
            <h2 className="line-clamp-3 text-sm">{title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Bookmarks
