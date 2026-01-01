import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

import { HourglassIcon } from "lucide-react";

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface Recipe {
  title: string;
  imageSrc: string;
  timeTaken: number; // in minutes
  servings: number;
  description?: string;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const normalizedPath = recipe.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link to={`/recipe/${normalizedPath}`} className="w-fit">
      <Card className="max-w-sm rounded-md p-0 overflow-hidden gap-0 w-60 max-h-54">
        <CardContent className="px-0 overflow-hidden h-28 relative w-full group">
          {recipe.description && (
            <div
              className="absolute inset-0 bg-accent/90 p-2 h-28 opacity-0 translate-y-2 transition-all
            duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
            >
              <p className="text-sm text-start text-foreground leading-relaxed whitespace-normal line-clamp-4">
                {recipe.description}
              </p>
            </div>
          )}
          <img
            src={recipe.imageSrc}
            alt={recipe.title}
            className="object-cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 py-2 px-2 w-full">
          <CardTitle className="text-start leading-relaxed truncate w-full">
            {recipe.title}
          </CardTitle>
          <Badge variant="outline">
            <HourglassIcon /> {recipe.timeTaken} mins
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
