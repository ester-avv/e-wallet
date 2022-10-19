import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
/*   state = {
    despesa: '',
    description: '',
  }; */

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

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          name="despesa"
          data-testid="value-input"
          placeholder="Despesa"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição da despesa"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          onChange={ this.handleChange }
          required
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
        >
          <option value="dinheiro">
            Dinheiro
          </option>
          <option value="credito">
            Cartão de crédito
          </option>
          <option value="debito">
            Cartão de débito
          </option>
        </select>

        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="alimento">
            Alimentação
          </option>
          <option value="lazer">
            Lazer
          </option>
          <option value="trabalho">
            Trabalho
          </option>
          <option value="transporte">
            Transporte
          </option>
          <option value="saude">
            Saúde
          </option>
        </select>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
