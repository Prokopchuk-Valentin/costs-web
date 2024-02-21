import { useEffect } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { login } from '@context/auth';
import { privateRoutes, publicRoutes } from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/ErrorPage';
import { AlertProvider } from '@components/Alert';
import { attachLogger } from 'effector-logger';

export function App() {
  const isAuth = login.useIsAuth();

  useEffect(() => {
    const unlog = attachLogger();
    return () => unlog();
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <AlertProvider>
        <Router>
          <Header />
          <Routes>
            {isAuth ? privateRoutes.map((e) => e) : publicRoutes.map((e) => e)}
          </Routes>
        </Router>
      </AlertProvider>
    </ErrorBoundary>
  );
}

export default App;
