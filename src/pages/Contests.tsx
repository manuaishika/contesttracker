import { useState } from 'react'
import { ContestTable } from '@/components/contests/ContestTable'
import { mockContests } from '@/lib/mockData'
import { Contest } from '@/lib/types'

const platforms = [
  { name: 'Codeforces', icon: '🔵', color: 'bg-blue-500' },
  { name: 'LeetCode', icon: '🟡', color: 'bg-yellow-500' },
  { name: 'CodeChef', icon: '🟠', color: 'bg-orange-500' },
  { name: 'AtCoder', icon: '🟣', color: 'bg-purple-500' },
  { name: 'HackerRank', icon: '🟢', color: 'bg-green-500' },
  { name: 'TopCoder', icon: '💎', color: 'bg-blue-600' },
]

export function Contests() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all')

  const allContests = mockContests
  const liveContests = allContests.filter(c => c.status === 'ongoing')
  const upcomingContests = allContests.filter(c => c.status === 'upcoming')
  const pastContests = allContests.filter(c => c.status === 'past')

  let filteredContests: Contest[] = allContests

  // Apply status filter
  if (statusFilter === 'live') filteredContests = liveContests
  else if (statusFilter === 'upcoming') filteredContests = upcomingContests
  else if (statusFilter === 'past') filteredContests = pastContests

  // Apply platform filter
  if (selectedPlatform) {
    filteredContests = filteredContests.filter(c => 
      c.platform.toLowerCase() === selectedPlatform.toLowerCase()
    )
  }

  // Apply search filter
  if (searchQuery) {
    filteredContests = filteredContests.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
          <span className="text-primary">🏆</span>
          <span className="text-primary">{'>'}</span>
          <span className="text-white">Contests</span>
        </h1>
        <p className="text-gray-400 font-mono">
          Browse and filter contests from all major competitive programming platforms
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search contests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-md text-white font-mono focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => setSelectedPlatform(selectedPlatform === platform.name ? null : platform.name)}
            className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center text-xl transition-all ${
              selectedPlatform === platform.name
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#0a0a0a] scale-110'
                : 'opacity-70 hover:opacity-100'
            }`}
            title={platform.name}
          >
            {platform.icon}
          </button>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-800">
        {[
          { key: 'all' as const, label: 'All', count: allContests.length },
          { key: 'live' as const, label: 'Live', count: liveContests.length },
          { key: 'upcoming' as const, label: 'Upcoming', count: upcomingContests.length },
          { key: 'past' as const, label: 'Past', count: pastContests.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 font-mono text-sm transition-colors border-b-2 ${
              statusFilter === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Contest Table */}
      <ContestTable contests={filteredContests} />
    </div>
  )
}
