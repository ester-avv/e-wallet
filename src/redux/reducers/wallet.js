// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { COMPLETE_EXPENSES, CURRENCY, TOTAL_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  editor: false,
  idToEdit: 0,

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSES:
    return {
      ...state,
      expenses: [...expenses, action.payload],
    };
  case CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case COMPLETE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
