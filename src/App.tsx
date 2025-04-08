import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Allmovies from './components/Allmovies'


const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState([])

  return (
    <div className=' text-white relative'>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <Hero />
      <Allmovies setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
    </div>
  )
}

export default App
