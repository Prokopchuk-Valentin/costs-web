import { Auth } from '@pages/Auth';
import { Navigate, Route } from 'react-router-dom';

export const privateRoutes = [
  <Route path="/costs" element={<>costs</>} />,
  <Route path="/*" element={<Navigate to={'/costs'} />} />,
];

export const publicRoutes = [
  <Route path="/login" element={<Auth />} />,
  <Route path="/registration" element={<Auth />} />,
  <Route path="/*" element={<Navigate to={'/login'} />} />,
];
