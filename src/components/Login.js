import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
        email:'',
        password:''
    }
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
    
  };
  handleEmail =(e)=>{
      this.setState({
          email:e.target.value
      })
  }
  handlePassword =(e)=>{
    this.setState({
        password:e.target.value
    })
}
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmail}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            onChange={this.handlePassword}
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
