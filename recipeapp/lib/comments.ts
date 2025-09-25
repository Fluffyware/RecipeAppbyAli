import { createClient } from './supabase/client'

export interface Comment {
  id: string
  recipe_id: string
  user_id: string
  content: string
  parent_id?: string
  created_at: string
  profiles?: {
    display_name: string
    username: string
    avatar_url?: string
  }
}

export const addComment = async (recipeId: string, userId: string, content: string, parentId?: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .insert({
      recipe_id: recipeId,
      user_id: userId,
      content: content,
      parent_id: parentId || null
    })
    .select(`
      *,
      profiles (
        display_name,
        username,
        avatar_url
      )
    `)
    .single()
  return { data, error }
}

export const getComments = async (recipeId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('recipe_id', recipeId)
    .is('parent_id', null) // Only top-level comments
    .order('created_at', { ascending: true })
  return { data, error }
}

export const getReplies = async (parentId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('parent_id', parentId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export const deleteComment = async (commentId: string, userId: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId)
  return { error }
}

export const updateComment = async (commentId: string, userId: string, content: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .eq('user_id', userId)
    .select(`
      *,
      profiles (
        display_name,
        username,
        avatar_url
      )
    `)
    .single()
  return { data, error }
}
