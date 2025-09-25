"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRecipes } from "@/lib/recipes";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";

const BrowseRecipe = () => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<RecipeCardProps['recipe'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    difficulty: "",
  });

  const fetchRecipes = async (query?: string, filterOptions?: { cuisine?: string; difficulty?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await getRecipes(query, filterOptions);
      
      if (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again.");
        return;
      }
      
      setRecipes(data || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for search query in URL
    const urlSearchQuery = searchParams.get('search');
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      fetchRecipes(urlSearchQuery);
    } else {
      fetchRecipes();
    }
  }, [searchParams]);

  const handleSearch = (query: string, filterOptions: { cuisine?: string; difficulty?: string }) => {
    setSearchQuery(query);
    setFilters({
      cuisine: filterOptions.cuisine || "",
      difficulty: filterOptions.difficulty || "",
    });
    fetchRecipes(query, filterOptions);
  };

  const handleFilterChange = (filterOptions: { cuisine?: string; difficulty?: string }) => {
    setFilters({
      cuisine: filterOptions.cuisine || "",
      difficulty: filterOptions.difficulty || "",
    });
    fetchRecipes(searchQuery, filterOptions);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => fetchRecipes()}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Recipes</h1>
          <p className="text-gray-600">
            Discover amazing recipes from our community
            {recipes.length > 0 && ` (${recipes.length} recipes found)`}
          </p>
        </div>

        <SearchRecipe
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍳</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h2>
            <p className="text-gray-600 mb-6">
              {searchQuery || filters.cuisine || filters.difficulty
                ? "Try adjusting your search or filters"
                : "Be the first to share a recipe!"}
            </p>
            <Link
              href="/recipes/create"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Create Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRecipe;