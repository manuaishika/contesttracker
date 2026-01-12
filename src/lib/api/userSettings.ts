import { supabase } from '../supabase'

export interface NotificationPreferences {
  app_notifications: boolean
  email_notifications: boolean
  calendar_export: boolean
  reminder_before_hours: number // e.g., 1 hour, 24 hours before contest
}

export async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    // Return defaults if no settings found
    if (!data) {
      return {
        app_notifications: true,
        email_notifications: false,
        calendar_export: false,
        reminder_before_hours: 24,
      }
    }

    return {
      app_notifications: data.app_notifications ?? true,
      email_notifications: data.email_notifications ?? false,
      calendar_export: data.calendar_export ?? false,
      reminder_before_hours: data.reminder_before_hours ?? 24,
    }
  } catch (error) {
    console.error('Error fetching notification preferences:', error)
    return {
      app_notifications: true,
      email_notifications: false,
      calendar_export: false,
      reminder_before_hours: 24,
    }
  }
}

export async function updateUserNotificationPreferences(
  userId: string,
  preferences: Partial<NotificationPreferences>
) {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    throw error
  }
}

// Request browser notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Send browser notification
export function sendBrowserNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options,
    })
  }
}
