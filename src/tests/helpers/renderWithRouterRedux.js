import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

// requisito feito com ajuda do Joao, Anderson e Arthur

const renderWithRouterRedux = (component, {
  initialState = {},
  store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  initialEntries = ['/'],
  history = createMemoryHistory({ initialEntries }),
} = {}) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterRedux;
