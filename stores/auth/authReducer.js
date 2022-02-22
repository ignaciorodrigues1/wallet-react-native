import { LOGIN, LOGOUT, SIGNUP } from "./authActions";

const INITIAL_STATE = {
  token: null,
  user: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
