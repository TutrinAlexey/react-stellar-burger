import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/api";

const getIngredients = () => {
  return request("/ingredients", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);
};

const postOrder = (ingredientsId) => {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
};
export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  getIngredients
);

export const fetchOrder = createAsyncThunk("order/post", postOrder);
