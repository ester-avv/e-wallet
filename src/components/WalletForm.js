import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, completeExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    /* exchangeRates: '', */
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name, value, type } = target;

    this.setState({
      [name]: type === 'checkbox' ? target.checked : value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { value, id, description, currency, method, tag } = this.state;

    const URL = 'https://economia.awesomeapi.com.br/json/all';

    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    const newObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    this.setState((anterior) => ({
      id: Number(anterior.id) + 1,
      value: '',
      description: '',
    }));

    dispatch(completeExpenses(newObj));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Despesa"
            onChange={ this.handleChange }
            value={ value }
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
          >
            { currencies.map((e) => (
              <option key={ `${e}` } value={ `${e}` }>
                {`${e}`}
              </option>
            ))}

          </select>
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
          >
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>

          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
          >
            <option value="Alimentação">
              Alimentação
            </option>
            <option value="Lazer">
              Lazer
            </option>
            <option value="Trabalho">
              Trabalho
            </option>
            <option value="Transporte">
              Transporte
            </option>
            <option value="Saúde">
              Saúde
            </option>
          </select>
          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
