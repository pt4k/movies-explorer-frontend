import './Register.css';

function Register() {
  return (
    <section className='register'>
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
        Уже зарегистрированы? <a className='register__link'>Войти</a>
      </p>
    </section>
  );
}

export default Register;
