import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInfo,
  pathUserInfo,
  postForgotPassword,
  postLoginUser,
  postLogoutUser,
  postRegisterUser,
  postResetPassword,
  postToken,
} from "../../utils/api";

export const fetchForgotPassword = createAsyncThunk(
  "forgotpass/post",
  postForgotPassword
);

export const fetchResetPassword = createAsyncThunk(
  "resetpass/post",
  postResetPassword
);

export const fetchRegisterUser = createAsyncThunk(
  "registeruser/post",
  postRegisterUser
);

export const fetchLoginUser = createAsyncThunk("loginuser/post", postLoginUser);

export const fetchLogoutUser = createAsyncThunk(
  "logoutuser/post",
  postLogoutUser
);

export const fetchUserInfo = createAsyncThunk("userinfo/get", getUserInfo);

export const fetchChangeUserInfo = createAsyncThunk(
  "userinfo/patch",
  pathUserInfo
);
