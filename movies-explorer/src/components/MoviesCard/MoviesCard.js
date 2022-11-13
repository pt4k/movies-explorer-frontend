import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ isSave, movie }) {
  return (
    <figure className='element'>
      <a href={movie.trailerLink} target='blank'>
        <img
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt='Постер фильма'
          className='element__img'
        />
      </a>
      <figcaption className='element__caption'>
        <h2 className='element__text'>{movie.nameRU}</h2>
        <button
          className={`${isSave ? 'element__like_delete ' : 'element__like'}`}
          type='button'
          aria-label='like'
        ></button>
      </figcaption>
      <p className='element__time'>{movie.duration} минут</p>
    </figure>
  );
}

export default MoviesCard;
