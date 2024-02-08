import { IAlert } from '@utils/types';

import styles from './alert.module.css';
interface Props {
  props: IAlert;
}
export function Alert({ props }: Props) {
  return (
    <div className={`alert ${styles.alertWrapper} alert-${props.alertStatus}`}>
      {props.alertText}
    </div>
  );
}
