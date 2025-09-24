"use client";

import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl mr-2">🍳</span>
            <span className="text-xl font-bold text-gray-900">RecipeShare</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Browse Recipes
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              How it Works
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
              Login
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Browse Recipes
              </a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                How it Works
              </a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                About
              </a>
              <div className="pt-4 border-t border-gray-200">
                <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
                  Login
                </button>
                <button className="block w-full text-left px-3 py-2 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



