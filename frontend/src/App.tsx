import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Papers from './pages/Papers'
import Topics from './pages/Topics'
import Questions from './pages/Questions'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="papers" element={<Papers />} />
        <Route path="topics" element={<Topics />} />
        <Route path="questions" element={<Questions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
