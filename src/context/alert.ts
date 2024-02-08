import { createDomain } from 'effector';

export interface Alert {
  alertStatus: string;
  alertText: string;
  alertActive: boolean;
}

export const initialState = { alertStatus: '', alertText: '', alertActive: false };

const alert = createDomain();

export const setAlert = alert.createEvent<Alert>();

export const $alert = alert
  .createStore<Alert>(initialState)
  .on(setAlert, (_, value) => value);
