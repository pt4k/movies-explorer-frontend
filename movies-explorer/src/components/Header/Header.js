import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLoggedIn, handleOpenPopup }) {
  return (
    <header className={isLoggedIn ? 'header__onLog' : 'header'}>
      <Link to='/'>
        <img alt='Логотип' className='logo' src={logo} />
      </Link>
      <Navigation isLoggedIn={isLoggedIn} handleOpenPopup={handleOpenPopup} />
    </header>
  );
}

export default Header;
