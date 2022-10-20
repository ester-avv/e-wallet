import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
/* import Login from '../pages/Login'; */

describe('Verifica a página Login', () => {
  it('Qual deve ser a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it('Verifica se o email está correto', () => {
    renderWithRouterAndRedux(<App />);
    const dataTestIdEmail = screen.getByTestId(/email-input/i);
    expect(dataTestIdEmail).toBeInTheDocument();
  });
  it('Verifica se a senha existe', () => {
    renderWithRouterAndRedux(<App />);
    const senha = screen.getByTestId(/password-input/i);
    /* const maiorQueSeis = senha > 6; */

    expect(senha).toBeInTheDocument();
    /* expect(numberSenha).toBeGreaterThanOrEqual(6); */
  });
  it('Verifica se o botão está desabilitado sem senha', () => {
    renderWithRouterAndRedux(<App />);
    const senha = screen.getByTestId(/password-input/i);
    const email = screen.getByTestId(/email-input/i);
    const buttonEntrar = screen.getByRole('button');

    const myEmail = 'ester@ester.com';

    userEvent.type(senha, 'aeio');
    userEvent.type(email, myEmail);
    expect(buttonEntrar).toBeDisabled();
  });
  it('Verifica se o botão está desabilitado sem o email', () => {
    renderWithRouterAndRedux(<App />);
    const senha = screen.getByTestId(/password-input/i);
    const email = screen.getByTestId(/email-input/i);
    const buttonEntrar = screen.getByRole('button');

    userEvent.type(senha, 'gravidade98');
    userEvent.type(email, '');
    expect(buttonEntrar).toBeDisabled();
  });
  it('Verifica se o botão é habilitado com as condições adequadas e se há sucesso no login', () => {
    renderWithRouterAndRedux(<App />);
    const senha = screen.getByTestId(/password-input/i);
    const email = screen.getByTestId(/email-input/i);
    const buttonEntrar = screen.getByRole('button');

    const myEmail = 'ester@ester.com';

    userEvent.type(senha, 'gravidade98');
    userEvent.type(email, myEmail);
    expect(buttonEntrar).toBeEnabled();

    userEvent.click(buttonEntrar);

    /* expect(store.getState().user.email).toBe('ester@ester.com'); */
  });

  it('Verifica a rota que o botão leva', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.click(buttonEntrar);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
});
