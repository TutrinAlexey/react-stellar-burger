type TAuthSelector = {
  authentication: {
    isAuthChecked: boolean;
    user: {
      name: string;
      email: string;
    } | null;
    error: string;
    message: string;
    isEmailSent: boolean;
    isFormPending: boolean;
    accessToken: string;
    isPassReset: boolean;
  };
};

export const isLogin = (state: TAuthSelector) =>
  state.authentication.isAuthChecked;
export const user = (state: TAuthSelector) => state.authentication.user;
export const error = (state: TAuthSelector) => state.authentication.error;
export const message = (state: TAuthSelector) => state.authentication.message;
export const emailSent = (state: TAuthSelector) =>
  state.authentication.isEmailSent;
export const formPending = (state: TAuthSelector) =>
  state.authentication.isFormPending;
export const token = (state: TAuthSelector) => state.authentication.accessToken;
export const isPassReset = (state: TAuthSelector) =>
  state.authentication.isPassReset;
