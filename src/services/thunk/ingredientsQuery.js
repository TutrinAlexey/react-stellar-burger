import { createAsyncThunk } from "@reduxjs/toolkit";

const ingredientsApi = "https://norma.nomoreparties.space/api/ingredients";
const orderApi = "https://norma.nomoreparties.space/api/orders";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  async (_, thunkAPi) => {
    try {
      const res = await fetch(ingredientsApi);
      const result = await checkResponse(res);
      return result.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "order/post",
  async (ingredientsId, thunkAPi) => {
    try {
      const res = await fetch(orderApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsId,
        }),
      });
      const result = await checkResponse(res);
      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);
