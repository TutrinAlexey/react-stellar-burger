import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../thunk/ingredientsQuery";
import { TIngredient } from "../../utils/types/ingredientType";

type TInitialStateIngredients = {
  ingredientsArray: Array<TIngredient>;
  isLoading: boolean;
  error: string;
}

const initialState = {
  ingredientsArray: [],
  isLoading: false,
  error: "",
} as TInitialStateIngredients;

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIngredients.fulfilled.type]: (state, action) => {
      state.ingredientsArray = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [fetchIngredients.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchIngredients.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default ingredientsSlice.reducer;
