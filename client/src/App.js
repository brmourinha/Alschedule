import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import ScheduleState from './context/schedule/ScheduleState';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ScheduleState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/about' component={About}></Route>
            <PrivateRoute exact path='/' component={Home}></PrivateRoute>
          </Switch>
        </Router>
      </ScheduleState>
    </AuthState>
  );
};

export default App;
