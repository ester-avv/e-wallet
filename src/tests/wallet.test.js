import React from 'react';
import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

/* const { froakie } = require('./pokemon');

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(froakie),
});

export default mockFetch; */

describe('Verifica a página Wallet', () => {
/*     beforeEach(() => {
        global.fetch = jest.fn(mockData);
      });
     */
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica a chamada da API', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterRedux(<Wallet />);

    const apiData = await screen.findByText(/USD/i);
    const url = 'https://economia.awesomeapi.com.br/json/all';

    expect(apiData).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
/*   it('Verifica se os dados da tabela estão corretos', async () => {
    const apiData = await screen.get('select', { name: /currency/i });
    const url = 'https://economia.awesomeapi.com.br/json/all';

    expect(apiData).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  }); */
});
