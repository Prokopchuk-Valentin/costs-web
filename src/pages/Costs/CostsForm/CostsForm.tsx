import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { costsStore, createCost } from '@context/costs';

import { Spinner } from '@components/Spinner';
import { Input } from '@components/Input';

import styles from './costs.module.css';
import React from 'react';


interface FormCost {
  text: string;
  price: number;
  date: Date;
}

export const CostsForm = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCost>();

  const spinner = costsStore.useIsLoadingCosts();
  const totalPrice = costsStore.useTotalPrice();

  const handleLogin: SubmitHandler<FieldValues> = (data) => {
    const { text, price, date } = data;
    createCost({ cost: { text, price, date } });
  };

  return (
    <div className={styles.costsForm}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={`d-flex mb-3 ${styles.form}`}
      >
        <Input<FormCost>
          register={register}
          isError={errors.text}
          registerOptions={{ required: true }}
          type="text"
          registerName={'text'}
          errorMessage="Поле обязательно"
          label="Куда было потрачено:"
        />
        <Input<FormCost>
          register={register}
          isError={errors.price}
          registerOptions={{ required: true, min: 0 }}
          type={'number'}
          registerName={'price'}
          errorMessage="Поле обязательно и не может быть меньше 0"
          label="Cколько планируется потратить:"
        />
        <Input<FormCost>
          register={register}
          isError={errors.date}
          registerOptions={{}}
          type={'date'}
          registerName={'date'}
          errorMessage=""
          label="Когда было потрачено:"
        />
        <button type="submit" className={`btn btn-primary ${styles.authBtn}`}>
          {(spinner && <Spinner top={5} left={20} />) || 'Добавить'}
        </button>
      </form>
      <div className={styles.totalPrice}>
        Итого:
        <span> {totalPrice}</span>
        p.
      </div>
    </div>
  );
});
