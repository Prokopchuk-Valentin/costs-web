import { Link, useLocation } from 'react-router-dom';
import './styles.css';

type Location = 'login' | 'registration';

export function Auth() {
  const location = useLocation();
  const type = location.pathname.slice(1) as Location;
  const currentAuthTitle = type === 'login' ? 'Войти' : 'Регистрация';

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form className="form-group">
        <label className="auth_label">
          Введите имя пользователя
          <input type="text" className="form-control" />
        </label>
        <label className="auth_label">
          Введите пароль
          <input type="password" className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">{currentAuthTitle}</button>
      </form>
      {type === 'login' ? (
        <div>
          <span className="question_text">Еще нет аккаунта?</span>
          <Link to={'/registration'}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          <span className="question_text">Уже есть аккаунт?</span>
          <Link to={'/login'}>Войти</Link>
        </div>
      )}
    </div>
  );
}
