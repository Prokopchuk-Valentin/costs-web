import { createDomain, sample } from 'effector';
import { logInFx, logout, registerFx } from './auth';
import { configure } from 'effector-logger';

export interface Alert {
  alertStatus: string;
  alertText: string;
  alertActive: boolean;
}

export interface CheckAlert {
  userName: string;
  password: string;
  type: string;
}

const alertActive = true;

export const initialState = {
  alertStatus: '',
  alertText: '',
  alertActive: false,
};

const alert = createDomain();

export const setAlert = alert.createEvent<Alert>();
export const checkAuthInput = alert.createEvent<CheckAlert>();
export const resetAlert = alert.createEvent();

export const $alert = alert
  .createStore<Alert>(initialState)
  .on(setAlert, (_, value) => value)
  .on(logout, () => ({
    alertStatus: 'success',
    alertText: 'Вы вышли из системы',
    alertActive,
  }))
  .on(logInFx.done, () => ({
    alertStatus: 'success',
    alertText: 'Вы вошли успешно',
    alertActive,
  }))
  .on(logInFx.failData, (_, payload) => ({
    alertStatus: 'danger',
    alertText: payload.response?.data.message || 'Не верный логин или пароль',
    alertActive,
  }))
  .on(registerFx.done, () => ({
    alertStatus: 'success',
    alertText: 'Вы зарегистрировались успешно',
    alertActive,
  }))
  .on(registerFx.failData, (_, payload) => ({
    alertStatus: 'danger',
    alertText: payload.response?.data.message || 'Ошибка регистрации',
    alertActive,
  }))
  .reset(resetAlert);

configure($alert, { log: 'enabled' });

sample({
  clock: checkAuthInput,
  filter: ({ userName, password }) => !userName || !password,
  fn: () => ({
    alertStatus: 'warning',
    alertText: 'Не все данные введены',
    alertActive,
  }),
  target: $alert,
});

sample({
  clock: checkAuthInput,
  filter: ({ password, type }) => password.length < 5 && type !== 'login',
  fn: () => ({
    alertStatus: 'warning',
    alertText: 'Пароль слишком маленький!',
    alertActive,
  }),
  target: $alert,
});

sample({
  clock: checkAuthInput,
  filter: ({ password, type, userName }) =>
    !!password && !!userName && type === 'login',
  fn: ({ userName, password }) => ({
    password,
    userName,
  }),
  target: logInFx,
});

sample({
  clock: checkAuthInput,
  filter: ({ password, type, userName }) =>
    !!password && !!userName && type === 'registration' && password.length >= 5,
  fn: ({ userName, password }) => ({
    password,
    userName,
  }),
  target: registerFx,
});
