import styles from './spinner.module.css';

interface Props {
  top?: number;
  left: number;
}

export function Spinner({ top, left }: Props) {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className={`spinner-border ${styles.mainSpinner}`}
      role="status"
    />
  );
}
