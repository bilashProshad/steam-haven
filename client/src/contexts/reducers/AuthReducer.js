import {
  CLEAR_ERROR,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/AuthConstant";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
      };

    case LOGIN_FAILED:
    case REGISTER_FAILED:
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
