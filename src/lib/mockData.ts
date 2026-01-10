import { Contest } from './types'

// Generate dates relative to now
const now = new Date()
const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000)
const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)
const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

export const mockContests: Contest[] = [
  // Codeforces
  {
    id: 'cf-1',
    name: 'Codeforces Round #920 (Div. 2)',
    platform: 'Codeforces',
    startTime: twoHoursLater.toISOString(),
    endTime: new Date(twoHoursLater.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    duration: '2h',
    status: 'upcoming',
    difficulty: 'medium',
    url: 'https://codeforces.com/contests',
  },
  {
    id: 'cf-2',
    name: 'Codeforces Round #919',
    platform: 'Codeforces',
    startTime: oneHourAgo.toISOString(),
    endTime: new Date(oneHourAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    duration: '2h',
    status: 'ongoing',
    difficulty: 'hard',
    url: 'https://codeforces.com/contests',
  },
  {
    id: 'cf-3',
    name: 'Codeforces Round #918',
    platform: 'Codeforces',
    startTime: oneDayAgo.toISOString(),
    endTime: new Date(oneDayAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    duration: '2h',
    status: 'past',
    difficulty: 'medium',
    url: 'https://codeforces.com/contests',
  },
  // LeetCode
  {
    id: 'lc-1',
    name: 'LeetCode Weekly Contest 380',
    platform: 'LeetCode',
    startTime: oneDayLater.toISOString(),
    endTime: new Date(oneDayLater.getTime() + 90 * 60 * 1000).toISOString(),
    duration: '1h 30m',
    status: 'upcoming',
    difficulty: 'medium',
    url: 'https://leetcode.com/contest',
  },
  {
    id: 'lc-2',
    name: 'LeetCode Weekly Contest 379',
    platform: 'LeetCode',
    startTime: twoDaysAgo.toISOString(),
    endTime: new Date(twoDaysAgo.getTime() + 90 * 60 * 1000).toISOString(),
    duration: '1h 30m',
    status: 'past',
    difficulty: 'medium',
    url: 'https://leetcode.com/contest',
  },
  // AtCoder
  {
    id: 'ac-1',
    name: 'AtCoder Beginner Contest 340',
    platform: 'AtCoder',
    startTime: twoDaysLater.toISOString(),
    endTime: new Date(twoDaysLater.getTime() + 100 * 60 * 1000).toISOString(),
    duration: '1h 40m',
    status: 'upcoming',
    difficulty: 'easy',
    url: 'https://atcoder.jp/contests',
  },
  {
    id: 'ac-2',
    name: 'AtCoder Beginner Contest 339',
    platform: 'AtCoder',
    startTime: threeDaysAgo.toISOString(),
    endTime: new Date(threeDaysAgo.getTime() + 100 * 60 * 1000).toISOString(),
    duration: '1h 40m',
    status: 'past',
    difficulty: 'easy',
    url: 'https://atcoder.jp/contests',
  },
  // CodeChef
  {
    id: 'cc-1',
    name: 'CodeChef Starters 120',
    platform: 'CodeChef',
    startTime: threeDaysLater.toISOString(),
    endTime: new Date(threeDaysLater.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    duration: '2h',
    status: 'upcoming',
    difficulty: 'medium',
    url: 'https://www.codechef.com',
  },
  {
    id: 'cc-2',
    name: 'CodeChef Long Challenge',
    platform: 'CodeChef',
    startTime: oneDayAgo.toISOString(),
    endTime: new Date(oneDayAgo.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '10d',
    status: 'ongoing',
    difficulty: 'hard',
    url: 'https://www.codechef.com',
  },
  // HackerRank
  {
    id: 'hr-1',
    name: 'HackerRank Weekly Challenge',
    platform: 'HackerRank',
    startTime: oneDayLater.toISOString(),
    endTime: new Date(oneDayLater.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '7d',
    status: 'upcoming',
    difficulty: 'medium',
    url: 'https://www.hackerrank.com',
  },
  {
    id: 'hr-2',
    name: 'HackerRank Contest',
    platform: 'HackerRank',
    startTime: oneDayAgo.toISOString(),
    endTime: new Date(oneDayAgo.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '7d',
    status: 'past',
    difficulty: 'medium',
    url: 'https://www.hackerrank.com',
  },
  // TopCoder
  {
    id: 'tc-1',
    name: 'TopCoder SRM 850',
    platform: 'TopCoder',
    startTime: twoDaysLater.toISOString(),
    endTime: new Date(twoDaysLater.getTime() + 75 * 60 * 1000).toISOString(),
    duration: '1h 15m',
    status: 'upcoming',
    difficulty: 'hard',
    url: 'https://www.topcoder.com',
  },
  {
    id: 'tc-2',
    name: 'TopCoder SRM 849',
    platform: 'TopCoder',
    startTime: twoDaysAgo.toISOString(),
    endTime: new Date(twoDaysAgo.getTime() + 75 * 60 * 1000).toISOString(),
    duration: '1h 15m',
    status: 'past',
    difficulty: 'hard',
    url: 'https://www.topcoder.com',
  },
]
