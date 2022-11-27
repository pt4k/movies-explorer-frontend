import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  moviesArray,
  searchMovies,
  filteredMovies,
  setFilteredMovies,
  isLoading,
  savedMovies,
  setSavedMovies,
  handleSaveMovie,
  handleRemoveSavedMovie,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  //результаты поиска из localStorage
  useEffect(() => {
    if (localStorage.getItem('moviesSearchResults')) {
      const moviesSearchResults = JSON.parse(
        localStorage.getItem('moviesSearchResults')
      );
      //console.log(moviesSearchResults);

      setInputValue(moviesSearchResults.searchQuery);
      setSearchQuery(moviesSearchResults.searchQuery);
      setIsShort(moviesSearchResults.isShort);
      setFilteredMovies(moviesSearchResults.movies);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(moviesArray, searchQuery, isShort);
    setFilteredMovies(filteredMovies);
    // console.log(searchQuery);

    localStorage.setItem(
      'moviesSearchResults',
      JSON.stringify({
        movies: filteredMovies,
        searchQuery: searchQuery,
        isShort: isShort,
      })
    );

    searchQuery === '' ? setIsFirstSearch(true) : setIsFirstSearch(false);
  }, [searchQuery, isShort]);

  return (
    <section className='content'>
      <SearchForm
        isFirstSearch={isFirstSearch}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <MoviesCardList
        filteredMovies={filteredMovies}
        savedMovies={savedMovies}
        isFirstSearch={isFirstSearch}
        isLoading={isLoading}
        setSavedMovies={setSavedMovies}
        isSavePageTemplate={false}
        handleRemoveSavedMovie={handleRemoveSavedMovie}
        handleSaveMovie={handleSaveMovie}
      />
    </section>
  );
}
export default Movies;
