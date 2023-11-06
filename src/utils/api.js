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
