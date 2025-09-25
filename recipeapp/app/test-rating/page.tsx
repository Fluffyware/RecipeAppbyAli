"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { addRatingSimple, getUserRating, getAverageRating } from "@/lib/ratings-simple";

export default function TestRatingPage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<{id: string; title: string}[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title')
        .limit(10);

      if (error) {
        console.error('Error fetching recipes:', error);
        setResult(`Error fetching recipes: ${error.message}`);
        return;
      }

      setRecipes(data || []);
      if (data && data.length > 0) {
        setSelectedRecipe(data[0].id);
      }
    } catch (err) {
      console.error('Error:', err);
      setResult(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const testRating = async () => {
    if (!user || !selectedRecipe || rating === 0) {
      setResult('Please select a recipe and rating');
      return;
    }

    try {
      setLoading(true);
      setResult('Testing rating...');
      
      console.log('Testing rating with:', { recipeId: selectedRecipe, userId: user.id, rating });
      
      const { data, error } = await addRatingSimple(selectedRecipe, user.id, rating);
      
      if (error) {
        console.error('Rating error:', error);
        setResult(`Error: ${error.message} (Code: ${error.code})`);
      } else {
        console.log('Rating success:', data);
        setResult(`Success! Rating saved: ${JSON.stringify(data)}`);
        
        // Test getting the rating back
        const { data: userRating } = await getUserRating(selectedRecipe, user.id);
        console.log('User rating:', userRating);
        
        // Test getting average rating
        const { average, count } = await getAverageRating(selectedRecipe);
        console.log('Average rating:', { average, count });
      }
    } catch (err) {
      console.error('Exception:', err);
      setResult(`Exception: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetRating = async () => {
    if (!user || !selectedRecipe) {
      setResult('Please select a recipe');
      return;
    }

    try {
      setLoading(true);
      setResult('Getting rating...');
      
      const { data, error } = await getUserRating(selectedRecipe, user.id);
      
      if (error) {
        console.error('Get rating error:', error);
        setResult(`Error getting rating: ${error.message}`);
      } else {
        console.log('User rating:', data);
        setResult(`User rating: ${data ? data.rating : 'No rating found'}`);
      }
    } catch (err) {
      console.error('Exception:', err);
      setResult(`Exception: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Rating Test</h1>
          <p className="text-gray-600">Please login to test rating functionality</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rating Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Recipe Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Recipe
            </label>
            <select
              value={selectedRecipe}
              onChange={(e) => setSelectedRecipe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Rating (1-5)
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-full text-2xl ${
                    rating >= star
                      ? 'bg-yellow-400 text-yellow-800'
                      : 'bg-gray-200 text-gray-400'
                  } hover:bg-yellow-300 transition-colors`}
                >
                  ⭐
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Selected: {rating} star{rating !== 1 ? 's' : ''}</p>
          </div>

          {/* Test Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={testRating}
              disabled={loading || rating === 0}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Add/Update Rating'}
            </button>
            
            <button
              onClick={testGetRating}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Get Current Rating'}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Result:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Select a recipe from the dropdown</li>
              <li>Click on stars to select a rating (1-5)</li>
              <li>Click &quot;Test Add/Update Rating&quot; to save the rating</li>
              <li>Click &quot;Get Current Rating&quot; to retrieve the saved rating</li>
              <li>Check the console for detailed logs</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
