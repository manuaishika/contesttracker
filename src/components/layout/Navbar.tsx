import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { TrophyIcon, ChartIcon } from '@/components/icons/PlatformIcons'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="border-b border-[#282828] bg-[#0a0a0a]" style={{ pointerEvents: 'auto', zIndex: 10005, position: 'relative' }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold font-mono flex items-center gap-2" style={{ pointerEvents: 'auto', zIndex: 10006, position: 'relative', cursor: 'pointer' }}>
            <span className="text-primary glow-green">{" >_"}</span>
            <span className="text-white">CP Hub</span>
          </Link>
          <div className="flex items-center gap-6" style={{ pointerEvents: 'auto', zIndex: 10006 }}>
            <Link
              to="/contests"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-mono text-sm",
                location.pathname === '/contests'
                  ? "text-primary bg-primary/10 border-glow-green"
                  : "text-gray-400 hover:text-white"
              )}
              style={{ pointerEvents: 'auto', zIndex: 10007, position: 'relative', cursor: 'pointer' }}
            >
              <TrophyIcon className="w-4 h-4" />
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
              style={{ pointerEvents: 'auto', zIndex: 10007, position: 'relative', cursor: 'pointer' }}
            >
              <ChartIcon className="w-4 h-4" />
              Dashboard
            </Link>
            {user ? (
              <>
                <span className="text-gray-400 font-mono text-sm" style={{ pointerEvents: 'auto' }}>
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 text-white rounded-md hover:border-primary transition-colors font-mono text-sm"
                  style={{ pointerEvents: 'auto', zIndex: 10007, position: 'relative', cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white font-mono text-sm transition-colors"
                  style={{ pointerEvents: 'auto', zIndex: 10007, position: 'relative', cursor: 'pointer' }}
                >
                  → Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-mono text-sm font-semibold border-glow-green"
                  style={{ pointerEvents: 'auto', zIndex: 10007, position: 'relative', cursor: 'pointer' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
