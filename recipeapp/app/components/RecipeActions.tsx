"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addBookmark, removeBookmark, checkBookmark } from "@/lib/bookmarks";
import { addRating, getUserRating, getAverageRating } from "@/lib/ratings";

interface RecipeActionsProps {
  recipeId: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
  onRatingChange?: (rating: number) => void;
}

const RecipeActions = ({ recipeId, onBookmarkChange, onRatingChange }: RecipeActionsProps) => {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!user) return;

    try {
      // Check if user has bookmarked this recipe
      const { data: bookmarkData } = await checkBookmark(recipeId, user.id);
      setIsBookmarked(!!bookmarkData);

      // Get user's rating for this recipe
      const { data: ratingData } = await getUserRating(recipeId, user.id);
      setUserRating(ratingData?.rating || 0);
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
    }
  }, [user, recipeId]);

  const fetchRatingData = useCallback(async () => {
    try {
      const { average, count } = await getAverageRating(recipeId);
      setAverageRating(average);
      setRatingCount(count);
    } catch (error) {
      console.error('Error fetching rating data:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
    }
  }, [recipeId]);

  useEffect(() => {
    if (user && recipeId) {
      fetchUserData();
      fetchRatingData();
    }
  }, [user, recipeId, fetchUserData, fetchRatingData]);


  const handleBookmark = async () => {
    if (!user) {
      alert('Please login to bookmark recipes');
      return;
    }

    try {
      setBookmarkLoading(true);
      
      if (isBookmarked) {
        const { error } = await removeBookmark(recipeId, user.id);
        if (error) throw error;
        setIsBookmarked(false);
        onBookmarkChange?.(false);
      } else {
        const { error } = await addBookmark(recipeId, user.id);
        if (error) throw error;
        setIsBookmarked(true);
        onBookmarkChange?.(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user) {
      alert('Please login to rate recipes');
      return;
    }

    try {
      setLoading(true);
      const { error } = await addRating(recipeId, user.id, rating);
      if (error) throw error;
      
      setUserRating(rating);
      onRatingChange?.(rating);
      
      // Refresh average rating
      await fetchRatingData();
    } catch (error) {
      console.error('Error rating recipe:', error);
      alert('Failed to rate recipe');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => alert('Please login to bookmark recipes')}
          className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
        >
          <span>❤️</span>
          <span>Save Recipe</span>
        </button>
        <button
          onClick={() => alert('Please login to rate recipes')}
          className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
        >
          <span>⭐</span>
          <span>Rate Recipe</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bookmark Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isBookmarked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${bookmarkLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>{isBookmarked ? '❤️' : '🤍'}</span>
          <span>{isBookmarked ? 'Saved' : 'Save Recipe'}</span>
        </button>
      </div>

      {/* Rating Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate this Recipe</h3>
        
        {/* Current Rating Display */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= userRating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {userRating > 0 ? `Your rating: ${userRating}/5` : 'Not rated yet'}
          </span>
        </div>

        {/* Average Rating */}
        {ratingCount > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Average: {averageRating}/5 ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
              </span>
            </div>
          </div>
        )}

        {/* Rating Buttons */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRating(rating)}
              disabled={loading}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                userRating === rating
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {rating} ⭐
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeActions;
