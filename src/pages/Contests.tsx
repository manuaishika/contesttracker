import { useState, useEffect } from 'react'
import { ContestTable } from '@/components/contests/ContestTable'
import { Contest } from '@/lib/types'
import { fetchAllContests } from '@/lib/api/contests'
import { CodeforcesIcon, LeetCodeIcon } from '@/components/icons/PlatformIcons'

const platforms = [
  { name: 'Codeforces', component: CodeforcesIcon, color: 'bg-blue-500' },
  { name: 'LeetCode', component: LeetCodeIcon, color: 'bg-yellow-500' },
  { name: 'CodeChef', color: 'bg-orange-500' },
  { name: 'AtCoder', color: 'bg-purple-500' },
  { name: 'HackerRank', color: 'bg-green-500' },
  { name: 'TopCoder', color: 'bg-blue-600' },
]

export function Contests() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all')
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContests() {
      setLoading(true)
      try {
        const data = await fetchAllContests()
        if (data && data.length > 0) {
          setContests(data)
        } else {
          // If no data, set empty array and log
          console.warn('No contests loaded, check API calls')
          setContests([])
        }
      } catch (error) {
        console.error('Failed to load contests:', error)
        setContests([])
      } finally {
        setLoading(false)
      }
    }
    loadContests()
  }, [])

  // Calculate counts from all loaded contests
  const liveContests = contests.filter(c => c.status === 'ongoing')
  const upcomingContests = contests.filter(c => c.status === 'upcoming')
  const pastContests = contests.filter(c => c.status === 'past')

  // Apply all filters
  let filteredContests: Contest[] = [...contests]

  // Apply status filter
  if (statusFilter === 'live') {
    filteredContests = filteredContests.filter(c => c.status === 'ongoing')
  } else if (statusFilter === 'upcoming') {
    filteredContests = filteredContests.filter(c => c.status === 'upcoming')
  } else if (statusFilter === 'past') {
    filteredContests = filteredContests.filter(c => c.status === 'past')
  }

  // Apply platform filter
  if (selectedPlatform) {
    filteredContests = filteredContests.filter(c => 
      c.platform.toLowerCase() === selectedPlatform.toLowerCase()
    )
  }

  // Apply search filter
  if (searchQuery.trim()) {
    filteredContests = filteredContests.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="container mx-auto px-6 py-8 relative" style={{ zIndex: 10, pointerEvents: 'auto' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
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
          <input
            type="text"
            placeholder="Search contests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-md text-white font-mono focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {platforms.map((platform) => {
          const IconComponent = 'component' in platform ? platform.component : null
          return (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(selectedPlatform === platform.name ? null : platform.name)}
              className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center transition-all ${
                selectedPlatform === platform.name
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#0a0a0a] scale-110'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title={platform.name}
            >
              {IconComponent ? (
                <IconComponent className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white font-mono text-xs">{platform.name[0]}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-800">
        {[
          { key: 'all' as const, label: 'All', count: contests.length },
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
      {loading ? (
        <div className="text-center py-12 text-gray-400 font-mono">
          Loading contests...
        </div>
      ) : (
        <ContestTable contests={filteredContests} />
      )}
    </div>
  )
}
