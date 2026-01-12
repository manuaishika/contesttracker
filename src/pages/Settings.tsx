import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserNotificationPreferences, updateNotificationPreferences, requestNotificationPermission, NotificationPreferences } from '@/lib/api/notifications'
import { ChartIcon, BellIcon } from '@/components/icons/PlatformIcons'

export function Settings() {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadPreferences() {
      if (user?.id) {
        setLoading(true)
        const prefs = await getUserNotificationPreferences(user.id)
        setPreferences(prefs)
        setLoading(false)
      }
    }
    loadPreferences()
  }, [user?.id])

  const handleToggle = async (key: keyof NotificationPreferences, value: boolean | number) => {
    if (!user?.id || !preferences) return

    const updated = { ...preferences, [key]: value }
    setPreferences(updated)

    // If enabling push notifications, request permission
    if (key === 'push_notifications' && value === true) {
      const hasPermission = await requestNotificationPermission()
      if (!hasPermission) {
        setMessage('Please enable browser notifications in your browser settings')
        updated.push_notifications = false
        setPreferences(updated)
        return
      }
    }

    setSaving(true)
    const success = await updateNotificationPreferences(user.id, updated)
    setSaving(false)

    if (success) {
      setMessage('Settings saved!')
      setTimeout(() => setMessage(null), 3000)
    } else {
      setMessage('Failed to save settings. Please try again.')
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-400 font-mono">
          Please log in to access settings.
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-400 font-mono">
          Loading settings...
        </div>
      </div>
    )
  }

  if (!preferences) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-400 font-mono">
          Failed to load settings.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
          <BellIcon className="text-primary w-8 h-8" />
          <span className="text-primary">{'>'}</span>
          <span className="text-white">Settings</span>
        </h1>
        <p className="text-gray-400 font-mono">Manage your notification preferences</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border font-mono text-sm ${
          message.includes('Failed') 
            ? 'bg-red-500/20 border-red-500/50 text-red-400'
            : 'bg-primary/20 border-primary/50 text-primary'
        }`}>
          {message}
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-mono font-semibold text-white mb-6 flex items-center gap-2">
          <BellIcon className="w-5 h-5 text-primary" />
          Reminder Notifications
        </h2>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-mono font-semibold mb-1">Email Notifications</h3>
              <p className="text-gray-400 font-mono text-sm">Receive reminder emails before contests</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.email_notifications}
                onChange={(e) => handleToggle('email_notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* App Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-mono font-semibold mb-1">In-App Notifications</h3>
              <p className="text-gray-400 font-mono text-sm">Show notifications within the app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.app_notifications}
                onChange={(e) => handleToggle('app_notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-mono font-semibold mb-1">Browser Push Notifications</h3>
              <p className="text-gray-400 font-mono text-sm">Receive browser push notifications (requires permission)</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.push_notifications}
                onChange={(e) => handleToggle('push_notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-mono font-semibold mb-1">SMS Notifications</h3>
              <p className="text-gray-400 font-mono text-sm">Receive text message reminders (coming soon)</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer opacity-50">
              <input
                type="checkbox"
                checked={false}
                disabled
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full"></div>
            </label>
          </div>

          {/* Default Reminder Time */}
          <div>
            <h3 className="text-white font-mono font-semibold mb-3">Default Reminder Time</h3>
            <p className="text-gray-400 font-mono text-sm mb-3">How long before a contest should you be reminded?</p>
            <div className="flex items-center gap-4">
              <select
                value={preferences.default_reminder_time}
                onChange={(e) => handleToggle('default_reminder_time', parseInt(e.target.value))}
                className="bg-[#0a0a0a] border border-gray-800 text-white rounded-md px-4 py-2 font-mono focus:outline-none focus:border-primary transition-colors"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={1440}>1 day</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-mono font-semibold text-white mb-2">About Notifications</h3>
        <ul className="text-gray-400 font-mono text-sm space-y-2 list-disc list-inside">
          <li>Email notifications are sent to your registered email address</li>
          <li>In-app notifications appear when you're using the website</li>
          <li>Browser push notifications work even when the site is closed (requires permission)</li>
          <li>SMS notifications will be available in a future update</li>
        </ul>
      </div>
    </div>
  )
}
