import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative" style={{ zIndex: 1 }}>
      <Navbar />
      <main className="relative" style={{ zIndex: 2, pointerEvents: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
