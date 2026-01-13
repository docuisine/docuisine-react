import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RecipeModal from "@/components/custom/recipes/recipe-modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog components
import { type Recipe } from "@/lib/types";

import {
  ClockIcon,
  StarIcon,
  UsersIcon,
  EllipsisVerticalIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";


const RecipeDescription = ({ description }: { description: string }) => {
  return (
    <div
      className="absolute inset-0 bg-secondary/96 p-4 h-28 opacity-0 translate-y-2 transition-all
            duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
    >
      <p className="text-sm text-start text-secondary-foreground leading-relaxed whitespace-normal line-clamp-4">
        {description}
      </p>
    </div>
  );
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const imageHoverClass =
    "hover:scale-102 transition-transform duration-400 ease-in-out";

  return (
    <Dialog> {/* 1. The Dialog wraps everything */}
      <Card className="max-w-sm rounded-md p-0 overflow-hidden gap-0 w-60 max-h-54 shadow-none">
        
        {/* 2. Wrap the Image in a Trigger */}
        <DialogTrigger asChild>
          <CardContent className="px-0 overflow-hidden h-28 relative w-full group cursor-pointer">
            {recipe.description && (
              <RecipeDescription description={recipe.description} />
            )}
            <img
              src={recipe.imageSrc}
              alt={recipe.title}
              className={`object-cover ${
                !recipe.description ? imageHoverClass : ""
              }`}
            />
          </CardContent>
        </DialogTrigger>

        <CardFooter className="flex flex-col items-start gap-2 p-2 w-full">
          <div className="flex justify-between w-full gap-2">
            
            {/* 3. Wrap the Title in a Trigger */}
            <DialogTrigger asChild>
              <CardTitle className="text-start leading-relaxed truncate w-full cursor-pointer hover:text-primary transition-colors">
                {recipe.title}
              </CardTitle>
            </DialogTrigger>

            {recipe.rating && (
              <div className="flex items-center gap-1 text-xs font-semibold mr-1">
                <StarIcon
                  size={"1.2em"}
                  className="text-yellow-400 fill-yellow-300"
                />
                {recipe.rating}
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <Badge variant="outline">
              <ClockIcon /> {recipe.timeTaken} min
            </Badge>
            <Badge variant="outline">
              <UsersIcon /> {recipe.servings} servings
            </Badge>
            <Button
              variant={"ghost"}
              size="icon-sm"
              className="ml-auto py-2 rounded-sm"
            >
              <EllipsisVerticalIcon />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <DialogContent className="w-full">
        <RecipeModal/>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeCard;