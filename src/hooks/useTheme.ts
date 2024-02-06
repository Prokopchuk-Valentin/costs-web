import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = () => {
  const initialTheme = 'dark';

  const [theme, setTheme] = useLocalStorage('theme', initialTheme);

  const darkTheme =
    'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css';

  const lightTheme =
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';

  const swithTheme = () => {
    const inverseMode = theme === initialTheme ? 'light' : initialTheme;
    setTheme(inverseMode);

    console.log('inverseMode', inverseMode);
    console.log('theme', theme);
  };

  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement;
    link.href = theme === initialTheme ? darkTheme : lightTheme;
  }, [theme]);

  return { swithTheme, theme };
};
