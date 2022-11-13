import { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import BurgerMenuPopup from '../BurgerMenuPopup/BurgerMenuPopup';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import './App.css';

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [isSave, setIsSave] = useState(false);

  //получаем фильмы со стороннего сервера
  useEffect(() => {
    if (loggedIn) {
      moviesApi
        .getMovies()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>

          <Route path='/movies'>
            <Header loggedIn={true} />
            <Movies />
            <Footer />
          </Route>

          <Route path='/saved-movies'>
            <Header loggedIn={true} />
            <SavedMovies isSave={true} />
            <Footer />
          </Route>

          <Route path='/profile'>
            <Header loggedIn={true} />
            <Profile />
          </Route>

          <Route path='/signin'>
            <Login />
          </Route>

          <Route path='/signup'>
            <Register />
          </Route>

          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>

        <BurgerMenuPopup isOpen={isOpenPopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
