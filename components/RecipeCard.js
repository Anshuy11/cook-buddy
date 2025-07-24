import { useRouter } from "next/router";
import React, { useState } from "react";
import RecipeModel from "./RecipeModel";

const RecipeCard = ({ recipe }) => {
  const [isModal, setIsModal] = useState(false);
  const [missing, setMissing] = useState([]);

  return (
    <>
      <RecipeModel
        isModal={isModal}
        setIsModal={setIsModal}
        missing={missing}
      />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600  shadow-lghover:border-blue-500 hover:ring-2   transition-all duration-300">
        <img
          className="w-full h-48 object-cover rounded-t-2xl"
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
        />
        <div className="p-4">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {recipe.title}
          </h5>
          <p className="text-gray-700 dark:text-gray-400 text-sm mb-1">
            ✅ Used Ingredients:{" "}
            <span className="font-medium text-blue-600">
              {recipe.usedIngredientCount}
            </span>
          </p>
    <div>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 gap-2">
              ❌ Missed Ingredients:{" "}
              <span className="font-medium text-red-500">
                {recipe.missedIngredientCount}
              </span> {" "} <span
              onClick={() => {
                setIsModal(true);
                setMissing(recipe.missedIngredients);
              }}
              className="cursor-pointer text-sm text-white hover:text-gray-400 "
            >
              view
            </span>
            </p>
           
          </div>

          <a
            href={`/recipe/${recipe.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
              View
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
