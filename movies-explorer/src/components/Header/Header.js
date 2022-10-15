import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <img alt='Логотип' className='logo' src={logo} />
      <div className='header__buttons'>
        <button className='header__button header__button-reg'>
          Регистрация
        </button>
        <button className='header__button header__button-log'>Войти</button>
      </div>
    </header>
  );
}

export default Header;
