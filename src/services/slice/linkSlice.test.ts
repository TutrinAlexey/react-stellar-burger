import linkSlice, { burgerLink, orderListLink, accountLink } from "./linkSlice";

const initialState = {
  burgerActive: true,
  orderListActive: false,
  accountActive: false,
};

describe("Тестируем линк слайс", () => {
  test("test burgerLink", () => {
    expect(linkSlice(initialState, burgerLink())).toEqual({
      burgerActive: true,
      orderListActive: false,
      accountActive: false,
    });
    expect(linkSlice(undefined, burgerLink())).toEqual({
      burgerActive: true,
      orderListActive: false,
      accountActive: false,
    });
  });

  test("test orderLink", () => {
    expect(linkSlice(initialState, orderListLink())).toEqual({
      burgerActive: false,
      orderListActive: true,
      accountActive: false,
    });
    expect(linkSlice(undefined, orderListLink())).toEqual({
      burgerActive: false,
      orderListActive: true,
      accountActive: false,
    });
  });

  test("test accountLink", () => {
    expect(linkSlice(initialState, accountLink())).toEqual({
      burgerActive: false,
      orderListActive: false,
      accountActive: true,
    });
    expect(linkSlice(undefined, accountLink())).toEqual({
      burgerActive: false,
      orderListActive: false,
      accountActive: true,
    });
  });
});
