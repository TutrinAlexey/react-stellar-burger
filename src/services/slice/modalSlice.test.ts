import modalSlice, {
  openOrderModal,
  closeAllModals,
  initialState,
} from "./modalSlice";

describe("Тестируем модал слайс", () => {
  test("test openOrderModal", () => {
    expect(modalSlice(initialState, openOrderModal())).toEqual({
      ...initialState,
      orderOpen: true,
    });
    expect(modalSlice(undefined, openOrderModal())).toEqual({
      ...initialState,
      orderOpen: true,
    });
  });

  test("test closeAllModals", () => {
    expect(modalSlice(initialState, closeAllModals())).toEqual({
      ...initialState,
      orderInfo: null,
      orderOpen: false,
    });
    expect(modalSlice(undefined, closeAllModals())).toEqual({
      ...initialState,
      orderInfo: null,
      orderOpen: false,
    });
  });

  test("Данные заказа загружаются", () => {
    expect(modalSlice(initialState, { type: "order/post/pending" })).toEqual({
      ...initialState,
      orderIsLoading: true,
      orderError: "",
    });

    expect(modalSlice(undefined, { type: "order/post/pending" })).toEqual({
      ...initialState,
      orderIsLoading: true,
      orderError: "",
    });
  });

  test("Данные заказа загружены", () => {
    const fakePayload = ["1234", "4321", "1234"];
    expect(
      modalSlice(initialState, {
        type: "order/post/fulfilled",
        payload: fakePayload,
      })
    ).toEqual({
      ...initialState,
      orderInfo: fakePayload,
      orderIsLoading: false,
      orderError: "",
    });

    expect(
      modalSlice(undefined, {
        type: "order/post/fulfilled",
        payload: fakePayload,
      })
    ).toEqual({
      ...initialState,
      orderInfo: fakePayload,
      orderIsLoading: false,
      orderError: "",
    });
  });

  test("Ошибка загрузки заказа", () => {
    const fakeError = "Error";
    expect(
      modalSlice(initialState, {
        type: "order/post/rejected",
        payload: fakeError,
      })
    ).toEqual({
      ...initialState,
      orderIsLoading: false,
      orderError: fakeError,
    });

    expect(
      modalSlice(undefined, { type: "order/post/rejected", payload: fakeError })
    ).toEqual({
      ...initialState,
      orderIsLoading: false,
      orderError: fakeError,
    });
  });
});
