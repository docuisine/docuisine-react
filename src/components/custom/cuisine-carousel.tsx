import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CuisineCard from "@/components/custom/cuisinecard";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/interface";
import Axios from "axios";


const CuisineCarousel = () => {
  const [cuisines, setCuisines] = useState<Category[]>([]);

  const getCategories = async () => {
    const response = await Axios.get('http://localhost:7000/categories');
    setCuisines(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

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
};

export default CuisineCarousel;
