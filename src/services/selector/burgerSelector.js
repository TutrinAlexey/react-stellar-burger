export const burgerIngredients = (state) => state.burger.ingredientsBurger;
export const burgerBuns = (state) => state.burger.bunsBurger;
export const orderPrice = (state) => {
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
