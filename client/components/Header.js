import React, { Component } from "react";
import { graphql } from "react-apollo";
import CurrentUserQuery from "../queries/CurrentUser";
import { Link } from "react-router";
import LogoutMutation from "../mutations/Logout";

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <ul className="right">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <div className="nav-wrapper">{this.renderButtons()}</div>
        </ul>
      </nav>
    );
  }
}

export default graphql(LogoutMutation)(graphql(CurrentUserQuery)(Header));
