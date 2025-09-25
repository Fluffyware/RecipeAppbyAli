"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing...");
  const [userCount, setUserCount] = useState<number | null>(null);
  const [recipeCount, setRecipeCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createClient();
        
        // Test 1: Basic connection
        console.log("Testing Supabase connection...");
        setConnectionStatus("Testing connection...");
        
        // Test 2: Check if we can access auth
        const { error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.log("Auth test (expected for unauthenticated):", authError.message);
        }
        
        // Test 3: Try to access profiles table
        const { error: profilesError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
        
        if (profilesError) {
          throw new Error(`Profiles table error: ${profilesError.message}`);
        }
        
        // Test 4: Try to access recipes table
        const { error: recipesError } = await supabase
          .from('recipes')
          .select('id')
          .limit(1);
        
        if (recipesError) {
          throw new Error(`Recipes table error: ${recipesError.message}`);
        }
        
        // Test 5: Get actual counts
        const { count: userCountResult } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        const { count: recipeCountResult } = await supabase
          .from('recipes')
          .select('*', { count: 'exact', head: true });
        
        setUserCount(userCountResult);
        setRecipeCount(recipeCountResult);
        setConnectionStatus("✅ Connected successfully!");
        setError(null);
        
      } catch (err: unknown) {
        console.error("Supabase connection error:", err);
        setConnectionStatus("❌ Connection failed!");
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🧪 Supabase Connection Test
          </h1>
          
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
              <div className="text-lg">
                {connectionStatus}
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">Error Details:</p>
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                </div>
              )}
            </div>

            {/* Database Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">👥 Users</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {userCount !== null ? userCount : "Loading..."}
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">🍳 Recipes</h3>
                <div className="text-2xl font-bold text-green-600">
                  {recipeCount !== null ? recipeCount : "Loading..."}
                </div>
              </div>
            </div>

            {/* Environment Check */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">🔧 Environment Variables</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-32">SUPABASE_URL:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    process.env.NEXT_PUBLIC_SUPABASE_URL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-32">ANON_KEY:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-32">SERVICE_KEY:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    process.env.SUPABASE_SERVICE_ROLE_KEY ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">🚀 Next Steps</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• If connection is successful, you can start building features</li>
                <li>• If there are errors, check your .env.local file</li>
                <li>• Make sure you&apos;ve run the SQL commands from PRD/Table.sql</li>
                <li>• Test authentication by creating login/register pages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
