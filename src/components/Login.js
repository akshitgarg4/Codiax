import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.passwordInputRef);
    console.log(this.emailInputRef);
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            ref={this.emailInputRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            ref={this.passwordInputRef}
          />
        </div>
        <div className="field">
          <button onClick={this.handleSubmitForm}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
