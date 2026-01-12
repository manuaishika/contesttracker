import { supabase } from '../supabase'

export interface NotificationPreferences {
  email_notifications: boolean
  app_notifications: boolean
  push_notifications: boolean
  sms_notifications: boolean
  default_reminder_time: number // minutes before contest
}

export async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences | null> {
  try {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching notification preferences:', error)
      return null
    }

    // If no preferences exist, create default ones
    if (!data) {
      const defaultPrefs: NotificationPreferences = {
        email_notifications: true,
        app_notifications: true,
        push_notifications: false,
        sms_notifications: false,
        default_reminder_time: 60,
      }
      
      const { data: newData, error: insertError } = await supabase
        .from('user_notification_preferences')
        .insert({
          user_id: userId,
          ...defaultPrefs,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error creating default preferences:', insertError)
        return defaultPrefs
      }

      return newData as NotificationPreferences
    }

    return data as NotificationPreferences
  } catch (error) {
    console.error('Error in getUserNotificationPreferences:', error)
    return null
  }
}

export async function updateNotificationPreferences(
  userId: string,
  preferences: Partial<NotificationPreferences>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_notification_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error updating notification preferences:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in updateNotificationPreferences:', error)
    return false
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

// Show browser notification
export function showNotification(title: string, options?: NotificationOptions) {
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
