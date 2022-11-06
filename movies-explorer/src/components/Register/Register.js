import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Register.css';

function Register() {
  return (
    <section className='register'>
      <Link to='/' className='register__logo'>
        <img src={logo} alt='Логотип' />
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form'>
        <label className='register__label'>Имя</label>
        <input className='register__input' />

        <label className='register__label'>E-mail</label>
        <input className='register__input' />

        <label className='register__label'>Пароль</label>
        <input className='register__input' type='password' />

        <button className='register__button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <p className='register__text'>
        Уже зарегистрированы?{' '}
        <Link to='/signin' className='register__link'>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
