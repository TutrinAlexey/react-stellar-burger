export type TPathUser = {
    user: {
        email: string;
        name: string;
      };
};

export type TBodyPathUser = {
    email?: string;
    password?: string;
    name?: string;
}

export type TResponse<T = {}> = T & {
  success: boolean;
  message?: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TGetUser = {
  user: {
    email: string;
    name: string;
  };
};

export type TBodyResetPass = {
  password: string;
  token: string;
};

export type TBodyRegister = {
  email: string;
  password: string;
  name: string;
};

export type TPostRegister = {
  user: {
    email: string;
    name: string;
  };
  refreshToken: string;
  aCCessToken: string;
};

export type TBodyLogin = {
  email: string;
  password: string;
};

export type TPostLogin = {
  user: {
    email: string;
    name: string;
  };
  refreshToken: string;
  aCCessToken: string;
};
