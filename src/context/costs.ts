import { Cost } from '@utils/types';
import { createStore } from 'effector';
import { logout } from './auth';
import { useUnit } from 'effector-react';
import { $loadingCosts } from './costsApi';

export const $costs = createStore<Cost[]>([]).on(logout, () => []);

export const $totalPrice = $costs.map((cost) =>
  cost.reduce((acc, cost) => acc + cost.price, 0)
);

export const costsStore = {
  useCosts: () => useUnit($costs),
  useTotalPrice: () => useUnit($totalPrice),
  useIsLoadingCosts: () => useUnit($loadingCosts),
};
