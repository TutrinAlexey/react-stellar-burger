import authenticationSlice, {
  setUser,
  setAuthChecked,
  clearError,
  setMessage,
  setEmailSent,
} from "./authenticationSlice";

const initialState = {
  accessToken: "",
  isAuthChecked: false,
  user: null,
  error: "",
  message: "",
  isLoading: true,
  isEmailSent: false,
  isFormPending: false,
  isPassReset: false,
};

describe("Тестируем аутентификация слайс", () => {
  test("test setUser", () => {
    expect(
      authenticationSlice(
        initialState,
        setUser({ name: "ads", email: "asdas" })
      )
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: { name: "ads", email: "asdas" },
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, setUser({ name: "ads", email: "asdas" }))
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: { name: "ads", email: "asdas" },
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("test setAuthChecked", () => {
    expect(authenticationSlice(initialState, setAuthChecked(true))).toEqual({
      accessToken: "",
      isAuthChecked: true,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(authenticationSlice(undefined, setAuthChecked(true))).toEqual({
      accessToken: "",
      isAuthChecked: true,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("test clearError", () => {
    expect(authenticationSlice(initialState, clearError())).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(authenticationSlice(undefined, clearError())).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("test setMessage", () => {
    expect(authenticationSlice(initialState, setMessage("asda"))).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "asda",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(authenticationSlice(undefined, setMessage("asda"))).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "asda",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("test setEmailSent", () => {
    expect(authenticationSlice(initialState, setEmailSent(true))).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: true,
      isFormPending: false,
      isPassReset: false,
    });

    expect(authenticationSlice(undefined, setEmailSent(true))).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: true,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/fulfilled" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Письмо для сбороса пароля было отправлено",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/fulfilled" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Письмо для сбороса пароля было отправлено",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Ошибка загрузки при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при отправление письма.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при отправление письма.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/fulfilled" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Пароль успешно сброшен",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: true,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/fulfilled" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Пароль успешно сброшен",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: true,
    });
  });

  test("Ошибка загрузки при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка неверный код.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка неверный код.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при регистрации", () => {
    expect(
      authenticationSlice(initialState, { type: "registeruser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "registeruser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при регистрации", () => {
    const fakeUserInfo = {
      user: { name: "name", email: "email" },
      accessToken: "accessToken",
    };

    expect(
      authenticationSlice(initialState, {
        type: "registeruser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Вы успешно зарегестрировались",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "registeruser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Вы успешно зарегестрировались",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Ошибка загрузки при регистрации", () => {
    expect(
      authenticationSlice(initialState, { type: "registeruser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при регистрации.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "registeruser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при регистрации.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, { type: "logoutuser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "logoutuser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, {
        type: "logoutuser/post/fulfilled",
      })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Успешный выход из системы",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "logoutuser/post/fulfilled",
      })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "Успешный выход из системы",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Ошибка загрузки при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, { type: "logoutuser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при выходе из аккаунт.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "logoutuser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при выходе из аккаунт.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при логине", () => {
    expect(
      authenticationSlice(initialState, { type: "loginuser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "loginuser/post/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при логине", () => {
    const fakeUserInfo = {
      user: { name: "name", email: "email" },
      accessToken: "accessToken",
    };

    expect(
      authenticationSlice(initialState, {
        type: "loginuser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Вы успешно авторизовались",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "loginuser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Вы успешно авторизовались",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Ошибка загрузки при логине", () => {
    expect(
      authenticationSlice(initialState, { type: "loginuser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка, неверный логин или пароль.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "loginuser/post/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка, неверный логин или пароль.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при получении информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/get/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/get/pending" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при получении информации профиля", () => {
    const fakeUserInfo = {
      user: { name: "name", email: "email" },
    };

    expect(
      authenticationSlice(initialState, {
        type: "userinfo/get/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: "",
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Данные получены",
      isLoading: false,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "userinfo/get/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      accessToken: "",
      isAuthChecked: true,
      user: fakeUserInfo.user,
      error: "",
      message: "Данные получены",
      isLoading: false,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Ошибка загрузки при получении информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/get/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при получении данных.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/get/rejected" })
    ).toEqual({
      accessToken: "",
      isAuthChecked: false,
      user: null,
      error: "Ошибка при получении данных.",
      message: "",
      isLoading: true,
      isEmailSent: false,
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при смене информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/patch/pending" })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: null,
        error: "",
        message: "",
        isLoading: true,
        isEmailSent: false,
        isFormPending: true,
        isPassReset: false,
      });

    expect(
      authenticationSlice(undefined, { type: "userinfo/patch/pending" })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: null,
        error: "",
        message: "",
        isLoading: true,
        isEmailSent: false,
        isFormPending: true,
        isPassReset: false,
      });
  });

  test("Данные загружены при смене информации профиля", () => {
    const fakeUserInfo = {
      user: { name: "name", email: "email" },
    };

    expect(
      authenticationSlice(initialState, {
        type: "userinfo/patch/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: fakeUserInfo.user,
        error: "",
        message: "Данные профиля изменились",
        isLoading: true,
        isEmailSent: false,
        isFormPending: false,
        isPassReset: false,
      });

    expect(
      authenticationSlice(undefined, {
        type: "userinfo/patch/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: fakeUserInfo.user,
        error: "",
        message: "Данные профиля изменились",
        isLoading: true,
        isEmailSent: false,
        isFormPending: false,
        isPassReset: false,
      });
  });

  test("Ошибка загрузки при смене информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/patch/rejected" })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: null,
        error: "Ошибка при редактировании профиля.",
        message: "",
        isLoading: true,
        isEmailSent: false,
        isFormPending: false,
        isPassReset: false,
      });

    expect(
      authenticationSlice(undefined, { type: "userinfo/patch/rejected" })
    ).toEqual({
        accessToken: "",
        isAuthChecked: false,
        user: null,
        error: "Ошибка при редактировании профиля.",
        message: "",
        isLoading: true,
        isEmailSent: false,
        isFormPending: false,
        isPassReset: false,
      });
  });
});
