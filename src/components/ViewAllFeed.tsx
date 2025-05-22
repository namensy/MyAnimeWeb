import { Link } from 'react-router-dom'

const ViewALllFeed = () => {
  return (
    <div className="container mx-auto">
      <div className="-mt-20 flex flex-col items-center justify-center lg:mt-0 lg:py-20">
        <img
          src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png"
          srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x"
          alt="Yuzu."
        />
        <h3 className="my-6 inline-flex text-center text-xl">
          Still looking for something to watch?
          <br />
          Check out our full library
        </h3>
        <Link
          tabIndex={0}
          data-t="view-all-btn"
          to="/videos/popular"
          className="border-2 border-[#ff640a] px-6 py-2 hover:border-orange-400"
        >
          <span className="text-[#ff640a] uppercase">View all</span>
        </Link>
      </div>
    </div>
  )
}

export default ViewALllFeed
