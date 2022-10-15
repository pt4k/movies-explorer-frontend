import './Login.css';

function Login() {
  return (
    <section className='login'>
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
        Ещё не зарегистрированы? <a className='login__link'>Регистрация</a>
      </p>
    </section>
  );
}

export default Login;
