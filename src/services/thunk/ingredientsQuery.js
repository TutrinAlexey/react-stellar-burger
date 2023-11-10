import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients, postOrder } from "../../utils/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  getIngredients
);

export const fetchOrder = createAsyncThunk("order/post", postOrder);
