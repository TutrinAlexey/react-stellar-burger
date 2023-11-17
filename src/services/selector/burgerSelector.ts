import { TConstructorIngredient } from "../../utils/types/ingredientType";

export const burgerIngredients = (state: any) => state.burger.ingredientsBurger;
export const burgerBuns = (state: any) => state.burger.bunsBurger;
export const orderPrice = (state: any) => {
  let ingredientsPrice = 0;
  let bunsPrice = 0;
  ingredientsPrice = state.burger.ingredientsBurger.reduce(
    (sum: number, ingredient: TConstructorIngredient) =>
      (sum += ingredient.price),
    0
  );
  bunsPrice =
    state.burger.bunsBurger.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        (sum += ingredient.price),
      0
    ) * 2;
  return ingredientsPrice + bunsPrice;
};
