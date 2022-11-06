import { Link } from 'react-router-dom';
import acc from '../../images/acc.svg';
import close from '../../images/close.svg';
import './BurgerMenuPopup.css';

function BurgerMenuPopup({ isOpen }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__window'>
        <img className='popup__close' alt='Кнопка закрыть' src={close} />
        <div className='popup__links'>
          <Link to='/' className='popup__link'>
            Главная
          </Link>{' '}
          <Link to='/movies' className='popup__link'>
            Фильмы
          </Link>{' '}
          <Link to='/saved-movies' className='popup__link'>
            Сохранённые фильмы
          </Link>
        </div>
        <div className='popup__account'>
          <Link to='/profile' className='popup__link'>
            Аккаунт
          </Link>{' '}
          <img className='popup__img' src={acc} alt='Аккаунт' />
        </div>
      </div>
    </section>
  );
}

export default BurgerMenuPopup;
