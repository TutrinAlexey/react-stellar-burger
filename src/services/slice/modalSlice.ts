import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../thunk/ingredientsQuery";

type TOrderInfo = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

type TInitialStateModal = {
  orderInfo: TOrderInfo | null;
  orderIsLoading:boolean;
  orderError: string;
  orderOpen: boolean;
}

const initialState = {
  orderInfo: null,
  orderIsLoading: false,
  orderError: "",
  orderOpen: false,
} as TInitialStateModal;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderModal: (state) => {
      state.orderOpen = true;
    },
    closeAllModals: (state) => {
      state.orderOpen = false;
      state.orderInfo = null;
    },
  },
  extraReducers: {
    [fetchOrder.fulfilled.type]: (state, action) => {
      state.orderInfo = action.payload;
      state.orderIsLoading = false;
      state.orderError = "";
    },
    [fetchOrder.pending.type]: (state) => {
      state.orderIsLoading = true;
      state.orderError = "";
    },
    [fetchOrder.rejected.type]: (state, action) => {
      state.orderIsLoading = false;
      state.orderError = action.error;
    },
  },
});

export const { openOrderModal, closeAllModals } =
  modalSlice.actions;
export default modalSlice.reducer;
