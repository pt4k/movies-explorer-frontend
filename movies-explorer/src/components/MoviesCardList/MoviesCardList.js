import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import {
  CARDS_COUNT_MAX_WINDOW_SIZE,
  CARDS_COUNT_MEDIUM_WINDOW_SIZE,
  CARDS_COUNT_MIN_WINDOW_SIZE,
  NEXT_CARDS_COUNT_MAX_WINDOW_SIZE,
  NEXT_CARDS_COUNT_MEDIUM_WINDOW_SIZE,
  NEXT_CARDS_COUNT_MIN_WINDOW_SIZE,
  MAX_WINDOW_SIZE,
  MEDIUM_WINDOW_SIZE,
  MIN_WINDOW_SIZE,
  MOVIES_IMAGE_URL,
} from '../../utils/constants';

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

  const movieServerUrl = MOVIES_IMAGE_URL;

  const checkCardsCount = () => {
    if (windowInnerWidth >= MAX_WINDOW_SIZE) {
      setCardsCount(CARDS_COUNT_MAX_WINDOW_SIZE);
      setMoreCardsCount(NEXT_CARDS_COUNT_MAX_WINDOW_SIZE);
    } else if (windowInnerWidth >= MEDIUM_WINDOW_SIZE) {
      setCardsCount(CARDS_COUNT_MEDIUM_WINDOW_SIZE);
      setMoreCardsCount(NEXT_CARDS_COUNT_MEDIUM_WINDOW_SIZE);
    } else if (windowInnerWidth <= MIN_WINDOW_SIZE) {
      setCardsCount(CARDS_COUNT_MIN_WINDOW_SIZE);
      setMoreCardsCount(NEXT_CARDS_COUNT_MIN_WINDOW_SIZE);
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
