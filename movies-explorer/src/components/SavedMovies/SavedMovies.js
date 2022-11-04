import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ isSave }) {
  return (
    <main className='content'>
      <section>
        <SearchForm />
      </section>
      <section>
        <MoviesCardList isSave={true} />
      </section>
    </main>
  );
}

export default SavedMovies;
