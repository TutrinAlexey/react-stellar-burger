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
        state.ingredientsBurger.push(action.payload)
      }
    
    },
  },
});

export const { addIngredients } = burgerSlice.actions;
export default burgerSlice.reducer;
