import FiltersSortBy from "@/components/custom/filters-sort-by";
import FiltersCheckbox from "./filters-checkbox";

const Filters = () => {
  const filterCategories = [
    {
      title: "Sort by",
      component: <FiltersSortBy />,
    },
    {
      title: "Cuisines",
      component: <FiltersCheckbox />,
    },
  ];
  return (
    <div className="flex flex-col border shadow-xs items-start p-4 rounded-md min-w-fit w-[12vw] overflow-scroll max-h-[80vh]">
      <h2 className="text-lg font-semibold mb-8">Filters</h2>

      <ul className="flex flex-col gap-8">
        {filterCategories.map((category) => (
          <li key={category.title} className="flex flex-col gap-4 items-start">
            <h3 className="text-md font-medium">{category.title}</h3>
            {category.component}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
