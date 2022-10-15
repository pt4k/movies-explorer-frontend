import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='searchForm'>
      <form className='searchForm__form' type='text'>
        <img className='searchForm__img' src={loupe} alt='Лупа' />
        <input
          className='searchForm__input'
          placeholder='Фильмы'
          name='search'
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
