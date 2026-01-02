import RecipeImageUpload from "./recipe-image-upload";
import {
  UsersIcon,
  ClockIcon,
  BookTextIcon,
  CarrotIcon,
  ImageIcon,
} from "lucide-react";
import IngredientField from "./form/ingredient-field";
import {
  InputGroup,
  InputGroupHeader,
} from "@/components/custom/recipes/form/common";
import {
  InputStartIcon,
  TextareaWithHintText,
} from "@/components/custom/recipes/form/basic-information";
import { InputTime } from "@/components/custom/recipes/form/time-taken";
import { useState } from "react";
import type { Ingredient } from "@/lib/types";
import { ingredients as DBingredients } from "./form/ingredient-placeholder-data";
import { IngredientCombobox } from "./form/ingredient-combobox";
import { CommandItem } from "@/components/ui/command";

const headerIconProps = {
  className: "inline-block mr-2",
  size: "1.2em",
};

const inputIconProps = {
  className: "size-4",
};

export default function RecipeCreateForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const deleteIngredient = (id: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const addIngredient = (ingredient: Ingredient) => {
    if (ingredients.find((ing) => ing.id === ingredient.id)) {
      return;
    }
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  return (
    <div className="gap-4 flex flex-col w-full">
      <div className="flex flex-col sm:flex-row gap-4 w-full h-full">
        <InputGroup className="basis-2/3">
          <InputGroupHeader>
            <BookTextIcon {...headerIconProps} />
            Basic Information
          </InputGroupHeader>
          <InputStartIcon
            label="Recipe Name"
            name="name"
            placeholder="Enter recipe name"
          />
          <InputStartIcon
            label="Servings"
            name="servings"
            type="number"
            placeholder="Enter number of servings"
            optional
          >
            <UsersIcon {...inputIconProps} />
          </InputStartIcon>
          <TextareaWithHintText
            label="Description"
            placeholder="Enter a brief description of the recipe"
          />
        </InputGroup>
        <InputGroup className="basis-1/3">
          <InputGroupHeader>
            <ImageIcon {...headerIconProps} />
            Recipe Image
          </InputGroupHeader>
          <RecipeImageUpload />
        </InputGroup>
      </div>
      <InputGroup>
        <InputGroupHeader>
          <CarrotIcon {...headerIconProps} />
          Ingredients
        </InputGroupHeader>
        {ingredients.map((ingredient) => (
          <IngredientField
            key={ingredient.id}
            ingredient={ingredient}
            deleteHandler={deleteIngredient}
          />
        ))}
        <IngredientCombobox>
          {DBingredients.map((ingredient) => (
            <CommandItem
              key={ingredient.id}
              value={ingredient.name}
              onSelect={() => {
                addIngredient(ingredient);
              }}
            >
              {ingredient.name}
            </CommandItem>
          ))}
        </IngredientCombobox>
      </InputGroup>
      <InputGroup>
        <InputGroupHeader>
          <ClockIcon {...headerIconProps} />
          Time taken
        </InputGroupHeader>
        <InputTime label="Preparation Time" name="prep_time_min" />
        <InputTime label="Cooking Time" name="cook_time_min" />
        <InputTime label="Non-blocking Time" name="non_blocking_min" />
      </InputGroup>
    </div>
  );
}
