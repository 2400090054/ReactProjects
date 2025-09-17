import React, { Component } from 'react';
import './css/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      signupData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      },
      errData: {}
    };
  }

  handleSignUpInput = (e) => {
    this.setState({
      signupData: {
        ...this.state.signupData,
        [e.target.name]: e.target.value
      }
    });
  };

  validateSignup = () => {
    const { signupData } = this.state;
    const err = {};

    if (!signupData.firstName.trim()) err.firstName = "First Name is required";
    if (!signupData.lastName.trim()) err.lastName = "Last Name is required";
    if (!signupData.email.trim()) err.email = "Email ID is required";
    if (!signupData.phone.trim()) err.phone = "Phone Number is required";
    if (signupData.password.length < 8) err.password = "Password must have 8 characters";
    if (signupData.confirmPassword !== signupData.password)
      err.confirmPassword = "Passwords do not match";

    this.setState({ errData: err });
    return Object.keys(err).length === 0;
  };

  registerUser = () => {
    if (!this.validateSignup()) return;
    alert("Registered Successfully!");
    this.setState({
      signup: false,
      signupData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      },
      errData: {}
    });
  };

  handleLogin = () => {
    alert("Login clicked!");
  };

  render() {
    const { signup, signupData, errData } = this.state;

    return (
      <div className="login">
        <div className="leftpanel">
          <h1>Welcome Back!</h1>
          <p>Access and manage your tasks efficiently</p>
        </div>

        <div className="rightpanel">
          <div className="card">
            <h2>Login</h2>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={this.handleLogin}>Login</button>
            <p>
              Don't have an account?{" "}
              <span className="link" onClick={() => this.setState({ signup: true })}>
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {signup && (
          <div className="overlay">
            <div className="signup">
              <button className="close" onClick={() => this.setState({ signup: false })}>
                X
              </button>
              <h2>Create an Account</h2>

              {["firstName", "lastName", "email", "phone", "password", "confirmPassword"].map((field) => (
                <div key={field} className="form-group">
                  <label>{field.replace(/([A-Z])/g, ' $1')} *</label>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={signupData[field]}
                    onChange={this.handleSignUpInput}
                    autoComplete="off"
                    style={!errData[field] ? {} : { border: "1px solid red" }}
                  />
                  {errData[field] && <small className="error">{errData[field]}</small>}
                </div>
              ))}

              <button className="regButton" onClick={this.registerUser}>
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;