"use client";

import Link from "next/link";

export interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    description?: string;
    ingredients: string[];
    prep_time?: number;
    cook_time?: number;
    servings?: number;
    difficulty?: string;
    category?: string;
    [key: string]: unknown;
  };
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
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

  // Handle different data structures
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Recipe Icon Header */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-32 flex items-center justify-center">
        <span className="text-6xl">🍳</span>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {recipe.title}
          </h3>
          {recipe.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {totalTime > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(totalTime)}
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {recipe.servings} servings
              </span>
            )}
          </div>
          {recipe.category && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {recipe.category}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {ingredients.slice(0, 3).map((ingredient: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
              >
                {ingredient}
              </span>
            ))}
            {ingredients.length > 3 && (
              <span className="text-xs text-gray-500">
                +{ingredients.length - 3} more
              </span>
            )}
          </div>
          
          <Link 
            href={`/recipes/${recipe.id}`}
            className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-200"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;