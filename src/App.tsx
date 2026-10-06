import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DetailPage } from './pages/DetailPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { ListPage } from './pages/ListPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="artwork/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
