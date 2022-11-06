import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
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

export default Movies;
