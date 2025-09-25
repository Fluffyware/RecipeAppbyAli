"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function TestBookmarksPage() {
  const { user } = useAuth();
  const [tableStatus, setTableStatus] = useState<{
    bookmarks: { exists: boolean; error?: string };
    ratings: { exists: boolean; error?: string };
  }>({
    bookmarks: { exists: false },
    ratings: { exists: false }
  });
  const [loading, setLoading] = useState(true);

  const checkTables = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();
    
    try {
      setLoading(true);
      
      // Check bookmarks table
      const { error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('id')
        .limit(1);

      // Check ratings table
      const { error: ratingsError } = await supabase
        .from('ratings')
        .select('id')
        .limit(1);

      setTableStatus({
        bookmarks: {
          exists: !bookmarksError,
          error: bookmarksError?.message
        },
        ratings: {
          exists: !ratingsError,
          error: ratingsError?.message
        }
      });

    } catch (err) {
      console.error('Error checking tables:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const testBookmarkCreation = async () => {
    if (!user) return;

    const supabase = createClient();
    
    try {
      // First, get a recipe to bookmark
      const { data: recipes } = await supabase
        .from('recipes')
        .select('id')
        .limit(1);

      if (!recipes || recipes.length === 0) {
        alert('No recipes found. Please create a recipe first.');
        return;
      }

      const recipeId = recipes[0].id;

      // Try to create a bookmark
      const { data, error } = await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          recipe_id: recipeId
        })
        .select()
        .single();

      if (error) {
        console.error('Bookmark creation error:', error);
        alert(`Failed to create bookmark: ${error.message}`);
      } else {
        console.log('Bookmark created successfully:', data);
        alert('Bookmark created successfully!');
        
        // Clean up - delete the test bookmark
        await supabase
          .from('bookmarks')
          .delete()
          .eq('id', data.id);
      }
    } catch (err) {
      console.error('Error testing bookmark creation:', err);
      alert('Error testing bookmark creation');
    }
  };

  useEffect(() => {
    if (user) {
      checkTables();
    }
  }, [user, checkTables]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookmarks & Ratings Test</h1>
        
        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">Please login to test bookmarks functionality.</p>
          </div>
        )}

        {user && (
          <div className="space-y-6">
            {/* Table Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Table Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Bookmarks Table</h3>
                    <p className="text-sm text-gray-600">
                      {tableStatus.bookmarks.exists ? '✅ Table exists' : '❌ Table not found'}
                    </p>
                    {tableStatus.bookmarks.error && (
                      <p className="text-sm text-red-600 mt-1">
                        Error: {tableStatus.bookmarks.error}
                      </p>
                    )}
                  </div>
                  <div className="text-2xl">
                    {tableStatus.bookmarks.exists ? '✅' : '❌'}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Ratings Table</h3>
                    <p className="text-sm text-gray-600">
                      {tableStatus.ratings.exists ? '✅ Table exists' : '❌ Table not found'}
                    </p>
                    {tableStatus.ratings.error && (
                      <p className="text-sm text-red-600 mt-1">
                        Error: {tableStatus.ratings.error}
                      </p>
                    )}
                  </div>
                  <div className="text-2xl">
                    {tableStatus.ratings.exists ? '✅' : '❌'}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Actions</h2>
              
              <div className="space-y-4">
                <button
                  onClick={checkTables}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Refresh Table Status
                </button>
                
                {tableStatus.bookmarks.exists && (
                  <button
                    onClick={testBookmarkCreation}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors ml-4"
                  >
                    Test Bookmark Creation
                  </button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>If tables don&apos;t exist, run the <code>create-missing-tables.sql</code> script in Supabase SQL Editor</li>
                <li>If tables exist but have errors, check RLS policies</li>
                <li>Make sure you&apos;re logged in to test authenticated features</li>
                <li>Check the Supabase dashboard for table structure and policies</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
