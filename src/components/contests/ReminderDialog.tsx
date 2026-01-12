import { useState, useEffect } from 'react'
import { Contest } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'
import { getUserNotificationPreferences, NotificationPreferences } from '@/lib/api/notifications'

interface ReminderDialogProps {
  contest: Contest
  onConfirm: (method: string, timeBefore: number) => void
  onCancel: () => void
}

export function ReminderDialog({ contest, onConfirm, onCancel }: ReminderDialogProps) {
  const { user } = useAuth()
  const [notificationMethod, setNotificationMethod] = useState<string>('app')
  const [reminderTime, setReminderTime] = useState<number>(60)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPrefs() {
      if (user?.id) {
        const prefs = await getUserNotificationPreferences(user.id)
        if (prefs) {
          setReminderTime(prefs.default_reminder_time)
          if (prefs.app_notifications && prefs.email_notifications) {
            setNotificationMethod('both')
          } else if (prefs.app_notifications) {
            setNotificationMethod('app')
          } else if (prefs.email_notifications) {
            setNotificationMethod('email')
          }
        }
      }
      setLoading(false)
    }
    loadPrefs()
  }, [user?.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(notificationMethod, reminderTime)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
          <p className="text-gray-400 font-mono text-center">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border-glow-green" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-mono font-bold text-white mb-2">Set Reminder</h3>
        <p className="text-gray-400 font-mono text-sm mb-6">{contest.name}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Notification Method */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              How would you like to be notified?
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="app"
                  checked={notificationMethod === 'app'}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  className="text-primary"
                />
                <span className="text-white font-mono text-sm">In-App Notification</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="email"
                  checked={notificationMethod === 'email'}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  className="text-primary"
                />
                <span className="text-white font-mono text-sm">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="both"
                  checked={notificationMethod === 'both'}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  className="text-primary"
                />
                <span className="text-white font-mono text-sm">Both (App + Email)</span>
              </label>
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Remind me how long before?
            </label>
            <select
              value={reminderTime}
              onChange={(e) => setReminderTime(parseInt(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-md px-4 py-2 font-mono focus:outline-none focus:border-primary transition-colors"
            >
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={1440}>1 day</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-gray-800 text-white rounded-md hover:border-gray-600 transition-colors font-mono text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-mono font-semibold text-sm"
            >
              Set Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
