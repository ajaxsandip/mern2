import React, { Fragment } from 'react';
import './App.css';
import Navbar from '../src/components/Layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './Context/Contacts/ContactState';
import AuthState from './Context/Auth/AuthState';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AlertState from './Context/Alert/AlertState';
import Alerts from './components/Layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from '../src/components/routing/Privateroute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar></Navbar>

              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute path='/' exact component={Home} />
                  <Route path='/about' exact component={About}></Route>
                  <Route path='/register' exact component={Register}></Route>
                  <Route path='/login' exact component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
