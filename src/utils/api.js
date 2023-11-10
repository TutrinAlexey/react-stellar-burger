import { BASE_URL } from "./constants";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse);
};

export const getIngredients = () => {
  return request("/ingredients", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);
};

export const postOrder = (ingredientsId) => {
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

export const postForgotPassword = (email) => {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

export const postResetPassword = ({ password, token }) => {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};

export const postRegisterUser = ({ email, password, name }) => {
  return request("/auth/register", {
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

export const postLoginUser = ({ email, password }) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const postLogoutUser = () => {
  const token = localStorage.getItem("refreshToken");
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authorization: token,
    }),
  });
};

export const postToken = () => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const getUserInfo = () => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken")
  return request("/auth/user", {
    headers: {
      "Content-Type": "application/json",
      "authorization": accessToken,
    },
  }).then((res) => {
    if (res.status === 401) {
      return request("/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      }).then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return request("/auth/user", {
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("accessToken"),
          },
        });
      });
    }
  });
};

export const pathUserInfo = ({ email, password, name }) => {
  return request("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      authorization: {
        email,
        password,
        name,
      },
    }),
  });
};
