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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './App.css';
import { SHORT_MOVIE } from '../../utils/constants';

import iconSuccess from '../../images/Union.png';
import iconFailed from '../../images/Unionfailed.png';

function App() {
  const [moviesArray, setMoviesArray] = useState([]); //массив фильмов
  const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов
  const [currentUser, setCurrentUser] = useState({}); //данные пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState(undefined);

  const { pathname } = useLocation();
  const history = useHistory();

  // проверка токена
  useEffect(() => {
    checkToken();
  }, []);

  // запрос сохраненных фильмов
  useEffect(() => {
    setIsLoading(false);
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
        handleInfoTooltip(iconSuccess, 'Вы успешно зарегистрировались!');
        onLog({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          handleInfoTooltip(iconFailed, 'Такой email уже существует!');
        } else if (err === 'Ошибка: 500') {
          handleInfoTooltip(iconFailed, 'Ошибка 500: Internal Server Error');
        } else {
          handleInfoTooltip(
            iconFailed,
            'Что-то пошло не так! Попробуйте ещё раз.'
          );
        }
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
        if (err === 'Ошибка: 401') {
          handleInfoTooltip(iconFailed, 'Неправильные почта или пароль!');
        } else if (err === 'Ошибка: 500') {
          handleInfoTooltip(iconFailed, 'Ошибка 500: Internal Server Error');
        } else {
          handleInfoTooltip(
            iconFailed,
            'Что-то пошло не так! Попробуйте ещё раз.'
          );
        }
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
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
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
        handleInfoTooltip(iconSuccess, 'Данные изменены!');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(
          iconFailed,
          'Что-то пошло не так! Попробуйте ещё раз.'
        );
      });
  }

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleInfoTooltip = (image, text) => {
    setInfoTooltipText(text);
    setInfoTooltipImage(image);
    setIsInfoTooltip(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setIsInfoTooltip(false);
  };

  // поиск и фильтры
  function filterMoviesByDuration(moviesArr) {
    return moviesArr.filter((i) => i.duration < SHORT_MOVIE);
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
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [
          ...savedMovies,
          { ...res.movie, id: res.movie.movieId },
        ];

        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleLogOut();
        }
      });
  }

  //удалить фильм
  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        const deletedMovieId = savedMovies.findIndex(
          (i) => i._id === movie._id
        );
        let newSavedMovies = [...savedMovies];

        newSavedMovies.splice(deletedMovieId, 1);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveSavedMovie(movieId) {
    if (savedMovies.length > 0) {
      let movie = savedMovies.find((i) => i.movieId === movieId);
      handleDeleteMovie(movie);
    }
  }

  // console.log(localStorage);
  // console.log(filteredMovies);
  // console.log(isLoggedIn);
  // console.log(currentUser);
  // console.log(moviesArray);

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

          <Route path='/movies'>
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

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closePopup}
          title={infoTooltipText}
          icon={infoTooltipImage}
        />

        {(pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies') && <Footer />}

        <BurgerMenuPopup isOpen={isOpen} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
