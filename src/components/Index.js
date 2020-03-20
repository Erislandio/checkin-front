import React, { createContext } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import SignIn from "./pages/create/signin";
import { ToastProvider } from "react-toast-notifications";
import { LoginRoute, PublicRoute, PrivateRoute } from "./atoms/routesConfig";
import Home from "./pages/home/home";
import PreHome from "./pages/home/preHome";
import Account from "./pages/account/account";
import { withUserData } from "./atoms/withUserData";

export const UserContext = createContext();

function App({ user, setUser }) {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <LoginRoute path="/" exact component={Login} />
            <PublicRoute path="/signin" exact component={SignIn} />
            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/pre-home" exact component={PreHome} />
            <PrivateRoute path="/account" exact component={Account} />
          </Switch>
        </BrowserRouter>
      </ToastProvider>
    </UserContext.Provider>
  );
}

export default withUserData(App);
