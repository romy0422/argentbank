export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAIL = 'USER_PROFILE_FAIL';
export const USER_PROFILE_RESET = 'USER_PROFILE_RESET';
export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE';
export const USER_PROFILE_UPDATE_SUCCESS = 'USER_PROFILE_UPDATE_SUCCESS';

// les states pour la partie profil
const INITIAL_STATE = {
  success: false,
  profileUpdated: false,
  firstName: '',
  lastName: '',
  error: null
};

// le reducer pour le profil
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
    case USER_PROFILE_UPDATE:
      return {
        ...state,
        success: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        error: null
      };
      
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileUpdated: true
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false
      };
      
    case USER_PROFILE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
