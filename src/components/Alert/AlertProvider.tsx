import { ReactNode } from 'react';
import { Alert } from './Alert';
import { useAlert } from '@hooks/useAlert';

export function AlertProvider({ children }: { children: ReactNode }) {
  const {
    alert: { alertStatus, alertActive, alertText },
  } = useAlert();

  return (
    <>
      {alertActive && <Alert props={{ alertStatus, alertText }} />}
      {children}
    </>
  );
}
