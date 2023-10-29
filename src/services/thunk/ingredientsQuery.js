import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse);
};

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
