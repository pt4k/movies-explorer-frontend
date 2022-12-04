import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className='notFoundPage'>
      <h1 className='notFoundPage__title'>404</h1>
      <p className='notFoundPage__text'>Страница не найдена</p>
      <button className='notFoundPage__button' onClick={handleClick}>
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
