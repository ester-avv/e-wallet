// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { TOTAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  totalExpenses: [],
};

const changeWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSES:
    return {
      ...state,
      totalExpenses: [...totalExpenses, action.payload],
    };

  default:
    return state;
  }
};

export default changeWallet;
