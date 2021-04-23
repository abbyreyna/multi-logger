import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  SET_LOADING,
  USERS_ERROR,
} from './types';

// Get users from server
// Get logs from server
export const getUsers = () => async (dispatch) => {
    try {
      setLoading();
  
      const res = await fetch('/users');
      const data = await res.json();
  
      dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.statusText,
      });
    }
  };

// Set loading to true
export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  