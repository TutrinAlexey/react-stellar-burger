import { createAsyncThunk } from "@reduxjs/toolkit";

const ingredientsApi = "https://norma.nomoreparties.space/api/ingredients";

const checkResponse = (res) => {
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
