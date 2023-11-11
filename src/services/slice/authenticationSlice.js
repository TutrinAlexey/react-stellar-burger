import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChangeUserInfo,
  fetchForgotPassword,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchResetPassword,
  fetchToken,
  fetchUserInfo,
} from "../thunk/authenticationQuery";

const initialState = {
  accessToken: "",
  isAuthChecked: false,
  user: null,
  error: "",
  message: "",
  isLoading: true,
  isEmailSent: false,
  isFormPending: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload
    },
    setEmailSent: (state, action) => {
      state.isEmailSent = action.payload
    }
  },
  extraReducers: {
    [fetchForgotPassword.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.message = "Письмо для сбороса пароля было отправлено";
    },
    [fetchForgotPassword.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchForgotPassword.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при отправление письма.";
    },
    [fetchResetPassword.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.message = "Пароль успешно сброшен";
    },
    [fetchResetPassword.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchResetPassword.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при сбросе пароля.";
    },
    [fetchRegisterUser.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.message = "Вы успешно зарегестрировались";
    },
    [fetchRegisterUser.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchRegisterUser.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при регистрации.";
    },
    [fetchLoginUser.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.message = "Вы успешно авторизовались";
    },
    [fetchLoginUser.pending.type]: (state, action) => {
      state.error = "";
      state.message = "";
      state.isFormPending = true;
    },
    [fetchLoginUser.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка: неверный логин или пароль.";
    },
    [fetchLogoutUser.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.isAuthChecked = false;
      state.user = "";
      state.accessToken = "";
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.message = "Успешный выход из системы";
    },
    [fetchLogoutUser.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchLogoutUser.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при выходе из аккаунт.";
    },
    [fetchUserInfo.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.isLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.message = "Данные получены";
    },
    [fetchUserInfo.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchUserInfo.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при получении данных.";
    },
    [fetchChangeUserInfo.fulfilled.type]: (state, action) => {
      state.isFormPending = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.message = "Данные профиля изменились";
    },
    [fetchChangeUserInfo.pending.type]: (state, action) => {
      state.isFormPending = true;
      state.error = "";
      state.message = "";
    },
    [fetchChangeUserInfo.rejected.type]: (state, action) => {
      state.isFormPending = false;
      state.error = "Ошибка при редактировании профиля.";
    },
  },
});
export const {setUser, setAuthChecked, setEmailSent} = authenticationSlice.actions
export default authenticationSlice.reducer;
