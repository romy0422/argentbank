import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
  } from './reducerLogin'
  import { USER_PROFILE_RESET, USER_PROFILE_SUCCESS } from '../user/reducerUser'
  import { userProfile } from '../user/actionUser'
  import axios from 'axios'


// Emmet une action de login

export const login = (email, password, rememberMe) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        { email, password },
        config
      )

  dispatch({ type: USER_LOGIN_SUCCESS, payload: { token: data.body.token, rememberMe } });
  dispatch(userProfile(data.body.token))
      dispatch({ type: USER_PROFILE_SUCCESS, payload: data.body})
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  // Logout action

export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_PROFILE_RESET })
  }