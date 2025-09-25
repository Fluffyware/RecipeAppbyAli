"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    myRecipes: 0,
    favorites: 0,
    reviews: 0,
  });
  const [recentRecipes, setRecentRecipes] = useState<{
    id: string;
    title: string;
    created_at: string;
    is_public: boolean;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();
    
    try {
      setLoading(true);

      // Get user's recipes count
      const { count: recipesCount } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get user's bookmarks count
      const { count: bookmarksCount } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get user's ratings count
      const { count: ratingsCount } = await supabase
        .from('ratings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get recent recipes
      const { data: recentRecipesData } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      setStats({
        myRecipes: recipesCount || 0,
        favorites: bookmarksCount || 0,
        reviews: ratingsCount || 0,
      });

      setRecentRecipes(recentRecipesData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="ml-4">
                      <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.display_name || "Chef"}! 👋
            </h1>
            <p className="text-gray-600">
              Manage your recipes and discover new ones from our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* My Recipes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🍳
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.myRecipes}</p>
                  <p className="text-gray-600">My Recipes</p>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-xl">
                  ❤️
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.favorites}</p>
                  <p className="text-gray-600">Favorites</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xl">
                  ⭐
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.reviews}</p>
                  <p className="text-gray-600">Reviews</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link
                  href="/recipes/create"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-center"
                >
                  Create New Recipe
                </Link>
                <Link
                  href="/recipes"
                  className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 text-center"
                >
                  Browse Recipes
                </Link>
                       <Link
                         href="/bookmarks"
                         className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
                       >
                         My Bookmarks
                       </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Recipes</h2>
              {recentRecipes.length > 0 ? (
                <div className="space-y-4">
                  {recentRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                        🍳
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {recipe.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(recipe.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          recipe.is_public 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {recipe.is_public ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/recipes"
                    className="block text-center text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-200"
                  >
                    View All Recipes →
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-gray-500">No recipes yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start by creating your first recipe!</p>
                  <Link
                    href="/recipes/create"
                    className="inline-block mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
                  >
                    Create Recipe
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}