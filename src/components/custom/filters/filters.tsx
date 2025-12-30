import FiltersSortBy from "@/components/custom/filters/filters-sort-by";
import FiltersCheckbox from "./filters-checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../../ui/separator";
import FiltersPrice from "./filters-price";
import FiltersRating from "./filters-rating";

const Filters = () => {
  const filterCategories = [
    {
      title: "Sort by",
      component: <FiltersSortBy />,
    },
    {
      title: "Minimum Rating",
      component: <FiltersRating />,
    },
    {
      title: "Price Range",
      component: <FiltersPrice />,
    },
    {
      title: "Cuisines",
      component: <FiltersCheckbox />,
    },
  ];
  return (
    <ScrollArea className="flex flex-col border shadow-xs items-start rounded-md min-w-fit w-fit overflow-y-auto h-fit max-h-[80vh]">
      <h2 className="text-lg font-semibold text-start ml-4 mt-4">Filters</h2>

      <ul className="flex flex-col">
        {filterCategories.map((category, index) => (
          <>
            <li
              key={category.title}
              className="flex flex-col gap-4 items-start m-4"
            >
              <h3 className="text-md font-medium text-nowrap">{category.title}</h3>
              {category.component}
            </li>
            {index < filterCategories.length - 1 && <Separator />}
          </>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default Filters;
