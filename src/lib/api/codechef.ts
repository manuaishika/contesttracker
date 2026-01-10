import { Contest } from '../types'

interface CodeChefContest {
  code: string
  name: string
  startDate: string
  endDate: string
  duration: string
}

interface CodeChefResponse {
  present_contests: CodeChefContest[]
  future_contests: CodeChefContest[]
  past_contests: CodeChefContest[]
}

export async function fetchCodeChefContests(): Promise<Contest[]> {
  try {
    // CodeChef API endpoint
    const response = await fetch('https://www.codechef.com/api/list/contests/all', {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch CodeChef contests')
    }

    const data: CodeChefResponse = await response.json()
    const allContests: Contest[] = []

    // Process present (ongoing) contests
    if (data.present_contests) {
      data.present_contests.forEach(contest => {
        const startTime = new Date(contest.startDate).toISOString()
        const endTime = new Date(contest.endDate).toISOString()
        const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime()
        const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
        const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        const duration = `${durationHours}h ${durationMinutes > 0 ? durationMinutes + 'm' : ''}`.trim()

        allContests.push({
          id: `cc-${contest.code}`,
          name: contest.name,
          platform: 'CodeChef',
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          status: 'ongoing' as const,
          url: `https://www.codechef.com/${contest.code}`,
        })
      })
    }

    // Process future (upcoming) contests
    if (data.future_contests) {
      data.future_contests.slice(0, 20).forEach(contest => {
        const startTime = new Date(contest.startDate).toISOString()
        const endTime = new Date(contest.endDate).toISOString()
        const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime()
        const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
        const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        const duration = `${durationHours}h ${durationMinutes > 0 ? durationMinutes + 'm' : ''}`.trim()

        allContests.push({
          id: `cc-${contest.code}`,
          name: contest.name,
          platform: 'CodeChef',
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          status: 'upcoming' as const,
          url: `https://www.codechef.com/${contest.code}`,
        })
      })
    }

    // Process recent past contests (last 10)
    if (data.past_contests) {
      data.past_contests.slice(0, 10).forEach(contest => {
        const startTime = new Date(contest.startDate).toISOString()
        const endTime = new Date(contest.endDate).toISOString()
        const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime()
        const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
        const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        const duration = `${durationHours}h ${durationMinutes > 0 ? durationMinutes + 'm' : ''}`.trim()

        allContests.push({
          id: `cc-${contest.code}`,
          name: contest.name,
          platform: 'CodeChef',
          startTime: startTime,
          endTime: endTime,
          duration: duration,
          status: 'past' as const,
          url: `https://www.codechef.com/${contest.code}`,
        })
      })
    }

    return allContests.sort((a, b) => {
      const statusOrder = { upcoming: 0, ongoing: 1, past: 2 }
      const statusDiff = statusOrder[a.status] - statusOrder[b.status]
      if (statusDiff !== 0) return statusDiff
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    })
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error)
    return []
  }
}
