import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  validButton = () => {
    const { email, senha } = this.state;
    const REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validReg = REGEX.test(email);
    const minDigit = 5;
    const validEnter = senha.length > minDigit && validReg;

    return !validEnter;
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history, dispatchUser } = this.props;
    const { email } = this.state;
    dispatchUser(email);
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="senha"
          value={ senha }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          id="entrar"
          name="entrar"
          onClick={ this.handleClick }
          disabled={ this.validButton() }
        >
          Entrar
        </button>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (state) => dispatch(loginEmail(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
