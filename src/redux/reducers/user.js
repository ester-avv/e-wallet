// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_EMAIL:
    return { ...state, email: action.payload };

  default:
    return state;
    /* break; */
  }
}

export default userReducer;
