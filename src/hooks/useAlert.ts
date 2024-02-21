import { useUnit } from 'effector-react';
import { debounce } from 'patronum/debounce';
import { useEffect } from 'react';
import { $alert, resetAlert, setAlert as setter } from '@context/alert';

export const useAlert = (time = 5000) => {
  const alert = useUnit($alert);

  const resetAlertDebounced = debounce({
    source: $alert.updates.filter({ fn: (alert) => alert.alertActive }),
    timeout: time,
    target: resetAlert,
  });

  useEffect(() => {
    const unsub = resetAlertDebounced.watch(() => {});

    return () => {
      unsub();
    };
  }, []);

  const setAlert = (alertStatus: string, alertText: string) => {
    setter({ alertStatus, alertText, alertActive: true });
  };

  return { alert, setAlert };
};
