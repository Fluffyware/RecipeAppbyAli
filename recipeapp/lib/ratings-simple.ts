import { createClient } from './supabase/client'

export interface Rating {
  id: string
  user_id: string
  recipe_id: string
  rating: number
  created_at: string
}

// Simple rating function using upsert
export const addRatingSimple = async (recipeId: string, userId: string, rating: number) => {
  const supabase = createClient()
  
  console.log('addRatingSimple called:', { recipeId, userId, rating });
  
  try {
    // Use upsert with conflict resolution
    const { data, error } = await supabase
      .from('ratings')
      .upsert({
        user_id: userId,
        recipe_id: recipeId,
        rating: rating
      }, {
        onConflict: 'user_id,recipe_id'
      })
      .select()
      .single()
    
    console.log('Upsert result:', { data, error });
    
    if (error) {
      console.error('Upsert error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    }
    
    return { data, error }
  } catch (err) {
    console.error('Upsert exception:', err);
    return { 
      data: null, 
      error: { 
        message: err instanceof Error ? err.message : 'Unknown error',
        code: 'UNKNOWN',
        details: null,
        hint: null
      }
    }
  }
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
