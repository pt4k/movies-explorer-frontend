import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  isFirstSearch,
  setSearchQuery,
  isShort,
  setIsShort,
  inputValue,
  setInputValue,
}) {
  function handleSubmitForm(evt) {
    evt.preventDefault();
    setSearchQuery(inputValue);
  }

  function handleSearchInput(evt) {
    setInputValue(evt.target.value);
  }

  //  console.log(inputValue);
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
          {isFirstSearch && (
            <span className='searchForm__input-error'>
              Нужно ввести ключевое слово
            </span>
          )}
        </label>
        <button className='searchForm__button' type='submit'>
          Найти
        </button>
        <div className='searchForm__line'></div>
        <FilterCheckbox isShortFilm={isShort} setIsShortFilm={setIsShort} />
      </form>
    </section>
  );
}

export default SearchForm;
