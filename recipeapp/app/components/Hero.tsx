"use client";

import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup
    console.log("Email signup:", email);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Share & Discover
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Amazing Recipes
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of home cooks sharing their favorite dishes. 
            Discover new flavors, save your favorites, and connect with a vibrant cooking community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Started Free
          </button>
          <button className="border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all duration-200">
            Browse Recipes
          </button>
        </div>

        {/* Email signup */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Join
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2">
            Join 10,000+ home cooks already sharing recipes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">5,000+</div>
            <div className="text-gray-600">Recipes Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Cooks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Recipes Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



