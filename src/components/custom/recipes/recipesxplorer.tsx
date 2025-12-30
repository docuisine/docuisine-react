import CuisineCarousel from "@/components/custom/cuisines/cuisine-carousel";
import Searchbar from "@/components/custom/searchbar";
import RecipeCarousel from "./recipe-carousel";
import exampleRecipeJpg from "@/assets/example-recipe.jpg";

const exampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    imageSrc: exampleRecipeJpg,
    timeTaken: 25,
    servings: 4,
  },
  {
    title: "Chicken Tikka Masala",
    imageSrc: exampleRecipeJpg,
    timeTaken: 40,
    servings: 4,
  },
  {
    title: "Chicken Tikka Masala",
    imageSrc: exampleRecipeJpg,
    timeTaken: 40,
    servings: 4,
  },
  {
    title: "Chicken Tikka Masala",
    imageSrc: exampleRecipeJpg,
    timeTaken: 40,
    servings: 4,
  },
  {
    title: "Chicken Tikka Masala",
    imageSrc: exampleRecipeJpg,
    timeTaken: 40,
    servings: 4,
  },
];

const carousels = [
  {
    carousel: "Cuisines",
    component: <CuisineCarousel />,
  },
  {
    carousel: "New",
    component: <RecipeCarousel recipes={exampleRecipes} />,
  },
  {
    carousel: "Recently Viewed",
    component: <RecipeCarousel recipes={exampleRecipes} />,
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
            <h2 className="text-2xl font-semibold mb-4">{carousel.carousel}</h2>

            {carousel.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesExplorer;
