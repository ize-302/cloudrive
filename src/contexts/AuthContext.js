import React, { createContext, Component } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = { isAuthorised: true };
  handleAuthStatus = () => {
    this.setState({ isAuthorised: !this.state.isAuthorised });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, handleAuthStatus: this.handleAuthStatus }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
