import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
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
  const [userData, setUserData] = useState({}); //данные пользователя
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); //оФИЛЬТРОВАННЫЕ фильмы
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  const { pathname } = useLocation();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    mainApi
      .getSaveMovies()
      .then((res) => {
        const result = res.data.filter((i) => i.owner === userData._id);
        setSavedMovies(result);
      })
      .catch((err) => err);
  }, [userData]);

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      getInitialMovies();
      mainApi
        .getSaveMovies()
        .then((res) => {
          const result = res.data.filter((i) => i.owner === userData._id);
          setSavedMovies(result);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  function checkToken() {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi
        .getCurrentUser()
        .then((res) => {
          setIsLoggedIn(true);
          setUserData(res);
        })
        .catch((err) => err);
    } else {
      handleLogOut();
    }
  }

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
      .catch((err) => {})
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('moviesSearchResults');

    setIsLoggedIn(false);
    setUserData({});
    setSavedMovies([]);
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

  function handleEditUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .patchUser(name, email)
      .then((res) => {
        setUserData(res.data);
        setIsLoading(false);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // поиск и фильтры
  function filterMoviesByDuration(moviesArr) {
    return moviesArr.filter((i) => i.duration < 40);
  }

  function searchMovies(moviesArr, searchQuery, isShortMovie, renderAll) {
    const filteredMovies = moviesArr.filter((i) => {
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
          { ...res, id: res.movieId },
        ];
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  //удалить фильм из библиотеки
  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        const deletedCardIndex = savedMovies.findIndex(
          (i) => i._id === movie._id
        );
        let newSavedMovies = [...savedMovies];
        newSavedMovies.splice(deletedCardIndex, 1);
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

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className='page'>
        {(pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies' ||
          pathname === '/profile') && <Header isLoggedIn={isLoggedIn} />}

        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <Route path='/movies'>
            <Movies
              moviesArray={moviesArray}
              savedMovies={savedMovies}
              searchMovies={searchMovies}
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setSavedMovies={setSavedMovies}
              handleSaveMovie={handleSaveMovie}
              handleRemoveSavedMovie={handleRemoveSavedMovie}
            />
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies
              savedMovies={savedMovies}
              searchMovies={searchMovies}
              setFilteredMovies={setFilteredMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              filteredMovies={filteredMovies}
              handleDeleteMovie={handleDeleteMovie}
            />
          </Route>

          <Route path='/profile'>
            <Profile
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

        {/*<Route path='/movies'>
            <Header loggedIn={true} />
            <Movies
              moviesArray={moviesArray}
              isLoading={isLoading}
              searchMovies={searchMovies}
              setFilteredMovies={setFilteredMovies}
              // loggedIn={loggedIn}
              savedMovies={savedMovies}
              // onSaveMovie={saveMovie}
              // onDeleteMovie={deleteMovie}
            />
            <Footer />
  </Route>*/}

        {/* <Route path='/profile'>
            <Header loggedIn={true} />
            <Profile />
</Route>
<Route path='/signin'>
            {isLoggedIn ? <Redirect to='/movies' /> : <Login onLog={onLog} />}
          </Route> */}

        <BurgerMenuPopup
        // isOpen={isOpenPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
