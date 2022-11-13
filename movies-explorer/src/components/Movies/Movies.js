import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);

  function handleSerchMoviesSubmit(nameMovie) {
    return (
      <main className='content'>
        <section>
          <SearchForm />
        </section>
        <section>
          <MoviesCardList />
        </section>
        <div className='content__more'>
          <button className='content__button'>Ещё</button>
        </div>
      </main>
    );
  }
}
export default Movies;
