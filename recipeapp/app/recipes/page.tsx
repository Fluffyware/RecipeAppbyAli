import { Suspense } from "react";
import BrowseRecipe from "../components/BrowseRecipe";

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
    </div>}>
      <BrowseRecipe />
    </Suspense>
  );
}