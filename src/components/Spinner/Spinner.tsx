import React from 'react';
import styles from './spinner.module.css';

interface Props {
  top?: number;
  left: number;
}

export const Spinner = React.memo(({ top, left }: Props) => {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className={`spinner-border ${styles.mainSpinner}`}
      role="status"
    />
  );
});
