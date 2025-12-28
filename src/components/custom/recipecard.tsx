import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

import { HourglassIcon } from "lucide-react";

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface Recipe {
  title: string;
  imageSrc: string;
  timeTaken: number; // in minutes
  servings: number;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const normalizedPath = recipe.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link to={`/recipe/${normalizedPath}`} className="w-fit">
      <Card className="max-w-sm rounded-md p-0 overflow-hidden gap-0 w-80 max-h-54">
        <CardContent className="px-0 overflow-hidden">
          <img
            src={recipe.imageSrc}
            alt={recipe.title}
            className="object-cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 p-4">
          <CardTitle>{recipe.title}</CardTitle>
          <Badge variant="outline">
            <HourglassIcon /> {recipe.timeTaken} mins
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
