import * as type from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case type.SIGN_UP:
      return {
        ...state,
        signUp: action.payload,
        signIn: null
      };
    case type.SIGN_IN:
      return {
        ...state,
        signIn: action.payload,
        signUp: null
      };
    case type.IS_LOGGEDIN:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
};
