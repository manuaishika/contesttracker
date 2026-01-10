import { supabase } from '../supabase'
import { Contest } from '../types'

export async function addFavorite(userId: string, contest: Contest) {
  try {
    const { data, error } = await supabase
      .from('contest_favorites')
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
    console.error('Error adding favorite:', error)
    throw error
  }
}

export async function removeFavorite(userId: string, contestId: string) {
  try {
    const { error } = await supabase
      .from('contest_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('contest_id', contestId)

    if (error) throw error
  } catch (error) {
    console.error('Error removing favorite:', error)
    throw error
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const { data, error } = await supabase
      .from('contest_favorites')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
}

export async function isFavorite(userId: string, contestId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('contest_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('contest_id', contestId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  } catch (error) {
    console.error('Error checking favorite:', error)
    return false
  }
}
