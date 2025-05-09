import { logos } from '@/assets/images/logos'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { icons } from '@/assets/images/Icons';

const Navbar: React.FC = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const { searchTerm, setSearchTerm } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearchFocus = () => {
    navigate('/videos/search')
  }

  const handleOpen = (isOpen: boolean) => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`flex items-center justify-between bg-[#23252b] sticky top-0 z-10`}>
      <div className='hidden lg:flex gap-2'>
        <Link to="/" className='hover:text-white cursor-pointer inline-block px-5 hover:bg-[#141519]'>
          <img className='w-16 cursor-pointer' src={logos.anivibe} alt="AniVibe logo" />
        </Link>
        <Link to="/videos/new" className='text-white p-5 hover:bg-[#141519] '>New</Link>
        <Link to="/videos/popular" className='text-white p-5 hover:bg-[#141519]'>Popular</Link>
      </div>
      <div className='hidden lg:block bg-[#454545] rounded-sm border-b-amber-500 focus-within:border-b-2'>
        <input type="text" placeholder='Search ..' value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full placeholder-white text-white text-lg py-1 pl-4 focus:pr-72 outline-none transition-all duration-400'
          onFocus={handleSearchFocus} />
      </div>
      <div className='hidden lg:block transition-transform text-white mr-10'>
        {user ?
          <div className='w-full h-full flex items-center gap-4 '>
            <div className='p-5.5 cursor-pointer transition-transform hover:-translate-y-0 hover:bg-[#141519]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-5 w-5"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
            </div>
            <UserButton />
          </div>
          : <button type='button' onClick={() => openSignIn()} className='cursor-pointer hover:-translate-y-0.5 transition-transform'>Create Account</button>}
      </div>
      {/* {For phone} */}
      <div className='lg:hidden w-full'>
        <div className='flex items-center  m-[8.5px] w-full h-full pl-4'>
          <div className='cursor-pointer '><img src={icons.interface_icon} onClick={() => handleOpen(isOpen)} alt="interface icon" className='object-contain w-5 h-5' /></div>
          <Link to="/" className='hover:text-white cursor-pointer'>
            <img src={logos.anivibe} alt="AniVibe logo" className='object-contain p-2 w-18' />
          </Link>
        </div>
        <div className={`${isOpen && window.innerWidth < 1024 ? 'block' : 'hidden'} absolute flex flex-col items-center justify-between top-16 gap-5 bg-[#23252b] pr-35 pb-10`}>
          <Link to="/videos/new" className='ml-1 mt-5'>
            <h1>New</h1>
          </Link>
          <Link to="/videos/popular" className='ml-6'>
            <h1>Popular</h1>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar