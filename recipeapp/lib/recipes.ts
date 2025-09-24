import { createClient } from './supabase/client'
import { createClient as createServerClient } from './supabase/server'
import { Database } from '../types/database'

type Recipe = Database['public']['Tables']['recipes']['Row']
type RecipeInsert = Database['public']['Tables']['recipes']['Insert']
type RecipeUpdate = Database['public']['Tables']['recipes']['Update']

// Client-side recipe operations
export const getRecipes = async (limit = 10, offset = 0) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles!recipes_user_id_fkey (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  return { data, error }
}

export const getRecipeBySlug = async (slug: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles!recipes_user_id_fkey (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .eq('is_public', true)
    .single()
  
  return { data, error }
}

export const createRecipe = async (recipe: RecipeInsert) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .insert(recipe)
    .select()
    .single()
  
  return { data, error }
}

export const updateRecipe = async (id: string, updates: RecipeUpdate) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const deleteRecipe = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Server-side recipe operations
export const getServerRecipes = async (limit = 10, offset = 0) => {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles!recipes_user_id_fkey (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  return { data, error }
}

export const getServerRecipeBySlug = async (slug: string) => {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles!recipes_user_id_fkey (
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .eq('is_public', true)
    .single()
  
  return { data, error }
}
