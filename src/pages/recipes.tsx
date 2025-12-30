import Filters from "@/components/custom/filters/filters";
import RecipesExplorer from "@/components/custom/recipes/recipesxplorer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useEffect } from "react";

const RecipesPage = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    document.title = "Recipes - Docuisine";
  }, []);
  return (
    <div className="flex gap-8 h-full">
      <div className="flex-col gap-8 p-2 hidden md:flex">
        {isAuthenticated && (
          <Button className="w-full font-semibold text-sm h-12 bg-primary">
            <PlusIcon size={"1.2em"} strokeWidth={3} />
            Create Recipe
          </Button>
        )}
        <Filters />
      </div>
      <RecipesExplorer />
    </div>
  );
};

export default RecipesPage;
