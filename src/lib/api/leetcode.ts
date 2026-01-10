import { Contest } from '../types'

interface LeetCodeContest {
  title: string
  titleSlug: string
  startTime: number
  duration: number
}

interface LeetCodeResponse {
  topTwoContests: LeetCodeContest[]
}

export async function fetchLeetCodeContests(): Promise<Contest[]> {
  try {
    const query = `
      query {
        topTwoContests {
          title
          titleSlug
          startTime
          duration
        }
      }
    `

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data: { data: LeetCodeResponse } = await response.json()

    if (!data.data || !data.data.topTwoContests) {
      return []
    }

    const now = Date.now()

    return data.data.topTwoContests.map(contest => {
      const startTime = new Date(contest.startTime * 1000).toISOString()
      const durationMinutes = contest.duration
      const durationHours = Math.floor(durationMinutes / 60)
      const remainingMinutes = durationMinutes % 60
      const duration = durationHours > 0 
        ? `${durationHours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`.trim()
        : `${durationMinutes}m`

      const endTime = new Date((contest.startTime * 1000) + (contest.duration * 60 * 1000)).toISOString()
      
      let status: 'upcoming' | 'ongoing' | 'past' = 'past'
      if (contest.startTime * 1000 > now) {
        status = 'upcoming'
      } else if (contest.startTime * 1000 + (contest.duration * 60 * 1000) > now) {
        status = 'ongoing'
      }

      return {
        id: `lc-${contest.titleSlug}`,
        name: contest.title,
        platform: 'LeetCode',
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        status: status,
        url: `https://leetcode.com/contest/${contest.titleSlug}`,
      }
    })
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error)
    // LeetCode API might have CORS issues, return empty for now
    return []
  }
}
