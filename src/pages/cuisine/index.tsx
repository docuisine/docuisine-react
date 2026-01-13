import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { DropdownMenuDialog, CreateRecipeButton } from "@/pages/recipes";
import { unNormalizeTitle } from "@/lib/utils";
import Filters from "@/components/custom/filters/filters";
import Searchbar from "@/components/custom/searchbar";
import RecipeGrid from "@/components/custom/recipes/recipe-grid";
import exampleRecipes from "@/components/custom/recipes/recipe-example-data";
import type { Cuisine } from "@/lib/types";
import api from "@/lib/api";
import { useState } from "react";
import { urlJoin } from "@/lib/utils";
import { IMAGE_HOST } from "@/lib/settings";

export const CuisineBanner = ({ cuisine, count }: { cuisine: Cuisine, count: number }) => {
  return (
    <div className="w-full h-60 rounded-lg justify-between mb-4 flex">
      <div className="bottom-4 left-4">
        <h2 className="text-2xl font-semibold align-text-bottom">{cuisine.name} - ({count})</h2>
        {cuisine.description && (
          <p className="mt-2 text-lg">{cuisine.description}</p>
        )}
      </div>
      <img
        src={urlJoin(IMAGE_HOST, cuisine.img)}
        alt={cuisine.name}
        className="w-50 h-50 object-cover brightness-75 rounded-md"
      />
    </div>
  );
};

export default function CuisinePage() {
  const { isAuthenticated } = useAuth();
  const [cuisine, setCuisine] = useState<Cuisine | null>(null);
  const { cuisineName } = useParams<{ cuisineName: string }>();
  if (!cuisineName) {
    return <Link to="/" replace />;
  }

  const fetchCuisine = async () => {
    const data = await api.getCuisineByName(unNormalizeTitle(cuisineName));
    setCuisine(data);
  };
  if (!cuisine) {
    fetchCuisine();
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-8 h-full">
      <div className="flex-col gap-8 p-2 hidden md:flex w-44">
        {isAuthenticated && (
          <DropdownMenuDialog>
            <CreateRecipeButton />
          </DropdownMenuDialog>
        )}
        <Filters />
      </div>
      <div className="flex flex-col max-w-full gap-8 overflow-x-hidden">
        <Searchbar />
        <div className="flex flex-col items-start w-full max-w-full">
          <CuisineBanner cuisine={cuisine} count={exampleRecipes.length} />
          <RecipeGrid recipes={exampleRecipes} />
        </div>
      </div>
    </div>
  );
}
