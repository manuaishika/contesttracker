import { supabase } from '../supabase'
import { Contest } from '../types'

export async function addReminder(userId: string, contest: Contest) {
  try {
    const { data, error } = await supabase
      .from('contest_reminders')
      .insert({
        user_id: userId,
        contest_id: contest.id,
        contest_name: contest.name,
        platform: contest.platform,
        start_time: contest.startTime,
        url: contest.url,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding reminder:', error)
    throw error
  }
}

export async function removeReminder(userId: string, contestId: string) {
  try {
    const { error } = await supabase
      .from('contest_reminders')
      .delete()
      .eq('user_id', userId)
      .eq('contest_id', contestId)

    if (error) throw error
  } catch (error) {
    console.error('Error removing reminder:', error)
    throw error
  }
}

export async function getUserReminders(userId: string) {
  try {
    const { data, error } = await supabase
      .from('contest_reminders')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return []
  }
}

export async function isReminderSet(userId: string, contestId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('contest_reminders')
      .select('id')
      .eq('user_id', userId)
      .eq('contest_id', contestId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return !!data
  } catch (error) {
    console.error('Error checking reminder:', error)
    return false
  }
}
