export type MeResponse = {
  userId: string;
  login: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

// Arguments
export type LoginArgs = {
  code: string;
  redirectUri: string;
  remeberMe: boolean;
  accessTokenTTL?: string;
};
