import RecipeImageUpload from "./recipe-image-upload";
import {
  UsersIcon,
  ClockIcon,
  BookTextIcon,
  CarrotIcon,
  ImageIcon,
  WrenchIcon,
  ShapesIcon,
  FormIcon,
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
import type { Ingredient, CreateRecipeStep } from "@/lib/types";
import { ingredients as DBingredients } from "./form/ingredient-placeholder-data";
import { SelectComboBox } from "./form/select-combobox";
import { CommandItem } from "@/components/ui/command";
import StepField from "./form/step-field";
import { Button } from "@/components/ui/button";

const headerIconProps = {
  className: "inline-block mr-2",
  size: "1.2em",
};

const inputIconProps = {
  className: "size-4",
};

export default function RecipeCreateForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<CreateRecipeStep[]>([]);

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

  const handleDeleteStep = (html_id: string) => {
    setSteps((prevSteps) => {
      const filtered = prevSteps.filter((step) => step.html_id !== html_id);

      return filtered.map((step, index) => ({
        ...step,
        step_num: index + 1,
      }));
    });
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
            optional
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
        <SelectComboBox label="+ Add Ingredient">
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
        </SelectComboBox>
      </InputGroup>
      <InputGroup>
        <InputGroupHeader>
          <FormIcon {...headerIconProps} />
          Instructions
        </InputGroupHeader>
        {steps.map((step) => (
          <StepField
            key={step.html_id}
            recipeStep={step}
            deleteHandler={handleDeleteStep}
          />
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setSteps((prevSteps) => [
              ...prevSteps,
              {
                html_id: crypto.randomUUID(),
                step_num: prevSteps.length + 1,
              },
            ]);
          }}
        >
          + Add Step
        </Button>
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
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupHeader>
            <ShapesIcon {...headerIconProps} />
            Categories
          </InputGroupHeader>
          <SelectComboBox label="+ Add Category">
            <CommandItem value="Category 1">Category 1</CommandItem>
            <CommandItem value="Category 2">Category 2</CommandItem>
            <CommandItem value="Category 3">Category 3</CommandItem>
          </SelectComboBox>
        </InputGroup>
        <InputGroup>
          <InputGroupHeader>
            <WrenchIcon {...headerIconProps} />
            Tools
          </InputGroupHeader>
          <SelectComboBox label="+ Add Tool">
            <CommandItem value="Tool 1">Tool 1</CommandItem>
            <CommandItem value="Tool 2">Tool 2</CommandItem>
            <CommandItem value="Tool 3">Tool 3</CommandItem>
          </SelectComboBox>
        </InputGroup>
      </div>
    </div>
  );
}
