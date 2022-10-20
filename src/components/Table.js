import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  deleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { expenses.map((e) => {
            const valueTotal = Number(e.value).toFixed(2);
            const convertedValue = Number(e.exchangeRates[e.currency].ask);
            const fixedConvValue = convertedValue;

            const convertedReal = convertedValue * e.value;

            return (
              <tbody key={ e.id }>
                <tr>
                  <td>{ e.description }</td>
                  <td>{ e.tag }</td>
                  <td>{ e.method }</td>
                  <td>{ valueTotal }</td>
                  <td>{ e.exchangeRates[e.currency].name }</td>
                  <td>{ fixedConvValue.toFixed(2) }</td>
                  <td>{ convertedReal.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => this.deleteButton(e.id) }
                      data-testid="delete-btn"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
