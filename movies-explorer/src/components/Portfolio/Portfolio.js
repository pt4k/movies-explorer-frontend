import link from '../../images/link.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          Статичный сайт{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li className='portfolio__item'>
          Адаптивный сайт{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li className='portfolio__item'>
          Одностраничное приложение{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
