import { Link } from 'react-router-dom'
import { mockContests } from '@/lib/mockData'

const platformIcons: Record<string, string> = {
  Codeforces: '🔵',
  LeetCode: '🟡',
  AtCoder: '🟣',
  CodeChef: '🟠',
  HackerRank: '🟢',
  TopCoder: '💎',
}

export function UpcomingContestsPreview() {
  const upcoming = mockContests
    .filter((c) => c.status === 'upcoming')
    .slice(0, 4)

  const formatTimeUntil = (startTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const diff = start.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
    if (hours > 0) return `in about ${hours} hour${hours > 1 ? 's' : ''}`
    return 'soon'
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-mono mb-2 flex items-center gap-2">
              <span className="text-primary">{'>'}</span>
              <span className="text-white">Upcoming Contests</span>
            </h2>
            <p className="text-gray-400 font-mono">Don't miss these upcoming competitions</p>
          </div>
          <Link
            to="/contests"
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-md hover:border-primary transition-all font-mono text-sm"
          >
            View All Contests →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.map((contest) => (
            <div
              key={contest.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{platformIcons[contest.platform] || '📅'}</div>
                  <div>
                    <p className="text-gray-400 font-mono text-sm">{contest.platform}</p>
                    <h3 className="text-white font-mono font-semibold mt-1 group-hover:text-primary transition-colors">
                      {contest.name}
                    </h3>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-primary transition-colors">
                  ↗
                </button>
              </div>
              <div className="flex items-center justify-between text-sm font-mono">
                <div className="flex items-center gap-2 text-gray-400">
                  <span>🕐</span>
                  <span>{new Date(contest.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{contest.duration}</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30">
                    {formatTimeUntil(contest.startTime)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
