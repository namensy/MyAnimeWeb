import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { SearchProps } from '../types';


const Navbar: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {

  const { openSignIn } = useClerk()
  const { user } = useUser()
  
  return (
    <nav className='flex items-center justify-between bg-black sticky top-0 z-10'>
      <div className='flex gap-2'>
        <div className='hover:text-white cursor-pointerbg-white'>
          <img className='w-30 cursor-pointer hover:-translate-y-0.5 transition-transform' src={assets.crunchyroll} alt="Crunchyroll logo" />
        </div>
        <button type='button' className='hover:-translate-y-0.5 transition-transform cursor-pointer text-white p-2 w-25 '>New</button>
        <button type='button' className='hover:-translate-y-0.5 transition-transform cursor-pointer text-white p-2 w-25'>Popular</button>
      </div>
      <div className='bg-[#454545] rounded-sm border-b-amber-500 focus-within:border-b-2'>
        <input type="text" placeholder='Search ..' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className='w-full placeholder-white text-white text-lg py-1 pl-4 focus:pr-72 outline-none transition-all duration-400' />
      </div>
      <div className='block hover:-translate-y-0.5 transition-transform text-white px-10 py-5 mr-10'>
        { user ? <UserButton /> : <button type='button' onClick={() => openSignIn()} className='cursor-pointer'>Create Account</button>}
        </div>
    </nav>
  )
}

export default Navbar