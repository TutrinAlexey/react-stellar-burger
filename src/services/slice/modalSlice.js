import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../thunk/ingredientsQuery";

const initialState = {
  orderInfo: null,
  orderIsLoading: false,
  orderError: "",
  orderOpen: false,
  ingredientInfo: {},
  ingredientOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderModal: (state) => {
      state.orderOpen = true;
    },
    openIngredientModal: (state, action) => {
      state.ingredientOpen = true;
      state.ingredientInfo = action.payload;
    },
    closeAllModals: (state) => {
      state.ingredientOpen = false;
      state.orderOpen = false;
      state.ingredientInfo = {};
      state.orderInfo = null;
    },
  },
  extraReducers: {
    [fetchOrder.fulfilled.type]: (state, action) => {
      state.orderInfo = action.payload;
      state.orderIsLoading = false;
      state.orderError = "";
    },
    [fetchOrder.pending.type]: (state, action) => {
      state.orderIsLoading = true;
      state.orderError = "";
    },
    [fetchOrder.rejected.type]: (state, action) => {
      state.orderIsLoading = false;
      state.orderError = action.error;
      console.log(action.payload);
    },
  },
});

export const { openOrderModal, openIngredientModal, closeAllModals } =
  modalSlice.actions;
export default modalSlice.reducer;
