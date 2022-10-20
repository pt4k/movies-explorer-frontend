import { Link } from 'react-router-dom';
import acc from '../../images/acc.svg';
import burger_menu from '../../images/burger_menu.svg';
import './Navigation.css';

function Navigation({ loggedIn }) {
  return (
    <section className='navigation'>
      {loggedIn ? (
        <div className='navigation__onLog'>
          <div className='navigation__links'>
            <Link to='/movies' className='navigation__link'>
              Фильмы
            </Link>{' '}
            <Link to='/saved-movies' className='navigation__link'>
              Сохранённые фильмы
            </Link>
          </div>
          <div className='navigation__account'>
            <Link to='/profile' className='navigation__link'>
              Аккаунт
            </Link>{' '}
            <img className='navigation__img' src={acc} alt='Аккаунт' />
          </div>
          <div className='navigation__burger-menu'>
            <img src={burger_menu} alt='Меню' />
          </div>
        </div>
      ) : (
        <div className='navigation__buttons'>
          <Link to='/signup'>
            <button className='navigation__button navigation__button-reg'>
              Регистрация
            </button>
          </Link>
          <Link to='/signin'>
            <button className='navigation__button navigation__button-log'>
              Войти
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Navigation;
