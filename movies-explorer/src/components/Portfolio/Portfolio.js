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
            href='https://pt4k.github.io/signin'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__paragraph'>Статичный сайт</p>{' '}
            <img className='portfolio__img' alt='ссылка' src={link} />
          </a>
        </li>

        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://pt4k.github.io/signin'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__paragraph'>Адаптивный сайт</p>{' '}
            <img className='portfolio__img' alt='ссылка' src={link} />
          </a>
        </li>

        <li
          className='portfolio__item'
          href='https://pt4k.github.io/signin'
          target='_blank'
        >
          <a
            className='portfolio__link'
            href='https://pt4k.github.io/signin'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__paragraph'>Одностраничное приложение</p>{' '}
            <img className='portfolio__img' alt='ссылка' src={link} />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
