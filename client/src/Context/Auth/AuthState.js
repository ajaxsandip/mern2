import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';

import uuid from 'uuid';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    errors: null,
    loading: true,
    user: null,
    isAuthenticated: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = formdata => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .post('http://localhost:5000/api/users', formdata, config)
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        loaduser();
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.msg
        });
      });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  const loaduser = () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    axios
      .get('http://localhost:5000/api/auth')
      .then(res => {
        console.log(res);
        dispatch({ type: USER_LOADED, payload: res.data });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.msg
        });
      });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const loginfun = data => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(data, config);
    axios
      .post('http://localhost:5000/api/auth', data, config)
      .then(res => {
        console.log(res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        loaduser();
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.msg
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        errors: state.errors,
        loading: state.loading,
        user: state.user,
        register,
        clearErrors,
        loaduser,
        loginfun,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
