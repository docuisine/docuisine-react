import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/old/card";

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
      <Card className="max-w-md">
        <CardContent className="px-0">
          <img
            src={recipe.imageSrc}
            alt={recipe.title}
            className="object-cover h-full w-full"
          />
        </CardContent>
        <CardFooter>
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
