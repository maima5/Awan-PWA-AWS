import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import Home from './pages/Home.jsx'
import Items from './pages/Items.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <OfflineBanner />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
