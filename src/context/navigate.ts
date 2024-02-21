import { attach, createEvent, createStore, sample } from 'effector';
import { NavigateFunction } from 'react-router-dom';

export const navigateApiChanged = createEvent<NavigateFunction>();
export const $navigateApi = createStore<NavigateFunction | null>(null);

sample({
  clock: navigateApiChanged,
  target: $navigateApi,
});

export const navigateFx = attach({
  source: $navigateApi,
  effect(navigate, { path }: { path: string }) {
    if (!navigate) {
      throw new Error('Notification API is not ready');
    }

    navigate(path);
  },
});
