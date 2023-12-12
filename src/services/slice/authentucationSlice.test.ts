import authenticationSlice, {
  setUser,
  setAuthChecked,
  clearError,
  setMessage,
  setEmailSent,
  initialState,
} from "./authenticationSlice";

describe("Тестируем аутентификация слайс", () => {
  test("test setUser", () => {
    expect(
      authenticationSlice(
        initialState,
        setUser({ name: "ads", email: "asdas" })
      )
    ).toEqual({
      ...initialState,
      user: { name: "ads", email: "asdas" },
    });

    expect(
      authenticationSlice(undefined, setUser({ name: "ads", email: "asdas" }))
    ).toEqual({
      ...initialState,
      user: { name: "ads", email: "asdas" },
    });
  });

  test("test setAuthChecked", () => {
    expect(authenticationSlice(initialState, setAuthChecked(true))).toEqual({
      ...initialState,
      isAuthChecked: true,
    });

    expect(authenticationSlice(undefined, setAuthChecked(true))).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  test("test clearError", () => {
    expect(authenticationSlice(initialState, clearError())).toEqual({
      ...initialState,
      error: "",
    });

    expect(authenticationSlice(undefined, clearError())).toEqual({
      ...initialState,
      error: "",
    });
  });

  test("test setMessage", () => {
    expect(authenticationSlice(initialState, setMessage("asda"))).toEqual({
      ...initialState,
      message: "asda",
    });

    expect(authenticationSlice(undefined, setMessage("asda"))).toEqual({
      ...initialState,
      message: "asda",
    });
  });

  test("test setEmailSent", () => {
    expect(authenticationSlice(initialState, setEmailSent(true))).toEqual({
      ...initialState,
      isEmailSent: true,
    });

    expect(authenticationSlice(undefined, setEmailSent(true))).toEqual({
      ...initialState,
      isEmailSent: true,
    });
  });

  test("Процесс загрузки при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });
  });

  test("Данные загружены при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/fulfilled" })
    ).toEqual({
      ...initialState,
      message: "Письмо для сбороса пароля было отправлено",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/fulfilled" })
    ).toEqual({
      ...initialState,
      message: "Письмо для сбороса пароля было отправлено",
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при забытом пароле", () => {
    expect(
      authenticationSlice(initialState, { type: "forgotpass/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при отправление письма.",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "forgotpass/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при отправление письма.",
      isFormPending: false,
    });
  });

  test("Процесс загрузки при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
      isPassReset: false,
    });
  });

  test("Данные загружены при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/fulfilled" })
    ).toEqual({
      ...initialState,
      message: "Пароль успешно сброшен",
      isEmailSent: false,
      isFormPending: false,
      isPassReset: true,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/fulfilled" })
    ).toEqual({
      ...initialState,
      message: "Пароль успешно сброшен",
      isEmailSent: false,
      isFormPending: false,
      isPassReset: true,
    });
  });

  test("Ошибка загрузки при сбросе пароля", () => {
    expect(
      authenticationSlice(initialState, { type: "resetpass/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка неверный код.",
      isFormPending: false,
      isPassReset: false,
    });

    expect(
      authenticationSlice(undefined, { type: "resetpass/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка неверный код.",
      isFormPending: false,
      isPassReset: false,
    });
  });

  test("Процесс загрузки при регистрации", () => {
    expect(
      authenticationSlice(initialState, { type: "registeruser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "registeruser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
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
      ...initialState,
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Вы успешно зарегестрировались",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "registeruser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      ...initialState,
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Вы успешно зарегестрировались",
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при регистрации", () => {
    expect(
      authenticationSlice(initialState, { type: "registeruser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при регистрации.",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "registeruser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при регистрации.",
      isFormPending: false,
    });
  });

  test("Процесс загрузки при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, { type: "logoutuser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "logoutuser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });
  });

  test("Данные загружены при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, {
        type: "logoutuser/post/fulfilled",
      })
    ).toEqual({
      ...initialState,
      accessToken: "",
      isAuthChecked: false,
      user: null,
      message: "Успешный выход из системы",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "logoutuser/post/fulfilled",
      })
    ).toEqual({
      ...initialState,
      accessToken: "",
      isAuthChecked: false,
      user: null,
      message: "Успешный выход из системы",
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при выходе из аккаунта", () => {
    expect(
      authenticationSlice(initialState, { type: "logoutuser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при выходе из аккаунт.",
      message: "",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "logoutuser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при выходе из аккаунт.",
      message: "",
      isFormPending: false,
    });
  });

  test("Процесс загрузки при логине", () => {
    expect(
      authenticationSlice(initialState, { type: "loginuser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "loginuser/post/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
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
      ...initialState,
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Вы успешно авторизовались",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "loginuser/post/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      ...initialState,
      accessToken: fakeUserInfo.accessToken,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Вы успешно авторизовались",
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при логине", () => {
    expect(
      authenticationSlice(initialState, { type: "loginuser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка, неверный логин или пароль.",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "loginuser/post/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка, неверный логин или пароль.",
      isFormPending: false,
    });
  });

  test("Процесс загрузки при получении информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/get/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/get/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
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
      ...initialState,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Данные получены",
      isLoading: false,
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "userinfo/get/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: fakeUserInfo.user,
      message: "Данные получены",
      isLoading: false,
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при получении информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/get/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при получении данных.",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/get/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при получении данных.",
      isFormPending: false,
    });
  });

  test("Процесс загрузки при смене информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/patch/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/patch/pending" })
    ).toEqual({
      ...initialState,
      error: "",
      message: "",
      isFormPending: true,
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
      ...initialState,
      user: fakeUserInfo.user,
      message: "Данные профиля изменились",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, {
        type: "userinfo/patch/fulfilled",
        payload: fakeUserInfo,
      })
    ).toEqual({
      ...initialState,
      user: fakeUserInfo.user,
      message: "Данные профиля изменились",
      isFormPending: false,
    });
  });

  test("Ошибка загрузки при смене информации профиля", () => {
    expect(
      authenticationSlice(initialState, { type: "userinfo/patch/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при редактировании профиля.",
      isFormPending: false,
    });

    expect(
      authenticationSlice(undefined, { type: "userinfo/patch/rejected" })
    ).toEqual({
      ...initialState,
      error: "Ошибка при редактировании профиля.",
      isFormPending: false,
    });
  });
});
