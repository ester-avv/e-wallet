import React from 'react';
import { screen, act } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const initialState = {
  user: {
    email: 'ester@ester.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ],
    expenses: [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        description: 'Livro',
        exchangeRates: mockData,
      },
    ],
  },
};

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
    /* const { store } = */ renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const header = screen.getAllByRole('heading', {
      level: 3 });

    /* expect(store.getState().user.email).toContain('ester@ester.com'); */

    expect(header[0]).toBeInTheDocument();
    expect(header[1]).toBeInTheDocument();
    expect(header[2]).toBeInTheDocument();
    expect(header[1].innerHTML).toEqual('0.00');

    const inputs = screen.getAllByRole('textbox');
    const button = screen.getAllByRole('button');
    /* const value = screen.getByTestId(/value-input/i);
    const description = screen.getByTestId(/description-input/i);
    const adicionaDespesa = screen.getByTestId(/add-expenses/i); */

    userEvent.type(inputs[0], '10');
    userEvent.type(inputs[1], 'livro');
    userEvent.click(button[0]);

    /* expect(header[1].innerHTML).not.toEqual('0.00'); */
  });

  it('Verifica o WalletForm', async () => {
    /* const {store } =  */renderWithRouterAndRedux(<Wallet />, initialState);
    const button = screen.getAllByRole('button');
    const buttonAdiciona = button[0];
    const inputs = screen.getAllByRole('textbox');
    const value = inputs[0];
    const description = inputs[1];
    const combobox = screen.getAllByRole('combobox');
    const currency = combobox[0];
    const method = combobox[1];
    const tag = combobox[2];

    expect(buttonAdiciona).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    userEvent.type(value, '10');
    userEvent.type(description, 'livro');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');

    expect(value).toHaveAttribute('value', '010');
    expect(description).toHaveAttribute('value', 'livro');

    userEvent.click(buttonAdiciona);

    const deleteBtn = await screen.findByTestId('delete-btn');
    userEvent.click(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
  });

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
