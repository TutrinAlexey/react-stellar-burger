import { TOrderFeed } from "../../utils/types/orderType";

type TOrdersSelector = {
  ordersFeed: {
    orders: Array<TOrderFeed> | null;
    total: number;
    totalToday: number;
    connected: boolean;
    error: string;
  };
};

export const orders = (store: TOrdersSelector) => store.ordersFeed.orders;
export const total = (store: TOrdersSelector) => store.ordersFeed.total;
export const totalToday = (store: TOrdersSelector) =>
  store.ordersFeed.totalToday;
export const connected = (store: TOrdersSelector) => store.ordersFeed.connected;
export const error = (store: TOrdersSelector) => store.ordersFeed.error;
