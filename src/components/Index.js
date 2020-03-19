import React from "react";
import { Switch, HashRouter } from "react-router-dom";
import Login from "./pages/login/login";
import SignIn from "./pages/create/signin";
import { ToastProvider } from "react-toast-notifications";
import { LoginRoute, PublicRoute, PrivateRoute } from "./atoms/routesConfig";
import Home from "./pages/home/home";
import PreHome from "./pages/home/preHome";

export default function App() {
  return (
    <ToastProvider>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <LoginRoute path="/" exact component={Login} />
          <PublicRoute path="/signin" exact component={SignIn} />
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/pre-home" exact component={PreHome} />
        </Switch>
      </HashRouter>
    </ToastProvider>
  );
}
