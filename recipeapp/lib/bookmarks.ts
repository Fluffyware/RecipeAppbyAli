import { createClient } from './supabase/client'

export interface Bookmark {
  id: string
  user_id: string
  recipe_id: string
  created_at: string
}

export const addBookmark = async (recipeId: string, userId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: userId,
      recipe_id: recipeId
    })
    .select()
    .single()
  return { data, error }
}

export const removeBookmark = async (recipeId: string, userId: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
  return { error }
}

export const checkBookmark = async (recipeId: string, userId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .single()
  return { data, error }
}

export const getUserBookmarks = async (userId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      *,
      recipes (
        id,
        title,
        description,
        prep_time,
        cook_time,
        servings,
        category,
        created_at
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}
