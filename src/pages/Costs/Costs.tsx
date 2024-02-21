import React from 'react';
import { GateCostsPage, removeCost } from '@context/costsApi';

import { Spinner } from '@components/Spinner';
import { CostsForm } from './CostsForm';

import styles from './costs.module.css';
import { useGate } from 'effector-react';
import { costsStore } from '@context/costs';

export const Costs = React.memo(() => {
  const costs = costsStore.useCosts();
  const spinner = costsStore.useIsLoadingCosts();

  useGate(GateCostsPage);

  return (
    <div className="container">
      <h2 className={styles.costsHeader}>Учет моих расходов</h2>
      <CostsForm />
      <div className={styles.spinner}></div>
      {spinner && <Spinner top={0} left={0} />}
      {Boolean(costs.length) &&
        costs.map((cost) => (
          <div onClick={() => removeCost({ id: cost._id as string | number })}>
            {cost.price} {cost.text}
          </div>
        ))}
    </div>
  );
});
