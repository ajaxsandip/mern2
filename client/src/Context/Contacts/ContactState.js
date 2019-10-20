import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import axios from 'axios';
import ContactReducer from './ContactReducer';
import uuid from 'uuid';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const addform = contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .post('http://localhost:5000/api/contacts', contact, config)
      .then(res => {
        dispatch({ type: ADD_CONTACT, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadcontact = () => {
    console.log('loaddcon');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .get('http://localhost:5000/api/contacts')
      .then(res => {
        console.log(res);
        dispatch({ type: GET_CONTACTS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteCOntact = id => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .delete(`http://localhost:5000/api/contacts/${id}`)
      .then(res => {
        dispatch({ type: DELETE_CONTACT, payload: id });
        clearcurrent();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const setcurrent = id => {
    dispatch({ type: SET_CURRENT, payload: id });
  };
  const clearcurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updatecontact = contact1 => {
    console.log('contact', contact1);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .put(
        `http://localhost:5000/api/contacts/:${contact1._id}`,
        contact1,
        config
      )
      .then(res => {
        console.log(res);
        dispatch({ type: UPDATE_CONTACT, payload: res.data });
        clearcurrent();
        loadcontact();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filtercontacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearfilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addform,
        deleteCOntact,
        setcurrent,
        current: state.current,
        clearcurrent,
        updatecontact,
        filtercontacts,
        filtered: state.filtered,
        clearfilter,
        loadcontact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
