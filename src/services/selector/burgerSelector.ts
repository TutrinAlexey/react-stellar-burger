import { TConstructorIngredient } from "../../utils/types/ingredientType";

type TBurgerSelector = {
  burger: {
    ingredientsBurger: Array<TConstructorIngredient>;
    bunsBurger: Array<TConstructorIngredient>;
  };
};

export const burgerIngredients = (state: TBurgerSelector) =>
  state.burger.ingredientsBurger;
export const burgerBuns = (state: TBurgerSelector) => state.burger.bunsBurger;
export const orderPrice = (state: TBurgerSelector) => {
  let ingredientsPrice = 0;
  let bunsPrice = 0;
  ingredientsPrice = state.burger.ingredientsBurger.reduce(
    (sum, ingredient) => (sum += ingredient.price),
    0
  );
  bunsPrice =
    state.burger.bunsBurger.reduce(
      (sum, ingredient) => (sum += ingredient.price),
      0
    ) * 2;
  return ingredientsPrice + bunsPrice;
};
