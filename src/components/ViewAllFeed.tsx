import { Link } from "react-router-dom"

const ViewALllFeed = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center -mt-20 lg:mt-0 lg:py-20">
        <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x" alt="Yuzu." />
        <h3 className="inline-flex my-6 text-center text-xl">Still looking for something to watch?
          <br />
          Check out our full library
        </h3>
        <Link tabIndex={0} data-t="view-all-btn" to="/videos/popular" className="border-2 border-[#ff640a] hover:border-orange-400 py-2 px-6">
          <span className="uppercase text-[#ff640a]">View all</span>
        </Link>
      </div>
    </div>
  )
}

export default ViewALllFeed