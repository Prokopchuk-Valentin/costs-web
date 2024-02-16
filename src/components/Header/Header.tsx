import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useTheme } from '@hooks/useTheme';

import { login, logout } from '@context/auth';
import { themeConstants } from '@constants/themeConstants';
import { navigateApiChanged } from '@context/navigate';

export default function Header() {
  const navigate = useNavigate();
  const userName = login.useUserName();
  const isAuth = login.useIsAuth();

  const { swithTheme, theme } = useTheme();

  const { initialTheme } = themeConstants;

  useEffect(() => {
    navigateApiChanged(navigate);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header
        className={`navbar navbar-dark bg-${
          initialTheme === theme ? 'dark' : 'primary'
        }`}
      >
        <div className="container">
          <h1 style={{ color: 'white' }}>Мои расходы</h1>
          {isAuth && <h2 style={{ color: 'white' }}>{userName}</h2>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={`btn btn-${
                theme === initialTheme ? 'light' : initialTheme
              }`}
              onClick={swithTheme}
            >
              Переключить на {initialTheme === theme ? 'светлую' : 'тёмную'}{' '}
              тему
            </button>
            {isAuth && (
              <button
                className={`btn btn-${
                  theme === initialTheme ? 'light' : initialTheme
                }`}
                onClick={handleLogout}
              >
                Выйти
              </button>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
