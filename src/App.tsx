import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $auth } from '@context/auth';
import { privateRoutes, publicRoutes } from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/ErrorPage';
import { AlertProvider } from '@components/Alert';

export function App() {
  const isLoggedIn = useUnit($auth);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <AlertProvider>
        <Header />
        <Router>
          <Routes>
            {isLoggedIn
              ? privateRoutes.map((e) => e)
              : publicRoutes.map((e) => e)}
          </Routes>
        </Router>
      </AlertProvider>
    </ErrorBoundary>
  );
}

export default App;
