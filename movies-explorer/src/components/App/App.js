import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from 'react-router-dom';
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
  const [moviesArray, setMoviesArray] = useState([]); //массив фильмов
  const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов
  const [currentUser, setCurrentUser] = useState({}); //данные пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  // проверка токена
  useEffect(() => {
    checkToken();
  }, []);

  // запрос сохраненных фильмов
  useEffect(() => {
    mainApi
      .getSaveMovies()
      .then((res) => {
        const saveMovie = res.data.filter((i) => i.owner === currentUser._id);
        setSavedMovies(saveMovie);
      })
      .catch((err) => err);
  }, [currentUser]);

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      getInitialMovies();
      mainApi
        .getSaveMovies()
        .then((res) => {
          const saveMovie = res.data.filter((i) => i.owner === currentUser._id);
          setSavedMovies(saveMovie);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  // регистрация и авторизация
  function onRegister({ name, email, password }) {
    setIsLoading(true);

    mainApi
      .register(name, email, password)
      .then(() => {
        onLog({ email, password });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function onLog({ email, password }) {
    setIsLoading(true);

    mainApi
      .authorize(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    localStorage.clear();

    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    history.push('/');
  }

  function checkToken() {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi
        .getCurrentUser()
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => err);
    } else {
      handleLogOut();
    }
  }

  function getInitialMovies() {
    setIsLoading(true);

    if (localStorage.getItem('moviesData')) {
      const movies = JSON.parse(localStorage.getItem('moviesData'));

      setMoviesArray(movies);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setMoviesArray(data);
          localStorage.setItem('moviesData', JSON.stringify(data));
          setIsLoading(false);
        })
        .catch((err) => err);
    }
  }

  // изменения данных пользователя
  function handleEditUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .patchUser(name, email)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoading(false);
        console.log(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // поиск и фильтры
  function filterMoviesByDuration(moviesArr) {
    return moviesArr.filter((i) => i.duration < 40);
  }

  function searchMovies(moviesArr, searchQuery, isShortMovie, renderAll) {
    setIsLoading(true);

    const filteredMovies = moviesArr.filter((i) => {
      setIsLoading(false);

      return i.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!renderAll) {
      if (isShortMovie && searchQuery !== '') {
        return filterMoviesByDuration(filteredMovies);
      }

      return searchQuery !== '' ? filteredMovies : [];
    } else {
      if (isShortMovie) {
        return filterMoviesByDuration(filteredMovies);
      }
      setIsLoading(false);
      return filteredMovies;
    }
  }

  //сохранить фильм
  function handleSaveMovie(movie) {
    // console.log(movie);
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [
          ...savedMovies,
          { ...res.movie, id: res.movie.movieId },
        ];

        setSavedMovies(updatedSavedMovies);
        console.log(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  //удалить фильм
  function handleDeleteMovie(movie) {
    // console.log(movie.nameRU);
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        // console.log(res);
        const deletedMovieId = savedMovies.findIndex(
          (i) => i._id === movie._id
        );
        let newSavedMovies = [...savedMovies];
        newSavedMovies.splice(deletedMovieId, 1);
        setSavedMovies(newSavedMovies);
        // console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveSavedMovie(movieId) {
    if (savedMovies.length > 0) {
      let movie = savedMovies.find((i) => i.movieId === movieId);
      handleDeleteMovie(movie);
    }
  }

  //console.log(localStorage);
  // console.log(isLoggedIn);
  // console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {(pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies' ||
          pathname === '/profile') && (
          <Header isLoggedIn={isLoggedIn} handleOpenPopup={handleOpenPopup} />
        )}
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <Route exact path='/movies'>
            <Movies
              isLoggedIn={isLoggedIn}
              moviesArray={moviesArray}
              searchMovies={searchMovies}
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              handleSaveMovie={handleSaveMovie}
              handleRemoveSavedMovie={handleRemoveSavedMovie}
            />
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies
              isLoggedIn={isLoggedIn}
              searchMovies={searchMovies}
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
              isLoading={isLoading}
              savedMovies={savedMovies}
              handleDeleteMovie={handleDeleteMovie}
              isSavePageTemplate={true}
            />
          </Route>

          <Route path='/profile'>
            <Profile
              isLoggedIn={isLoggedIn}
              handleEditUser={handleEditUser}
              handleLogOut={handleLogOut}
            />
          </Route>

          <Route path='/signin'>
            {isLoggedIn ? <Redirect to='/movies' /> : <Login onLog={onLog} />}
          </Route>

          <Route path='/signup'>
            {isLoggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register onRegister={onRegister} />
            )}
          </Route>

          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>

        {(pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies') && <Footer />}

        <BurgerMenuPopup isOpen={isOpen} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
