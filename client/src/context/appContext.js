import React, { useReducer, useContext } from 'react';
import axios                             from 'axios';

import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
}              from './actions';

const token        = localStorage.getItem('token');
const user         = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading:    false,
  showAlert:    false,
  alertText:    '',
  alertType:    '',
  user:         user ? JSON.parse(user) : null,
  token:        token ? token : null,
  userLocation: userLocation ? userLocation : '',
  jobLocation:  userLocation ? userLocation : '',
  showSidebar:  false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    
    clearAlert();
  };
  
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  
  const addUserToLocalStorage = ({
    user,
    token,
    location,
  }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };
  
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };
  
  const registerUser = async currentUser => {
    dispatch({ type: REGISTER_USER_BEGIN });
    
    try {
      const { data: { user, token, location } } = await axios.post('/api/v1/auth/register', currentUser);
      
      dispatch({
                 type:    REGISTER_USER_SUCCESS,
                 payload: {
                   user,
                   token,
                   location,
                 },
               });
      
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log('response:', error.response);
      dispatch({
                 type:    REGISTER_USER_ERROR,
                 payload: error.response.data.msg,
               });
    }
    clearAlert();
  };
  
  const loginUser = async currentUser => {
    dispatch({ type: LOGIN_USER_BEGIN });
    
    try {
      const { data: { user, token, location } } = await axios.post('/api/v1/auth/login', currentUser);
      
      dispatch({
                 type:    LOGIN_USER_SUCCESS,
                 payload: {
                   user,
                   token,
                   location,
                 },
               });
      
      addUserToLocalStorage({
                              user,
                              token,
                              location,
                            });
    } catch (error) {
      dispatch({
                 type:    LOGIN_USER_ERROR,
                 payload: error.response.data.msg,
               });
    }
    clearAlert();
  };
  
  // const informUserThatItIsLoggedIn = () => {
  //   dispatch({ type: MESSAGE_USER_BEING_ALREADY_LOGGED_IN });
  //   clearAlert();
  // };
  
  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });
  
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  
  const updateUser = () => {
  
  };
  
  return <AppContext.Provider value={ {
    ...state,
    displayAlert,
    registerUser,
    loginUser,
    toggleSidebar,
    logoutUser,
    updateUser,
  } }>
    { children }
  </AppContext.Provider>;
};

/*
 * Custom hook in order to speed things up, so that we don't separately have to import useContext() and AppContext when
 * we want to extract the data from the context in some other place.
 *
 * Custom Hooks must start with *use*
 * */
const useAppContext = () => useContext(AppContext);

// Exports
export { AppProvider, initialState, useAppContext };