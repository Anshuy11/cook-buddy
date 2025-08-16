import { useEffect, useState } from "react";
import RecipeModel from "./RecipeModel";
import TrackableLink from "./TrackableLink";
import { getClickedLinks } from "../lib/getClicks";
import useAnonAuth from "../hooks/useAnonAuth";
import { saveClickedLink } from "../lib/saveClick";
import {
  saveBookmark,
  isBookmarked,
  removeBookmark,
} from "../lib/saveBookmark";

// Recipe type (move to types/Recipe.ts if reused elsewhere)
export interface Recipe {
  id: string;
  title: string;
  image: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: { name: string }[]; // array of objects (safer than string[])
}

interface RecipeCardProps {
  recipe: Recipe;
  viewIngradient?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, viewIngradient }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [missing, setMissing] = useState<{ name: string }[]>([]);
  const [clickedPaths, setClickedPaths] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { user } = useAnonAuth();

  useEffect(() => {
    const fetchClickedAndBookmark = async () => {
      if (user?.uid && recipe) {
        const clicks: { path: string }[] = await getClickedLinks(user.uid);
        setClickedPaths(clicks.map((click) => click.path));

        const isMarked = await isBookmarked(user.uid, recipe.id);
        setBookmarked(isMarked);
      }
    };

    fetchClickedAndBookmark();
  }, [user?.uid, recipe?.id]);

  const hasBeenClicked = clickedPaths.includes(`/recipe/${recipe.id}`);

  const handleTrackClick = async (href: string) => {
    if (user) {
      await saveClickedLink(user.uid, href);
      setClickedPaths((prev) => [...new Set([...prev, href])]);
    }
  };

  const handleBookmark = async () => {
    if (!user) return;

    if (bookmarked) {
      await removeBookmark(user.uid, recipe.id);
      setBookmarked(false);
    } else {
      await saveBookmark(user.uid, recipe);
      setBookmarked(true);
    }
  };

  return (
    <>
      <RecipeModel isModal={isModal} setIsModal={setIsModal} missing={missing} />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:ring-2">
        <div className="relative w-full">
          <button
            onClick={handleBookmark}
            disabled={bookmarked}
            className="absolute top-2 right-2 z-10 bg-black/75 rounded-full p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={bookmarked ? "purple" : "white"}
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <img
            className="w-full h-48 object-cover rounded-t-2xl"
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h5 className="text-md lg:text-xl font-md text-gray-900 dark:text-white mb-2 line-clamp-2">
            {recipe.title}
          </h5>

          {viewIngradient && (
            <>
              <p className="text-gray-700 dark:text-gray-400 text-sm mb-1">
                ✅ Used Ingredients:{" "}
                <span className="font-medium text-blue-600">
                  {recipe.usedIngredientCount}
                </span>
              </p>

              <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                ❌ Missed Ingredients:{" "}
                <span className="font-medium text-red-500">
                  {recipe.missedIngredientCount}
                </span>{" "}
                <span
                  onClick={() => {
                    setIsModal(true);
                    setMissing(recipe.missedIngredients ?? []);
                  }}
                  className="cursor-pointer text-sm text-white hover:text-gray-400"
                >
                  view
                </span>
              </p>
            </>
          )}

          <div className="flex items-center justify-between">
            <TrackableLink
              href={`/recipe/${recipe.id}`}
              viewed={hasBeenClicked}
              onClick={handleTrackClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
