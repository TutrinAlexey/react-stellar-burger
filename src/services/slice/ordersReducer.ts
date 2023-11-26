import { createReducer } from "@reduxjs/toolkit";
import {
  TOrder,
  TOrderGetMessage,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../../utils/types/webSocketTypes";

type TInitialStateOrders = {
  orders: Array<TOrder> | null;
  total: number;
  totalToday: number;
  connected: boolean;
  error: string;
};

const initialState = {
  orders: null,
  total: 0,
  totalToday: 0,
  connected: false,
  error: "",
} as TInitialStateOrders;

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(WS_CONNECTION_START, (state) => ({ ...state }))
    .addCase(WS_CONNECTION_SUCCESS, (state) => ({ ...state, connected: true }))
    .addCase(WS_CONNECTION_ERROR, (state) => ({
      ...state,
      error: "Ошибка при загрузке заказов",
    }))
    .addCase(WS_CONNECTION_CLOSED, (state) => ({ ...state, connected: false, orders: null }))
    .addCase(WS_GET_MESSAGE, (state, action: TOrderGetMessage) =>
      action.payload.success
        ? {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
          }
        : { ...state, error: action.payload.message }
    );
});

export default ordersReducer