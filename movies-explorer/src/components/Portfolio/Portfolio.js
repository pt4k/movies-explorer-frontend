import link from '../../images/link.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li
          className='portfolio__item'
          href='https://pt4k.github.io/signin'
          target='_blank'
        >
          <p className='portfolio__paragraph'>Статичный сайт</p>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li
          className='portfolio__item'
          href='https://pt4k.github.io/signin'
          target='_blank'
        >
          <p className='portfolio__paragraph'>Адаптивный сайт</p>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
        <li
          className='portfolio__item'
          href='https://pt4k.github.io/signin'
          target='_blank'
        >
          <p className='portfolio__paragraph'>Одностраничное приложение</p>{' '}
          <img className='portfolio__img' alt='ссылка' src={link} />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
