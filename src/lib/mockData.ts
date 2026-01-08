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
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
    name: 'Codeforces Round #918',
    platform: 'Codeforces',
    startTime: oneDayAgo.toISOString(),
    endTime: new Date(oneDayAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    duration: '2h',
    status: 'past',
    difficulty: 'medium',
    url: 'https://codeforces.com/contests',
  },
  {
    id: '7',
    name: 'LeetCode Weekly Contest 379',
    platform: 'LeetCode',
    startTime: twoDaysAgo.toISOString(),
    endTime: new Date(twoDaysAgo.getTime() + 90 * 60 * 1000).toISOString(),
    duration: '1h 30m',
    status: 'past',
    difficulty: 'medium',
    url: 'https://leetcode.com/contest',
  },
  {
    id: '8',
    name: 'AtCoder Beginner Contest 339',
    platform: 'AtCoder',
    startTime: threeDaysAgo.toISOString(),
    endTime: new Date(threeDaysAgo.getTime() + 100 * 60 * 1000).toISOString(),
    duration: '1h 40m',
    status: 'past',
    difficulty: 'easy',
    url: 'https://atcoder.jp/contests',
  },
  {
    id: '9',
    name: 'HackerRank Weekly Challenge',
    platform: 'HackerRank',
    startTime: oneDayAgo.toISOString(),
    endTime: new Date(oneDayAgo.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '7d',
    status: 'past',
    difficulty: 'medium',
    url: 'https://www.hackerrank.com',
  },
  {
    id: '10',
    name: 'TopCoder SRM 850',
    platform: 'TopCoder',
    startTime: twoDaysAgo.toISOString(),
    endTime: new Date(twoDaysAgo.getTime() + 75 * 60 * 1000).toISOString(),
    duration: '1h 15m',
    status: 'past',
    difficulty: 'hard',
    url: 'https://www.topcoder.com',
  },
]
