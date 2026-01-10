import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contest } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'
import { CodeforcesIcon, LeetCodeIcon, BellIcon, ExternalLinkIcon, ClockIcon, HeartIcon } from '@/components/icons/PlatformIcons'
import { addReminder, removeReminder, isReminderSet } from '@/lib/api/reminders'
import { addFavorite, removeFavorite, isFavorite } from '@/lib/api/favorites'

interface ContestTableProps {
  contests?: Contest[]
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'Codeforces':
      return <CodeforcesIcon className="w-5 h-5" />
    case 'LeetCode':
      return <LeetCodeIcon className="w-5 h-5" />
    case 'AtCoder':
      return <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center"><span className="text-white font-mono text-xs font-bold">A</span></div>
    case 'CodeChef':
      return <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><span className="text-white font-mono text-xs font-bold">C</span></div>
    case 'HackerRank':
      return <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"><span className="text-white font-mono text-xs font-bold">H</span></div>
    case 'TopCoder':
      return <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><span className="text-white font-mono text-xs font-bold">T</span></div>
    default:
      return <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center"><span className="text-white font-mono text-xs">{platform[0]}</span></div>
  }
}

const formatTimeUntil = (startTime: string) => {
  const now = new Date()
  const start = new Date(startTime)
  const diff = start.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
  if (hours > 0) return `about ${hours} hour${hours > 1 ? 's' : ''}`
  if (diff > 0) return 'soon'
  return 'ended'
}

export function ContestTable({ contests = [] }: ContestTableProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [reminders, setReminders] = useState<Set<string>>(new Set())
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Load user's reminders and favorites
  useEffect(() => {
    async function loadUserData() {
      if (!user?.id) {
        setReminders(new Set())
        setFavorites(new Set())
        return
      }

      const reminderIds = new Set<string>()
      const favoriteIds = new Set<string>()

      // Check each contest's reminder/favorite status
      for (const contest of contests) {
        try {
          const [isRem, isFav] = await Promise.all([
            isReminderSet(user.id, contest.id),
            isFavorite(user.id, contest.id)
          ])
          if (isRem) reminderIds.add(contest.id)
          if (isFav) favoriteIds.add(contest.id)
        } catch (error) {
          console.error(`Error loading data for contest ${contest.id}:`, error)
        }
      }

      setReminders(reminderIds)
      setFavorites(favoriteIds)
    }

    loadUserData()
  }, [user?.id, contests.length]) // Only re-run when user changes or contest count changes

  const handleReminderToggle = async (contest: Contest) => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const isSet = reminders.has(contest.id)
      if (isSet) {
        await removeReminder(user.id, contest.id)
        setReminders(prev => {
          const next = new Set(prev)
          next.delete(contest.id)
          return next
        })
      } else {
        await addReminder(user.id, contest)
        setReminders(prev => new Set([...prev, contest.id]))
      }
    } catch (error) {
      console.error('Error toggling reminder:', error)
      alert('Failed to update reminder. Please try again.')
    }
  }

  const handleFavoriteToggle = async (contest: Contest) => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const isSet = favorites.has(contest.id)
      if (isSet) {
        await removeFavorite(user.id, contest.id)
        setFavorites(prev => {
          const next = new Set(prev)
          next.delete(contest.id)
          return next
        })
      } else {
        await addFavorite(user.id, contest)
        setFavorites(prev => new Set([...prev, contest.id]))
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      alert('Failed to update favorite. Please try again.')
    }
  }

  if (contests.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-mono" style={{ pointerEvents: 'auto', zIndex: 10000 }}>
        No contests found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto" style={{ pointerEvents: 'auto', zIndex: 10000, position: 'relative' }}>
      <table className="min-w-full" style={{ pointerEvents: 'auto', zIndex: 10001 }}>
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Contest
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {contests.map((contest) => (
            <tr key={contest.id} className="hover:bg-[#1a1a1a] transition-colors" style={{ pointerEvents: 'auto', zIndex: 10002, position: 'relative' }}>
              <td className="px-6 py-4 whitespace-nowrap" style={{ pointerEvents: 'auto' }}>
                <div className="flex items-center gap-2" style={{ pointerEvents: 'auto' }}>
                  {getPlatformIcon(contest.platform)}
                  <span className="text-sm font-mono text-white">{contest.platform}</span>
                </div>
              </td>
              <td className="px-6 py-4" style={{ pointerEvents: 'auto' }}>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-white font-semibold hover:text-primary transition-colors"
                  style={{ pointerEvents: 'auto', zIndex: 10003, position: 'relative', cursor: 'pointer' }}
                >
                  {contest.name}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" style={{ pointerEvents: 'auto' }}>
                <div className="flex items-center gap-2 text-sm font-mono text-gray-400" style={{ pointerEvents: 'auto' }}>
                  <ClockIcon className="w-4 h-4" />
                  <span>
                    {new Date(contest.startTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" style={{ pointerEvents: 'auto' }}>
                <div className="text-sm font-mono text-gray-400">
                  {contest.duration}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" style={{ pointerEvents: 'auto' }}>
                <span
                  className={`px-2 py-1 inline-flex text-xs font-mono font-semibold rounded ${
                    contest.status === 'upcoming'
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : contest.status === 'ongoing'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {contest.status === 'upcoming' ? formatTimeUntil(contest.startTime) : contest.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" style={{ pointerEvents: 'auto' }}>
                <div className="flex items-center gap-3" style={{ pointerEvents: 'auto' }}>
                  <button 
                    onClick={() => handleReminderToggle(contest)}
                    className={`transition-colors ${
                      reminders.has(contest.id) 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-primary'
                    }`}
                    title={reminders.has(contest.id) ? "Remove reminder" : "Set reminder (requires login)"}
                    style={{ pointerEvents: 'auto', zIndex: 10004, position: 'relative', cursor: 'pointer' }}
                  >
                    <BellIcon />
                  </button>
                  <button 
                    onClick={() => handleFavoriteToggle(contest)}
                    className={`transition-colors ${
                      favorites.has(contest.id) 
                        ? 'text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                    title={favorites.has(contest.id) ? "Remove from favorites" : "Add to favorites (requires login)"}
                    style={{ pointerEvents: 'auto', zIndex: 10004, position: 'relative', cursor: 'pointer' }}
                  >
                    <HeartIcon filled={favorites.has(contest.id)} />
                  </button>
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition-colors"
                    title="Open in new tab"
                    style={{ pointerEvents: 'auto', zIndex: 10004, position: 'relative', cursor: 'pointer' }}
                  >
                    <ExternalLinkIcon />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
