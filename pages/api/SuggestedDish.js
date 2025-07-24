export default async function handler(req, res) {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ error: "Missing ingredients" });
  }

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      return res.status(200).json([]);
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}
