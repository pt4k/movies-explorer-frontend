import { useRef, useState, useEffect } from 'react';
import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import moviesApi from '../../utils/MoviesApi';
import './SearchForm.css';

function SearchForm({}) {
  const [nameMovie, setNameMovie] = useState('');
  const movieRef = useRef();

  const resetForm = () => {
    setNameMovie('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setNameMovie(evt.target.value);
    console.log(nameMovie);

    moviesApi
      .getMovies()
      .then((res) => {
        setNameMovie(res);
      })
      .catch((err) => {
        console.log(err);
      });
    resetForm();
  };

  return (
    <section className='searchForm'>
      <form
        className='searchForm__form'
        type='text'
        onSubmit={handleSubmit}
        novalidate
      >
        <img className='searchForm__img' src={loupe} alt='Лупа' />
        <label className='searchForm__field'>
          <input
            className='searchForm__input'
            placeholder='Фильм'
            name='search'
            value={nameMovie}
            onChange={({ target }) => setNameMovie(target.value)}
            required
          />
          <span className='searchForm__input-error'>
            Нужно ввести ключевое слово
          </span>
        </label>
        <button className='searchForm__button' type='submit'>
          Найти
        </button>
        <div className='searchForm__line'></div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
