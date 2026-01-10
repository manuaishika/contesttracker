import { Contest } from '../types'
import { fetchCodeforcesContests } from './codeforces'
import { fetchLeetCodeContests } from './leetcode'
import { fetchAtCoderContests } from './atcoder'
import { fetchCodeChefContests } from './codechef'
import { mockContests } from '../mockData'

export async function fetchAllContests(): Promise<Contest[]> {
  try {
    // Fetch from all platforms in parallel with timeout
    const apiTimeout = new Promise<Contest[]>((resolve) => {
      setTimeout(() => {
        console.log('API fetch timed out, using mock data')
        resolve(mockContests)
      }, 4000) // 4 second timeout for multiple APIs
    })

    const apiFetch = Promise.allSettled([
      fetchCodeforcesContests().catch(() => []),
      fetchLeetCodeContests().catch(() => []),
      fetchAtCoderContests().catch(() => []),
      fetchCodeChefContests().catch(() => []),
    ]).then(([codeforcesResult, leetcodeResult, atcoderResult, codechefResult]) => {
      const allContests: Contest[] = []

      if (codeforcesResult.status === 'fulfilled' && codeforcesResult.value && codeforcesResult.value.length > 0) {
        allContests.push(...codeforcesResult.value)
      }

      if (leetcodeResult.status === 'fulfilled' && leetcodeResult.value && leetcodeResult.value.length > 0) {
        allContests.push(...leetcodeResult.value)
      }

      if (atcoderResult.status === 'fulfilled' && atcoderResult.value && atcoderResult.value.length > 0) {
        allContests.push(...atcoderResult.value)
      }

      if (codechefResult.status === 'fulfilled' && codechefResult.value && codechefResult.value.length > 0) {
        allContests.push(...codechefResult.value)
      }

      // Always combine real data with mock data to ensure ALL platforms are represented
      // This way even if some APIs fail, users see contests from all 6 platforms
      const contestIds = new Set(allContests.map(c => c.id))
      const additionalMock = mockContests.filter(c => !contestIds.has(c.id))
      const combined = [...allContests, ...additionalMock]
      
      console.log(`Loaded ${allContests.length} real contests, ${additionalMock.length} mock contests (total: ${combined.length})`)
      
      return combined.sort((a, b) => {
        const statusOrder = { upcoming: 0, ongoing: 1, past: 2 }
        const statusDiff = statusOrder[a.status] - statusOrder[b.status]
        if (statusDiff !== 0) return statusDiff
        
        const timeA = new Date(a.startTime).getTime()
        const timeB = new Date(b.startTime).getTime()
        return a.status === 'past' ? timeB - timeA : timeA - timeB
      })
    })

    // Race between API fetch and timeout
    return await Promise.race([apiFetch, apiTimeout])
  } catch (error) {
    console.error('Error fetching all contests:', error)
    // Always return mock data as fallback on any error
    return mockContests
  }
}
