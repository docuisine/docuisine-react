import CookbookCard from "@/components/custom/cookbooks/cookbook-card";
import exampleRecipeJpg from "@/assets/example-recipe.jpg";

const example_cookbooks = [
  {
    title: "Italian Classics",
    imageSrc: exampleRecipeJpg,
    description: "A collection of traditional Italian recipes.",
    author: "foodie_lover42",
  },
  {
    title: "Italian Classics",
    imageSrc: exampleRecipeJpg,
    author: "busta_rhymes",
  },
  {
    title: "Italian Classics",
    imageSrc: exampleRecipeJpg,
  },
];

const multiple_cookbooks = example_cookbooks.concat([
  ...example_cookbooks,
  ...example_cookbooks,
  ...example_cookbooks,
  ...example_cookbooks,
  ...example_cookbooks,
  ...example_cookbooks,
]);

const CookbooksPage = () => {
  return (
    <div className="flex flex-wrap h-full gap-x-2 gap-y-2 justify-center">
      {multiple_cookbooks.map((cookbook) => (
        <CookbookCard key={cookbook.title} cookbook={cookbook} />
      ))}
    </div>
  );
};

export default CookbooksPage;
