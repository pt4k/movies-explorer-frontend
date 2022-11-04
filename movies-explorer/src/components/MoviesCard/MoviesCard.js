import film from '../../images/film.png';
import './MoviesCard.css';

function MoviesCard({ isSave }) {
  return (
    <figure className='element'>
      <img src={film} alt='Постер фильма' className='element__img' />
      <figcaption className='element__caption'>
        <h2 className='element__text'>В погоне за Бенкси</h2>
        <button
          className={`${isSave ? 'element__like_delete ' : 'element__like'}`}
          type='button'
          aria-label='like'
        ></button>
      </figcaption>
      <p className='element__time'>1ч 42м</p>
    </figure>
  );
}

export default MoviesCard;
