import webEarth from '../../images/web_Earth.svg';
import './Promo.css';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrap'>
        <h1 className='promo__tittle'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className='promo__button'>Узнать больше</button>
      </div>
      <img className='promo__img' src={webEarth} alt='Планета Земля'></img>
    </section>
  );
}

export default Promo;
