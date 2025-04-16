import { assets } from '@/assets/assets'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';

const Navbar: React.FC = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const { searchTerm, setSearchTerm } = useAppContext()
  const navigate = useNavigate()

  const handleSearchFocus = () => {
      navigate('/videos/search')
  }
  return (
    <nav className={`flex items-center justify-between bg-black sticky top-0 z-10`}> 
      <div className='hidden lg:flex gap-2'>
        <Link to="/" className='hover:text-white cursor-pointer'>
          <img className='w-30 cursor-pointer hover:-translate-y-0.5 transition-transform' src={assets.crunchyroll} alt="Crunchyroll logo" />
        </Link>
        <Link to="/videos/new" className='hover:-translate-y-0.5 text-center transition-transform text-white p-5 w-25 '>New</Link>
        <Link to="/videos/popular" className='hover:-translate-y-0.5 text-center transition-transform text-white p-5 w-25 '>Popular</Link>
      </div>
      <div className='hidden lg:block bg-[#454545] rounded-sm border-b-amber-500 focus-within:border-b-2'>
        <input type="text" placeholder='Search ..' value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className='w-full placeholder-white text-white text-lg py-1 pl-4 focus:pr-72 outline-none transition-all duration-400' 
        onFocus={handleSearchFocus}  />
      </div>
      <div className='hidden lg:block hover:-translate-y-0.5 transition-transform text-white px-10 py-5 mr-10'>
        {user ? <div className='sm:hidden'>
          <UserButton />
        </div> : <button type='button' onClick={() => openSignIn()} className='cursor-pointer'>Create Account</button>}
      </div>
      {/* {For phone} */}
      <div className='flex gap-2 lg:hidden'>
        <div className='flex bg-[#000000] rounded-sm border-b-amber-500 focus-within:border-b-2 h-10 w-10 m-3'>
          <img src={assets.interface_icon} alt="interface icon" className='w-[160px] h-fit object-contain' />
          <img src={assets.pngegg} alt="Crunchyroll logo" className='w-full h-full object-contain' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar