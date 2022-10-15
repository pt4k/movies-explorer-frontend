import photo from '../../images/photo.png';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='aboutMe'>
      <h2 className='aboutMe__header'>Студент</h2>

      <div className='aboutMe__info'>
        <div>
          <h2 className='aboutMe__name'>Юрий</h2>
          <p className='aboutMe__speciality'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__about'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className='aboutMe__link'>Github</p>
        </div>
        <img alt='Аватар' className='aboutMe__photo' src={photo} />
      </div>
    </section>
  );
}

export default AboutMe;
