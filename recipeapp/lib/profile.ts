import { createClient } from './supabase/client'

export interface Profile {
  id: string
  display_name: string
  username: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export const createProfile = async (profileData: Omit<Profile, 'created_at' | 'updated_at'>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single()
  return { data, error }
}

export const updateProfile = async (id: string, profileData: Partial<Profile>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export const getProfile = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}