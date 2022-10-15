import './AboutProject.css';

function AboutProject() {
  return (
    <section className='aboutProject'>
      <h2 className='aboutProject__header'>О проекте</h2>

      <article className='two-columns'>
        <div className='columns'>
          <h2 className='columns__title'>Дипломный проект включал 5 этапов</h2>
          <p className='columns__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='columns'>
          <h2 className='columns__title'>
            На выполнение диплома ушло 5 недель
          </h2>
          <p className='columns__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </article>

      <div className='time'>
        <div className='time__backend'>
          <h2 className='time__title time__title_color_green'>1 неделя</h2>
          <p className='time__text'>Back-end</p>
        </div>
        <div className='time__frontend'>
          <h2 className='time__title time__title_color_grey'>4 недели</h2>
          <p className='time__text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
