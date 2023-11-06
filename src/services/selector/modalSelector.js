export const orderOpenSelector = (store) => store.modal.orderOpen;
export const ingredientOpenSelector = (store) => store.modal.ingredientOpen;
export const orderInfoSelector = (store) => store.modal.orderInfo;
export const ingredientInfoSelector = (store) => store.modal.ingredientInfo;
export const getOrderInfo = (state) => state.modal.orderInfo;
export const orderLoading = (state) => state.modal.orderIsLoading;
export const orderError = (state) => state.modal.orderError;

