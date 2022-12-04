import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { isName, isEmail } from '../../utils/regExp';
import './Profile.css';

function Profile({ handleEditUser, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, defaultValues, isSubmitted, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  let [name, email] = watch(['name', 'email']);

  useEffect(() => {
    setDefaultValues();
  }, [isSubmitted, isSubmitting]);

  function setDefaultValues() {
    defaultValues.name = name;
    defaultValues.email = email;
  }

  function handleFormSubmit() {
    handleEditUser({ name, email });
  }

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form className='profile__form' action='POST' noValidate>
        <div className='profile__input-wrap'>
          <label className='profile__label'>
            Имя
            <input
              className='profile__input'
              {...register('name', {
                required: 'Это поле обязательно к заполнению.',
                pattern: {
                  value: isName,
                  message:
                    'Имя может содержать русские и латинские буквы, дефис, пробел.',
                },
              })}
            />
          </label>
          {errors.name && (
            <span className='profile__input-error'>{errors.name.message}</span>
          )}
        </div>

        <div className='profile__line'></div>

        <div className='profile__input-wrap'>
          <label className='profile__label'>
            E-mail
            <input
              className='profile__input'
              type='email'
              {...register('email', {
                required: 'Это поле обязательно к заполнению.',
                pattern: {
                  value: isEmail,
                  message: 'E-mail введен не верно',
                },
              })}
            />
          </label>
          {errors.email && (
            <span className='profile__input-error'>{errors.email.message}</span>
          )}
        </div>
        <button
          className={
            isValid &&
            defaultValues.name === name &&
            defaultValues.email === email
              ? 'profile__button_disabled'
              : 'profile__button profile__button-edit'
          }
          type='submit'
          onClick={handleSubmit(handleFormSubmit)}
          disabled={
            isValid &&
            defaultValues.name === name &&
            defaultValues.email === email
          }
        >
          Редактировать
        </button>
        <button
          className='profile__button profile__button-exit'
          type='button'
          onClick={handleLogOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
