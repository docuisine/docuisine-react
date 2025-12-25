import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CuisineImage from "./cuisineimage";
import PizzaPng from "@/assets/images/pizza.png";
interface Artwork {
  cuisine: string;
  url: string;
}

const cuisines: Artwork[] = [
  {
    cuisine: "English",
    url: PizzaPng,
  },
  {
    cuisine: "Italian",
    url: PizzaPng,
  },
  {
    cuisine: "Mexican",
    url: PizzaPng,
  },
  {
    cuisine: "Chinese",
    url: PizzaPng,
  },
  {
    cuisine: "Indian",
    url: PizzaPng,
  },
  {
    cuisine: "Burgers",
    url: PizzaPng,
  },
  {
    cuisine: "Salads",
    url: PizzaPng,
  },
  {
    cuisine: "Desserts",
    url: PizzaPng,
  },
  {
    cuisine: "Beverages",
    url: PizzaPng,
  },
  {
    cuisine: "Seafood",
    url: PizzaPng,
  },
  {
    cuisine: "Vegetarian",
    url: PizzaPng,
  },
  {
    cuisine: "Vegan",
    url: PizzaPng,
  },
  {
    cuisine: "Japanese",
    url: PizzaPng,
  },
  {
    cuisine: "Mediterranean",
    url: PizzaPng,
  },
  {
    cuisine: "Thai",
    url: PizzaPng,
  },
];

const CuisineCarousel = () => {
  return (
    <ScrollArea className="w-full h-fit pb-4 rounded-md whitespace-nowrap">
      <div className="flex w-max space-x-4">
        {cuisines.map((cuisine) => (
          <CuisineImage src={cuisine.url} alt={cuisine.cuisine} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CuisineCarousel;
