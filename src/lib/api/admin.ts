import { supabase } from '../supabase'

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalReminders: number
  totalFavorites: number
  contestsTracked: number
  platformDistribution: Record<string, number>
}

export async function getAdminStats(userId: string): Promise<AdminStats | null> {
  try {
    // Check if user is admin (you can set this in profiles table)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (profileError) {
      console.error('Error checking admin status:', profileError)
      return null
    }

    if (!profile || !profile.is_admin) {
      return null
    }

    // Get total users count
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Get active users (logged in within last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const { count: activeUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('updated_at', thirtyDaysAgo.toISOString())

    // Get total reminders
    const { count: totalReminders } = await supabase
      .from('contest_reminders')
      .select('*', { count: 'exact', head: true })

    // Get total favorites
    const { count: totalFavorites } = await supabase
      .from('contest_favorites')
      .select('*', { count: 'exact', head: true })

    // Get platform distribution from linked_platforms
    const { data: linkedPlatforms } = await supabase
      .from('linked_platforms')
      .select('platform')

    const platformDistribution: Record<string, number> = {}
    linkedPlatforms?.forEach((lp) => {
      platformDistribution[lp.platform] = (platformDistribution[lp.platform] || 0) + 1
    })

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      totalReminders: totalReminders || 0,
      totalFavorites: totalFavorites || 0,
      contestsTracked: 0, // Can be calculated from reminders/favorites
      platformDistribution,
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return null
  }
}

export async function getAllUsers(userId: string, limit = 50) {
  try {
    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (!profile?.is_admin) {
      return null
    }

    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return null
  }
}
