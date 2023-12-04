import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../../utils/types/webSocketTypes";
import ordersReducer from "./ordersReducer";

const initialState = {
  orders: null,
  total: 0,
  totalToday: 0,
  connected: false,
  error: "",
};

describe("Тестируем ордерс редьюсер", () => {
  test("test ws_connection_start", () => {
    expect(ordersReducer(initialState, { type: WS_CONNECTION_START })).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: false,
      error: "",
    });

    expect(ordersReducer(undefined, { type: WS_CONNECTION_START })).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: false,
      error: "",
    });
  });

  test("test ws_connection_success", () => {
    expect(
      ordersReducer(initialState, { type: WS_CONNECTION_SUCCESS })
    ).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: true,
      error: "",
    });

    expect(
      ordersReducer(initialState, { type: WS_CONNECTION_SUCCESS })
    ).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: true,
      error: "",
    });
  });

  test("test ws_connection_error", () => {
    expect(ordersReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: false,
      error: "Ошибка при загрузке заказов",
    });

    expect(ordersReducer(undefined, { type: WS_CONNECTION_ERROR })).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: false,
      error: "Ошибка при загрузке заказов",
    });
  });

  test("test ws_connection_closed", () => {
    expect(ordersReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual(
      {
        orders: null,
        total: 0,
        totalToday: 0,
        connected: false,
        error: "",
      }
    );

    expect(ordersReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      connected: false,
      error: "",
    });
  });

  test("test ws_get_message", () => {
    const fakepayload = {
      success: true,
      orders: [],
      total: 123,
      totalToday: 1234,
      message: "error",
    };
    expect(
      ordersReducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: fakepayload,
      })
    ).toEqual(
      fakepayload.success
        ? {
            ...initialState,
            orders: fakepayload.orders,
            total: fakepayload.total,
            totalToday: fakepayload.totalToday,
          }
        : {
            ...initialState,
            error: fakepayload.message,
          }
    );

    expect(
      ordersReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: fakepayload,
      })
    ).toEqual(
      fakepayload.success
        ? {
            connected: false,
            error: "",
            orders: fakepayload.orders,
            total: fakepayload.total,
            totalToday: fakepayload.totalToday,
          }
        : {
            orders: null,
            total: 0,
            totalToday: 0,
            connected: false,
            error: fakepayload.message,
          }
    );
  });
});
