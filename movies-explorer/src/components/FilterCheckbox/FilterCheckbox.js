import './FilterCheckbox.css';

function FilterCheckbox({ isShortFilm, setIsShortFilm }) {
  function handleChangeCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  console.log(isShortFilm);
  return (
    <div className='filterCheckbox__wrap'>
      <div className='filterCheckbox__radios'>
        <label className='filterCheckbox__label'>
          <input
            className='filterCheckbox__radio_invisible'
            onChange={handleChangeCheckbox}
            type='radio'
            name='choice'
            id='no'
            value='no'
            checked
          />
          <span className='filterCheckbox__radio_visible'></span>
        </label>
        <label className='filterCheckbox__label'>
          <input
            className='filterCheckbox__radio_invisible'
            onChange={handleChangeCheckbox}
            type='radio'
            name='choice'
            id='yes'
            value='yes'
          />
          <span className='filterCheckbox__radio_visible'></span>
        </label>
      </div>
      <label className='filterCheckbox__label-film'>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
