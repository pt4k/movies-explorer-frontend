import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isName, isEmail } from '../../utils/regExp';
import logo from '../../images/logo.svg';
import './Register.css';

const Register = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [name, email, password] = watch(['name', 'email', 'password']);

  function handleFormSubmit() {
    onRegister({ name, email, password });
  }

  return (
    <section className='register'>
      <Link to='/' className='register__logo'>
        <img src={logo} alt='Логотип' />
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form
        className='register__form'
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <label className='register__label'>
          Имя
          <input
            className='register__input'
            {...register('name', {
              required: 'Это поле обязательно к заполнению.',
              pattern: {
                value: isName,
                message:
                  'Имя может содержать русские и латинские буквы, дефис, пробел.',
              },
            })}
          />
          {errors.name && (
            <span className='register__input-error'>{errors.name.message}</span>
          )}
        </label>

        <label className='register__label'>
          E-mail
          <input
            className='register__input'
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
            <span className='register__input-error'>
              {errors.email.message}
            </span>
          )}
        </label>

        <label className='register__label'>
          Пароль
          <input
            className='register__input'
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
            <span className='register__input-error'>
              {errors.password.message}
            </span>
          )}
        </label>

        <button
          className={`${
            isValid ? 'register__button' : 'register__button_disabled'
          }`}
          type='submit'
          disabled={!isValid}
        >
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
};

export default Register;
