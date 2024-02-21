import { AxiosResponse } from 'axios';
import { attach } from 'effector';
import { $refreshToken, $userName } from './auth';
import { api } from '@api/axiosClient';
import { debounce } from 'patronum';

type RefreshTokenResponse = AxiosResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export const refreshTokenFx = attach({
  source: { refreshToken: $refreshToken, userName: $userName },
  async effect({ refreshToken, userName }) {
    return await api.post<unknown, RefreshTokenResponse>('auth/refresh', {
      refreshToken,
      userName,
    });
  },
});

export const refreshTokenDebounced = debounce({
  source: refreshTokenFx.doneData,
  timeout: 500,
});
