import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* import { TOTAL_EXPENSES } from '../redux/actions'; */

class Header extends Component {
  handleTotalExpenses = () => {
    const { totalExpenses } = this.props;
    const total = totalExpenses
      .reduce((acc, a) => (
        acc + Number(a.value) * Number(a.exchangeRates[a.currency].ask)), 0);

    const number = total.toFixed(2);
    /* console.log('number', number);
console.log('total', total); */

    return number;
  };

  render() {
    const { email } = this.props;
    const currency = 'BRL';

    return (
      <div>
        <h3 data-testid="email-field">
          {email}
        </h3>
        <h3 data-testid="total-field">
          {this.handleTotalExpenses()}
        </h3>
        <h3 data-testid="header-currency-field">
          {currency}
        </h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  totalExpenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
