
import React from "react";
import Head from "next/head";


export default function RecipeDetail({ recipe }) {
  if (!recipe) return <p className="text-center">Recipe not found</p>;

  return (
    <>
    <Head>
        <meta charSet="utf-8" />

        <title>{"CookBuddy - Meal Recommendation App"}</title>
        <meta
          name="description"
          content={
            "CookBuddy is a smart meal planner that recommends recipes, shows bookmark recipes, and provides nutritional info — perfect for solo eaters and healthy living."
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
            "CookBuddy is a smart meal planner that recommends recipes, avoids food repetition, and provides nutritional info — perfect for solo eaters and healthy living."
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
    <div className="max-w-4xl mx-auto ">
   
      <h1 className="text-xl lg:text-2xl font-bold text-center">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-contain rounded-xl block mx-auto " />

      <h2 className="text-xl font-semibold">Summary:</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <h2 className="text-xl font-semibold mt-6">Instructions:</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />

      <h2 className="text-xl font-semibold mt-6">Ingredients:</h2>
      <ul className="list-disc list-inside">
        {recipe.extendedIngredients?.map((item) => (
          <li key={item.id}>{item.original}</li>
        ))}
      </ul>

      {recipe.nutrition && (
        <>
          <h2 className="text-xl font-semibold mt-6">Nutrition:</h2>
          <ul>
            {recipe.nutrition.nutrients.map((n) => (
              <li key={n.name}>
                {n.name}: {n.amount} {n.unit}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const recipe = await res.json();

    if (!recipe || recipe.status === "failure") {
      return { notFound: true };
    }

    return {
      props: { recipe },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      props: { recipe: null },
    };
  }
}
