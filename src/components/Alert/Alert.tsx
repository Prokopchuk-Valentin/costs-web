import { IAlert } from '@utils/types';

interface Props {
  props: IAlert;
}
export function Alert({ props }: Props) {
  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
    </div>
  );
}
