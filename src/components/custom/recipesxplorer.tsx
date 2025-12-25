import CuisineCarousel from "./cuisine-carousel";
import Searchbar from "@/components/custom/searchbar";

const carousels = [
  {
    carousel: "Cuisines",
    component: <CuisineCarousel />,
  },
];
const RecipesExplorer = () => {
  return (
    <div className="flex flex-col max-w-full gap-8 overflow-x-hidden">
      <Searchbar />
      <div className="flex flex-col items-start max-w-full">
        {carousels.map((carousel) => (
          <div
            key={carousel.carousel}
            className="flex flex-col max-w-full mb-8 items-start"
          >
            <h2 className="text-3xl font-semibold mb-4">{carousel.carousel}</h2>

            {carousel.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesExplorer;
