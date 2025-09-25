import { createClient } from './supabase/client'

export interface Rating {
  id: string
  user_id: string
  recipe_id: string
  rating: number
  created_at: string
  updated_at: string
}

export const addRating = async (recipeId: string, userId: string, rating: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ratings')
    .upsert({
      user_id: userId,
      recipe_id: recipeId,
      rating: rating
    })
    .select()
    .single()
  return { data, error }
}

export const getUserRating = async (recipeId: string, userId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .single()
  return { data, error }
}

export const getRecipeRatings = async (recipeId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('recipe_id', recipeId)
  return { data, error }
}

export const getAverageRating = async (recipeId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ratings')
    .select('rating')
    .eq('recipe_id', recipeId)
  
  if (error) return { average: 0, count: 0, error }
  
  const ratings = data || []
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
  const average = ratings.length > 0 ? sum / ratings.length : 0
  
  return { average: Math.round(average * 10) / 10, count: ratings.length, error: null }
}
