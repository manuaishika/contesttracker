import { mockContests } from '@/lib/mockData'
import { RatingCard } from '@/components/dashboard/RatingCard'
import { RatingChart } from '@/components/dashboard/RatingChart'
import { StatsOverview } from '@/components/dashboard/StatsOverview'

const linkedPlatforms = [
  { platform: 'Codeforces', username: 'coder123', rating: 1850, rank: 'Expert', change: 45 },
  { platform: 'LeetCode', username: 'leetcode_user', rating: 2200, rank: 'Guardian', change: 12 },
  { platform: 'AtCoder', username: 'atcoder_pro', rating: 1650, rank: '5 Kyu', change: -20 },
]

export function Dashboard() {
  const upcomingContests = mockContests.filter((c) => c.status === 'upcoming').slice(0, 3)

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
          <span className="text-primary">📊</span>
          <span className="text-primary">{'>'}</span>
          <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-gray-400 font-mono">Your competitive programming hub</p>
      </div>

      {/* Profile Header */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl border border-primary/30">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-mono font-bold text-white">username</h2>
            <p className="text-gray-400 font-mono text-sm">Member since 2024</p>
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
          {upcomingContests.length > 0 ? (
            <div className="space-y-4">
              {upcomingContests.map((contest) => (
                <div
                  key={contest.id}
                  className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-gray-800 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">
                      {contest.platform === 'Codeforces' ? '🔵' :
                       contest.platform === 'LeetCode' ? '🟡' :
                       contest.platform === 'AtCoder' ? '🟣' : '📅'}
                    </span>
                    <div>
                      <p className="text-white font-mono font-semibold">{contest.name}</p>
                      <p className="text-gray-400 font-mono text-sm">
                        {new Date(contest.startTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-primary transition-colors">
                    🔔
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-mono text-center py-8">
              No reminders set. Add reminders from the Contests page.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
