"use client";

import { useState } from "react";

interface SearchRecipeProps {
  onSearch: (query: string, filters: { cuisine?: string; difficulty?: string }) => void;
  onFilterChange: (filters: { cuisine?: string; difficulty?: string }) => void;
}

const SearchRecipe = ({ onSearch, onFilterChange }: SearchRecipeProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    difficulty: "",
  });

  const cuisines = [
    "Italian", "Mexican", "Chinese", "Japanese", "Indian", "French", 
    "Thai", "Mediterranean", "American", "Korean", "Vietnamese", "Other"
  ];

  const difficulties = ["easy", "medium", "hard"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { cuisine: "", difficulty: "" };
    setFilters(clearedFilters);
    setSearchQuery("");
    onFilterChange(clearedFilters);
    onSearch("", clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients, or cuisines..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine
          </label>
          <select
            value={filters.cuisine}
            onChange={(e) => handleFilterChange("cuisine", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Levels</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {filters.cuisine || filters.difficulty ? "Filters applied" : "No filters"}
        </div>
        <button
          onClick={clearFilters}
          className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchRecipe;