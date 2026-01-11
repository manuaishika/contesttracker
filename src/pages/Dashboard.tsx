import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { fetchAllContests } from '@/lib/api/contests'
import { getUserReminders } from '@/lib/api/reminders'
import { Contest } from '@/lib/types'
import { RatingCard } from '@/components/dashboard/RatingCard'
import { RatingChart } from '@/components/dashboard/RatingChart'
import { StatsOverview } from '@/components/dashboard/StatsOverview'
import { CodeforcesIcon, LeetCodeIcon, BellIcon, ChartIcon } from '@/components/icons/PlatformIcons'

const linkedPlatforms = [
  { platform: 'Codeforces', username: 'coder123', rating: 1850, rank: 'Expert', change: 45 },
  { platform: 'LeetCode', username: 'leetcode_user', rating: 2200, rank: 'Guardian', change: 12 },
  { platform: 'AtCoder', username: 'atcoder_pro', rating: 1650, rank: '5 Kyu', change: -20 },
]

export function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [reminders, setReminders] = useState<any[]>([])

  useEffect(() => {
    async function loadReminders() {
      if (user?.id) {
        const userReminders = await getUserReminders(user.id)
        setReminders(userReminders)
      } else {
        setReminders([])
      }
    }
    loadReminders()
  }, [user?.id])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Codeforces':
        return <CodeforcesIcon className="w-6 h-6" />
      case 'LeetCode':
        return <LeetCodeIcon className="w-6 h-6" />
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-600" />
    }
  }

  // Show preview for non-authenticated users
  if (!authLoading && !user) {
    return (
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-mono mb-2 flex items-center justify-center gap-3">
            <ChartIcon className="text-primary w-8 h-8" />
            <span className="text-primary">{'>'}</span>
            <span className="text-white">Dashboard</span>
          </h1>
          <p className="text-gray-400 font-mono">Your competitive programming hub</p>
        </div>

        {/* Preview Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-mono font-bold text-white mb-4">
              Preview Dashboard Features
            </h2>
            <p className="text-gray-400 font-mono mb-8 max-w-2xl mx-auto">
              Create your account to unlock a personalized dashboard where you can track your ratings across platforms, 
              monitor contest participation, set reminders, and analyze your competitive programming journey.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer">
              <h3 className="text-primary font-mono font-semibold mb-2">Statistics Overview</h3>
              <div className="text-3xl font-bold font-mono text-primary mb-1">150</div>
              <p className="text-gray-400 font-mono text-sm">Total Contests</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer">
              <h3 className="text-primary font-mono font-semibold mb-2">Platform Ratings</h3>
              <div className="text-3xl font-bold font-mono text-primary mb-1">6+</div>
              <p className="text-gray-400 font-mono text-sm">Linked Platforms</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-primary/30">
                <ChartIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-primary font-mono font-semibold mb-2">Rating History</h3>
              <p className="text-gray-400 font-mono text-sm">Track Progress</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-primary/30">
                <BellIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-primary font-mono font-semibold mb-2">Reminders</h3>
              <p className="text-gray-400 font-mono text-sm">Never Miss</p>
            </div>
          </div>

          {/* Example Linked Platforms Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-mono font-semibold text-white mb-4">Linked Platforms Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {linkedPlatforms.slice(0, 3).map((platform) => (
                <div
                  key={platform.platform}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 opacity-60 hover:opacity-80 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(platform.platform)}
                      <h3 className="text-lg font-mono font-semibold text-white">{platform.platform}</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold font-mono text-primary">{platform.rating}</div>
                    <div className="text-sm font-mono text-gray-400">{platform.rank}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-mono font-bold text-white mb-4">
              Ready to create your own dashboard?
            </h2>
            <p className="text-gray-300 font-mono mb-6">
              Sign up or log in to start tracking your competitive programming journey
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-mono font-semibold border-glow-green"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-[#1a1a1a] border border-gray-700 text-white rounded-md hover:border-primary transition-all font-mono"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show actual dashboard for authenticated users
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
          <ChartIcon className="text-primary w-8 h-8" />
          <span className="text-primary">{'>'}</span>
          <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-gray-400 font-mono">Your competitive programming hub</p>
      </div>

      {/* Profile Header */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
            <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
              <span className="text-primary font-mono font-bold text-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-mono font-bold text-white">{user?.email || 'User'}</h2>
            <p className="text-gray-400 font-mono text-sm">
              Member since {new Date(user?.created_at || Date.now()).getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-mono font-semibold text-white mb-4">Statistics Overview</h3>
        <StatsOverview
          totalContests={150}
          contestsParticipated={45}
          averageRank={1250}
          bestRank={89}
        />
      </div>

      {/* Linked Platforms */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-mono font-semibold text-white">Linked Platforms</h3>
          <button className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 text-primary rounded-md hover:border-primary transition-all font-mono text-sm">
            + Link Platform
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {linkedPlatforms.map((platform) => (
            <RatingCard
              key={platform.platform}
              platform={platform.platform}
              rating={platform.rating}
              change={platform.change}
              rank={platform.rank}
            />
          ))}
        </div>
      </div>

      {/* Rating Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-mono font-semibold text-white mb-4">Rating History</h3>
        <RatingChart data={[]} />
      </div>

      {/* My Reminders */}
      <div>
        <h3 className="text-xl font-mono font-semibold text-white mb-4">My Reminders</h3>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          {user ? (
            reminders.length > 0 ? (
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-gray-800 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getPlatformIcon(reminder.platform)}
                      <div>
                        <p className="text-white font-mono font-semibold">{reminder.contest_name}</p>
                        <p className="text-gray-400 font-mono text-sm">
                          {new Date(reminder.start_time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <a
                      href={reminder.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-mono text-sm"
                    >
                      View →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 font-mono text-center py-8">
                No reminders set. Add reminders from the Contests page.
              </p>
            )
          ) : (
            <p className="text-gray-400 font-mono text-center py-8">
              <Link to="/login" className="text-primary hover:underline">Login</Link> to view your reminders.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
