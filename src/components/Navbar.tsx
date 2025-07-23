import { logos } from '@/assets/images/logos'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSearchContext } from '@/context/SearchContext'
import { useAppContext } from '@/context/AppContext'

const Navbar: React.FC = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const { searchTerm, setSearchTerm } = useSearchContext()
  const { bookmarks } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav
      className={`sticky top-0 z-10 flex items-center justify-between bg-[#23252b]`}
    >
      <div className="hidden gap-2 lg:flex">
        <Link
          to="/"
          className="inline-block cursor-pointer px-5 hover:bg-[#141519] hover:text-white"
        >
          <img
            className="h-16 w-16 cursor-pointer"
            src={logos.anivibe}
            alt="AniVibe logo"
          />
        </Link>
        <Link to="/videos/new" className="p-5 text-white hover:bg-[#141519]">
          New
        </Link>
        <Link
          to="/videos/popular"
          className="p-5 text-white hover:bg-[#141519]"
        >
          Popular
        </Link>
      </div>
      <div className="hidden rounded-sm border-b-amber-500 bg-[#454545] focus-within:border-b-2 lg:block">
        <input
          type="text"
          placeholder="Search .."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-1 pl-4 text-lg text-white placeholder-white transition-all duration-400 outline-none focus:pr-72"
          onFocus={() => navigate('/videos/search')}
          onBlur={() => navigate('/')}
        />
      </div>
      <div className="mr-10 hidden text-white transition-transform lg:block">
        {user ? (
          <div className="flex h-full w-full items-center gap-4">
            <Link
              aria-label="View bookmarks"
              to="/bookmarks"
              className="relative cursor-pointer p-5.5 transition-transform hover:-translate-y-0 hover:bg-[#141519]"
            >
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
                className="lucide lucide-bookmark h-5 w-5"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
              <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-sm">
                <span>{bookmarks.length}</span>
              </div>
            </Link>
            <UserButton />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openSignIn()}
            className="cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            Create Account
          </button>
        )}
      </div>

      {/* {For moblie} */}
      <div className="w-full lg:hidden">
        <div className="m-[8.5px] flex h-full w-full items-center justify-between pl-4">
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
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
              className="lucide lucide-menu h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </div>
          <Link to="/" className="flex-1 cursor-pointer hover:text-white">
            <img
              src={logos.anivibe}
              alt="AniVibe logo"
              className="ml-2 w-12 object-contain p-2"
            />
          </Link>
          <div className="relative mr-10 flex items-center gap-4">
            {user ? (
              <>
                <div className="absolute -top-1 right-9 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs">
                  <span>{bookmarks.length}</span>
                </div>
                <Link to="/bookmarks" aria-label="View bookmarks">
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
                    className="lucide lucide-bookmark h-5 w-5"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                </Link>

                <UserButton />
              </>
            ) : (
              <button
                type="button"
                title="Sign In"
                onClick={() => openSignIn()}
                className="gap-3"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
        <div
          className={`${isOpen && window.innerWidth < 1024 ? 'block' : 'hidden'} absolute top-16 flex flex-col items-center justify-between gap-5 bg-[#23252b] pr-35 pb-10`}
        >
          <Link to="/videos/new" className="mt-5 ml-1">
            <h1>New</h1>
          </Link>
          <Link to="/videos/popular" className="ml-6">
            <h1>Popular</h1>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
