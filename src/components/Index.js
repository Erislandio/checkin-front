import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login/login";
import SignIn from "./pages/create/signin";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signin" exact component={SignIn} />
    </Router>
  );
}
