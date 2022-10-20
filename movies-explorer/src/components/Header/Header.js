import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ loggedIn }) {
  return (
    <header className={loggedIn ? 'header__onLog' : 'header'}>
      <Link to='/'>
        <img alt='Логотип' className='logo' src={logo} />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
