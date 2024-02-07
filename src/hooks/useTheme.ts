import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { themeConstants } from '@constants/themeConstants';

export const useTheme = () => {
  const { initialTheme, darkTheme, lightTheme } = themeConstants;
  const [theme, setTheme] = useLocalStorage('theme', initialTheme);

  const swithTheme = () => {
    const inverseMode = theme === initialTheme ? 'light' : initialTheme;
    setTheme(inverseMode);
  };

  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement;
    link.href = theme === initialTheme ? darkTheme : lightTheme;
  }, [theme]);

  return { swithTheme, theme };
};
