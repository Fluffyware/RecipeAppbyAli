"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setMessage("Login successful! Redirecting...");
        router.push("/");
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setMessage("Sign up successful! Please check your email to confirm your account.");
      }
    } catch (error: unknown) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🍳</span>
            <h1 className="text-2xl font-bold text-gray-900">RecipeShare</h1>
          </div>
          <p className="text-gray-600">
            {isLogin ? "Welcome back!" : "Join our community of food lovers"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes("Error") 
              ? "bg-red-50 border border-red-200 text-red-800" 
              : "bg-green-50 border border-green-200 text-green-800"
          }`}>
            {message}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
