"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestTablesPage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const testTables = async () => {
    setLoading(true);
    setResults([]);
    const supabase = createClient();
    const newResults: string[] = [];

    try {
      // Test 1: Check if bookmarks table exists
      newResults.push("🔍 Testing bookmarks table...");
      const { data: bookmarksData, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('*')
        .limit(1);
      
      if (bookmarksError) {
        newResults.push(`❌ Bookmarks table error: ${bookmarksError.message}`);
        newResults.push(`   Code: ${bookmarksError.code}`);
        newResults.push(`   Details: ${bookmarksError.details}`);
        newResults.push(`   Hint: ${bookmarksError.hint}`);
      } else {
        newResults.push(`✅ Bookmarks table accessible`);
        newResults.push(`   Records found: ${bookmarksData?.length || 0}`);
      }

      // Test 2: Check if ratings table exists
      newResults.push("\n🔍 Testing ratings table...");
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('ratings')
        .select('*')
        .limit(1);
      
      if (ratingsError) {
        newResults.push(`❌ Ratings table error: ${ratingsError.message}`);
        newResults.push(`   Code: ${ratingsError.code}`);
        newResults.push(`   Details: ${ratingsError.details}`);
        newResults.push(`   Hint: ${ratingsError.hint}`);
      } else {
        newResults.push(`✅ Ratings table accessible`);
        newResults.push(`   Records found: ${ratingsData?.length || 0}`);
      }

      // Test 3: Check if recipes table exists
      newResults.push("\n🔍 Testing recipes table...");
      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .limit(1);
      
      if (recipesError) {
        newResults.push(`❌ Recipes table error: ${recipesError.message}`);
        newResults.push(`   Code: ${recipesError.code}`);
        newResults.push(`   Details: ${recipesError.details}`);
        newResults.push(`   Hint: ${recipesError.hint}`);
      } else {
        newResults.push(`✅ Recipes table accessible`);
        newResults.push(`   Records found: ${recipesData?.length || 0}`);
      }

      // Test 4: Check if profiles table exists
      newResults.push("\n🔍 Testing profiles table...");
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (profilesError) {
        newResults.push(`❌ Profiles table error: ${profilesError.message}`);
        newResults.push(`   Code: ${profilesError.code}`);
        newResults.push(`   Details: ${profilesError.details}`);
        newResults.push(`   Hint: ${profilesError.hint}`);
      } else {
        newResults.push(`✅ Profiles table accessible`);
        newResults.push(`   Records found: ${profilesData?.length || 0}`);
      }

      // Test 5: Check auth status
      newResults.push("\n🔍 Testing auth status...");
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        newResults.push(`❌ Auth error: ${authError.message}`);
      } else if (user) {
        newResults.push(`✅ User authenticated: ${user.email}`);
      } else {
        newResults.push(`⚠️ No user authenticated`);
      }

    } catch (error) {
      newResults.push(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Database Tables</h1>
          
          <button
            onClick={testTables}
            disabled={loading}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? 'Testing...' : 'Test Tables'}
          </button>

          {results.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results:</h2>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {results.join('\n')}
              </pre>
            </div>
          )}

          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>If bookmarks/ratings tables don&apos;t exist, create them using the SQL from PRD/Table.sql</li>
              <li>If tables exist but have RLS errors, run the RLS_Bookmarks_Ratings.sql script</li>
              <li>Make sure you&apos;re logged in to test authenticated features</li>
              <li>Check the Supabase dashboard for table structure and policies</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
