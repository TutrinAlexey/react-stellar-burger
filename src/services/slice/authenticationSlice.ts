import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchChangeUserInfo,
  fetchForgotPassword,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchResetPassword,
  fetchUserInfo,
} from "../thunk/authenticationQuery";

type TPayload = {
  accessToken: string;
  user: TUser;
  refreshToken: string;
};

type TUser = {
  email: string;
  name: string;
};
type TInitialStateAuth = {
  accessToken: string;
  isAuthChecked: boolean;
  user: TUser | null;
  error: string;
  message: string;
  isLoading: boolean;
  isEmailSent: boolean;
  isFormPending: boolean;
  isPassReset: boolean;
};

export const initialState = {
  accessToken: "",
  isAuthChecked: false,
  user: null,
  error: "",
  message: "",
  isLoading: true,
  isEmailSent: false,
  isFormPending: false,
  isPassReset: false,
} as TInitialStateAuth;

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setEmailSent: (state, action) => {
      state.isEmailSent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.fulfilled.type, (state) => {
        state.isFormPending = false;
        state.message = "Письмо для сбороса пароля было отправлено";
      })
      .addCase(fetchForgotPassword.pending.type, (state) => {
        state.isFormPending = true;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchForgotPassword.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка при отправление письма.";
      })
      .addCase(fetchResetPassword.fulfilled.type, (state) => {
        state.isFormPending = false;
        state.isPassReset = true;
        state.isEmailSent = false;
        state.message = "Пароль успешно сброшен";
      })
      .addCase(fetchResetPassword.pending.type, (state) => {
        state.isFormPending = true;
        state.isPassReset = false;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchResetPassword.rejected.type, (state) => {
        state.isPassReset = false;
        state.isFormPending = false;
        state.error = "Ошибка неверный код.";
      })
      .addCase(
        fetchRegisterUser.fulfilled.type,
        (state, action: PayloadAction<TPayload>) => {
          state.isFormPending = false;
          state.isAuthChecked = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          localStorage.setItem("accessToken", action.payload.accessToken);
          state.message = "Вы успешно зарегестрировались";
        }
      )
      .addCase(fetchRegisterUser.pending.type, (state) => {
        state.isFormPending = true;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchRegisterUser.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка при регистрации.";
      })
      .addCase(
        fetchLoginUser.fulfilled.type,
        (state, action: PayloadAction<TPayload>) => {
          state.isFormPending = false;
          state.isAuthChecked = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          localStorage.setItem("accessToken", action.payload.accessToken);
          state.message = "Вы успешно авторизовались";
        }
      )
      .addCase(fetchLoginUser.pending.type, (state) => {
        state.error = "";
        state.message = "";
        state.isFormPending = true;
      })
      .addCase(fetchLoginUser.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка, неверный логин или пароль.";
      })
      .addCase(fetchLogoutUser.fulfilled.type, (state) => {
        state.isFormPending = false;
        state.isAuthChecked = false;
        state.user = null;
        state.accessToken = "";
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        state.message = "Успешный выход из системы";
      })
      .addCase(fetchLogoutUser.pending.type, (state) => {
        state.isFormPending = true;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchLogoutUser.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка при выходе из аккаунт.";
      })
      .addCase(
        fetchUserInfo.fulfilled.type,
        (state, action: PayloadAction<TPayload>) => {
          state.isFormPending = false;
          state.isLoading = false;
          state.isAuthChecked = true;
          state.user = action.payload.user;
          state.message = "Данные получены";
        }
      )
      .addCase(fetchUserInfo.pending.type, (state) => {
        state.isFormPending = true;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchUserInfo.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка при получении данных.";
      })
      .addCase(
        fetchChangeUserInfo.fulfilled.type,
        (state, action: PayloadAction<TPayload>) => {
          state.isFormPending = false;
          state.user = action.payload.user;
          state.message = "Данные профиля изменились";
        }
      )
      .addCase(fetchChangeUserInfo.pending.type, (state) => {
        state.isFormPending = true;
        state.error = "";
        state.message = "";
      })
      .addCase(fetchChangeUserInfo.rejected.type, (state) => {
        state.isFormPending = false;
        state.error = "Ошибка при редактировании профиля.";
      });
  },
});
export const { setUser, setAuthChecked, clearError, setMessage, setEmailSent } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
