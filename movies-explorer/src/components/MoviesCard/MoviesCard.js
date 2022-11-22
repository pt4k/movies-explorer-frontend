import './MoviesCard.css';

function MoviesCard({
  movie,
  movieId,
  nameRU,
  nameEN,
  director,
  country,
  year,
  duration,
  description,
  trailerLink,
  imgLink,
  imgAlt,
  image,
  isSave,
  isSavePageTemplate,
  handleSaveMovie,
  handleDeleteMovie,
  handleRemoveSavedMovie,
}) {
  const movieServerUrl = 'https://api.nomoreparties.co';
  console.log(isSave);

  function handleLikeButton() {
    if (isSave === false) {
      handleSaveMovie({
        movieId,
        nameRU,
        nameEN,
        director,
        country,
        year,
        duration,
        description,
        trailerLink,
        image: movieServerUrl + image.url,
        thumbnail: movieServerUrl + image.url,
      });
    } else {
      handleRemoveSavedMovie(movie.id);
    }
  }

  function handleDeleteLike() {
    handleDeleteMovie(movie);
  }

  return (
    <figure className='element'>
      <a href={trailerLink} target='_blank'>
        <img src={imgLink} alt={imgAlt} className='element__img' />
      </a>
      <figcaption className='element__caption'>
        <h2 className='element__text'>{nameRU}</h2>
        <button
          className={`${isSave ? 'element__like_delete ' : 'element__like'}`}
          type='button'
          aria-label='like'
          onClick={isSavePageTemplate ? handleDeleteLike : handleLikeButton}
        ></button>
      </figcaption>
      <p className='element__time'>{duration} минут</p>
    </figure>
  );
}

export default MoviesCard;
