import { api } from '@api/axiosClient';
import persist from 'effector-localstorage';
import { AxiosError, AxiosResponse } from 'axios';

import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { navigateFx } from './navigate';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userName: string;
}

interface RegitrationResponse {
  message: string;
}

interface RequestLogReg {
  userName: string;
  password: string;
}

export const $loginStoreResponse = createStore<AuthResponse | object>({});

export const $isAuth = $loginStoreResponse.map(
  (state) =>
    'accessToken' in state && 'refreshToken' in state && 'userName' in state
);

export const $accessToken = $loginStoreResponse.map(
  (state: AuthResponse | object) =>
    state && 'accessToken' in state ? state?.accessToken : ''
);

export const $refreshToken = $loginStoreResponse.map(
  (state: AuthResponse | object) =>
    state && 'refreshToken' in state ? state?.refreshToken : ''
);

export const $userName = $loginStoreResponse.map(
  (state: AuthResponse | object) =>
    state && 'userName' in state ? state?.userName : ''
);

export const logout = createEvent();
export const setUserName = createEvent<string>();
export const logInEvent = createEvent<RequestLogReg>();
export const registerEvent = createEvent<RequestLogReg>();

sample({
  clock: logout,
  fn: () => ({ path: '/login' }),
  target: navigateFx,
});

export const logInFx = createEffect<
  RequestLogReg,
  AxiosResponse<AuthResponse>,
  AxiosError<{ message: string }>
>('login', {
  handler: async ({ userName, password }) =>
    await api.post<AuthResponse>('/auth/login', {
      userName,
      password,
    }),
});

export const registerFx = createEffect<
  RequestLogReg,
  AxiosResponse<RegitrationResponse>,
  AxiosError<{ message: string }>
>('login', {
  handler: async ({ userName, password }) =>
    await api.post<RegitrationResponse>('/auth/registration', {
      userName,
      password,
    }),
});

sample({
  clock: logInFx.doneData,
  filter: (response: AxiosResponse<AuthResponse>) => response.status === 200,
  fn: () => ({ path: '/costs' }),
  target: navigateFx,
});

sample({
  clock: registerFx.doneData,
  fn: () => ({ path: '/login' }),
  target: navigateFx,
});

sample({
  clock: logInFx.doneData,
  filter: (response: AxiosResponse<AuthResponse>) => response.status === 200,
  fn: (response) => response.data,
  target: $loginStoreResponse,
});

sample({
  clock: logout,
  fn: () => ({}),
  target: $loginStoreResponse,
});

persist({
  store: $loginStoreResponse,
  key: 'authData',
});

export const $isLoading = createStore<boolean>(false)
  .on(logInFx.pending, (_, pending) => pending)
  .on(registerFx.pending, (_, pending) => pending);

export const login = {
  useAccessToken: () => useUnit($accessToken),
  useRefreshToken: () => useUnit($refreshToken),
  useUserName: () => useUnit($userName),
  useIsAuth: () => useUnit($isAuth),
  useLoginStoreResponse: () => useUnit($loginStoreResponse),
  useIsLoadingLogin: () => useUnit($isLoading),
};
