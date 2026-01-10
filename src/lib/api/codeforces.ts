import { Contest } from '../types'

interface CodeforcesContest {
  id: number
  name: string
  type: string
  phase: string
  frozen: boolean
  durationSeconds: number
  startTimeSeconds?: number
  relativeTimeSeconds?: number
}

interface CodeforcesResponse {
  status: string
  result: CodeforcesContest[]
}

export async function fetchCodeforcesContests(): Promise<Contest[]> {
  try {
    const response = await fetch('https://codeforces.com/api/contest.list?gym=false')
    const data: CodeforcesResponse = await response.json()

    if (data.status !== 'OK') {
      throw new Error('Failed to fetch Codeforces contests')
    }

    const now = Math.floor(Date.now() / 1000)
    
    return data.result
      .filter(contest => {
        // Only include actual contests (not gym)
        const isRegular = contest.type !== 'GYM' && contest.type !== 'OUT_OF_COMPETITION'
        // Include upcoming, ongoing, and recent past contests (last 60 days)
        const isRelevant = contest.phase === 'BEFORE' || 
                          contest.phase === 'CODING' || 
                          contest.phase === 'PENDING_SYSTEM_TEST' ||
                          (contest.startTimeSeconds && (now - contest.startTimeSeconds) < 60 * 24 * 60 * 60)
        return isRegular && isRelevant && contest.name
      })
      .map(contest => {
        const startTime = contest.startTimeSeconds ? new Date(contest.startTimeSeconds * 1000).toISOString() : new Date().toISOString()
        const durationMinutes = Math.floor(contest.durationSeconds / 60)
        const durationHours = Math.floor(durationMinutes / 60)
        const remainingMinutes = durationMinutes % 60
        const duration = durationHours > 0 
          ? `${durationHours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`.trim()
          : `${durationMinutes}m`

        let status: 'upcoming' | 'ongoing' | 'past' = 'past'
        if (contest.phase === 'BEFORE') {
          status = 'upcoming'
        } else if (contest.phase === 'CODING' || contest.phase === 'PENDING_SYSTEM_TEST') {
          status = 'ongoing'
        } else {
          status = 'past'
        }

        const endTime = contest.startTimeSeconds 
          ? new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString()
          : startTime

        return {
          id: `cf-${contest.id}`,
          name: contest.name,
          platform: 'Codeforces',
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          status: status,
          url: `https://codeforces.com/contest/${contest.id}`,
        }
      })
      .sort((a, b) => {
        // Sort: upcoming first (by start time), then ongoing, then past (by start time descending)
        if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
        if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
        if (a.status === 'ongoing' && b.status === 'past') return -1
        if (a.status === 'past' && b.status === 'ongoing') return 1
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      })
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error)
    return []
  }
}
