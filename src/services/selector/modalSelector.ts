export const orderOpenSelector = (store: any) => store.modal.orderOpen;
export const ingredientOpenSelector = (store: any) =>
  store.modal.ingredientOpen;
export const orderInfoSelector = (store: any) => store.modal.orderInfo;
export const ingredientInfoSelector = (store: any) =>
  store.modal.ingredientInfo;
export const getOrderInfo = (state: any) => state.modal.orderInfo;
export const orderLoading = (state: any) => state.modal.orderIsLoading;
export const orderError = (state: any) => state.modal.orderError;
