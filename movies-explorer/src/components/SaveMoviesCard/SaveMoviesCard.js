import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import mainApi from '../../utils/MainApi';

const SavedMovies = ({
  savedMovies,
  setFilteredMovies,
  searchMovies,
  isLoading,
  setIsLoading,
  filteredMovies,
  handleDeleteMovie,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const filteredMovies = searchMovies(
      savedMovies,
      searchQuery,
      isShort,
      true
    );
    setFilteredMovies(filteredMovies);
  }, [searchQuery, isShort, savedMovies]);

  return (
    <section className='movies'>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
        inputValue={inputValue}
        setInputValue={setInputValue}
        savedPageLocalStorage={true}
      />
      <MoviesCardList
        isSavePageTemplate={true}
        savedMovies={savedMovies}
        isShort={isShort}
        searchQuery={searchQuery}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filteredMovies={filteredMovies}
        searchMovies={searchMovies}
        handleDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
};

export default SavedMovies;
