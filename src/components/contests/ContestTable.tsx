import { Contest } from '@/lib/types'

interface ContestTableProps {
  contests?: Contest[]
}

const platformIcons: Record<string, string> = {
  Codeforces: '🔵',
  LeetCode: '🟡',
  AtCoder: '🟣',
  CodeChef: '🟠',
  HackerRank: '🟢',
  TopCoder: '💎',
}

const formatTimeUntil = (startTime: string) => {
  const now = new Date()
  const start = new Date(startTime)
  const diff = start.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
  if (hours > 0) return `about ${hours} hour${hours > 1 ? 's' : ''}`
  if (diff > 0) return 'soon'
  return 'ended'
}

export function ContestTable({ contests = [] }: ContestTableProps) {
  if (contests.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-mono">
        No contests found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Contest
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {contests.map((contest) => (
            <tr key={contest.id} className="hover:bg-[#1a1a1a] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{platformIcons[contest.platform] || '📅'}</span>
                  <span className="text-sm font-mono text-white">{contest.platform}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-mono text-white font-semibold">
                  {contest.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-mono text-gray-400">
                  {new Date(contest.startTime).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-mono text-gray-400">
                  {contest.duration}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-mono font-semibold rounded ${
                    contest.status === 'upcoming'
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : contest.status === 'ongoing'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  {contest.status === 'upcoming' ? formatTimeUntil(contest.startTime) : contest.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <button className="text-gray-500 hover:text-primary transition-colors" title="Set reminder">
                    🔔
                  </button>
                  <button className="text-gray-500 hover:text-primary transition-colors" title="Open in new tab">
                    ↗
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
