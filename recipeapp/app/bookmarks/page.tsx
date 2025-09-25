"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserBookmarks } from "@/lib/bookmarks";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function BookmarksPage() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<{
    id: string;
    user_id: string;
    recipe_id: string;
    created_at: string;
    recipes: {
      id: string;
      title: string;
      description?: string;
      prep_time?: number;
      cook_time?: number;
      servings?: number;
      category?: string;
      created_at: string;
    };
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching bookmarks for user:', user.id);
      const { data, error } = await getUserBookmarks(user.id);
      
      if (error) {
        console.error('Error fetching bookmarks:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        // More specific error messages
        if (error.code === 'PGRST116') {
          setError('No bookmarks found. Start bookmarking some recipes!');
        } else if (error.message.includes('relation "bookmarks" does not exist')) {
          setError('Bookmarks table not found. Please run the database setup script.');
        } else if (error.message.includes('permission denied')) {
          setError('Permission denied. Please check your authentication.');
        } else {
          setError(`Failed to load bookmarks: ${error.message || 'Unknown error'}`);
        }
        return;
      }

      console.log('Bookmarks fetched successfully:', data);
      setBookmarks(data || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(`Failed to load bookmarks: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user, fetchBookmarks]);


  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
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
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Bookmarks</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchBookmarks}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Recipes</h1>
            <p className="text-gray-600">
              {bookmarks.length > 0 
                ? `You have saved ${bookmarks.length} recipe${bookmarks.length === 1 ? '' : 's'}`
                : 'No saved recipes yet'
              }
            </p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Saved Recipes Yet</h2>
              <p className="text-gray-600 mb-6">
                Start exploring recipes and save your favorites!
              </p>
              <Link
                href="/recipes"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200"
              >
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => {
                const recipe = bookmark.recipes;
                if (!recipe) return null;

                const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

                return (
                  <div key={bookmark.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                    {/* Recipe Icon Header */}
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center">
                      <span className="text-6xl">🍳</span>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {recipe.title}
                      </h3>
                      
                      {recipe.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {recipe.description}
                        </p>
                      )}
                      
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
                        <span className="text-xs text-gray-500">
                          Saved on {new Date(bookmark.created_at).toLocaleDateString()}
                        </span>
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
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
