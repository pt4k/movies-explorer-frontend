import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils/regExp';
import logo from '../../images/logo.svg';
import './Login.css';

function Login({ onLog }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [email, password] = watch(['email', 'password']);

  function handleFormSubmit() {
    onLog({ email, password });
  }

  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <img src={logo} alt='Логотип' />
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form
        className='login__form'
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <label className='login__label'>
          E-mail
          <input
            className='login__input'
            type='email'
            {...register('email', {
              required: 'Это поле обязательно к заполнению.',
              pattern: {
                value: isEmail,
                message: 'E-mail введен не верно',
              },
            })}
          />
          {errors.email && (
            <span className='login__input-error'>{errors.email.message}</span>
          )}
        </label>

        <label className='login__label'>
          Пароль
          <input
            className='login__input'
            type='password'
            {...register('password', {
              required: 'Это поле обязательно к заполнению.',
              minLength: {
                value: 4,
                message: 'Пароль должен содержать минимум 4 символа',
              },
            })}
          />
          {errors.password && (
            <span className='login__input-error'>
              {errors.password.message}
            </span>
          )}
        </label>

        <button
          className={`${isValid ? 'login__button' : 'login__button_disabled'}`}
          type='submit'
          disabled={!isValid}
        >
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
