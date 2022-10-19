// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const CURRENCY = 'CURRENCY';

export const loginEmail = (login) => ({
  type: LOGIN_EMAIL,
  email: login,
});

export const changeExpenses = (myExpenses) => ({
  type: TOTAL_EXPENSES,
  totalExpenses: myExpenses,
});

function getAPI(json) {
  return { type: CURRENCY, payload: json };
}

const URL = 'https://economia.awesomeapi.com.br/json/all';

export function fetchAPI() {
  return (dispatch) => fetch(URL)
    .then((response) => response.json())
    .then((data) => Object.keys(data))
    .then((obj) => obj.filter((e) => e !== 'USDT'))
    .then((json) => dispatch(getAPI(json)));
}
