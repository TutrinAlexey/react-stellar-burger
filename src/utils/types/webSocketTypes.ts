export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

export type TOrderConnectStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

export type TOrderConnectSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TOrderConnectError = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
};
export type TOrderConnectClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

type TOrder = {
  readonly ingredients: Array<string>;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type TOrderGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload:
    | {
        readonly success: true;
        readonly orders: Array<TOrder>;
        readonly total: number;
        readonly totalToday: number;
      }
    | { readonly success: false; readonly message: string };
};

export type TWSActions =
  | TOrderConnectStart
  | TOrderConnectSuccess
  | TOrderConnectError
  | TOrderConnectClosed
  | TOrderGetMessage;

export type TOrderActions = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};
