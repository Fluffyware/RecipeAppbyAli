import { createClient } from './supabase/client'
import { createClient as createServerClient } from './supabase/server'

// Client-side auth helpers
export const signUp = async (email: string, password: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Server-side auth helpers
export const getServerUser = async () => {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getServerProfile = async (userId: string) => {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}
