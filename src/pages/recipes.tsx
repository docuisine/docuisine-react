import Filters from "@/components/custom/filters";
import RecipesExplorer from "@/components/custom/recipesxplorer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const RecipesPage = () => {
  return (
    <div className="flex gap-8 px-[10vw] h-full background">
      <div className="flex-col gap-8 p-2 hidden md:flex">
        <Button className="w-full font-semibold text-sm h-12 bg-primary">
          <PlusIcon size={"1.2em"} strokeWidth={3} />
          Create Recipe
        </Button>
        <Filters />
      </div>
      <RecipesExplorer />
    </div>
  );
};

export default RecipesPage;
