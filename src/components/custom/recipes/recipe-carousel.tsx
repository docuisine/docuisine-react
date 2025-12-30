import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import RecipeCard, { type Recipe } from "./recipecard";

const RecipeCarousel = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ScrollArea className="w-full h-fit pb-4 rounded-md whitespace-nowrap flex flex-row">
      <div className="flex w-full space-x-4">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={{
              title: recipe.title,
              imageSrc: recipe.imageSrc,
              timeTaken: recipe.timeTaken,
              servings: recipe.servings,
            }}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default RecipeCarousel;
