import { string } from "prop-types";
import { message } from "../services/selector/authenticationSelector";
import { BASE_URL } from "./constants";
import {
  TBodyLogin,
  TBodyPathUser,
  TBodyRegister,
  TBodyResetPass,
  TGetUser,
  TPathUser,
  TPostLogin,
  TPostRegister,
  TResponse,
  TResponseError,
  TTokens,
} from "./types/authenticationTypes";
import { TGetIngredient } from "./types/ingredientType";
import { TOrderIngredientsId } from "./types/orderType";

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: Error) => Promise.reject(err));
};

export const checkSuccess = <T>(res: TResponse<T>) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ошибка не success: ${res.message}`);
};

export const request = <T>(endpoint: string, options: any) => {
  return fetch(BASE_URL + endpoint, options)
    .then(checkResponse)
    .then<T>(checkSuccess);
};

export const postToken = () => {
  return request<TResponse<TTokens>>("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async <T>(endpoint: string, options: any) => {
  try {
    const res = await request<T>(endpoint, options);
    return res;
  } catch (err) {
    if ((err as TResponseError).message === "jwt expired") {
      const refreshData = await postToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData!.accessToken);
      localStorage.setItem("refreshToken", refreshData!.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await request(endpoint, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
export const getUserInfo = () => {
  return fetchWithRefresh<TResponse<TGetUser>>("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getIngredients = () => {
  return request<TResponse<TGetIngredient>>("/ingredients", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((res) => res.data);
};

export const postOrder = (ingredientsId: TOrderIngredientsId) => {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
};

export const postForgotPassword = (email: string) => {
  return request<TResponse>("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

export const postResetPassword = ({ password, token }: TBodyResetPass) => {
  return request<TResponse>("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};

export const postRegisterUser = ({ email, password, name }: TBodyRegister) => {
  return request<TResponse<TPostRegister>>("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export const postLoginUser = ({ email, password }: TBodyLogin) => {
  return request<TResponse<TPostLogin>>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const postLogoutUser = () => {
  const token = localStorage.getItem("refreshToken");
  return request<TResponse>("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  });
};

export const pathUserInfo = ({ email, password, name }: TBodyPathUser) => {
  return fetchWithRefresh<TResponse<TPathUser>>("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};
