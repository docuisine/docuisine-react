import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Cookbook {
  title: string;
  imageSrc: string;
  description?: string;
  author?: string;
}

const CookbookCard = ({ cookbook }: { cookbook: Cookbook }) => {
  const normalizedPath = cookbook.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to={`/cookbooks/${normalizedPath}`}
      className="max-w-[min(24%,300px)]"
    >
      <Card className="max-h-54 p-0 overflow-hidden rounded-md gap-0 flex justify-between flex-col">
        <CardContent className="px-0 overflow-hidden">
          <img
            src={cookbook.imageSrc}
            alt={cookbook.title}
            className="object-cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 p-4 h-fit">
          <div className="flex flex-row items-center w-full">
            <CardTitle className="mr-auto">{cookbook.title}</CardTitle>
            <div className="text-muted-foreground text-xs">
              {cookbook.author}
            </div>
          </div>
          <CardDescription className="text-left">
            {cookbook.description}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CookbookCard;
