import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Login from "./pages/login/login";
import SignIn from "./pages/create/signin";

export default function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signin" exact component={SignIn} />
      </Switch>
    </HashRouter>
  );
}
