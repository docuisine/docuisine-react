import type { Recipe } from "@/lib/types";
import RecipeCard from "./recipecard";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.title} recipe={recipe} />
      ))}
    </div>
  );
}
