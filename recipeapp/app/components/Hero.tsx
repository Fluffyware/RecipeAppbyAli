"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to recipes page with search query
      router.push(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            RecipeShare
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover, share, and save amazing recipes from our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes, ingredients, or cuisines..."
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => router.push("/recipes")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Recipes
          </button>
          {!user && (
            <>
              <button 
                onClick={() => router.push("/login")}
                className="border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                Login
              </button>
              <button 
                onClick={() => router.push("/register")}
                className="border-2 border-pink-300 text-pink-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-200"
              >
                Register
              </button>
            </>
          )}
          {user && (
            <button 
              onClick={() => router.push("/dashboard")}
              className="border-2 border-green-300 text-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-200"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;



