import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  handleTotalExpenses = () => {
    const { totalExpenses } = this.props;
    const total = totalExpenses.reduce((prev, actual) => prev + actual, 0);
    const numberOfDecimals = 3;
    return total.toFixed(numberOfDecimals);
  };

  render() {
    const { email } = this.props;
    const currency = BRL;

    return (
      <div>
        <h3 data-testid="email-field">
          {`Email: ${email}`}
        </h3>
        <h3>
          {`Total expenses: ${this.handleTotalExpenses()}`}
        </h3>
        <h3 data-testid="header-currency-field">
          {`Currency: ${currency}`}
        </h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string,
  totalExpenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
