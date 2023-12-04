import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../thunk/ingredientsQuery";
import { TIngredient } from "../../utils/types/ingredientType";

type TInitialStateIngredients = {
  ingredientsArray: Array<TIngredient>;
  isLoading: boolean;
  error: string;
};

const initialState = {
  ingredientsArray: [],
  isLoading: false,
  error: "",
} as TInitialStateIngredients;

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
    .addCase(fetchIngredients.fulfilled.type, (state, action: PayloadAction<Array<TIngredient>>) => {
      state.ingredientsArray = action.payload;
      state.isLoading = false;
      state.error = "";
    })
    .addCase(fetchIngredients.pending.type, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(fetchIngredients.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

export default ingredientsSlice.reducer;
