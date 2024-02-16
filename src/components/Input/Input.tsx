import { HTMLInputTypeAttribute } from 'react';
import {
  FieldError,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  Path,
} from 'react-hook-form';

import styles from './input.module.css';

interface InputProps<TFieldValues extends FieldValues> {
  label: string;
  register: UseFormRegister<TFieldValues>;
  registerOptions: RegisterOptions;
  isError: FieldError | undefined;
  type: HTMLInputTypeAttribute;
  registerName: Path<TFieldValues>;
  errorMessage: string;
}

export const Input = <TFieldValues extends FieldValues>({
  register,
  isError,
  registerOptions,
  type,
  label,
  registerName,
  errorMessage,
}: InputProps<TFieldValues>) => {
  return (
    <div className={styles.formItem}>
      <label className="mb-3">{label}</label>
      <input
        type={type}
        className="form-control"
        {...register(registerName, registerOptions)}
      />
      {isError && <span>{errorMessage}</span>}
    </div>
  );
};
