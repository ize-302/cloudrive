import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboardRoutes";
import AuthPage from "./pages/AuthPage";
import Folder from "./pages/FolderPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

const App = ({ children }) => {
  console.log(AuthContext);
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <CSSReset />
        {children}
        <Router>
          <Switch>
            <AuthContext.Consumer>
              {(context) => (
                <>
                  {context.isAuthorised ? (
                    <DashboardRoutes exact path="/" component={HomePage} />
                  ) : (
                    <AuthPage exact path="/" />
                  )}
                  <DashboardRoutes
                    exact
                    path="/folder/:id"
                    component={Folder}
                  />
                </>
              )}
            </AuthContext.Consumer>
            <NotFound /> {/* Not found */}
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
