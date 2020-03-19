import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import SignIn from "./pages/create/signin";

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signin" exact component={SignIn} />
      </Switch>
    </Router>
  );
}
