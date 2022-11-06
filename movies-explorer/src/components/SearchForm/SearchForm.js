import { useState } from 'react';
import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import mainApi from '../../utils/MainApi';
import './SearchForm.css';

function SearchForm({}) {
  const [nameMovie, setNameMovie] = useState('');

  const resetForm = () => {
    setNameMovie('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    resetForm();
  };

  return (
    <section className='searchForm'>
      <form className='searchForm__form' type='text' onSubmit={handleSubmit}>
        <img className='searchForm__img' src={loupe} alt='Лупа' />
        <input
          className='searchForm__input'
          placeholder='Фильм'
          name='search'
          value={nameMovie}
          onChange={({ target }) => setNameMovie(target.value)}
          required
        />
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
