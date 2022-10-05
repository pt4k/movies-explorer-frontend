import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {

    return (
        <div>

             <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            
            <Route path="/signin">
                <Login />
            </Route>

            <Route path="/signup">
                <Register />
            </Route>
            </Switch>

            <Route path="/movies">
                <Movies />
            </Route>

            <Route path="/saved-movies">
                <SavedMovies />
            </Route>

            <Route path="/profile">
                <Profile />
            </Route>
        </div>
    );
}

export default App;