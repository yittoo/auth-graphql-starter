import React, { Component } from "react";
import AuthForm from "./AuthForm";
import LoginMutation from "../mutations/Login";
import { graphql } from "react-apollo";
import CurrentUserQuery from "../queries/CurrentUser";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  submitHandler({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.submitHandler.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(LoginMutation)(LoginForm);
