import { Link, useLocation } from 'react-router-dom';
import styles from './auth.module.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@context/auth';
import { Spinner } from '@components/Spinner';
import { checkAuthInput } from '@context/alert';

type Location = 'login' | 'registration';

export function Auth() {
  const { register, handleSubmit, reset } = useForm();
  const spinner = login.useIsLoadingLogin();

  const type = useLocation().pathname.slice(1) as Location;

  const currentAuthTitle = type === 'login' ? 'Войти' : 'Регистрация';

  const handleAuth: SubmitHandler<FieldValues> = async (data) => {
    const { userName, password } = data;
    checkAuthInput({ userName, password, type });
    reset();
  };

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form className="form-group" onSubmit={handleSubmit(handleAuth)}>
        <label className={styles.authLabel}>
          Введите имя пользователя
          <input
            {...register('userName')}
            type="text"
            className="form-control"
          />
        </label>
        <label className={styles.authLabel}>
          Введите пароль
          <input
            {...register('password')}
            type="password"
            className="form-control"
          />
        </label>
        <button type="submit" className={`btn btn-primary ${styles.authBtn}`}>
          {(spinner && <Spinner top={5} left={20} />) || currentAuthTitle}
        </button>
      </form>
      {type === 'login' ? (
        <div>
          <span className={`${styles.questionText} question_text`}>
            Еще нет аккаунта?
          </span>
          <Link to={'/registration'}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className={`${styles.questionText} question_text`}>
            Уже есть аккаунт?
          </span>
          <Link to={'/login'}>Войти</Link>
        </div>
      )}
    </div>
  );
}
