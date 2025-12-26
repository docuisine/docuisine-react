import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CuisineCard from "@/components/custom/cuisinecard";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/interface";
import Axios from "axios";
import { urlJoin } from "@/lib/utils";


const CuisineCarousel = () => {
  const [cuisines, setCuisines] = useState<Category[]>([]);

  const getCategories = async () => {
    const response = await Axios.get(
      urlJoin(import.meta.env.VITE_BACKEND_URL, "categories")
    );
    setCuisines(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (cuisines) {
    return (
      <ScrollArea className="w-full h-fit pb-4 rounded-md whitespace-nowrap">
        <div className="flex w-max space-x-4">
          {cuisines.map((cuisine) => (
            <CuisineCard category={cuisine} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CuisineCarousel;
