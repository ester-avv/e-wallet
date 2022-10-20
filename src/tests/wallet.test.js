import React from 'react';
import { screen, act } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
/* import userEvent from '@testing-library/user-event'; */
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
/* import Wallet from '../pages/Wallet'; */

describe('Verifica a página Wallet', () => {
  beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    act(() => { history.push('/carteira'); });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica a chamada da API', async () => {
    /* global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />); */

    const url = 'https://economia.awesomeapi.com.br/json/all';

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
  it('Verifica a rota da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    /* global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));  */
    act(() => { history.push('/carteira'); });
    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
  it('Verifica o Header', () => {
    const total = screen.getByTestId(/total-field/i);
    expect(total.innerHTML).toContain('0.00');
  });

  /* it('Verifica se os botoes estão presentes', async () => {
    /* const { history } = renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    act(() => { history.push('/carteira'); });

    const adicionaDespesa = screen.getByTestId(/add-expenses/i);
    userEvent.click(adicionaDespesa);

    const excluiDespesa = screen.getByTestId(/delete-btn/i);
    expect(adicionaDespesa).toBeInTheDocument();
    expect(excluiDespesa).toBeInTheDocument();
  }); */

  /* it('Verifica se os campos de preenchimento são renderizados corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });

    const value = screen.getByTestId(/value-input/i);
    expect(value).toBeInTheDocument();

    const description = screen.getByTestId(/description-input/i);
    expect(description).toBeInTheDocument();

    const currency = screen.getByTestId(/currency-input/i);
    expect(currency).toBeInTheDocument();

    const method = screen.getByTestId(/method-input/i);
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId(/tag-input/i);
    expect(tag).toBeInTheDocument();
  });
  it('Verifica se a tabela é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/carteira'); });
    const value = screen.getByTestId(/value-input/i);
    const description = screen.getByTestId(/description-input/i);
    const currency = screen.getByTestId(/currency-input/i);
    const method = screen.getByTestId(/method-input/i);
    const tag = screen.getByTestId(/tag-input/i);
    const adicionaDespesa = await screen.getByTestId(/add-expense/i);

    userEvent.type(value, '10');
    userEvent.type(description, 'livro');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.click(adicionaDespesa);

    const descriptionDone = await screen.getByRole('cell', { name: /livro/i });
    expect(descriptionDone).toBeInTheDocument();
  }); */
});
