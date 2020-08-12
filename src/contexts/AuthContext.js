import React, { createContext, Component } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
    userData: JSON.parse(window.localStorage.getItem("userData")),
  };
  handleAuthStatus = () => {
    if (this.state.loggedIn === true) {
      window.localStorage.setItem("loggedIn", false);
      window.localStorage.setItem("userData", false);
    } else {
      window.localStorage.setItem("loggedIn", true);
    }
    console.log(this.state.userData);
    window.location.replace("/");
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
