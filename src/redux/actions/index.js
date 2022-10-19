// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';

export const loginEmail = (login) => ({
  type: LOGIN_EMAIL,
  payload: login,
});

export const changeExpenses = (myExpenses) => ({
  type: TOTAL_EXPENSES,
  payload: myExpenses,
});
