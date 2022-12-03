import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({
  filteredMovies,
  savedMovies,
  isFirstSearch,
  isLoading,
  setSavedMovies,
  isSavePageTemplate,
  handleSaveMovie,
  handleRemoveSavedMovie,
  handleDeleteMovie,
}) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [cardsCount, setCardsCount] = useState(5);
  const [moreCardsCount, setMoreCardsCount] = useState(0);

  const movieServerUrl = 'https://api.nomoreparties.co';

  const checkCardsCount = () => {
    if (windowInnerWidth >= 1920) {
      setCardsCount(15);
      setMoreCardsCount(5);
    } else if (windowInnerWidth >= 1280) {
      setCardsCount(12);
      setMoreCardsCount(3);
    } else if (windowInnerWidth >= 481) {
      setCardsCount(8);
      setMoreCardsCount(2);
    } else if (windowInnerWidth <= 480) {
      setCardsCount(5);
      setMoreCardsCount(1);
    }
  };

  useEffect(() => {
    checkCardsCount();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowInnerWidth]);

  function handleResize() {
    setWindowInnerWidth(window.innerWidth);
  }

  function handleLoadMoreCards() {
    checkCardsCount();
    setCardsCount(cardsCount + moreCardsCount);
  }
  // console.log(filteredMovies);

  return (
    <>
      {
        // Найденые фильмы
      }
      {isSavePageTemplate === false && (
        <ul className='movies'>
          {isLoading && <Preloader />}
          {!isLoading && filteredMovies.length === 0 && !isFirstSearch && (
            <p>Ничего не найдено</p>
          )}
          {filteredMovies.slice(0, cardsCount).map((movie) => {
            return (
              <MoviesCard
                {...movie}
                movie={movie}
                key={movie.id}
                movieId={movie.id}
                imgLink={movieServerUrl + movie.image.url}
                imgAlt={movie.nameRU}
                duration={movie.duration}
                isSave={savedMovies.some((i) => i.movieId === movie.id)}
                isSavePageTemplate={isSavePageTemplate}
                setSavedMovies={setSavedMovies}
                handleSaveMovie={handleSaveMovie}
                handleRemoveSavedMovie={handleRemoveSavedMovie}
              />
            );
          })}
        </ul>
      )}
      {isSavePageTemplate === false && filteredMovies.length > cardsCount && (
        <div className='content__more'>
          <button
            onClick={handleLoadMoreCards}
            type='button'
            className='content__button'
          >
            Еще
          </button>
        </div>
      )}

      {
        // Сохраненные фильмы
      }

      {isSavePageTemplate === true && (
        <ul className='movies'>
          {isLoading && <Preloader />}
          {!isLoading && filteredMovies.length === 0 && (
            <p>Ничего не найдено</p>
          )}
          {filteredMovies.map((movie) => {
            // console.log(movie);
            return (
              <MoviesCard
                {...movie}
                movie={movie}
                key={movie.id}
                imgLink={movie.image}
                imgAlt={movie.nameRU}
                trailerLink={movie.trailerLink}
                isSavePageTemplate={isSavePageTemplate}
                handleDeleteMovie={handleDeleteMovie}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MoviesCardList;
