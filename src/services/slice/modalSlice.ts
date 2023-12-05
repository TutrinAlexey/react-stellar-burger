import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../thunk/ingredientsQuery";

type TOrderInfo = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

type TInitialStateModal = {
  orderInfo: TOrderInfo | null;
  orderIsLoading: boolean;
  orderError: string;
  orderOpen: boolean;
};

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
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrder.fulfilled.type, (state, action: PayloadAction<TOrderInfo>) => {
      state.orderInfo = action.payload;
      console.log(action.payload)
      state.orderIsLoading = false;
      state.orderError = "";
    })
    .addCase(fetchOrder.pending.type, (state) => {
      state.orderIsLoading = true;
      state.orderError = "";
    })
    .addCase(fetchOrder.rejected.type, (state, action: PayloadAction<string>) => {
      state.orderIsLoading = false;
      state.orderError = action.payload;
    })
  },
});

export const { openOrderModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
