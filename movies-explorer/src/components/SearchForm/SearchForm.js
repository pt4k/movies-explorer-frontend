import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({
  setSearchQuery,
  setIsShort,
  isShort,
  inputValue,
  setInputValue,
  savedPageLocalStorage,
}) => {
  function handleSubmitForm(event) {
    event.preventDefault();
    setSearchQuery(inputValue);
  }

  function handleSearchInput(event) {
    setInputValue(event.target.value);
  }

  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmitForm} noValidate>
        <img className='searchForm__img' src={loupe} alt='Лупа' />
        <label className='searchForm__field'>
          <input
            className='searchForm__input'
            placeholder='Фильм'
            name='search'
            onChange={handleSearchInput}
            value={inputValue}
            required
          />
          <span className='searchForm__input-error'></span>
        </label>
        <button className='searchForm__button' type='submit'>
          Найти
        </button>
        <div className='searchForm__line'></div>
        <FilterCheckbox isShortFilm={isShort} setIsShortFilm={setIsShort} />
      </form>
    </section>
  );
};

export default SearchForm;
