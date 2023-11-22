import { TIngredient } from "../../utils/types/ingredientType";

type TIngredientsSelector = {
  ingredients: {
    ingredientsArray: Array<TIngredient>;
    isLoading: boolean;
    error: string;
  }
}

export const getIngredients = (state: TIngredientsSelector) =>
  state.ingredients.ingredientsArray;
export const ingredientLoading = (state: TIngredientsSelector) => state.ingredients.isLoading;
export const ingredientsError = (state: TIngredientsSelector) => state.ingredients.error;
