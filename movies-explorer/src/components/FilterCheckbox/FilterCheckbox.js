import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filterCheckbox__wrap'>
      <div className='filterCheckbox__radios'>
        <label className='filterCheckbox__label'>
          <input
            className='filterCheckbox__radio_invisible'
            type='radio'
            name='choice'
            id='no'
            value='no'
          />
          <span className='filterCheckbox__radio_visible'></span>
        </label>
        <label className='filterCheckbox__label'>
          <input
            className='filterCheckbox__radio_invisible'
            type='radio'
            name='choice'
            id='yes'
            value='yes'
            checked
          />
          <span className='filterCheckbox__radio_visible'></span>
        </label>
      </div>
      <label className='filterCheckbox__label-film'>Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
