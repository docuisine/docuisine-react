import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import RecipeCard from "./recipecard";
import type { Recipe } from "@/lib/types";

const RecipeCarousel = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ScrollArea className="w-full h-fit pb-4 rounded-md whitespace-nowrap flex flex-row">
      <div className="flex w-full space-x-4">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={{...recipe}}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default RecipeCarousel;
