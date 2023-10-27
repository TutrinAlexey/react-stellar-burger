import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bunsBurger: null,
  ingredientsBurger: [],
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === "bun") {
        state.bunsBurger = action.payload;
      } else {
        state.ingredientsBurger.push(action.payload);
      }
    },
    swapIngredients: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.ingredientsBurger.splice(indexFrom, 1);
      state.ingredientsBurger.splice(indexTo, 0, ingredient);
    },
    deleteIngredients: (state, action) => {
      state.ingredientsBurger = state.ingredientsBurger.filter(
        (item) => item._constId !== action.payload
      );
    },
  },
});

export const { addIngredients, swapIngredients, deleteIngredients } =
  burgerSlice.actions;
export default burgerSlice.reducer;
