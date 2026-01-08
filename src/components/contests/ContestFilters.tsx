import { useState } from 'react'

interface ContestFiltersProps {
  onFilterChange?: (filters: FilterState) => void
}

interface FilterState {
  platform: string
  status: string
  difficulty: string
}

export function ContestFilters({ onFilterChange }: ContestFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    platform: 'all',
    status: 'all',
    difficulty: 'all',
  })

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <label htmlFor="platform-filter" className="sr-only">
        Filter by platform
      </label>
      <select
        id="platform-filter"
        value={filters.platform}
        onChange={(e) => handleChange('platform', e.target.value)}
        className="px-3 py-2 border rounded-md"
        aria-label="Filter by platform"
      >
        <option value="all">All Platforms</option>
        <option value="codeforces">Codeforces</option>
        <option value="leetcode">LeetCode</option>
        <option value="atcoder">AtCoder</option>
      </select>

      <label htmlFor="status-filter" className="sr-only">
        Filter by status
      </label>
      <select
        id="status-filter"
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        className="px-3 py-2 border rounded-md"
        aria-label="Filter by status"
      >
        <option value="all">All Status</option>
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
        <option value="past">Past</option>
      </select>

      <label htmlFor="difficulty-filter" className="sr-only">
        Filter by difficulty
      </label>
      <select
        id="difficulty-filter"
        value={filters.difficulty}
        onChange={(e) => handleChange('difficulty', e.target.value)}
        className="px-3 py-2 border rounded-md"
        aria-label="Filter by difficulty"
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  )
}
