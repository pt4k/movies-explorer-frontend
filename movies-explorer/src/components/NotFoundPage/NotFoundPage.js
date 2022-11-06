import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className='notFoundPage'>
      <h1 className='notFoundPage__title'>404</h1>
      <p className='notFoundPage__text'>Страница не найдена</p>
      <Link to='/' className='notFoundPage__link'>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
