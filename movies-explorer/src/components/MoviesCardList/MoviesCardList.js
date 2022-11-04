import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ isSave }) {
  return (
    <section className='movies'>
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
      <MoviesCard isSave={isSave} />
    </section>
  );
}

export default MoviesCardList;
