import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
  } from './reducerLogin'
  import { USER_PROFILE_RESET, USER_PROFILE_SUCCESS } from '../user/reducerUser'
  import { userProfile } from '../user/actionUser'
  import axios from 'axios'


// gère l'appel d'api pour le login et déclenche les actions adéquates gràce au dispatch
export const login = (email, password, rememberMe) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',// configure le header en indiquant le type du body de la requête
        },
      }
  
      const { data } = await axios.post( // data stock la reponse de la requete http gràce à axios
        'http://localhost:3001/api/v1/user/login',
        { email, password },
        config
      )
      // dispatch les actions dans le cas d'un succes de connection, communique dans les states le token, et la valeur booleen du remember me
  dispatch({ type: USER_LOGIN_SUCCESS, payload: { token: data.body.token, rememberMe } });
  dispatch(userProfile(data.body.token))
      dispatch({ type: USER_PROFILE_SUCCESS, payload: data.body})
    } catch (error) {
      // gère les actions à dispatch en cas d'echec de connection
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  // déclenche les dispatch pour le logout
export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_PROFILE_RESET })
  }