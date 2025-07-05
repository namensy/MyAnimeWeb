import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import New from './pages/New'
import Popular from './pages/Popular'
import Search from './pages/Search'
import Details from './pages/Details'
import Footer from './components/Footer'
import Home from './pages/Home'

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/new" element={<New />} />
        <Route path="/videos/popular" element={<Popular />} />
        <Route path="/videos/search" element={<Search />} />
        <Route path="/watch/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
