import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import New from './pages/New'
import Popular from './pages/Popular'
import Search from './pages/Search'
import Details from './pages/Details'
import Home from './pages/Home'
import Bookmarks from './pages/Bookmarks'
import MainLayout from './components/MainLayout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/videos/new" element={<New />} />
          <Route path="/videos/popular" element={<Popular />} />
          <Route path="/videos/search" element={<Search />} />
          <Route path="/watch/:id" element={<Details />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
