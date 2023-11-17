export const getIngredients = (state: any) =>
  state.ingredients.ingredientsArray;
export const ingredientLoading = (state: any) => state.ingredients.isLoading;
export const ingredientsError = (state: any) => state.ingredients.error;
