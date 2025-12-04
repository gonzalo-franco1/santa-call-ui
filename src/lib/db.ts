import { createClient } from './supabase/server'

// Example database operations
// You can extend this with your own tables and operations

export interface SantaCall {
  id?: string
  user_id: string
  child_name: string
  child_info: string
  phone_number: string
  father_email?: string
  scheduled_at?: string
  created_at?: string
  updated_at?: string
}

export async function createSantaCall(data: Omit<SantaCall, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from('santa_calls')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function getSantaCalls(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('santa_calls')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getSantaCallById(id: string, userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('santa_calls')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateSantaCall(
  id: string,
  userId: string,
  updates: Partial<SantaCall>
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('santa_calls')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSantaCall(id: string, userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('santa_calls')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
}

