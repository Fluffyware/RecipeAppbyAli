import { createClient } from './supabase/server'

export const getServerUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}