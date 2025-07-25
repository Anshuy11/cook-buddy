import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeModel from "./RecipeModel";
import TrackableLink from "./TrackableLink";
import { getClickedLinks } from "../lib/getClicks";
import useAnonAuth from "../hooks/useAnonAuth";
import { saveClickedLink } from "../lib/saveClick";

const RecipeCard = ({ recipe }) => {
  const [isModal, setIsModal] = useState(false);
  const [missing, setMissing] = useState([]);
  const [clickedPaths, setClickedPaths] = useState([]);
  const { user } = useAnonAuth(); 

  useEffect(() => {
    const fetchClicked = async () => {
      if (user?.uid) {
        const clicks = await getClickedLinks(user.uid);
        setClickedPaths(clicks.map((click) => click.path));
      }
    };
    fetchClicked();
  }, [user]);

  
  const hasBeenClicked = clickedPaths.includes(`/recipe/${recipe.id}`);
 
const handleTrackClick = async (href) => {
  if (user) {
    await saveClickedLink(user.uid, href);
    setClickedPaths((prev) => [...new Set([...prev, href])]); // update instantly
  }
};
  return (
    <>
      <RecipeModel
        isModal={isModal}
        setIsModal={setIsModal}
        missing={missing}
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:ring-2">
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

          <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
            ❌ Missed Ingredients:{" "}
            <span className="font-medium text-red-500">
              {recipe.missedIngredientCount}
            </span>{" "}
            <span
              onClick={() => {
                setIsModal(true);
                setMissing(recipe.missedIngredients);
              }}
              className="cursor-pointer text-sm text-white hover:text-gray-400"
            >
              view
            </span>
          </p>

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
