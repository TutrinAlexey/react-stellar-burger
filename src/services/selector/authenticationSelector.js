export const isLogin = (state) => state.authentication.isAuthChecked;
export const user = (state) => state.authentication.user;
export const error = (state) => state.authentication.error;
export const message = (state) => state.authentication.message;
export const emailSent = (state) => state.authentication.isEmailSent;
export const formPending = (state) => state.authentication.isFormPending;
export const token = (state) => state.authentication.accessToken;
