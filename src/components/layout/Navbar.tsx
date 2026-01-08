import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="border-b border-[#282828] bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold font-mono flex items-center gap-2">
            <span className="text-primary glow-green">{" >_"}</span>
            <span className="text-white">CP Hub</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/contests"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-mono text-sm",
                location.pathname === '/contests'
                  ? "text-primary bg-primary/10 border-glow-green"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <span>🏆</span>
              Contests
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-mono text-sm",
                location.pathname === '/dashboard'
                  ? "text-primary bg-primary/10 border-glow-green"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <span>📊</span>
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-400 hover:text-white font-mono text-sm transition-colors"
            >
              → Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-mono text-sm font-semibold border-glow-green"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
