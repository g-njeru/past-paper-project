import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Papers from './pages/Papers'
import Topics from './pages/Topics'
import Questions from './pages/Questions'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { AuthGuard, AdminGuard } from './components/auth/AuthGuard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="papers" element={<AuthGuard><Papers /></AuthGuard>} />
        <Route path="topics" element={<AuthGuard><Topics /></AuthGuard>} />
        <Route path="questions" element={<AuthGuard><Questions /></AuthGuard>} />
        <Route path="admin" element={<AuthGuard><AdminGuard><Admin /></AdminGuard></AuthGuard>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
