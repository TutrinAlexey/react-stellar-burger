import modalSlice, { openOrderModal, closeAllModals } from "./modalSlice";

const initialState = {
  orderInfo: null,
  orderIsLoading: false,
  orderError: "",
  orderOpen: false,
};

describe("Тестируем модал слайс", () => {
  test("test openOrderModal", () => {
    expect(modalSlice(initialState, openOrderModal())).toEqual({
      orderInfo: null,
      orderIsLoading: false,
      orderError: "",
      orderOpen: true,
    });
    expect(modalSlice(undefined, openOrderModal())).toEqual({
      orderInfo: null,
      orderIsLoading: false,
      orderError: "",
      orderOpen: true,
    });
  });

  test("test closeAllModals", () => {
    expect(modalSlice(initialState, closeAllModals())).toEqual({
      orderInfo: null,
      orderIsLoading: false,
      orderError: "",
      orderOpen: false,
    });
    expect(modalSlice(undefined, closeAllModals())).toEqual({
      orderInfo: null,
      orderIsLoading: false,
      orderError: "",
      orderOpen: false,
    });
  });
});
