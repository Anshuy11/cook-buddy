import { useEffect, useState } from "react";
import Head from "next/head";
import { getBookmarks } from "../lib/getBookmarks";
import useAnonAuth from "../hooks/useAnonAuth";
import { removeBookmark, saveBookmark } from "../lib/saveBookmark";
import RecipeCard from "@/components/RecipeCard";
import Loader from "@/components/Loader";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const { user } = useAnonAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user?.uid) {
        const data = await getBookmarks(user.uid);
        setBookmarks(data);

        const ids = new Set(data.map((r) => r.id));
        setBookmarkedIds(ids);
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <title>{"CookBuddy - Meal Recommendation App"}</title>
        <meta
          name="description"
          content={
            "CookBuddy is a smart meal planner that recommends recipes, shows bookmark recipes, and provides nutritional info — perfect for healthy living."
          }
        />
        <link rel="canonical" href="https://cook-buddy.vercel.app/" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" type="image/png" sizes="32x32" href="headLogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="headLogo.png" />
        <meta
          property="og:title"
          content={"CookBuddy - Meal Recommendation App"}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={
            "CookBuddy is a smart meal planner that recommends recipes, shows bookmark recipes, and provides nutritional info — perfect for healthy living."
          }
        />
        <meta name="robots" content="max-image-preview:large"></meta>
        <meta name="robots" content="NOODP" />
        <meta property="og:url" content="https://cook-buddy.vercel.app/" />
        <meta property="og:image" content="headLogo.png" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      </Head>
      <div className="p-6">
        <h2 className="lg:text-2xl text-lg text-center font-bold mb-4">
          Your Bookmarked Recipes
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            {bookmarks.length === 0 ? (
              <p className="text-center">No bookmarks yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {bookmarks.map((bookmark) => (
                  <RecipeCard
                    key={bookmark.id}
                    recipe={bookmark}
                    viewIngradient={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookmarksPage;
