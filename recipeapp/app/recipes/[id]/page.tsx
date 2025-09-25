"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import RecipeActions from "@/app/components/RecipeActions";
import Comments from "@/app/components/Comments";

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<{
    id: string;
    title: string;
    description?: string;
    ingredients: string[];
    steps: string[];
    prep_time?: number;
    cook_time?: number;
    servings?: number;
    difficulty?: string;
    category?: string;
    created_at: string;
    is_public: boolean;
    profiles?: {
      display_name?: string;
      username?: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles (
            display_name,
            username
          )
        `)
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching recipe:', error);
        setError('Recipe not found');
        return;
      }

      setRecipe(data);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchRecipe();
    }
  }, [params.id, fetchRecipe]);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The recipe you are looking for does not exist.'}</p>
            <Link
              href="/recipes"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200"
            >
              Browse Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/recipes"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
          >
            ← Back to Recipes
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recipe Icon */}
            <div>
              <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-8xl">🍳</span>
              </div>
            </div>

            {/* Recipe Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              
              {recipe.description && (
                <p className="text-gray-600 mb-6">{recipe.description}</p>
              )}

              {/* Recipe Meta */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {totalTime > 0 && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{formatTime(totalTime)}</span>
                  </div>
                )}

                {recipe.servings && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{recipe.servings} servings</span>
                  </div>
                )}

                {recipe.category && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-sm text-gray-600">{recipe.category}</span>
                  </div>
                )}

                {recipe.difficulty && (
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                )}
              </div>

              {/* Recipe Actions */}
              <RecipeActions recipeId={recipe.id} />
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
            <ul className="space-y-3">
              {ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
            <ol className="space-y-4">
              {steps.map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-4">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Recipe Footer */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                👤
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {recipe.profiles?.display_name || recipe.profiles?.username || 'Anonymous Chef'}
                </p>
                <p className="text-sm text-gray-500">
                  Created on {new Date(recipe.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                ❤️
              </button>
              <button className="p-2 text-gray-500 hover:text-yellow-500 transition-colors duration-200">
                ⭐
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                📤
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <Comments recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
}
