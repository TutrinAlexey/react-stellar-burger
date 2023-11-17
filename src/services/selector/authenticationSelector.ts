export const isLogin = (state: any) => state.authentication.isAuthChecked;
export const user = (state: any) => state.authentication.user;
export const error = (state: any) => state.authentication.error;
export const message = (state: any) => state.authentication.message;
export const emailSent = (state: any) => state.authentication.isEmailSent;
export const formPending = (state: any) => state.authentication.isFormPending;
export const token = (state: any) => state.authentication.accessToken;
export const isPassReset = (state: any) => state.authentication.isPassReset;
