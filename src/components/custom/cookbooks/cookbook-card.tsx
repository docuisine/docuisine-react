import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/old/card";
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
      className="w-fit h-fit max-w-[min(24%,300px)]"
    >
      <Card className="w-full h-full">
        <CardContent className="px-0">
          <img
            src={cookbook.imageSrc}
            alt={cookbook.title}
            className="object-cover h-full w-full"
          />
        </CardContent>
        <CardFooter>
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
