export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: string[];
}

export interface RecipeCardProps {
  recipe: Recipe;
  viewIngradient?: boolean;
}