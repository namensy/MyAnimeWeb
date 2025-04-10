import { Dispatch, SetStateAction, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Allmovies from './components/Allmovies'
import { SearchProps } from './types'


const App: React.FC<SearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string | string[]>([])

  return (
    <div className=' text-white relative'>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Hero />
      <Allmovies setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
    </div>
  )
}

export default App
