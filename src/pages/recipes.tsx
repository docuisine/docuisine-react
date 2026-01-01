import Filters from "@/components/custom/filters/filters";
import RecipesExplorer from "@/components/custom/recipes/recipesxplorer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { FileUpIcon } from "lucide-react";
import { SquarePenIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CreateRecipeButton = () => {
  return (
    <Button className="w-full font-semibold text-sm h-12 bg-primary">
      <PlusIcon size={"1.2em"} strokeWidth={3} />
      Add recipe
    </Button>
  );
};

const CreateRecipeDropdownMenu = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CreateRecipeButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Create a new recipe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            navigate("/recipes/create");
          }}
        >
          <SquarePenIcon className="mr-2 inline-block" size={16} />
          Create Recipe
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            navigate("/recipes/import");
          }}
        >
          <FileUpIcon className="mr-2 inline-block" size={16} />
          Import Recipe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RecipesPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex gap-8 h-full">
      <div className="flex-col gap-8 p-2 hidden md:flex">
        {isAuthenticated && <CreateRecipeDropdownMenu />}
        <Filters />
      </div>
      <RecipesExplorer />
    </div>
  );
};

export default RecipesPage;
