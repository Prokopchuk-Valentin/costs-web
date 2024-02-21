import { interval } from 'patronum/interval';
import { attach, createEvent, createStore, sample } from 'effector';
import { AxiosError, AxiosResponse } from 'axios';
import { createGate } from 'effector-react';

import { $accessToken, $loginStoreResponse, $userName, logout } from './auth';
import { Cost } from '@utils/types';
import { api } from '@api/axiosClient';
import { refreshTokenDebounced, refreshTokenFx } from './refreshToken';
import { $costs } from './costs';

interface SourceCosts {
  token: string;
}

type CostsGetResponse = AxiosResponse<Cost[]>;
type CostCreateResponse = AxiosResponse<Cost>;
type CostUdateResponse = AxiosResponse<Cost>;

export const stop = createEvent();
export const createCost = createEvent<{ cost: Cost }>();
export const updateCost = createEvent<{ cost: Cost }>();
export const removeCost = createEvent<{ id: number | string }>();
export const GateCostsPage = createGate();

export const getCostsFx = attach({
  source: { token: $accessToken },
  effect: async ({ token }: SourceCosts) => {
    return await api.get<unknown, CostsGetResponse>('/cost', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
});

export const createCostFx = attach({
  source: { token: $accessToken },
  effect: async ({ token }: SourceCosts, { cost }: { cost: Cost }) => {
    return await api.post<unknown, CostCreateResponse>(
      '/cost',
      { ...cost },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
});

export const updateCostFx = attach({
  source: { token: $accessToken },
  effect: async ({ token }: SourceCosts, { cost }: { cost: Cost }) => {
    return await api.patch<unknown, CostUdateResponse>(
      '/cost',
      { ...cost },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
});

export const removeCostFx = attach({
  source: { token: $accessToken },
  effect: async ({ token }: SourceCosts, { id }: { id: string | number }) => {
    return await api.delete(`/cost/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
});

export const $apiError = createStore<string>('').reset(
  getCostsFx.done,
  createCostFx.done,
  removeCostFx.done,
  updateCostFx.done
);

export const $removeIdSave = createStore<{ id?: number | string }>({});

export const $saveCost = createStore<{ cost?: Cost }>({});

export const $loadingCosts = createStore<boolean>(true).on(
  getCostsFx.pending,
  (state, pending) => (state ? pending : false)
);

const { tick: getCosts } = interval({
  timeout: 3000,
  leading: true,
  start: GateCostsPage.open,
  stop: stop,
});

setTimeout(() => {
  stop();
}, 100);

sample({ clock: getCosts, target: getCostsFx });

sample({
  clock: getCostsFx.doneData,
  fn: (response) => response.data,
  target: $costs,
});

sample({
  clock: getCostsFx.failData,
  filter: (error) =>
    (error as AxiosError<{ message: string }>).response?.data?.message ===
    'jwt expired',
  fn: () => 'getCosts',
  target: [$apiError, refreshTokenFx],
});

sample({
  clock: createCost,
  target: [createCostFx, $saveCost],
});

sample({
  clock: createCostFx.doneData,
  source: $costs,
  fn: (store, response) => [...store, response.data],
  target: [$costs, $saveCost.reset()],
});

sample({
  clock: createCostFx.failData,
  filter: (error) =>
    (error as AxiosError<{ message: string }>).response?.data?.message ===
    'jwt expired',
  fn: () => 'createCost',
  target: [$apiError, refreshTokenFx],
});

sample({
  clock: updateCost,
  target: [updateCostFx, $saveCost],
});

sample({
  clock: updateCostFx.doneData,
  source: $costs,
  fn: (store, updatedCost) =>
    store.map((cost) =>
      cost._id === updatedCost.data._id ? updatedCost.data : cost
    ),
  target: [$costs, $saveCost.reset()],
});

sample({
  clock: updateCostFx.failData,
  filter: (error) =>
    (error as AxiosError<{ message: string }>).response?.data?.message ===
    'jwt expired',
  fn: () => 'updateCost',
  target: [$apiError, refreshTokenFx],
});

sample({
  clock: removeCost,
  target: [removeCostFx, $removeIdSave],
});

sample({
  clock: removeCostFx.doneData,
  source: { removeId: $removeIdSave, costs: $costs },
  filter: (_, payload) => payload.status === 200,
  fn: ({ removeId, costs }) => costs.filter((cost) => cost._id !== removeId.id),
  target: [$costs, $removeIdSave.reset()],
});

sample({
  clock: removeCostFx.failData,
  filter: (error) =>
    (error as AxiosError<{ message: string }>).response?.data?.message ===
    'jwt expired',
  fn: () => 'removeCost',
  target: [$apiError, refreshTokenFx],
});

sample({
  clock: refreshTokenFx.doneData,
  source: $userName,
  filter: (_, response) => response.status === 200,
  fn: (userName, response) => ({ ...response.data, userName }),
  target: $loginStoreResponse,
});

sample({
  clock: refreshTokenDebounced,
  source: $apiError,
  filter: (apiError) => apiError === 'getCosts',
  target: [getCostsFx],
});

sample({
  clock: refreshTokenDebounced,
  source: {
    apiError: $apiError,
    saveCost: $saveCost,
  },
  filter: (source) => source.apiError === 'createCost' && !!source.saveCost,
  fn: (source) => source.saveCost as { cost: Cost },
  target: [createCostFx],
});

sample({
  clock: refreshTokenDebounced,
  source: {
    apiError: $apiError,
    saveCost: $saveCost,
  },
  filter: (source) => source.apiError === 'updateCost' && !!source.saveCost,
  fn: (source) => source.saveCost as { cost: Cost },
  target: [updateCostFx],
});

sample({
  clock: refreshTokenDebounced,
  source: {
    apiError: $apiError,
    removeIdSave: $removeIdSave,
  },
  filter: (source) => source.apiError === 'removeCost' && !!source.removeIdSave,
  fn: (source) => source.removeIdSave as { id: string | number },
  target: [removeCostFx],
});

sample({
  clock: refreshTokenFx.fail,
  target: logout,
});
