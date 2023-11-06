import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import ingredientsReducer from "./slice/ingredientsSlice";
import burgerReducer from "./slice/burgerSlice";
import linkReducer from "./slice/linkSlice";


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    link: linkReducer,
  },
});
