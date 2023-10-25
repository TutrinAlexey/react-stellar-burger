import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo: {},
  orderOpen: false,
  ingredientInfo: {},
  ingredientOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderModal: (state, action) => {
      state.orderOpen = true;
      state.orderInfo = action.payload;
    },
    openIngredientModal: (state, action) => {
      state.ingredientOpen = true;
      state.ingredientInfo = action.payload;
    },
    closeAllModals: (state, action) => {
      state.ingredientOpen = false;
      state.orderOpen = false;
    },
  },
});

export const { openOrderModal, openIngredientModal, closeAllModals } =
  modalSlice.actions;
export default modalSlice.reducer;
