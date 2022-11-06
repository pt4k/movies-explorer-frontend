import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <main className='content'>
      <section>
        <Promo />
      </section>
      <section>
        <AboutProject />
      </section>
      <section>
        <Techs />
      </section>
      <section>
        <AboutMe />
      </section>
      <section>
        <Portfolio />
      </section>
    </main>
  );
}

export default Main;
