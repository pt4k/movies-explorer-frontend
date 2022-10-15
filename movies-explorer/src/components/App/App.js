import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className='page'>
      <Header />

      <Switch>
        <Route exact path='/'>
          <Main />
          <Footer />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>
      </Switch>

      <Route path='/movies'>
        <Movies />
        <Footer />
      </Route>

      <Route path='/saved-movies'>
        <SavedMovies />
        <Footer />
      </Route>

      <Route path='/profile'>
        <Profile />
      </Route>
    </div>
  );
}

export default App;
