import link from '../../images/link.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://pt4k.github.io/russian-travel/'
            target='_blank'
          >
            Статичный сайт
          </a>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://pt4k.github.io/mesto-react/'
            target='_blank'
          >
            Адаптивный сайт
          </a>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://pt4k.github.io/signin'
            target='_blank'
          >
            Одностраничное приложение
          </a>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
