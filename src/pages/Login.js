import React from 'react';

class Login extends React.Component {
  render() {
    state = {
      email: '',
      senha: '',
    };
    validButton = () => {
      const { email, senha } = this.state;
      const REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const validReg = REGEX.test(email);
      const minDigit = 5;
      const validEntrance = senha.length > minDigit && validReg;

      return !validEntrance;
    };

    handleChange = (event) => {
      const { target } = event;
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
      handleClick = () => {
        const { history, dispatchUser } = this.props;
        const { email } = this.state;
        dispatchUser(email);
        history.push('/carteira');
      };
    };
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
        <label htmlFor="entrar">
          Entrar
          <input
            type="button"
            id="entrar"
            name="entrar"
            onClick={ this.handleClick }
          />
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (state) => dispatch(loginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
