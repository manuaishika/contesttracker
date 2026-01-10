import { Contest } from '../types'

export async function fetchAtCoderContests(): Promise<Contest[]> {
  try {
    // AtCoder contests are available via their contest page
    // Using unofficial API endpoint that scrapes their contest list
    const response = await fetch('https://kenkoooo.com/atcoder/atcoder-api/v3/contest_list', {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch AtCoder contests')
    }

    const data: Array<{
      id: string
      title: string
      start_epoch_second: number
      duration_second: number
      rate_change: string
    }> = await response.json()

    const now = Math.floor(Date.now() / 1000)
    
    return data
      .filter(contest => {
        // Include upcoming and recent contests (last 30 days)
        const isUpcoming = contest.start_epoch_second > now
        const isRecent = (now - contest.start_epoch_second) < 30 * 24 * 60 * 60
        return isUpcoming || isRecent
      })
      .map(contest => {
        const startTime = new Date(contest.start_epoch_second * 1000).toISOString()
        const durationMinutes = Math.floor(contest.duration_second / 60)
        const durationHours = Math.floor(durationMinutes / 60)
        const remainingMinutes = durationMinutes % 60
        const duration = durationHours > 0 
          ? `${durationHours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`.trim()
          : `${durationMinutes}m`

        const endTime = new Date((contest.start_epoch_second + contest.duration_second) * 1000).toISOString()
        
        let status: 'upcoming' | 'ongoing' | 'past' = 'past'
        if (contest.start_epoch_second > now) {
          status = 'upcoming'
        } else if (contest.start_epoch_second + contest.duration_second > now) {
          status = 'ongoing'
        }

        return {
          id: `ac-${contest.id}`,
          name: contest.title,
          platform: 'AtCoder',
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          status: status,
          url: `https://atcoder.jp/contests/${contest.id}`,
        }
      })
      .sort((a, b) => {
        // Sort by status then time
        const statusOrder = { upcoming: 0, ongoing: 1, past: 2 }
        const statusDiff = statusOrder[a.status] - statusOrder[b.status]
        if (statusDiff !== 0) return statusDiff
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      })
      .slice(0, 30) // Limit to 30 most recent/relevant
  } catch (error) {
    console.error('Error fetching AtCoder contests:', error)
    return []
  }
}
