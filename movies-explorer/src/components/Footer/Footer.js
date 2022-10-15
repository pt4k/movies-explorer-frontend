import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>

      <div className='footer__info'>
        <p className='footer__data'>© {new Date().getFullYear()}</p>
        <p className='footer__text'>Яндекс.Практикум</p>
        <p className='footer__link'>Github</p>
      </div>
    </footer>
  );
}

export default Footer;
