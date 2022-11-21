import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  moviesArray,
  savedMovies,
  searchMovies,
  filteredMovies,
  setFilteredMovies,
  isLoading,
  setSavedMovies,
  handleSaveMovie,
  handleRemoveSavedMovie,
  setIsLoading,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  //заполняем результаты поиска из localStorage
  useEffect(() => {
    if (localStorage.getItem('moviesSearchResults')) {
      const moviesSearchResults = JSON.parse(
        localStorage.getItem('moviesSearchResults')
      );

      setInputValue(moviesSearchResults.searchQuery);
      setSearchQuery(moviesSearchResults.searchQuery);
      setIsShort(moviesSearchResults.isShort);
      setFilteredMovies(moviesSearchResults.movies);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(moviesArray, searchQuery, isShort);

    setFilteredMovies(filteredMovies);
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        setSavedMovies={setSavedMovies}
        isShort={isShort}
        searchQuery={searchQuery}
        savedMovies={savedMovies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filteredMovies={filteredMovies}
        searchMovies={searchMovies}
        isSavePageTemplate={false}
        handleRemoveSavedMovie={handleRemoveSavedMovie}
        isFirstSearch={isFirstSearch}
      />
    </section>
  );
}
export default Movies;

/* import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  moviesArray,
  savedMovies,
  searchMovies,
  filteredMovies,
  setFilteredMovies,
  isLoading,
  setSavedMovies,
  handleSaveMovie,
  handleRemoveSavedMovie,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('moviesSearchResults')) {
      const moviesSearchResults = JSON.parse(
        localStorage.getItem('moviesSearchResults')
      );
      setInputValue(moviesSearchResults.searchQuery);
      setSearchQuery(moviesSearchResults.searchQuery);
      setIsShortFilm(moviesSearchResults.isShort);
      setFilteredMovies(moviesSearchResults.movies);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(moviesArray, searchQuery, isShortFilm);
    setFilteredMovies(filteredMovies);
    localStorage.setItem(
      'moviesSearchResults',
      JSON.stringify({
        movies: filteredMovies,
        searchQuery: searchQuery,
        isShort: isShortFilm,
      })
    );

    searchQuery === '' ? setIsFirstSearch(true) : setIsFirstSearch(false);
  }, [searchQuery, isShortFilm]);

  return (
    <main className='content'>
      <section>
        <SearchForm
          isShortFilm={isShortFilm}
          setIsShortFilm={setIsShortFilm}
          setSearchQuery={setSearchQuery}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </section>
      <section>
        <MoviesCardList
          isFirstSearch={isFirstSearch}
          handleSaveMovie={handleSaveMovie}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isLoading={isLoading}
          filteredMovies={filteredMovies}
          isSavePageTemplate={false}
          handleRemoveSavedMovie={handleRemoveSavedMovie}
        />
      </section>
      <div className='content__more'>
        <button className='content__button'>Ещё</button>
      </div>
    </main>
  );
}
export default Movies; */
