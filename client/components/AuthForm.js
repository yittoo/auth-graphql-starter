import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }
  render() {
    const errToRender = this.props.errors.length ? (
      <ul className="errors">
        {this.props.errors.map((err, index) => {
          return <li key={index}>{err}</li>;
        })}
      </ul>
    ) : null;
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          {errToRender}
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
