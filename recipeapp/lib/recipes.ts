import { createClient } from './supabase/client'

export interface Recipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prep_time?: number
  cook_time?: number
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  cuisine?: string
  user_id: string
  created_at: string
  updated_at: string
}

export const getRecipes = async (searchQuery?: string, filters?: { cuisine?: string; difficulty?: string }) => {
  const supabase = createClient()
  
  let query = supabase
    .from('recipes')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
  }

  if (filters?.cuisine) {
    query = query.eq('category', filters.cuisine)
  }

  const { data, error } = await query
  return { data, error }
}

export const getRecipeBySlug = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export const createRecipe = async (recipeData: {
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prep_time?: number
  cook_time?: number
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  cuisine?: string
  user_id: string
}) => {
  const supabase = createClient()
  
  // Generate slug from title
  const slug = recipeData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  const { data, error } = await supabase
    .from('recipes')
    .insert({
      title: recipeData.title,
      slug: slug,
      description: recipeData.description,
      ingredients: recipeData.ingredients,
      steps: recipeData.instructions, // Map instructions to steps
      prep_time: recipeData.prep_time,
      cook_time: recipeData.cook_time,
      servings: recipeData.servings,
      category: recipeData.cuisine, // Map cuisine to category
      user_id: recipeData.user_id,
      is_public: true
    })
    .select()
    .single()
  return { data, error }
}

export const updateRecipe = async (id: string, recipeData: Partial<Recipe>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .update(recipeData)
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