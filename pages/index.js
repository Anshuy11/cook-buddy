"use client";

import { useState, useEffect, useCallback } from "react";
import IngredientMultiSelect from "@/components/IngredientMultiSelect";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const RecipeCard = dynamic(() => import("@/components/RecipeCard"), {
  loading: () => <Loader />,
});

const bannedIngredients = [
  "beef", "pork", "bacon", "ham", "alcohol", "rum", "vodka", "whiskey", "wine", "brandy",
  "lamb", "veal", "beer", "gelatin", "prosciutto", "pepperoni", "salami", "sausage",
];

const filterIndianFriendlyRecipes = (recipes) => {
  return recipes.filter((recipe) => {
    const allIngredients = [
      ...recipe.usedIngredients,
      ...recipe.missedIngredients,
      ...(recipe.unusedIngredients || []),
    ];
    return !allIngredients.some((ingredient) =>
      bannedIngredients.some((banned) =>
        ingredient.name.toLowerCase().includes(banned)
      )
    );
  });
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [ingredientsQuery, setIngredientsQuery] = useState("");
  const itemsPerPage = 100;

  const fetchRecipes = async (ingredients) => {
    setLoading(true);
    setIngredientsQuery(ingredients);
    setOffset(0);

    try {
      const res = await fetch(`/api/SuggestedDish?ingredients=${ingredients}&offset=0`);
      const data = await res.json();
      const filtered = filterIndianFriendlyRecipes(data);

      setRecipes(filtered);
      setOffset(itemsPerPage);
      setHasMore(filtered.length === itemsPerPage);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    }

    setLoading(false);
  };

  const loadMore = useCallback(async () => {
    if (!ingredientsQuery) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/SuggestedDish?ingredients=${ingredientsQuery}&offset=${offset}`);
      const data = await res.json();
      const filtered = filterIndianFriendlyRecipes(data);

      setRecipes((prev) => [...prev, ...filtered]);
      setOffset((prev) => prev + itemsPerPage);
      setHasMore(filtered.length === itemsPerPage);
    } catch (err) {
      console.error("Failed to load more recipes:", err);
    }

    setLoading(false);
  }, [offset, ingredientsQuery]);

  return (
    <div className="p-4">
      <IngredientMultiSelect onSearch={fetchRecipes} />

      {recipes.length === 0 && !loading && ingredientsQuery.length !=0 && (
        <p className="text-center text-gray-500 mt-6">No recipes found for selected ingredients.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-[#03678e] via-[#600492] to-[#03678e] text-white px-6 py-2 rounded-xl hover:opacity-90 transition-all"
          >
            Load More Recipes
          </button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}

      {!loading && !hasMore && recipes.length > 0 && (
        <p className="text-center text-gray-500 mt-4">No more recipes found.</p>
      )}
    </div>
  );
}
