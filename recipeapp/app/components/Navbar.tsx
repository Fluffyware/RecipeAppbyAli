"use client";

import { useState } from "react";
import Link from "next/link";
import AuthButton from "./AuthButton";

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
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <span className="text-2xl mr-2">🍳</span>
            <span className="text-xl font-bold text-gray-900">RecipeShare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/recipes" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Browse Recipes
            </Link>
            <Link href="/recipes/create" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Create Recipe
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Dashboard
            </Link>
            <Link href="/bookmarks" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              My Bookmarks
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Profile
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            <AuthButton />
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
              <Link href="/recipes" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Browse Recipes
              </Link>
              <Link href="/recipes/create" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Create Recipe
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Dashboard
              </Link>
              <Link href="/bookmarks" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                My Bookmarks
              </Link>
              <Link href="/profile" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Profile
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;