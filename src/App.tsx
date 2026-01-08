import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Index } from '@/pages/Index'
import { Contests } from '@/pages/Contests'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { NotFound } from '@/pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="contests" element={<Contests />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
