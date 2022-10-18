// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';

export const loginEmail = (state) => ({
  type: LOGIN_EMAIL,
  email: state,
});

export function fetchAPI() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch(url)
      .then((response) => response.json())
      .then((json) => dispatch(getAPI(json)))
      .catch((error) => errorAPI(error));
  };
}
