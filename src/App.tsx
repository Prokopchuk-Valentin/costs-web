import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $auth } from '@context/auth';
import { privateRoutes, publicRoutes } from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/ErrorPage';

export function App() {
  const isLoggedIn = useUnit($auth);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Header />
      <Router
        children={
          <Routes
            children={
              isLoggedIn
                ? privateRoutes.map((e) => e)
                : publicRoutes.map((e) => e)
            }
          />
        }
      />
    </ErrorBoundary>
  );
}

export default App;
