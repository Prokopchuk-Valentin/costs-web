import { themeConstants } from '@constants/themeConstants';
import { useTheme } from '@hooks/useTheme';
import { Outlet } from 'react-router-dom';

export default function Header() {
  const { swithTheme, theme } = useTheme();
  const { initialTheme } = themeConstants;
  return (
    <>
      <header
        className={`navbar navbar-dark bg-${
          initialTheme === theme ? 'dark' : 'primary'
        }`}
      >
        <div className="container">
          <h1 style={{ color: 'white' }}>Мои расходы</h1>
          <button
            className={`btn btn-${
              theme === initialTheme ? 'light' : initialTheme
            }`}
            onClick={swithTheme}
          >
            Переключить на {initialTheme === theme ? 'светлую' : 'тёмную'} тему
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
