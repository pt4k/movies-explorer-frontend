import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';

function Login() {
  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <img src={logo} alt='Логотип' />
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form className='login__form'>
        <label className='login__label'>E-mail</label>
        <input className='login__input' />

        <label className='login__label'>Пароль</label>
        <input className='login__input' type='password' />

        <button className='login__button' type='submit'>
          Войти
        </button>
      </form>
      <p className='login__text'>
        Ещё не зарегистрированы?{' '}
        <Link to='/signup' className='login__link'>
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
