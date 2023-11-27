import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../../utils/types/hooksTypes";
import { TOrderActions } from "../../utils/types/webSocketTypes";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TOrderActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };
        socket.onerror = () => {
          dispatch({ type: onError });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };
        socket.onclose = () => {
          dispatch({ type: onClose });
          socket = null;
        };
      }

      next(action);
    };
  }) as Middleware;
};
