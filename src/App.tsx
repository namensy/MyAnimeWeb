import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Allmovies from "./components/Allmovies"
import New from "./pages/New"
import Popular from "./pages/Popular"
import Search from "./pages/Search"

const App: React.FC = () => {

  return (
    <div className=' text-white relative bg-black min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<> <Hero /> <Allmovies /></>} />
        <Route path='/videos/new' element={<New />} />
        <Route path='/videos/popular' element={<Popular />} />
        <Route path='/videos/search' element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
