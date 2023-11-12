import { BASE_URL } from "./constants";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse);
};

export const postToken = () => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await request(endpoint, options);
    return res;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await postToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await request(endpoint, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
export const getUserInfo = () => {
  return fetchWithRefresh("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка данных с сервера");
    }
  });
};

export const getIngredients = () => {
  return request("/ingredients", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((res) => res.data);
};

export const postOrder = (ingredientsId) => {
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

export const postForgotPassword = (email) => {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при отправке токена на почту");
    }
  });
};

export const postResetPassword = ({ password, token }) => {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при сбросе пароля");
    }
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
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при регистрации");
    }
  });
};

export const postLoginUser = ({ email, password }) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при авторизации");
    }
  });
};

export const postLogoutUser = () => {
  const token = localStorage.getItem("refreshToken");
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при выходе из аккаунта");
    }
  });
};

export const pathUserInfo = ({ email, password, name }) => {
  return fetchWithRefresh("/auth/user", {
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
  }).then((res) => {
    if (res.success) {
      return res;
    } else {
      return Promise.reject("Ошибка при изменение данных");
    }
  });
};
