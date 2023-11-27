import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import ingredientsReducer from "./slice/ingredientsSlice";
import burgerReducer from "./slice/burgerSlice";
import linkReducer from "./slice/linkSlice";
import authenticationReducer from "./slice/authenticationSlice";
import {
  TOrderActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../utils/types/webSocketTypes";
import ordersReducer from "./slice/ordersReducer";
import { socketMiddleware } from "./middlewares/wsMiddleware";

const wsUrl = "wss://norma.nomoreparties.space/";
const wsActions: TOrderActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    link: linkReducer,
    authentication: authenticationReducer,
    ordersFeed: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions));
  },
});
