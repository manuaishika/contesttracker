interface StatsOverviewProps {
  totalContests?: number
  contestsParticipated?: number
  averageRank?: number
  bestRank?: number
}

import { ChartIcon, TrophyIcon } from '@/components/icons/PlatformIcons'

export function StatsOverview({
  totalContests = 0,
  contestsParticipated = 0,
  averageRank = 0,
  bestRank = 0,
}: StatsOverviewProps) {
  const stats = [
    { 
      label: 'Total Contests', 
      value: totalContests, 
      icon: <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30"><span className="text-blue-400 font-mono font-bold text-sm">TC</span></div>
    },
    { 
      label: 'Participated', 
      value: contestsParticipated, 
      icon: <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30"><span className="text-green-400 font-mono font-bold text-sm">✓</span></div>
    },
    { 
      label: 'Average Rank', 
      value: averageRank || 'N/A', 
      icon: <ChartIcon className="w-6 h-6 text-primary" />
    },
    { 
      label: 'Best Rank', 
      value: bestRank || 'N/A', 
      icon: <TrophyIcon className="w-6 h-6 text-primary" />
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2">
            {stat.icon}
            <h4 className="text-sm font-mono text-gray-400">{stat.label}</h4>
          </div>
          <div className="text-3xl font-bold font-mono text-primary">{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
