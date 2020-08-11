import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboardRoutes";
import AuthPage from "./pages/AuthPage";
import Folder from "./pages/FolderPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function App({ children }) {
  const [authenticated] = useState(true);
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
      <Router>
        <Switch>
          {authenticated ? (
            <DashboardRoutes exact path="/" component={HomePage} />
          ) : (
            <AuthPage exact path="/" />
          )}
          <DashboardRoutes exact path="/folder/:id" component={Folder} />
          <NotFound /> {/* Not found */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
