import { CodeforcesIcon, LeetCodeIcon } from '@/components/icons/PlatformIcons'

interface RatingCardProps {
  platform: string
  rating: number
  change?: number
  rank?: string
}

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

export function RatingCard({ platform, rating, change, rank }: RatingCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getPlatformIcon(platform)}
          <h3 className="text-lg font-mono font-semibold text-white">{platform}</h3>
        </div>
        <button className="text-gray-500 hover:text-primary transition-colors text-sm font-mono">
          Link Account
        </button>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold font-mono text-primary">{rating}</div>
        {change !== undefined && (
          <div className={`text-sm font-mono ${change >= 0 ? 'text-primary' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}
          </div>
        )}
        {rank && (
          <div className="text-sm text-gray-400 font-mono">
            {rank}
          </div>
        )}
      </div>
    </div>
  )
}
