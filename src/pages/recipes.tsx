import Filters from "@/components/custom/filters";
import RecipesExplorer from "@/components/custom/recipesxplorer";

const RecipesPage = () => {
  return (
    <div className="flex gap-8 px-[10vw] h-full">
      <Filters />
      <RecipesExplorer />
    </div>
  );
};

export default RecipesPage;
