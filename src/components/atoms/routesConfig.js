import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...rest} {...props} /> : <Redirect to="/" exact />
      }
    />
  );
};

const LoginRoute = ({ component: Component, path, ...rest }) => {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={props =>
        user && path === "/" ? (
          <Redirect to="/pre-home" exact {...props} />
        ) : (
          <Component to="/" exact {...props} />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        restricted ? <Redirect to="/home" exact /> : <Component {...props} />
      }
    />
  );
};

export { PublicRoute, PrivateRoute, LoginRoute };
