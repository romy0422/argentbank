import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL
} from './reducerUser';
import axios from 'axios';

// gère les dispatch et les appel d'api en rapport avec la récupération du profil
export const userProfile = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      { token },
      config
    );

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.body });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};


// gère les dispatch et l'appel d'api en rapport avec l'update des informations du profil
export const updateProfile = (token, newFirstName, newLastName) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      { firstName: newFirstName, lastName: newLastName },
      config
    );

    const { firstName, lastName } = response.data.body;
    
    dispatch({ type: USER_PROFILE_UPDATE, payload: { firstName, lastName } });
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};
