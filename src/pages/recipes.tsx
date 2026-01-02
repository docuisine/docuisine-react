import Filters from "@/components/custom/filters/filters";
import RecipesExplorer from "@/components/custom/recipes/recipesxplorer";
import RecipeImportForm from "@/components/custom/recipes/recipe-import-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon, FileUpIcon, SquarePenIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DropdownMenuDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showShareDialog, setShowImportDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                navigate("/recipes/create");
              }}
            >
              <SquarePenIcon className="mr-2 inline-block" size={16} />
              Create
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowImportDialog(true)}>
              <FileUpIcon className="mr-2 inline-block" size={16} />
              Import
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showShareDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Import Recipe</DialogTitle>
            <DialogDescription>
              Impoort a recipe by sharing a JSON file.{" "}
              <Link
                to="https://iragca.github.io/docuisine/user-guide/importing-recipes"
                target="_blank"
                className="underline"
              >
                Read more
              </Link>
            </DialogDescription>
          </DialogHeader>
          <RecipeImportForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const CreateRecipeButton = () => {
  return (
    <div
      className={cn(
        buttonVariants({
          size: "default",
          variant: "default",
          className: "w-full font-semibold text-sm h-12 bg-primary",
        })
      )}
    >
      <PlusIcon size={"1.2em"} strokeWidth={3} />
      Add recipe
    </div>
  );
};

const RecipesPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex gap-8 h-full">
      <div className="flex-col gap-8 p-2 hidden md:flex">
        {/* {isAuthenticated && <CreateRecipeDropdownMenu />} */}
        {isAuthenticated && (
          <DropdownMenuDialog>
            <CreateRecipeButton />
          </DropdownMenuDialog>
        )}
        <Filters />
      </div>
      <RecipesExplorer />
    </div>
  );
};

export default RecipesPage;
