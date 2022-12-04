import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  savedMovies,
  setFilteredMovies,
  searchMovies,
  isLoading,
  filteredMovies,
  handleDeleteMovie,
  isSavePageTemplate,
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
    <section className='content'>
      <SearchForm
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <MoviesCardList
        isSavePageTemplate={isSavePageTemplate}
        handleDeleteMovie={handleDeleteMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        filteredMovies={filteredMovies}
      />
    </section>
  );
};

export default SavedMovies;
