export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

// les états initials du reducer
const INITIAL_STATE = {
  isLogged: false,
  token: '',
  rememberMe: false,
}
// selon le type des actions, met à jour les states et les retourne pour la partie reducer login
export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { isLogged: true, token: action.payload.token, rememberMe: action.payload.rememberMe  }
    case USER_LOGIN_FAIL:
      return { isLogged: false, token: null, error: action.payload }
    case USER_LOGOUT:
      return { isLogged: false, token: null, rememberMe: state.rememberMe }
    default:
      return state
  }
}
