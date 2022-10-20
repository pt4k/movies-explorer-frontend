import { Link } from 'react-router-dom';
import acc from '../../images/acc.svg';
import close from '../../images/close.svg';
import './BurgerMenuPopup.css';

function BurgerMenuPopup({ isOpen }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='burgerMenu'>
        <img className='burgerMenu__close' alt='Кнопка закрыть' src={close} />
        <div className='burgerMenu__links'>
          <Link to='/' className='burgerMenu__link'>
            Главная
          </Link>{' '}
          <Link to='/movies' className='burgerMenu__link'>
            Фильмы
          </Link>{' '}
          <Link to='/saved-movies' className='burgerMenu__link'>
            Сохранённые фильмы
          </Link>
        </div>
        <div className='burgerMenu__account'>
          <Link to='/profile' className='burgerMenu__link'>
            Аккаунт
          </Link>{' '}
          <img className='burgerMenu__img' src={acc} alt='Аккаунт' />
        </div>
      </div>
    </section>
  );
}

export default BurgerMenuPopup;
