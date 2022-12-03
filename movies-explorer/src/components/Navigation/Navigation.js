import { NavLink, Link } from 'react-router-dom';
import acc from '../../images/acc.svg';
import burger_menu from '../../images/burger_menu.svg';
import './Navigation.css';

function Navigation({ isLoggedIn, handleOpenPopup }) {
  return (
    <section className='navigation'>
      {isLoggedIn ? (
        <div className='navigation__onLog'>
          <div className='navigation__links'>
            <NavLink
              exact
              to='/movies'
              className='navigation__link'
              activeClassName='navigation__link_active'
            >
              Фильмы
            </NavLink>{' '}
            <NavLink
              to='/saved-movies'
              className='navigation__link'
              activeClassName='navigation__link_active'
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className='navigation__account'>
            <NavLink
              to='/profile'
              className='navigation__link'
              activeClassName='navigation__link_active'
            >
              Аккаунт
            </NavLink>{' '}
            <img className='navigation__img' src={acc} alt='Аккаунт' />
          </div>
          <div className='navigation__burger-menu'>
            <img src={burger_menu} alt='Меню' onClick={handleOpenPopup} />
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
