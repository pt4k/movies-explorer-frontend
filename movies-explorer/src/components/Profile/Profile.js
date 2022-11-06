import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, Юрий!</h2>
      <form className='profile__form'>
        <div className='profile__input-wrap'>
          <label>Имя</label>
          <input className='profile__input' />
        </div>

        <div className='profile__line'></div>

        <div className='profile__input-wrap'>
          <label>E-mail</label>
          <input className='profile__input' />
        </div>
        <button className='profile__button profile__button-edit' type='submit'>
          Редактировать
        </button>
        <button className='profile__button profile__button-exit' type='button'>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
