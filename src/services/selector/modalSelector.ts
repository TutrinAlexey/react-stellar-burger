import { TIngredient } from "../../utils/types/ingredientType";
import { TOrderInfo } from "../../utils/types/orderType";

type TModalSelector = {
  modal: {
    orderOpen: boolean;
    ingredientOpen: boolean;
    orderInfo: TOrderInfo | null;
    ingredientInfo: TIngredient | {};
    orderIsLoading: boolean;
    orderError: string
  }
}

export const orderOpenSelector = (store: TModalSelector) => store.modal.orderOpen;
export const ingredientOpenSelector = (store: TModalSelector) =>
  store.modal.ingredientOpen;
export const orderInfoSelector = (store: TModalSelector) => store.modal.orderInfo;
export const ingredientInfoSelector = (store: TModalSelector) =>
  store.modal.ingredientInfo;
export const orderLoading = (state: TModalSelector) => state.modal.orderIsLoading;
export const orderError = (state: TModalSelector) => state.modal.orderError;
