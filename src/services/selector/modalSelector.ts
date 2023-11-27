import { TOrderInfo } from "../../utils/types/orderType";

type TModalSelector = {
  modal: {
    orderOpen: boolean;
    orderInfo: TOrderInfo | null;
    orderIsLoading: boolean;
    orderError: string;
  };
};

export const orderOpenSelector = (store: TModalSelector) =>
  store.modal.orderOpen;
export const orderInfoSelector = (store: TModalSelector) =>
  store.modal.orderInfo;
export const orderLoading = (state: TModalSelector) =>
  state.modal.orderIsLoading;
export const orderError = (state: TModalSelector) => state.modal.orderError;
