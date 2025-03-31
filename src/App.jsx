import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Allmovies from './components/Allmovies'


function App() {

  return (
    <div className=' text-white relative'>
      <Navbar />
      <Hero />
      <Allmovies />
    </div>
  )
}

export default App
