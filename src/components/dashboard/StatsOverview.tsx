interface StatsOverviewProps {
  totalContests?: number
  contestsParticipated?: number
  averageRank?: number
  bestRank?: number
}

export function StatsOverview({
  totalContests = 0,
  contestsParticipated = 0,
  averageRank = 0,
  bestRank = 0,
}: StatsOverviewProps) {
  const stats = [
    { label: 'Total Contests', value: totalContests, icon: '📅' },
    { label: 'Participated', value: contestsParticipated, icon: '✅' },
    { label: 'Average Rank', value: averageRank || 'N/A', icon: '📊' },
    { label: 'Best Rank', value: bestRank || 'N/A', icon: '🏆' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <h4 className="text-sm font-mono text-gray-400">{stat.label}</h4>
          </div>
          <div className="text-3xl font-bold font-mono text-primary">{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
